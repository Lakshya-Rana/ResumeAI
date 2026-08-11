import app from "./app.js";
import dotenv from "dotenv"
import {connectDB} from "./db/database.js";

dotenv.config({
    path: "./.env"
})

const port=process.env.PORT; 

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Example app listening on port http://localhost:${port}`)
    })
})
.catch(()=>{
    console.error("mongoDB connection error",error)
    process.exit(1)
})

