"use strict";
import express from "express";
import { bootstrap } from "./bootstrap";
import { ExchangeOfficeRouter } from "./routes/exchange-office.routes";

const app = express();

ExchangeOfficeRouter.configRoutes(app);

bootstrap();

app.listen(3001, () => {
  console.log(`server started at http://localhost:${3001}`);
});
