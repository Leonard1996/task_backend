import { Request, Response } from "express";
import { ExchangeOfficeService } from "../services/exchange-office.servie";

export class ExchangeOfficeController {
  public static async getHighestEarners(request: Request, response: Response) {
    try {
      const result = await ExchangeOfficeService.getHighestEarners();
      response.status(200).send({ result });
    } catch (error) {
      console.log(error);
      response.status(404).send("error");
    }
  }
}
