'use client'
import Link from "next/link";
import { usePathname } from "next/navigation"

export const logout = async () => {
    const response = await fetch(API_BASE_URL + '/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        credentials: 'include',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to log out');
    }

    return response.json();
}

export default function Navbar () {
    const pathname = usePathname();
//    let loggedIn = 
    return (
        <div className="flex w-100 justify-between">
            <div className="flex-1">

            </div>
            <nav className="flex flex-1 justify-end pr-5">
                <Link className="flex-0 mr-5" href="/login">Login</Link>
                <Link className="flex-0 mr-5" href="/register">Sign up</Link>
                <Link className="flex-0 mr-5" onClick={() => logout()} href="/logout">Log out</Link>
            </nav> 
        </div>
    );
}