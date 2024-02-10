import AddEventForm from "@/components/addEventForm/addEventForm";
// import { fetchAllEventData } from "@/store/events-action";
import { eventSliceActions } from "@/store/events-slice";
import { useAppSelector } from "@/store/hooks";
import { uiSliceAction } from "@/store/ui-slice";
import { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
interface EventData {
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  imageData:{
    fileUrl:string;
  }
  isConsecutiveYear: boolean;
}
interface ERROR {
  statusCode: number;
  message: string;
}
type PROPS = {
  userId: string;
};

const AddRemainder: NextPage<PROPS> = (props) => {
  const router = useRouter();
  const userId = props.userId;
  const dispatch = useDispatch();
  const [error,setError] = useState();

  
  
  const addEventHandler = async (eventData: EventData) => {
    const response = await fetch("http://localhost:3000/api/home/addevent", {
        method: "POST",
        body: JSON.stringify({ userId, eventData }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData:ERROR = await response.json();
        console.log(errorData);
        
        dispatch(uiSliceAction.showNotification(errorData));
      }
      else{
        const returnedData = await response.json();
        console.log(eventData);
   
        const sendEventTimer =await  fetch("http://localhost:3001/triggerCorn",{
          method:"POST",
          body:JSON.stringify({eventData}),
          headers:{
            "Content-Type":"application/json"
          }
        });
        const resSendEventTimer = await sendEventTimer.json();
        console.log(resSendEventTimer);
        
        dispatch(eventSliceActions.addEvent(returnedData));
        router.push("/home/allevents");
      }
  };
  
  return (
    <>
      <div className="relative ">
        <div className="absolute h-marginHeight w-full">
          <AddEventForm onAddEvent={addEventHandler} />
          <div className="w-2/6 right-4 bottom-16 h-0.5 absolute  bg-border-orange "></div>
          <div className="h-2/6 right-16 absolute bottom-0  w-0.5 bg-border-orange  "></div>
        </div>
      </div>
    </>
  );
};
export default AddRemainder;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  const userId = session.user!.name;

  return {
    props: {
      userId,
    },
  };
};
