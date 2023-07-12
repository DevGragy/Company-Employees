import "reflect-metadata";
import app from "./app";
import {AppDataSource} from "./db";

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Connected to BD!");
        app.listen(4000);
        console.log(`Server is on port 4000`);
    } catch (error) {
        console.error(error)
    }
}

main();
