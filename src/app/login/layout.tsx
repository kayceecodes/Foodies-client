import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <header>
      <title>Login | Foodies</title>
    </header>
        <main>
          {children}
        </main>
    </>
  );
}
