'use server';

import { addOne } from '@/redux/slices/counterSlice';
import store from '@/redux/store';
import Head from 'next/head';
import React from 'react';
import Map from 'react-map-gl';

export async function getServerSideProps() {
  const res = await fetch('https://localhost:');
  const data = await res.json();


  return {
    props: {
      properties: data.items,
      // properties: JSON.parse(JSON.stringify(data.properties))
    },
  }
}

export default function MapPage() {
  return (
          <div>
            <Head>
              <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v<YOUR_MAPBOX_VERSION>/mapbox-gl.css' rel='stylesheet' />
              {/* Add additional global head tags here */}
            </Head>
            <Map
              mapboxAccessToken={process.env.NEXT_PUBLIC_MapboxAccessTokenDev}
              initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14
              }}
              style={{width: "100%", height: "70vh"}}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              />
          </div>
  );
}