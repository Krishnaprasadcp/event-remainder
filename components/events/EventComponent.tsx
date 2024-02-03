import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarOfDavid } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { eventSliceActions } from "@/store/events-slice";
import { starButtonProcess, unStartButtonProcess } from "@/store/events-action";

interface EventProps {
  eventDetails:{
    _id: string;
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  imageData: string | undefined;
  isConsecutiveYear: boolean;
  isFeatured: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  }
}

const EventComponent: React.FC<EventProps> = (props) => {
  const router = useRouter();
  
  const urlPath = router.pathname;
  const event = props.eventDetails;
  const dispatch =useAppDispatch();
  const isFetaurSelector = useAppSelector(state=>state.events.featuredEvents);
  // const [isFeatured, setIsFeatured] = useState<boolean>(event.isFeatured);
  const [deleteButton, setDeleteButton] = useState(false);
  // console.log(isFetaurSelector);
  const starButtonHandler = async () => {
    dispatch(starButtonProcess({id:event._id,isFeatured:event.isFeatured,userId:event.userId}));   
  };
  const unStarButtonHandler = async () => {
    
    dispatch(unStartButtonProcess({id:event._id,isFeatured:event.isFeatured,userId:event.userId}));
  };
  const eventNameClickHandler = () => {
    console.log("Clicked");
  };

  // useEffect(() => {
  //   async function deleteFunction() {
  //     if (deleteButton === true) {
  //       const eventId = event._id;
  //       console.log(eventId);

  //       const response = await fetch("http://localhost:3000/api/home/events", {
  //         method: "DELETE",
  //         body: JSON.stringify({ eventId }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (!response.ok) {
  //         console.log("Somthing went Wrong");
  //       }
  //       const deletedEvent = await response.json();
  //       console.log(deletedEvent);
  //       setDeleteButton(false);
  //       // router.reload();
  //       console.log(deleteButton);
  //     }
  //   }
  //   deleteFunction();
  // }, [deleteButton]);
  const deleteButtonHandler = async () => {
    setDeleteButton(true);
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
            src="/images/image.png"
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
              {event.isFeatured && (
                <button type="button" onClick={unStarButtonHandler}>
                  <FontAwesomeIcon icon={faStar} />
                </button>
              )}
              {!event.isFeatured && (
                <button type="button" onClick={starButtonHandler}>
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
