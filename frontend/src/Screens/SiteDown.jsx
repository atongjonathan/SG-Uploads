import React from 'react'
import notfound from '../images/404.svg'


const SiteDown = () => {
    document.title = `Not Found`
    return (
        <div className='flex-colo gap-8 w-full min-h-screen text-white bg-main px-6'>
            <img className="w-full h-96 object-contain" src={notfound} alt="notfound" />
            <h1 className="lg:text-4xl font-bold">Site Down</h1>
            <p className="font-medium text-border italic leading-6">Site down temporarily for planned maintenance...</p>

        </div>
    )
}

export default SiteDown