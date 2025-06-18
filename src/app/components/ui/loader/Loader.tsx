import { useState, CSSProperties } from "react";
import { PropagateLoader } from "react-spinners";


export default function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div className="">
      <PropagateLoader
        loading={loading}
        size={6}
        speedMultiplier={1.7}
        color="#7e9ab35e"
        aria-label="Pulse Loader"
        data-testid="loader"
      />
    </div>
  );
}
