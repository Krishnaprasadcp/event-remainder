import EventComponent from "@/components/events/EventComponent";
import { useRouter } from "next/router";
import React from "react";
const AllEvents: React.FC = () => {
    const router = useRouter();
    const addEventButton = ()=>{
        router.push("/home/addremainder");
    }
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
