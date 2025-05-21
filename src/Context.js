'use client';
import { createContext, useEffect, useState } from "react"
import Header from "./components/Header";
import Chart from "./components/Chart";
import SignIn from "./components/SignIn";
import Video from "./components/Video";
import SignUp from "./components/SignUp";
import supabase from "./supabase/init";

export const Mycontext = createContext();

const Context = () => {
    const [isLoggedInOut, setIsLoggedInOut] = useState(false);
    const [user, setUser] = useState(null);
    const [close, setClose] = useState(false);
    const [close2, setClose2] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser(session.user);
                setIsLoggedInOut(true);
            }
        };
        checkSession();
    }, []);

    return (
        <Mycontext.Provider value={{ isLoggedInOut, setIsLoggedInOut, user, setUser, close, setClose, close2, setClose2, }}>
            <Header />
            <Video />
            <Chart key={isLoggedInOut ? 'in' : 'out'} />
            {/* {isLoggedInOut && <Chart />} */}
            {close ? <SignIn /> : false}
            {close2 ? <SignUp /> : false}
        </Mycontext.Provider>
    )
}

export default Context