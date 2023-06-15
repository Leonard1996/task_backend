import { Parser } from "./utils/Parser";
import path from "path";
import { DataSource } from "typeorm";
import { ExchangeOffice } from "./entities/exchange-office.entity";
import { Rate } from "./entities/rate.entity";
import { Exchange } from "./entities/exchange.entitty";
import { Country } from "./entities/country.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "username",
  password: "",
  database: "task_db",
  synchronize: true,
  entities: [Country, Exchange, ExchangeOffice, Rate],
  logging: false,
});

export function bootstrap() {
  AppDataSource.initialize()
    .then(() => {
      Parser.init(path.join(__dirname, "./static/data.txt"));
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
}
