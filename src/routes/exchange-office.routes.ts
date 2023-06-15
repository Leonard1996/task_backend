import * as express from "express";
import { ExchangeOfficeController } from "../controllers/exchange-office.controller";
export class ExchangeOfficeRouter {
  static configRoutes = (app: express.Application) => {
    app.get("/", [ExchangeOfficeController.getHighestEarners]);
  };
}
