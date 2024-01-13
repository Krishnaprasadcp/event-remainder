import mongoose,{Schema,Document, Date} from "mongoose";
interface Event extends Document{
    eventName:string;
    eventDiscription:string;
    date:string;
    time:string;
    image:string;
    consecutiveYear:boolean;
    createdAt:Date;
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
    }
},
{
    timestamps:true
});

const eventModel =mongoose.models.event || mongoose.model<Event>('event',eventSchema);
export default eventModel;