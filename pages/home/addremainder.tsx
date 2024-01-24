import AddEventForm from "@/components/addEventForm/addEventForm";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
interface EventData{
  eventName:string;
  eventDescription:string;
  eventDate:string;
  eventTime:string;
  imageData:string | undefined;
  isConsecutiveYear:boolean;
  
}
interface ERROR {
  statusCode: number;
  message: string;
}
type PROPS={
  userId:string;
}
type DataProps={
  eventData:EventData|undefined;
  userId:string;
}
const AddRemainder: React.FC<PROPS>= (props) => {
  const router = useRouter();
  const [error,setError] = useState<ERROR>();
  const addEventHandler =async (eventData:EventData)=>{

    const data = {
      eventData,
      userId:props.userId
    }

    const response = await fetch("/api/home/addevent",{
      method:"POST",
      body:JSON.stringify({data}),
      headers:{
        "Content-Type":"application/json"
      }
    });
    if(!response.ok){
      const errorMessage =await response.json();
      setError({statusCode:response.status,message:"Cant enter event"})
    }
    router.push("/home/allevents");
  }
    
  

  
  return (
    <>
      <div className="relative ">
        <div className="absolute h-marginHeight w-full">
        <AddEventForm onAddEvent={addEventHandler}/>
          <div className="w-2/6 right-4 bottom-16 h-0.5 absolute  bg-border-orange "></div>
          <div className="h-2/6 right-16 absolute bottom-0  w-0.5 bg-border-orange  "></div>
        </div>
      </div>
    </>
  );
};
export default AddRemainder;

export const getServerSideProps = async (context:GetServerSidePropsContext)=>{
  const session = await getSession({req:context.req});
  if(!session){
    return{
      redirect:{
        destination:"/signin",
        permanent:false
      }
    };
  }
  const email = session.user!.email;
  const response  = await fetch("http://localhost:3000/api/home/profile",{
    method:"POST",
    body:JSON.stringify({email}),
    headers:{
      "Content-Type":"application/json"
    }
  });
  if(!response.ok){
    console.log("Not find an email");
    
  }
  const returnedData = await response.json();
  const userId = returnedData._id;
  
  return{
    props:{
      userId
    }
  };
}