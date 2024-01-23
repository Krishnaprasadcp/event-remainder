import React,{useRef, useState} from "react";
const AddEventForm: React.FC = (props) => {
    const eventNameInputRef = useRef<HTMLInputElement>(null);
    const eventDescriptionInputRef=useRef<HTMLTextAreaElement>(null);
    const eventDateInputRef=useRef<HTMLInputElement>(null);
    const eventTimeInputRef=useRef<HTMLInputElement>(null);
    
    
    const [imageData,setImageData] = useState<string | undefined>();
    const [isConsecutiveYear,setConsecutiveYear] = useState(false);
    const formSubmitHandler=(event:React.FormEvent)=>{
        event.preventDefault();
        const eventName = eventNameInputRef.current?.value;
        const eventDescription = eventDescriptionInputRef.current?.value;
        const eventDate = eventDateInputRef.current?.value;
        const eventTime = eventTimeInputRef.current?.value;
        
        const eventData={
            eventName,
            eventDescription,
            eventDate,
            eventTime,
            imageData,
            isConsecutiveYear
        };

        
    }
    const convertToBase64=(event:React.ChangeEvent<HTMLInputElement>)=>{
       
        let reader = new FileReader();
        if(event.target.files && event.target.files.length>0){
            reader.readAsDataURL(event.target.files[0]);
            reader.onload=()=>{
                setImageData(reader.result as string)
                 
            };
            reader.onerror = error=>{
                console.log("Error",error);
                
            }
        }
       
    }
    const consecutiveYaerCheckBoxHandler = ()=>{
        setConsecutiveYear((prevState)=>!prevState);
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
              accept="image/*"
              type="file"
              id="image"
               
              
              onChange={convertToBase64}
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
            <button className="w-full" type="submit">
              SUBMIT
            </button>
          </div>
        </div>
      </form>
      
    </div>
  );
};
export default AddEventForm;
{/* <div>
        {imageData=="" || imageData==undefined ?"":<img src={imageData} alt="image" width={200} height={200} />}
      </div> */}