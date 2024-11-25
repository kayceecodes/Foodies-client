import React from 'react';
import CirlclesBackground from '../ui/CirclesBackground';

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <>
   {/* <CirlclesBackground> */}
        {children}
   {/* </CirlclesBackground> */}
    </>
  );
}
