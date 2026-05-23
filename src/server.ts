import app from "./app.js";
import config from "./config/config.js";
import { initilizeDB } from "./db/index.js";

const main = () => {
    initilizeDB();

    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
}


main();
