import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
interface ERROR {
  statuscode: number;
  message: string;
}
const AuthForm: React.FC = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<Boolean>(true);
  const [genderSelection, setGenderSelection] = useState<string>("male");
  const [error, setError] = useState<ERROR>();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const firstNameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const phoneNumberInput = useRef<HTMLInputElement>(null);
  const signUpEmailInput = useRef<HTMLInputElement>(null);
  const signUpPasswordInput = useRef<HTMLInputElement>(null);
  const signUpReEnterPasswordInput = useRef<HTMLInputElement>(null);

  const [uploadImageData, setImageData] = useState<File | undefined>(undefined);
  const signUpButtonHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const signInButtonHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const loginSubmissionHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const isLogin = await signIn("credentials", {
      email: emailInput.current!.value,
      password: passwordInput.current!.value,
      redirect: false,
    });
    if (!isLogin!.error) {
      router.replace("/home");
    }
  };
  const imageFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageData(file);
  };
  const signUpHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const firstName = firstNameInput.current!.value;
    const lastName = lastNameInput.current!.value;
    const rawAge = ageInput.current!.value;
    const age = parseInt(rawAge);
    const phoneNumber = phoneNumberInput.current!.value;
    const email = signUpEmailInput.current!.value;
    const password = signUpPasswordInput.current!.value;

    const sendImageData = new FormData();
    sendImageData.append('file',uploadImageData ?? '');
    const imgResponse = await fetch("/api/home/imageUpload",{
      method:"POST",
      body:sendImageData
    });
    if(!imgResponse.ok){
      console.log("errroe");
      
    }
    const returndimageData = await imgResponse.json();
    const userData = {
      firstName,
      lastName,
      age,
      phoneNumber,
      imageData:returndimageData.fileUrl,
      email,
      password,
      gender: genderSelection,
    };
    console.log(userData);
    
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const message = response.json();
      console.log(message);

      setError({ statuscode: response.status, message: "error" });
      console.log(response.status);
    } else {
      const data = await response.json();
      const isLogin = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (!isLogin!.error) {
        router.replace("/home");
      }
    }
  };


  const genderSelectionHandler = (
    event: React.FormEvent<HTMLSelectElement>
  ) => {
    const value = event.currentTarget.value;
    setGenderSelection(value);
  };

  return (
    <div>
      <form onSubmit={loginSubmissionHandler}>
        {isLogin && (
          <div className="linecontainer ">
            <div className="flex flex-col justify-between absolute  w-full h-screen">
              <div className="flex justify-between mt-24">
                <div className="w-1/3 h-0.5  bg-border-orange"></div>
                <p className="text-3xl -mt-4">
                  <span className="font-lexend tracking-widest">EVENT</span>{" "}
                  <span className="font-julius tracking-wider font-thin">
                    ADDER
                  </span>
                </p>
                <div className="w-1/3 h-0.5 bg-border-orange "></div>
              </div>
              <div className=" grid grid-cols-1 place-items-center -mt-64 w-full gap-8">
                <h2 className="text-border-orange text-3xl font-light">
                  LOGIN
                </h2>
                <div className="emailinput">
                  <input
                    className="inputdiv"
                    type="text"
                    name="email"
                    id="email"
                    ref={emailInput}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="passwordinput">
                  <input
                    className="inputdiv"
                    type="text"
                    name="password"
                    id="password"
                    ref={passwordInput}
                    placeholder="Enter your password"
                  />
                </div>
                <div className="rounded-md border border-border-orange w-2/5 h-9">
                  <button className=" w-full text-start px-3" type="button">
                    Login with google
                  </button>
                </div>

                {isLogin && (
                  <div className="grid grid-cols-2  gap-5 w-1/3 h-9">
                    <button
                      type="submit"
                      className="border border-border-orange rounded-full"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className="border border-border-orange rounded-full "
                      onClick={signUpButtonHandler}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
              <div className="h-0.5 mb-24 bg-border-orange"></div>
            </div>
            <div className="h-screen w-0.5  bg-border-orange absolute right-44"></div>
          </div>
        )}
      </form>

      {!isLogin && (
        <form onSubmit={signUpHandler}>
          <div className="linecontainer ">
            <div className="flex flex-col justify-between absolute  w-full h-screen">
              <div className="flex justify-start mt-24">
                <div className="w-1/3 h-0.5  bg-border-orange"></div>
                <p className="text-3xl -mt-4 mx-9">
                  <span className="font-lexend tracking-widest">SIGN</span>{" "}
                  <span className="font-lexend tracking-widest">UP</span>
                </p>
              </div>
              <div className=" grid grid-cols-1 place-items-center  w-full gap-8 -mt-16">
                <div className="passwordinput">
                  <input
                    className="signupdiv"
                    type="text"
                    id="FirstName"
                    ref={firstNameInput}
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="passwordinput">
                  <input
                    className="signupdiv"
                    type="text"
                    id="lastName"
                    ref={lastNameInput}
                    placeholder="Last Name"
                  />
                </div>

                <div className="passwordinput">
                  <input
                    className="signupdiv"
                    type="text"
                    id="age"
                    ref={ageInput}
                    placeholder="Age"
                  />
                </div>

                <div className="passwordinput">
                  <input
                    className="signupdiv"
                    type="text"
                    id="phoneNumber"
                    ref={phoneNumberInput}
                    placeholder="Phone Number"
                  />
                </div>
                <div className="passwordinput">
                  <input
                    className="signupdiv"
                    type="file"
                    onChange={imageFileHandler}
                  />
                </div>
                <div className="passwordinput">
                  <input
                    className="signupdiv"
                    type="email"
                    id="signUpEmail"
                    ref={signUpEmailInput}
                    placeholder="Email"
                  />
                </div>

                <div className="passwordinput">
                  <input
                    className="signupdiv"
                    type="text"
                    id="signUpPassword"
                    ref={signUpPasswordInput}
                    placeholder="Password"
                  />
                </div>

                <div className="passwordinput">
                  <input
                    className="signupdiv"
                    type="text"
                    id="signUpReEnteredPassword"
                    ref={signUpReEnterPasswordInput}
                    placeholder="Re-enter the password"
                  />
                </div>

                <div className="border border-zinc-50 rounded-md w-2/5 h-8">
                  <label className="p-4" htmlFor="gender">
                    Gender
                  </label>
                  <select
                    className="bg-black border-none focus:border-none outline-none"
                    name="gender"
                    value={genderSelection}
                    onChange={genderSelectionHandler}
                    id="gender"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 mt-5  gap-4 w-1/3 h-9">
                  <button
                    className="border border-border-orange rounded-full"
                    type="submit"
                  >
                    Sign Up
                  </button>

                  <button
                    className="border border-border-orange rounded-full "
                    onClick={signInButtonHandler}
                    type="button"
                  >
                    Are you a user ? Sign In
                  </button>
                </div>
              </div>
            </div>
            <div className="h-screen w-0.5  bg-border-orange absolute right-44"></div>
          </div>
        </form>
      )}
      {<p>{error?.statuscode}</p>}
    </div>
  );
};
export default AuthForm;
