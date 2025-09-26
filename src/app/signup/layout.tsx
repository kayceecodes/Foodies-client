import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <header>
      <title>Sign up | Foodies</title>
    </header>
      {/* <CirlclesBackground> */}
      <main>
        {children}
      </main>
      {/* </CirlclesBackground> */}
    </>
  );
}
