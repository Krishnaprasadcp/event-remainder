import mongoose,{Schema,Document, Date} from "mongoose";
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

const eventModel =mongoose.models.event || mongoose.model<Event>('event',eventSchema);
export default eventModel;