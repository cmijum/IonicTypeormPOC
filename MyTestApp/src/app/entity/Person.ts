import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Person {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 500
    })
    name: string;
  
    @Column()
    age: string;
}