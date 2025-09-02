'use client'
import Link from "next/link";
import { usePathname } from "next/navigation"
import { logout } from "../../../../utils/auth";
import { useState } from "react";


export default function Navbar () {
    const [isLoggedIn, setIsLoggedIn] = useState();
    const pathname = usePathname();

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
        <Link className="flex-0 mr-5" onClick={() => logout()} href="/logout">Log out</Link>
        : null;

    return (
        <div className="flex w-100 justify-between">
            <div className="flex-1">

            </div>
            <nav className="flex flex-1 justify-end pr-5">
                <Link className="flex-0 mr-5" href="/map">
                    <i className="">Search</i>
                </Link>
                {loginLink}
                {accountLink}
                {registerLink}
                {logoutLink}
            </nav> 
        </div>
    );
}