import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Employees extends BaseEntity {
    @PrimaryGeneratedColumn()
    employeeID: number;

    @Column()
    employeeName: string;

    @Column({type: "date"})
    date: string;

    @Column("time")
    punchIn: Date;

    @Column("time")
    punchOut: Date;
}
