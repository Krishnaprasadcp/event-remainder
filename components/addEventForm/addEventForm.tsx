import React from "react";
const AddEventForm: React.FC = () => {
  return (
    <>
      <form>
        <div className="mx-20 mt-6">
          <p className="font-irish text-4xl text-border-orange">
            Welcom <div>Krishnaprasad!</div>
          </p>
        </div>
        <div className="flex justify-end mr-36 mb-3">
          <p className="text-3xl">ADD YOUR EVENT</p>
        </div>
        <div className="w-full grid justify-items-center gap-5">
          <div className="addeventdiv">
            <input
              className="addeventinput"
              type="text"
              id="eventname"
              //   ref={signUpPasswordInput}
              placeholder="Event name"
            />
          </div>
          <div className="addeventdiv">
            <textarea
              className="addeventinput"
              rows={3}
              id="eventdescription"
              //   ref={signUpPasswordInput}
              placeholder="Event Description"
            />
          </div>
          <div className="addeventdiv">
            <input
              className="addeventinput"
              type="text"
              id="date"
              //   ref={signUpPasswordInput}
              placeholder="Date"
            />
          </div>
          <div className="addeventdiv">
            <input
              className="addeventinput"
              type="text"
              id="time"
              //   ref={signUpPasswordInput}
              placeholder="Time"
            />
          </div>
          <div className="addeventdiv">
            <input
              className="addeventinput"
              type="text"
              id="image"
              //   ref={signUpPasswordInput}
              placeholder="Image"
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
              //   ref={signUpPasswordInput}
            />
          </div>
          <div className="bg-inputdivcolor rounded-md w-10/12 text-center h-8 mt-12">
            <button className="w-full" type="submit">
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddEventForm;
