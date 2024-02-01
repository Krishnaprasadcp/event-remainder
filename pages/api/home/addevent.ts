import connectToDatabase from "@/lib/db";
import eventModel from "@/lib/models/event";
import UserModel from "@/lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";
interface EventData{
    eventName:string;
    eventDescription:string;
    eventDate:string;
    eventTime:string;
    imageData:string | undefined;
    isConsecutiveYear:boolean;
    isFeatured:boolean;
    userId:string;
   
  }
async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "GET"){
    
    }
    if(req.method ==="POST"){
        const db =await connectToDatabase();
        const data = req.body;
        const userId = data.userId;
        const {eventName,eventDescription,eventDate,eventTime,imageData,isConsecutiveYear} = data.eventData;
    
        console.log(userId);
        console.log(eventDate);
        
        
        const event =  new eventModel<EventData>({
            eventName,
            eventDescription,
            eventDate,
            eventTime,
            imageData,
            isConsecutiveYear,
            isFeatured:false,
            userId:userId
            
        });
        
        try {
            let createdEvent = await event.save();
            const updateEventId =await UserModel.findByIdAndUpdate(userId,{$push:{events:createdEvent._id}},{new:true});
            console.log(createdEvent);
            res.status(200).json(createdEvent);
        } 
        catch (error) {
            res.status(404).json({message:"Cant enter the event"})
        }
        
        
    }
}
export default handler;