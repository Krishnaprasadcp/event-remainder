import mongoose from "mongoose";
async function connectToDatabase(){
    const dbName =process.env.DB_NAME;
    
    const database = await mongoose.connect(`${dbName}`);
    console.log("connected to database");
    return database;
    
}
export default connectToDatabase;