'use client'
import { useState, CSSProperties } from "react";
import { PropagateLoader } from "react-spinners";


export default function Loader() {

  return (
    <div className="">
      <PropagateLoader
        loading={true}
        size={6}
        speedMultiplier={1.7}
        color="#7e9ab35e"
        aria-label="Pulse Loader"
        data-testid="loader"
      />
    </div>
  );
}
