import connectToDatabase from "@/lib/db";
import eventModel from "@/lib/models/event";
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
}
export default handler;