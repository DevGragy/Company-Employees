import { DataSource } from 'typeorm'
import { Employees } from './entities/Employees'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "PASSWORD",
    database: "keyence",
    entities: [Employees],
    logging: true,
    synchronize: true
})