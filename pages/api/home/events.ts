import connectToDatabase from "@/lib/db";
import eventModel from "@/lib/models/event";
import UserModel from "@/lib/models/user";
import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

interface ID{
    userId:string
};

async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "POST"){
        try {
            const db = await connectToDatabase();
            if(db){
                const {userId}:ID = req.body;
                const events =await eventModel.find({userId});
                if(events.length>0){
                    res.status(200).json(events);
                }
                else{
                    res.status(200).json({message:"No events"});
                }
            }    
        }
        catch (error) {
            res.status(500).json({message:"Server Error"});
        }
    }
    if(req.method === "DELETE"){
        const id = req.body.deleteId;
        
        const objectId=new Types.ObjectId(id);
        
        try{
            const deletedEvent:any =await eventModel.findOneAndDelete({_id:objectId});
            // await deletedEvent.exec();
        if(!deletedEvent){
            return  res.status(404).json({message:"Event cant be deletd"});
        }
     
        
        const resDeleteData={
            id:deletedEvent._id,
            userId:deletedEvent.userId
        }
        console.log(resDeleteData);
        res.status(200).json({deletedData:resDeleteData,message:"Event deleted"});
        }
        catch(error){
            // console.log(error);
            
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
export default handler;