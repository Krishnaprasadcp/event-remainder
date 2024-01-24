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
        const {data} =await req.body;
        console.log("hii");
        
    
        const{eventData,userId} =await data;
        
        console.log(eventData);
        
        const {eventName,eventDescription,eventDate,eventTime,imageData,isConsecutiveYear} = eventData;
        console.log(eventName);
        
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
        } 
        catch (error) {
            res.status(404).json({message:"Cant enter the event"})
        }
        
        res.status(200).json({message:"succsess"});
    }
}
export default handler;