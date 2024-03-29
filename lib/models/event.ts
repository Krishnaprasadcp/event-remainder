import mongoose,{Schema,Document} from "mongoose";
import UserModel from "./user";
interface Event extends Document{
    eventName:string;
    eventDescription:string;
    eventDate:string;
    eventTime:string;
    imageData:string | undefined;
    isConsecutiveYear:boolean;
    isFeatured:boolean;
    userId:string;
}
const eventSchema=new Schema<Event>({
    eventName:{
        type:String,
        required:true
    },
    eventDescription:{
        type:String,
        required:true
    },
    eventDate:{
        type:String,
        required:true
    },
    eventTime:{
        type:String,
        required:true
    },
    imageData:{
        type:String,
    },
    isConsecutiveYear:{
        type:Boolean,
    },
    isFeatured:{
        type:Boolean
    },
    userId:{
        type:String
    }
},
{
    timestamps:true
});

eventSchema.pre('findOneAndDelete',async function(next:any){
    const event = this as any;
    console.log(event);
    console.log(event.userId);
    
    
    try{
       const user =  await UserModel.findByIdAndDelete(event.userId,{$pull:{events:event._id}});
       if (!user) {
        console.error('User not found');
    }
    next();
    }
    catch(err){
        console.log(err);
        next(err)
    }
})

const eventModel =mongoose.models.event || mongoose.model<Event>('event',eventSchema);
export default eventModel;
