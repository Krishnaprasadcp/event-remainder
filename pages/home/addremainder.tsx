import AddEventForm from "@/components/addEventForm/addEventForm";
import React from "react";

const AddRemainder: React.FC = () => {
  return (
    <>
      <div className="relative ">
        <div className="absolute h-marginHeight w-full">
        <AddEventForm />
          <div className="w-2/6 right-4 bottom-16 h-0.5 absolute  bg-border-orange "></div>
          <div className="h-2/6 right-16 absolute bottom-0  w-0.5 bg-border-orange  "></div>
        </div>
      </div>
    </>
  );
};
export default AddRemainder;
