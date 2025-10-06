'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"
import { checkAuthentication } from "../../../../utils/auth";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Navbar () {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const {logout, user} = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await checkAuthentication();
            setIsLoggedIn(isAuth);
            console.log("User is logged in: ", isAuth);
        }
        checkAuth();
    }
        ,[user]);
    
     // Click outside functionality
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
                setIsDropdownOpen(false);
        };

        // Add event listener when dropdown is open
        if (isDropdownOpen)
            document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const loginLink =
        isLoggedIn ? 
        null :
        <Link className="flex-0 mr-5 text-sm" href="/login">Login</Link>;

    const signupLink =
        isLoggedIn ? 
        null :
        <Link className="flex-0 mr-5 text-sm" href="/sign-up">Sign up</Link>;
    
    const AccountList =
        <div className="absolute py-2 px-4 top-8 right-0 min-w-32 border-white border">
            <Link className="py-2 text-sm block" href="/dashboard">
                Dashboard
            </Link>
            <Link className="py-2 text-sm" onClick={() => { 
                logout();
                setIsLoggedIn(false);
            }} 
            href="/"> <div>Logout</div> 
            </Link>
            <Link className="py-2 text-sm block" href="/switch-users">
                Switch User
            </Link>
            <Link className="py-2 text-sm block" href="/sign-up">
                Add New User
            </Link>
        </div> 

    const toggleDropdownOpen = () => 
        setIsDropdownOpen(prev => !prev)

    const accountLink = 
        isLoggedIn ?  
        <div 
        className="flex-0 mr-5 relative cursor-pointer"
            onClick={toggleDropdownOpen}
            ref={dropdownRef}
        >
            <div>
                <FontAwesomeIcon icon={faUser} />
                {isDropdownOpen ? AccountList : null}
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
    
    return (
        <div className="flex w-100 md:max-w-screen-xl mx-auto justify-between bg-neutral-800 py-1 rounded-sm">
            <div className="flex-1">

            </div>
            <nav className="flex flex-1 md:flex-1 justify-end mt-2">
                <Link className="flex-0 mr-5" href="/map">
                    <i className="fa-solid fa-house"></i>
                </Link>
                <Link className="flex-0 mr-5" href="/map">
                    <i className="fa-solid fa-magnifying-glass"></i>
                   <FontAwesomeIcon icon={faSearch} />
                </Link> 
                {loginLink}
                {signupLink}
                {accountLink}
            </nav> 
        </div>
    );
}