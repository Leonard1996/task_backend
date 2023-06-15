import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exchange } from "./exchange.entitty";
import { Rate } from "./rate.entity";

@Entity("exchangeOffices")
export class ExchangeOffice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @OneToMany(() => Exchange, (exchange: Exchange) => exchange.exchangeOffice)
  exchanges: Exchange[];

  @OneToMany(() => Rate, (rate: Rate) => rate.exchangeOffice)
  rates: Rate[];
}
