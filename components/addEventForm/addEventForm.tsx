import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { uiSliceAction } from "@/store/ui-slice";
import { CldUploadButton } from "next-cloudinary";
import React, { useRef, useState } from "react";
import ErrorNotification from "../errorHandler/errorNotification";

type EventData = {
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  imageData: any;
  isConsecutiveYear: boolean;
};
type NewEventProps = {
  onAddEvent: (eventData: EventData) => void;
};

const AddEventForm: React.FC<NewEventProps> = (props) => {
  const eventNameInputRef = useRef<HTMLInputElement>(null);
  const eventDescriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const eventDateInputRef = useRef<HTMLInputElement>(null);
  const eventTimeInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const [uploadImageData, setImageData] = useState<File | undefined>(undefined);
  const [isConsecutiveYear, setConsecutiveYear] = useState(false);
  const formSubmitHandler = async(event: React.FormEvent) => {
    event.preventDefault();
  
    
    const eventName = eventNameInputRef.current!.value;
    const eventDescription = eventDescriptionInputRef.current!.value;
    const eventDate = eventDateInputRef.current!.value;
    const eventTime = eventTimeInputRef.current!.value;
    console.log(uploadImageData);
    if(uploadImageData === undefined){
      const eventData: EventData = {
        eventName,
        eventDescription,
        eventDate,
        eventTime,
        imageData:{fileUrl:"/images/image.png"},
        isConsecutiveYear,
      };
      console.log(eventData);
      
      props.onAddEvent(eventData);
    }
    else{
      const sendImageData = new FormData();
      sendImageData.append('file',uploadImageData ?? '');
      const response = await fetch("/api/home/imageUpload",{
        method:"POST",
        body:sendImageData
      });
      if(!response.ok){
        console.log("errroe");
        
      }
      const imageData = await response.json();
      const eventData: EventData = {
        eventName,
        eventDescription,
        eventDate,
        eventTime,
        imageData,
        isConsecutiveYear,
      };
      props.onAddEvent(eventData);
    }
    
   
    
    
  };
  const imageFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageData(file);
  };
  const consecutiveYaerCheckBoxHandler = () => {
    setConsecutiveYear((prevState) => !prevState);
  };

  const errorClearer =()=>{

    dispatch(uiSliceAction.showNotification({message:"",statusCode:null}));
  }
  return (
    <div className=" w-full">
      <form onSubmit={formSubmitHandler}>
        <div className="mx-20 mt-6">
          <p className="font-irish text-4xl text-border-orange">
            Welcom <span className="block">Krishnaprasad!</span>
          </p>
        </div>
        <div className="flex justify-end mr-36 mb-3">
          <p className="text-3xl">ADD YOUR EVENT</p>
        </div>
        <div className="w-full grid justify-items-center gap-5 ">
          <div className="addeventdiv">
            <input
              className="addeventinput "
              type="text"
              id="eventname"
              ref={eventNameInputRef}
              placeholder="Event name"
            />
                
          </div>
          <div className="addeventdiv">
            <textarea
              className="addeventinput"
              rows={3}
              id="eventdescription"
              ref={eventDescriptionInputRef}
              placeholder="Event Description"
            />
          </div>
          <div className="addeventdiv">
            <input
              className="addeventinput"
              type="date"
              id="date"
              ref={eventDateInputRef}
              placeholder="Date"
            />
          </div>
          <div className="addeventdiv">
            <input
              className="addeventinput"
              type="time"
              id="time"
              ref={eventTimeInputRef}
              placeholder="Time"
            />
          </div>
          <div className="addeventdiv">
            <input
              className="addeventinput"
              type="file"

              onChange={imageFileHandler}
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
          <div className="bg-inputdivcolor rounded-md w-10/12 text-center h-8 mt-12">
            <button onClick={errorClearer} className="w-full" type="submit">
              SUBMIT
            </button>
          </div>
        </div>
        <ErrorNotification />
      </form>
     
    </div>
  );
};
export default AddEventForm;

