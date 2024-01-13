import mongoose from "mongoose";
async function connectToDatabase(){

    const database = await mongoose.connect('mongodb://localhost:27017/Event_remainder');
    console.log("connected to database");
    return database;
    
}
export default connectToDatabase;