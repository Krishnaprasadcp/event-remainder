import eventModel from "@/lib/models/event";
import UserModel from "@/lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";
interface Event {
    eventName:string;
    eventDiscription:string;
    date:string;
    time:string;
    image:string;
    consecutiveYear:boolean;
    // createdAt:Date;
}
async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "GET"){
    
    }
    if(req.method ==="POST"){
        const {eventName,eventDiscription,date,time,image,consecutiveYear,userId} = req.body;
        const event =  new eventModel<Event>({
            eventName,
            eventDiscription,
            date,
            time,
            image,
            consecutiveYear,
        });
        let createdEvent = await event.save();
        const updateEventId =await UserModel.findByIdAndUpdate(userId,{$push:{events:createdEvent._id}},{new:true});
        
        res.status(200).json({message:"succsess"});
    }
}
export default handler;