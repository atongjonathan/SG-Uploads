import React from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import notfound from '../../images/404.svg'
const NotAllowed = () => {
  document.title = `Forbidden`

  return (
    <div className='flex-colo gap-8 w-full min-h-screen text-white bg-main px-6'>
      <img className="w-full h-96 object-contain" src={notfound} alt="notfound" />
      <h1 className="lg:text-4xl font-bold"> 403 Not Allowed</h1>
      <p className="font-medium text-border italic leading-6">You do not have permission to view this page</p>

      <Link className='bg-subMain transitions text-white flex-rows gap-4 font-medium py-3 hover:text-main px-6 rounded-md' to='/'>
        <BiHomeAlt></BiHomeAlt>Back to Home</Link>

    </div>
  )
}

export default NotAllowed