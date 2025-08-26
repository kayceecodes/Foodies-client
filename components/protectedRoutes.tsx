import { ReactNode } from "react";

interface ProtectedRouteProps {
    children?: ReactNode;
    fallback?: ReactNode;
    requiredRole: string;
}

export function ProtectedRoutes({
    children,
    fallback = <div>Please log in to access this page.</div>,
    requiredRole,
}: ProtectedRouteProps): JSX.Element {

   const {loading, user} = useAuth();

    return <></>;
}