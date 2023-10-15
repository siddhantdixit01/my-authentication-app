import mongoose from "mongoose";    

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection= mongoose.connection;

        connection.on('connected',()=>{
            console.log("Successfully Connected to MongoDB");
        })
        connection.on('error',(err)=>{
            console.log("Error Connecting To MongoDB"+err);
            process.exit();
        })
    } catch (error) {
        console.log("Something's wrong!");
        console.log(error);
    }
}