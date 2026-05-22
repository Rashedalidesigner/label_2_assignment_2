import dotenv from "dotenv";
import path from "path"


dotenv.config({
    path: path.join(process.cwd(), ".env")
});



const config = {
    connection_String: process.env.DATABASE_URL as string,
    port: process.env.PORT as string,
    jwt_secret: process.env.JWT_SECRET as string,
}

export default config;