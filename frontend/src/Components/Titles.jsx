import React from 'react'

const Titles = ({title, Icon}) => {
  return (
    <div className='flex sm:gap-3 gap-2 items-center truncate mb-3'>
        <Icon className="sm:w-5 sm:h-6 w-4 h-4 text-subMain"></Icon>
        <h2 className="font-semibold text-sm">{title}</h2>
    </div>
  )
}

export default Titles