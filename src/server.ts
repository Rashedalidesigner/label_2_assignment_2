import app from "./app";
import config from "./config/config";
import { initilizeDB } from "./db";

const main = () => {
    initilizeDB();

    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
}


main();
