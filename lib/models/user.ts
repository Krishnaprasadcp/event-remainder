import mongoose,{Schema, Document} from "mongoose";
interface User extends Document{
    firstName:string,
    lastName:string,
    age:number,
    phoneNumber:string,
    imageData:string|undefined,
    email:string,
    password:string,
    gender:string,
    
    events:mongoose.Schema.Types.ObjectId[];
};
const userSchema = new Schema<User>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    imageData:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    events:[{type:mongoose.Schema.Types.ObjectId,ref:'event'}]
   
},
{timestamps:true}
);
const UserModel =mongoose.models.User|| mongoose.model<User>('User',userSchema);
export default UserModel;
