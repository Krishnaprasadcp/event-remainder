import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, {useRef } from "react";
const AuthForm:React.FC=()=>{
    const router = useRouter();
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const loginSubmissionHandler=async (event:React.FormEvent)=>{
        event.preventDefault();
 
        const isLogin = await signIn("credentials",{
            email:emailInput.current!.value,
            password:passwordInput.current!.value,
            redirect:false
        }
        );
        if(!isLogin!.error){
        
            router.replace("/home");
        }
        
        
    }
    return(
        <form onSubmit={loginSubmissionHandler}>
        <h2>Sign In </h2>
        <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" ref={emailInput} />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="text" name="password" id="password" ref={passwordInput} />
        </div>
        <button type="submit">Login</button>
    </form>
    )
}
export default AuthForm;