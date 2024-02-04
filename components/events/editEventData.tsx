import { eventSliceActions } from "@/store/events-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ReactDom from "react-dom";
interface ChildProps {
  children: React.ReactNode;
}
const EditData: React.FC<ChildProps> = ({ children }) => {
  const isOpen = useAppSelector((state) => state.events.isOpen);
  const disatch = useAppDispatch();
  console.log(isOpen);

  if (isOpen === false) {
    return null;
  }
  const formSubmitHandler=()=>{
    disatch(eventSliceActions.editEvent());
  }
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
                //   ref={eventNameInputRef}
                placeholder="Event name"
              />
            </div>
            <div className="addeventdiv">
              <textarea
                className="addeventinput"
                rows={3}
                id="eventdescription"
                //   ref={eventDescriptionInputRef}
                placeholder="Event Description"
              />
            </div>
            <div className="addeventdiv">
              <input
                className="addeventinput"
                type="date"
                id="date"
                //   ref={eventDateInputRef}
                placeholder="Date"
              />
            </div>
            <div className="addeventdiv">
              <input
                className="addeventinput"
                type="time"
                id="time"
                //   ref={eventTimeInputRef}
                placeholder="Time"
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
                //   onChange={consecutiveYaerCheckBoxHandler}
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
