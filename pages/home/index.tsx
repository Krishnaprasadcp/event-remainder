import EventComponent from "@/components/events/EventComponent";
import { fetchAllEventData } from "@/store/events-action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userDataFetch } from "@/store/user-actions";
import { NextPage } from "next";
import { getSession } from "next-auth/react";
import { Fragment, useEffect } from "react";


type EVENTDATA={
  _id:string;
  eventName:string;
  eventDescription:string;
  eventDate:string;
  eventTime:string;
  imageData:string | undefined;
  isConsecutiveYear:boolean;
  isFeatured: boolean;
 
}
interface FeaturedEvents{
  featuredEvents:EVENTDATA[];
  isFeatured: boolean;
  
};

interface PROPDATA {
  userId:string;
  data: FeaturedEvents;
  
}

const Home: NextPage<PROPDATA> = (props:PROPDATA): JSX.Element => {
  const dispatch = useAppDispatch();
  const userId = props.userId;  

  const allData = useAppSelector(state=>state.events.allEvents);
  const userData = useAppSelector(state=>state.user);
  const changed = useAppSelector(state=>state.events.isChanged);
  useEffect(()=>{
    dispatch(userDataFetch(userId))
  },[dispatch])
  useEffect(()=>{
    dispatch(fetchAllEventData(userId))
  },[dispatch,changed])
  let eventData = allData.filter(event=>event.isFeatured === true);


  return (
    <>
      <p className="font-irish text-4xl m-14">
        Welcome <span className="block">{userData.firstName} {userData.lastName}!</span>
      </p>
      <div className="flex justify-between w-full">
        <div className="w-full bg-border-orange h-0.5"></div>
        <div className="mx-9 -mt-4">
          <p className="text-3xl">
            <span className="font-lexend tracking-widest">EVENT</span>
            <span className="font-lexend">ADDER</span>
          </p>
        </div>
      </div>
      <div className="mt-3">
        {eventData.length<=0 && <div className="mb-2"><p className="text-3xl text-center">No Featured Events Added</p></div>}
        {eventData.length>0 && <div className="mb-2">
          {eventData.map((eventDetails)=>(
            <Fragment key={eventDetails._id}>
              <EventComponent eventDetails={eventDetails} />
            </Fragment>
          ))}
          </div>}
      </div>
     
    </>
  );
};
export default Home;
export const getServerSideProps = async (context: any) => {
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
    props: { userId }
  };
};
