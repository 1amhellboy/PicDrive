"use client";

import {useState} from "react";
import {registerUser,loginUser} from "@/lib/api";

export default function Hero(){
    const [loading, setLoading] = useState(false);

    // This is a function that will run when a "Sign Up" button is clicked.
    const handleSignup = async () =>{
        try{
            setLoading(true);
            const result = await registerUser("test@example.com","password123","gas");
            console.log("Registered",result);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    // This is a function that will run when a "Login" button is clicked.
    const handleLogin = async () => {
        try{
            setLoading(true);
            const result = await loginUser("test@example.com", "password123");
            console.log("Logged in!", result);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleSignup} disabled={loading}>Sign Up</button>
            <button onClick={handleLogin} disabled={loading}>Login</button>
        </div>
    );
}


// Hero.tsx (React component UI)
//    ↪ calls → api.ts functions (registerUser, loginUser)
//       ↪ talks to → Your Express.js Backend (Node, NeonDB, etc.)
//          ↪ handles → JWT token creation, DB storage
