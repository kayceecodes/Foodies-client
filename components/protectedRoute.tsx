'use client'
import { ReactNode } from "react";
import { useAuth } from "../src/hooks/useAuth"
interface ProtectedRouteProps {
    children?: ReactNode;
    fallback?: ReactNode;
    requiredRole?: string;
}

export function ProtectedRoute({
    children,
    fallback = <div>Please log in to access this page.</div>,
    requiredRole,
}: ProtectedRouteProps): JSX.Element {

//    const {loading, user} = useAuth();

    //if (loading)
        //return <div>Loading...</div>;

    //if (!user)
       //return <>{fallback}</>; 

    //if (requiredRole && user.role !== requiredRole)
    //return<div>Access denied. Required role: {requiredRole}</div>

    return <>{children}</>;
}