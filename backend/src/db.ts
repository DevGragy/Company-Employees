import { DataSource } from 'typeorm'
import { Employees } from './entities/Employees'
import {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE} from './config'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [Employees],
    logging: true,
    synchronize: true
})