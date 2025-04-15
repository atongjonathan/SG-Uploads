import React from 'react'

const Titles = ({title, Icon}) => {
  return (
    <div className='w-full flex sm:gap-8 gap-4 items-center'>
        <Icon className="sm:w-6 sm:h-6 w-4 h-4 text-subMain"></Icon>
        <h2 className="sm:text-xl font-semibold text-sm">{title}</h2>
    </div>
  )
}

export default Titles