import React from 'react';
import { AuthProvider } from '../../hooks/useAuth'

interface AuthenticatedProps {
    children: React.ReactNode
}

function layout({children}: AuthenticatedProps) {
  return (
    <div>
     {/* <AuthProvider> */}
        {children}
     {/* </AuthProvider>  */}
    </div>
  );
}

export default layout;
