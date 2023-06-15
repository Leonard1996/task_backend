import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ColumnNumericTransformer } from "../utils/ColumnNumericTransformer";
import { ExchangeOffice } from "./exchange-office.entity";

@Entity("rates")
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column("numeric", {
    precision: 10,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
  })
  public in: number;

  @Column("numeric", {
    precision: 10,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
  })
  public out: number;

  @Column("numeric", {
    precision: 25,
    scale: 10,
    transformer: new ColumnNumericTransformer(),
  })
  public reserve: number;

  @Column("timestamp")
  public date: Date;

  @Column()
  public exchangeOfficeId: number;

  @ManyToOne(() => ExchangeOffice, (exchangeOffice: ExchangeOffice) => exchangeOffice.rates)
  exchangeOffice: ExchangeOffice;
}
