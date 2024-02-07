import { AppDispatch } from ".";
import { userSliceAction } from "./userSlice";

export const userDataFetch = (userId: string) => {
  return async (dispatch: AppDispatch) => {
    const fetchUserData = async () => {
      const response = await fetch("http://localhost:3000/api/home/profile", {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Cant fetch the data");
      }
      const userData = await response.json();
      return userData;
    };
    try {
      const response = await fetchUserData();
      dispatch(userSliceAction.userData(response));
    } catch (error) {
      console.log(error);
    }
  };
};
