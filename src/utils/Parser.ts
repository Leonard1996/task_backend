//@ts-nocheck
import fs from "fs";
import { AppDataSource as dataSource } from "../bootstrap";

const FORMATS = {
  TXT: "txt",
};

const KEY_TABLE_MAPPINGS = {
  "exchange-offices": "exchangeOffices",
  exchanges: "exchanges",
  rates: "rates",
  countries: "countries",
};

export class Parser {
  public static init(path: string) {
    const extension = path.split(".").at(-1);

    switch (extension) {
      case FORMATS.TXT:
        const data = fs.readFileSync(path, "utf-8");
        const result = Parser.parseTxt(data);
        // Parser.seedDb(result);
        break;
    }
  }
  private static parseTxt(fileData) {
    const data = {};

    let grandParent = null;
    let parent = null;
    let child = null;
    let grandChild = null;
    const lines = fileData.split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
      let spaces = lines[i].search(/\S/);
      let txt = lines[i].trim();

      if (spaces === 0) {
        data[txt] = [];
        grandParent = data[txt];
      }

      if (spaces === 2) {
        const newParent = {};
        parent = newParent;
        grandParent.push(parent);
      }

      if (spaces === 4) {
        const [key, value] = txt.split(" = ");
        if (key && value) {
          parent[key] = value;
        } else {
          child = [];
          parent[key] = child;
        }
      }

      if (spaces === 6) {
        const newGrandChild = {};
        grandChild = newGrandChild;
        child.push(grandChild);
      }

      if (spaces === 8) {
        const [key, value] = txt.split(" = ");
        grandChild[key] = value;
      }
    }

    return data;
  }

  private static async seedDb(entitiesAsJson) {
    const manager = dataSource.manager;
    await Promise.all([
      manager.query(`DELETE from "countries" where id IS NOT NULL`),
      manager.query(`DELETE from "rates" where id IS NOT NULL`),
      manager.query(`DELETE from "exchanges" where id IS NOT NULL`),
      manager.query(`DELETE from "exchangeOffices" where id IS NOT NULL`),
    ]);

    entitiesAsJson = Parser.attachParent(entitiesAsJson);
    const rows = [];
    Parser.traverseAndInsert(rows, entitiesAsJson);

    for (const row of rows.reverse()) {
      const { placeholders, values, columns } = Parser.generateColumsValues(row.entity);
      await manager.query(
        `
        INSERT INTO "${KEY_TABLE_MAPPINGS[row.table]}" (${columns}) VALUES (${placeholders})
      `,
        values
      );
    }
  }

  private static traverseAndInsert(rows, entitiesAsJson, table = null, entity = {}) {
    for (const key in entitiesAsJson) {
      if (Array.isArray(entitiesAsJson[key])) {
        table = key;
        Parser.traverseAndInsert(rows, entitiesAsJson[key], table);
      } else if (typeof entitiesAsJson[key] === "object") {
        entity = Parser.traverseAndInsert(rows, entitiesAsJson[key], table);
        rows.push({ entity, table });
      } else {
        entity[key] = entitiesAsJson[key];
      }
    }

    return entity;
  }

  private static attachParent(entitiesAsJson) {
    let id = null;
    entitiesAsJson["exchange-offices"].forEach((object) => {
      for (const key in object) {
        if (key === "id") {
          id = object[key];
        }
        if (Array.isArray(object[key]) && id) {
          object[key] = object[key].map((item) => ({ ...item, exchangeOfficeId: +id }));
        }
      }
    });

    return entitiesAsJson;
  }

  private static generateColumsValues(entity) {
    const values = Object.values(entity);
    const placeholders = values.map((el, index) => `$${index + 1}`).join(", ");
    const columns = Object.keys(entity)
      .map((el) => `"${el}"`)
      .join(", ");

    return { values, placeholders, columns };
  }
}
