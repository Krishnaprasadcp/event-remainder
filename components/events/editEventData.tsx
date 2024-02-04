import { eventSliceActions } from "@/store/events-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ReactDom from "react-dom";
import React, { useRef, useState } from "react";
import { editEventForm } from "@/store/events-action";
interface ChildProps {
  children: React.ReactNode;
}
const EditData: React.FC<ChildProps> = ({ children }) => {
   
  const events = useAppSelector(state=>state.events.allEvents);  
  const eventIds = useAppSelector((state) => state.events.editEvent);
  const editEvent = events.find(item=>item._id === eventIds.id);
  

  const [eventUpdateName,setEventUpdateName] = useState(editEvent?.eventName);
  const [eventUpdateDescription,setEventUpdateDescription] = useState(editEvent?.eventDescription);
  const [eventUpdateDate,setEventUpdateDate] = useState(editEvent?.eventDate);
  const [eventUpdateTime,setEventUpdateTime] = useState(editEvent?.eventTime);
  const [isConsecutiveYear, setConsecutiveYear] = useState(editEvent?.isConsecutiveYear);

  const isOpen = useAppSelector((state) => state.events.isOpen);

  const disatch = useAppDispatch();

  if (isOpen === false) {
    return null;
  }
  const consecutiveYaerCheckBoxHandler = () => {
    setConsecutiveYear((prevState) => !prevState);
  };
  const editEventNameHanlder=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setEventUpdateName(e.target.value);
  }
  const editEventDescriptionHandler =(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setEventUpdateDescription(e.target.value);
  }
  const editEventDateHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setEventUpdateDate(e.target.value);
  }
  const editEventTimeHanlder=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setEventUpdateTime(e.target.value);
  }
  const formSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const updatedEvent = {
      eventName:eventUpdateName,
      eventDescription:eventUpdateDescription,
      eventDate:eventUpdateDate,
      eventTime:eventUpdateTime,
      isConsecutiveYear,
    };

    console.log(eventIds);
    
    
    const response = await fetch("http://localhost:3000/api/home/events", {
      method: "PATCH",
      body: JSON.stringify({updatedEvent,eventIds}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(!response.ok){
        console.log("error");
        
    }
    const updatedData = await response.json();
    console.log(updatedData);
    disatch(eventSliceActions.editEventData(updatedData));
    disatch(eventSliceActions.editEvent());
  };

  const RenderElement = (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0  z-1000 overlayColor" />
      <div className="z-1000 p-14 border border-red-400 fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <form onSubmit={formSubmitHandler}>
          <div className="addeventdiv">
            <input
              className="addeventinput "
              type="text"
              id="eventname"
              value={eventUpdateName}
              onChange={editEventNameHanlder}
            />
          </div>
          <div className="addeventdiv">
            <textarea
              className="addeventinput"
              rows={3}
              id="eventdescription"
              onChange={editEventDescriptionHandler}
              value={eventUpdateDescription}
            />
          </div>
          <div className="addeventdiv">
            <input
              className="addeventinput"
              type="date"
              id="date"
              value={eventUpdateDate}
              onChange={editEventDateHandler}
           
            />
          </div>
          <div className="addeventdiv">
            <input
              className="addeventinput"
              type="time"
              id="time"
              value={eventUpdateTime}
              onChange={editEventTimeHanlder}
   
            />
          </div>

          <div className="border border-zinc-50 w-10/12 rounded-md h-9">
            <label className="p-4" htmlFor="consecutiveyear">
              Consecutive Year
            </label>
            <input
              className="mt-2"
              type="checkbox"
              id="consecutiveyear"
    
              onChange={consecutiveYaerCheckBoxHandler}
            />
          </div>
          <button type="submit">Update</button>
        </form>
        {children}
      </div>
    </>
  );
  return ReactDom.createPortal(
    RenderElement,
    document.getElementById("editPortal")!
  );
};
export default EditData;
