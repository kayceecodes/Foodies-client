import React from "react";
import CirlclesBackground from "../ui/CirclesBackground";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <header>
      <title>Login | Foodies</title>
    </header>
      {/* <CirlclesBackground> */}
        <main>
          {children}
        </main>
      {/* </CirlclesBackground> */}
    </>
  );
}
