'use client';

import { addOne } from '@/redux/slices/counterSlice';
import store from '@/redux/store';
import Head from 'next/head';
import React, { ErrorInfo, useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';

interface Business {
  alias: string,
  categories: Array<string>,
  city: string,
  id: string,
  latitude: number,
  longitude: number,
  name: string,
  price: "$" | "$$" | "$$$",
  rating: number,
  reviewCount: number,
  state: string,
  streetAddress: string,
  url: string,
  zipCode: string
}

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
  const [businesses, setBusinesses] = useState<Array<Business>>([]);

  useEffect(() => {
    const fetchBusinessesByLocation = async () => {
      try {
        const searchTerm = `San Francisco, CA`;
        const response = await fetch(`/api/businesses/location/${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setBusinesses(data);
        console.log("Data: ", data);

      } catch (error: unknown) {
        console.log("Error: ", error);
      }
    };

    fetchBusinessesByLocation();
  }, []);
  
  return (
          <div className=''>
            <Map
              mapboxAccessToken={process.env.NEXT_PUBLIC_MapboxAccessTokenDev}
              initialViewState={{
                longitude: -122.4194,
                latitude: 37.7749,
                zoom: 10
              }}
              style={{width: "100%", height: "70vh"}}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              >
                {/* {businesses != null ? businesses.map(b => 
                  {
                  <Marker 
                    longitude={b.longitude} 
                    latitude={b.latitude} 
                    anchor="bottom" >
                      <img src="./images/black_map_marker.png" />
                  </Marker>
                  }) : null} */}
              </Map>
          </div>
  );
}