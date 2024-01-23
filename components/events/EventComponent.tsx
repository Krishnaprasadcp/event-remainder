import Image from "next/image";
import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarOfDavid } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
const EventComponent: React.FC = () => {
  const router = useRouter();
  const urlPath = router.pathname;
  console.log(urlPath);

  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const starButtonHandler = () => {
    console.log("startbutton Clicked");

    setIsFeatured((prevState) => !prevState);
  };
  const unStarButtonHandler = () => {
    setIsFeatured((prevState) => !prevState);
    console.log("unstartbutton Clicked");
  };
  const eventNameClickHandler = () => {
    console.log("Clicked");
  };
  const deleteButtonHandler = () => {
    console.log("deleted");
  };
  const bgColor = urlPath==="/home" ? "bg-zinc-900":"bg-yellow-600";
  
  return (
    <Fragment>
      <div className={`${bgColor}  border border-red-300 grid grid-rows-1 grid-flow-col ml-5 mr-12 mb-4 rounded-lg`}>
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
            <p className="w-fit text-2xl cursor-pointer hover:text-hoverText ">
              Event name
            </p>
          </div>
          <div className="flex row-start-3  place-self-end m-3">
            {urlPath=="/home/allevents" && <div className="mr-6">
              <button type="button">
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </div>}
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
