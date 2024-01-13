import mongoose,{Schema,Document, Date} from "mongoose";
interface Event extends Document{
    eventName:string;
    eventDiscription:string;
    date:string;
    time:string;
    image:string;
    consecutiveYear:boolean;
    createdAt:Date;
    isFeatured:boolean;
    userId:string;
}
const eventSchema=new Schema<Event>({
    eventName:{
        type:String,
        required:true
    },
    eventDiscription:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    consecutiveYear:{
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