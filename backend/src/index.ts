import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./db";
import {PORT} from  './config'

async function main() {
    try {
        await AppDataSource.initialize()
        console.log("Connected to BD!")
        app.listen(PORT)
        console.log(`Server is on PORT ${PORT}`)
    } catch (error) {
        console.error(error)
    }
}

main()
