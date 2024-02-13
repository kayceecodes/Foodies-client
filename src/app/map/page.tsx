'use client';

import { addOne } from '@/redux/slices/counterSlice';
import store from '@/redux/store';
import React from 'react';


export default function Map() {
  return (
    <div className="">
            <button className="bg-blue-600 border-spacing-1" onClick={() => {store.dispatch(addOne())}}>Add One</button>
    </div>
  );
}
