import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
const AuthForm: React.FC = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<Boolean>(true);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const firstNameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const phoneNumberInput = useRef<HTMLInputElement>(null);
  const signUpEmailInput = useRef<HTMLInputElement>(null);
  const signUpPasswordInput = useRef<HTMLInputElement>(null);
  const genderInput = useRef<HTMLInputElement>(null);

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
  const signUpHandler =()=>{

  }

  return (
    <div>
      <form onSubmit={loginSubmissionHandler}>
        {isLogin && (
          <div>
            <h2>Sign In </h2>
            <div>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" ref={emailInput} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                id="password"
                ref={passwordInput}
              />
            </div>
            <button type="submit">Login</button>
          </div>
        )}
        {isLogin && (
          <button type="button" onClick={signUpButtonHandler}>
            Not a User Click here to Sign Up
          </button>
        )}
      </form>

      {!isLogin && (
        <form onSubmit={signUpHandler}>
          <div>
            <h2>Welcome to SignUp </h2>
            <div>
              <label htmlFor="FirstName">First Name</label>
              <input type="text" id="FirstName" ref={firstNameInput}/>
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" ref={lastNameInput} />
            </div>

            <div>
              <label htmlFor="age">Age</label>
              <input type="number" id="age" ref={ageInput} />
            </div>

            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="number" id="phoneNumber" ref={phoneNumberInput} />
            </div>

            <div>
              <label htmlFor="signUpEmail">Email</label>
              <input type="email" id="signUpEmail" ref={signUpEmailInput} />
            </div>

            <div>
              <label htmlFor="signUpPassword">Password</label>
              <input type="text" id="signUpPassword" ref={signUpPasswordInput} />
            </div>

            <div>
              <label htmlFor="gender">Gender</label>
              <select name="gender" id="gender">
                <option value="male" >Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <button type="submit">Sign Up</button>

            <button onClick={signInButtonHandler} type="button">
              Are you a user ? Sign In
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default AuthForm;
