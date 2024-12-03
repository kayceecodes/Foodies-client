import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <title>Map | Foodies</title>
      </header>
      {/* <CirlclesBackground> */}
      <main>
        {children}
      </main>
      {/* </CirlclesBackground> */}
    </>
  );
}
