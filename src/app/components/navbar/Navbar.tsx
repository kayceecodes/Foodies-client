'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"
import { checkAuthentication } from "../../../../utils/auth";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../hooks/useAuth";
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
 
    const AccountLinksList =
        <div className="absolute py-2 px-4 top-8 right-0 min-w-32 border-stone-700 border-[0.9px] bg-neutral-800 rounded-md border">
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
        </div> 

    const toggleDropdownOpen = () => 
        setIsDropdownOpen(prev => !prev)

    const accountLinksList = 
        isLoggedIn ?  
        <div 
        className="relative flex-0 mr-2 z-1 md:mr-3 cursor-pointer"
            onClick={toggleDropdownOpen}
            ref={dropdownRef}
        >
            <div>
                <FontAwesomeIcon icon={faUser} />
                {isDropdownOpen ? AccountLinksList : null}
            </div>
        </div>
        : null; 
    
    return (
        <nav className="flex w-full justify-between border-b-stone-700 border-b-[0.9px] bg-neutral-800 py-2">
            <div className="flex-1">

            </div>
            <div className="flex flex-1 justify-end">
                {/* <Link className="flex-0 mr-5" href="/map">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <FontAwesomeIcon icon={faSearch} />
                </Link>  */}
                {isLoggedIn ? null :
                    <Link className="grow-0 w-fit pt-0.5 mr-5 text-md" href="/login">
                        Login
                    </Link>}
                <Link className="grow-0 w-fit pt-0.5 mr-5 text-md" href="/sign-up">
                    Sign up
                </Link>
                {accountLinksList}
            </div> 
        </nav>
    );
}