import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("countries")
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;
}
