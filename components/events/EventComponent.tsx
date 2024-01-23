import Image from "next/image";
import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarOfDavid } from "@fortawesome/free-solid-svg-icons";
const EventComponent: React.FC = () => {
    const [isFeatured,setIsFeatured] = useState<boolean>(false);
    const starButtonHandler=()=>{
        console.log("startbutton Clicked");
        
        setIsFeatured((prevState)=>!prevState);
    }
    const unStarButtonHandler=()=>{
        setIsFeatured((prevState)=>!prevState);
        console.log("unstartbutton Clicked");
    }
    const eventNameClickHandler=()=>{
        console.log("Clicked");
        
    }
    const deleteButtonHandler=()=>{
        console.log("deleted");
        
    }
  return (
    <Fragment>
      <div className="border border-red-300 grid grid-rows-1 grid-flow-col ml-5 mr-12">
        <div className="row-start-1 p-3">
          <Image
            className="border border-border-orange"
            src="/"
            width={180}
            height={200}
            alt="event-image"
          />
        </div>
        <div className="grid grid-rows-3 grid-flow-col">
          <div onClick={eventNameClickHandler} className="row-start-1 row-span-3 mt-2">
            <p className="text-2xl">Event name</p>
          </div>
          <div className="flex row-start-3  place-self-end m-3">
            <div className="mr-6">
              <button type="button" onClick={deleteButtonHandler}><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
            <div className="mr-3">
                {isFeatured && <button type="button" onClick={starButtonHandler}><FontAwesomeIcon icon={faStar} /></button>}
                {!isFeatured && <button type="button" onClick={unStarButtonHandler}> <FontAwesomeIcon icon={faStarOfDavid} /></button> }
             
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default EventComponent;
