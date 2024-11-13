'use client';

import { addOne } from '@/redux/slices/counterSlice';
import store from '@/redux/store';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';

// export async function getServerSideProps() {
//   const res = await fetch('https://localhost:');
//   const data = await res.json();


//   return {
//     props: {
//       properties: data.items,
//       // properties: JSON.parse(JSON.stringify(data.properties))
//     },
//   }
// }

// const GetBusinesses = async () => {
//   let response = await fetch("https://localhost:5155/api/businesses/location/Baltimore, MD");
//   let data = response.json();

//   return data;
// }

export default function MapPage() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('http://localhost:5155/api/businesses/location/NewYork')
    .then(response => response.json())
    .then(data => setData(data))
    .then(data => console.log("Data: ", data))
    .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  return (
          <div>
            <Head>
              <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.css' rel='stylesheet' />
              {/* Add additional global head tags here */}
            </Head>
            {/* <Map
              mapboxAccessToken={process.env.NEXT_PUBLIC_MapboxAccessTokenDev}
              initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14
              }}
              style={{width: "100%", height: "70vh"}}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              > */}
                {/* {data != null ? data.map(() => 

                ) : null} */}
                {/* <Marker longitude={-100} latitude={40} anchor="bottom" >
                  <img src="./images/black_map_marker.png" />
                </Marker>   */}
              {/* </Map> */}
          </div>
  );
}