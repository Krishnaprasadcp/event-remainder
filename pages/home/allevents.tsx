import EventComponent from "@/components/events/EventComponent";
import EditData from "@/components/events/editEventData";
// import { fetchAllEventData } from "@/store/events-action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
// import React, { useEffect } from "react";
interface AllEvents {
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
interface NAME {
  firstName: string;
  lastName: string;
}
interface PROPS {
  userId: string;
}
const AllEvents: React.FC<PROPS> = (props: PROPS) => {
  // const dispatch = useAppDispatch();
  const eventData = useAppSelector((state) => state.events.allEvents);
  const userData = useAppSelector(state=>state.user);
  const isOpen = useAppSelector(state=>state.events.isOpen);
 console.log(eventData);
 

  const router = useRouter();
  const addEventButton = () => {
    router.push("/home/addremainder");
  };
  // useEffect(() => {
  //   dispatch(fetchAllEventData(userId));
  // }, [dispatch]);
  return (
    <>
      <div className="flex justify-between w-full mt-16 relative">
        <div className="w-2/4 mx-9 -mt-4">
          <p className="font-irish text-4xl ">
            Welcome <span className="block">{userData.firstName} {userData.lastName}</span>
          </p>
        </div>
        <div className="w-full bg-border-orange h-0.5 mt-3"></div>
      </div>
      <div className="flex justify-end mr-16 mt-3 ">
        <button
          onClick={addEventButton}
          type="button"
          className="bg-inputdivcolor rounded-md px-12"
        >
          ADD EVENTS
        </button>
      </div>
      <div className="mt-12">
        {eventData.map((eventDetails) => (
          <div key={eventDetails._id} className="mb-2">
            <EventComponent eventDetails={eventDetails} />
          </div>
        ))}
      </div>
      <div>
        {isOpen && <EditData>
          Helloo
        </EditData>}
      </div>
    </>
  );
};
export default AllEvents;

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
