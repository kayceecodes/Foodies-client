'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"
import { checkAuthentication } from "../../../../utils/auth";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Navbar () {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const {logout, user} = useAuth();
    const [displayedList, toggleDisplayedList] = useState<boolean>(false);

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await checkAuthentication();
            setIsLoggedIn(isAuth);
            console.log("User is logged in: ", isAuth);
        }
        checkAuth();
    }
        ,[user]);

    const loginLink =
        isLoggedIn || pathname === '/login' ? 
        null :
        <Link className="flex-0 mr-5 text-sm" href="/login">Login</Link>;

    const registerLink =
        pathname === '/register' ? 
        null :
        <Link className="flex-0 mr-5 text-sm" href="/register">Sign up</Link>;
    
    const AccountList =
        <div className="absolute w-8 top-0 left-0">
            <Link className="py-1 px-3" href="/dashboard">
                <div>Dashboard</div>
            </Link>
            <Link className="py-1 px-3" href="/logout">
                <div>Logout</div>
            </Link>
            <Link className="py-1 px-3" href="/switch-users">
                <div>Switch User</div>
            </Link>
        </div> 

    const accountLink = 
        isLoggedIn ?  
        <div className="flex-0 mr-5 relative" onMouseEnter={() => toggleDisplayedList(true)} onMouseLeave={() => toggleDisplayedList(false)}>
            <div>
                <FontAwesomeIcon icon={faUser} />
                {AccountList}
            </div>
        </div>
        : null;
    

    const logoutLink = 
        isLoggedIn ? 
        <Link className="flex-0 mr-5 text-sm" onClick={() => { 
            logout();
            setIsLoggedIn(false);
        }} href="/"> Logout </Link>
        : null;
    
    const dashboard =
        isLoggedIn ?
        <Link className="flex-0 mr-5 text-sm" href="/dashboard">
            Dashboard     
        </Link> 
        : null;
    
    return (
        <div className="flex w-100 justify-between">
            <div className="flex-1">

            </div>
            <nav className="flex flex-1 justify-end pr-5 mt-2">
                <Link className="flex-0 mr-5" href="/map">
                    <i className="fa-solid fa-house"></i>
                </Link>
                <Link className="flex-0 mr-5" href="/map">
                    <i className="fa-solid fa-magnifying-glass"></i>
                   <FontAwesomeIcon icon={faSearch} />
                </Link>
                
                {loginLink}
                {registerLink}
                {logoutLink}
                {accountLink}
            </nav> 
        </div>
    );
}