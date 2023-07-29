import React from 'react'

import { SectionBoxes } from '../../data/SectionBoxes'
import { Link } from 'react-router-dom'

function SectionBox() {
  return (
    <div className='flex justify-center flex-wrap my-4 boxes gap-4'>
      {SectionBoxes.map((section_box) => (
        <Link to={section_box.link}>
          <div key={section_box.id} className="border-2 w-36 h-36 rounded-xl bg-white border-black p-4">
            <img src={section_box.image} className='h-20 mx-auto'/>
            <h1 className='font-bold text-lg my-2'>{section_box.title}</h1>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SectionBox