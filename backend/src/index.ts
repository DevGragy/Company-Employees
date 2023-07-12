import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./db";

async function main() {
    const port = 4000;
    try {
        await AppDataSource.initialize()
        console.log("Connected to BD!")
        app.listen(port)
        console.log(`Server is on port ${port}`)
    } catch (error) {
        console.error(error)
    }
}

main()
