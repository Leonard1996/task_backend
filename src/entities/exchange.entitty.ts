import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ColumnNumericTransformer } from "../utils/ColumnNumericTransformer";
import { ExchangeOffice } from "./exchange-office.entity";

@Entity("exchanges")
export class Exchange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column("numeric", {
    precision: 25,
    scale: 10,
    transformer: new ColumnNumericTransformer(),
  })
  public ask: number;

  @Column("timestamp")
  public date: Date;

  @Column()
  public exchangeOfficeId: number;

  @ManyToOne(() => ExchangeOffice, (exchangeOffice: ExchangeOffice) => exchangeOffice.exchanges)
  exchangeOffice: ExchangeOffice;
}
