import React from 'react'

function SearchSection() {
  return (
    <div className="w-full py-6 border-b-stone-700 border-b-[0.9px] bg-neutral-800">
      <div className="m-auto w-48 md:w-64 ">
        <input type="text" placeholder="Search" className="w-full text-sm border-stone-700 border-[0.9px] bg-neutral-700 rounded-xl px-3 py-1.5" />
      </div>
    </div>
  )
}

export default SearchSection;