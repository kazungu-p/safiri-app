import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
});

import connectDB from "./config/database.js";
import app from "./app.js";

const startServer = async() =>{
    try {
        await connectDB();

        app.on("error", (error)=>{
            console.log("App encountered an error", error);
            throw error
        });
        app.listen(process.env.PORT || 4000, ()=>{
            console.log(`Server is running on port: ${process.env.PORT}`);
        });

    } catch (error) {
        console.log("Server encountered an error and could not start", error);
        process.exit(1);
    }
}
startServer();