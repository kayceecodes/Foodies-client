'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"
import { checkAuthentication, logout } from "../../../../utils/auth";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";


export default function Navbar () {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    let isAuth = false;

    useEffect(() => {
        const checkAuth = async () => {
            isAuth = await checkAuthentication();
            setIsLoggedIn(isAuth);
        }
        checkAuth();
    }
        ,[isAuth]);

    const loginLink =
        isLoggedIn || pathname === '/login' ? 
        null :
        <Link className="flex-0 mr-5" href="/login">Login</Link>;

    const registerLink =
        pathname === '/register' ? 
        null :
        <Link className="flex-0 mr-5" href="/register">Sign up</Link>;
    const accountLink = 
        isLoggedIn ?  
        <Link className="flex-0 mr-5" href="/dashboard">Account</Link>
        : null;
        
    const logoutLink = 
        isLoggedIn ? 
        <Link className="flex-0 mr-5" onClick={() => logout()} href="/">Log out</Link>
        : null;

    return (
        <div className="flex w-100 justify-between">
            <div className="flex-1">

            </div>
            <nav className="flex flex-1 justify-end pr-5">
                <Link className="flex-0 mr-5" href="/map">
                    <i className="fa-solid fa-house"></i>
                </Link>
                <Link className="flex-0 mr-5" href="/map">
                    <i className="fa-solid fa-magnifying-glass"></i>Search
                </Link>
                
                {loginLink}
                {accountLink}
                {registerLink}
                {logoutLink}
            </nav> 
        </div>
    );
}