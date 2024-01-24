import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarOfDavid } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";


interface EventProps {
  eventDetails: {
    _id: string;
    eventName: string;
    eventDescription: string;
    eventDate: string;
    eventTime: string;
    imageData: string | undefined;
    isConsecutiveYear: boolean;
    isFeatured:boolean;
  };
}

const EventComponent: React.FC<EventProps> = (props) => {
  const router = useRouter();
  const urlPath = router.pathname;
  const event = props.eventDetails;
  const [isFeatured, setIsFeatured] = useState<boolean>(event.isFeatured);
  
console.log({isFeatured,useState:"useState"});

  const convertFeaturedEvent = async () => {
    const querry = {
      userId: event._id,
      isFeatured:isFeatured,
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/home/featuredEvent",
        {
          method: "PATCH",
          body: JSON.stringify({ querry }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.log("Cant update");
      }
      const data = await response.json();
      setIsFeatured(data.isFeatured);
      console.log({isFeatured,functiom:"function"});
    } catch (error) {
      console.log("Update error");
    }
  };
  


  const starButtonHandler = async () => {
    await convertFeaturedEvent();
    // setIsFeatured((prevState) => !prevState);
    
  };
  const unStarButtonHandler = async () => {
    // setIsFeatured((prevState) => !prevState);
    await convertFeaturedEvent();
  };
  const eventNameClickHandler = () => {
    console.log("Clicked");
  };
  const deleteButtonHandler = () => {
    console.log("deleted");
  };
  const bgColor = urlPath === "/home" ? "bg-zinc-900" : "bg-yellow-600";

  return (
    <Fragment>
      <div
        className={`${bgColor}  border border-red-300 grid grid-rows-1 grid-flow-col ml-5 mr-12 mb-4 rounded-lg`}
      >
        <div className="row-start-1 p-4">
          <Image
            className="border border-border-orange cursor-pointer hover:w-hoverImageWidth focus:h-24"
            src={`${event.imageData}`}
            width={180}
            height={200}
            alt="event-image"
          />
        </div>
        <div className="grid grid-rows-3 grid-flow-col">
          <div
            onClick={eventNameClickHandler}
            className="row-start-1 row-span-3 mt-2 "
          >
            <p className="w-fit  text-2xl cursor-pointer hover:text-hoverText ">
              {event.eventName}
            </p>
            <div>
              <p className="w-full text-xl mt-5">{event.eventDescription}</p>
            </div>
          </div>
          <div className="flex row-start-3  place-self-end m-3">
            {urlPath == "/home/allevents" && (
              <div className="mr-6">
                <button type="button">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              </div>
            )}
            <div className="mr-6">
              <button type="button" onClick={deleteButtonHandler}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
            <div className="mr-3">
              {isFeatured && (
                <button type="button" onClick={starButtonHandler}>
                  <FontAwesomeIcon icon={faStar} />
                </button>
              )}
              {!isFeatured && (
                <button type="button" onClick={unStarButtonHandler}>
                  {" "}
                  <FontAwesomeIcon icon={faStarOfDavid} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default EventComponent;
