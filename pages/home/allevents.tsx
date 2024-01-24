import EventComponent from "@/components/events/EventComponent";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
interface AllEvents{
  _id:string;
  eventName:string;
  eventDescription:string;
  eventDate:string;
  eventTime:string;
  imageData:string | undefined;
  isConsecutiveYear:boolean;
}[];
interface NAME{
  firstName:string;
  lastName:string;
}
interface PROPS{
 allEvents:AllEvents;
 name:NAME;
}
const AllEvents: React.FC<PROPS>= (props:PROPS) => {
  
    const router = useRouter();
    const addEventButton = ()=>{
        router.push("/home/addremainder");
    }
    const allEvents = props.allEvents;
    console.log(allEvents[0]);
    const userProfile = props.name;
    console.log(userProfile);
    
    
  return (
    <>
      <div className="flex justify-between w-full mt-16 relative">
        <div className="mx-9 -mt-4">
          <p className="font-irish text-4xl ">
            Welcom <span className="block">Krishnaprasad!</span>
          </p>
        </div>
        <div className="w-full bg-border-orange h-0.5 mt-3"></div>
      </div>
      <div className="flex justify-end mr-16 mt-3 ">
        <button onClick={addEventButton} type="button" className="bg-inputdivcolor rounded-md px-12">ADD EVENTS</button>
      </div>
      <div className="mt-12">
        <div className="mb-2">
          <EventComponent />
          <EventComponent />
          <EventComponent />
        </div>
      </div>
    </>
  );
};
export default AllEvents;

export const getServerSideProps = async (context:GetServerSidePropsContext)=>{

  const session = await getSession({req:context.req});
  if(!session){
    return{
      redirect:{
        destination:"/signin",
        permanent:false
      }
    }
  };
  const email = session.user!.email;
  console.log(email);
  

  const fetchedResponse:Response = await fetch("http://localhost:3000/api/home/getUserId",{
    method:"POST",
    body:JSON.stringify({email}),
    headers:{
      "Content-Type":"application/json"
    }
  });
  if(!fetchedResponse.ok){
    console.log("Error");
    
  }
  const {userId,firstName,lastName} = await fetchedResponse.json();
  const name = {firstName,lastName};
  
  const fetchedEventsresponse:Response = await fetch("http://localhost:3000/api/home/events",{
    method:"POST",
    body:JSON.stringify({userId}),
    headers:{
      "Content-Type":"application/json"
    }
  });
  if(!fetchedResponse.ok){
    console.log("Error");
    
  }
  const allEvents = await fetchedEventsresponse.json();  
  return{
    props:{
      allEvents,
      name
    }
  };
}