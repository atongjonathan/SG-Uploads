import React from 'react'
import notfound from '../../images/404.svg'


const SiteDown = () => {
    document.title = `Site Down`
    return (
        <div className='flex-colo gap-8 w-full min-h-screen text-white bg-main px-6'>
            <img className="w-full h-96 object-contain" src={notfound} alt="notfound" />
            <h1 className="lg:text-4xl font-bold">Site Inaccessible</h1>
            <p className="font-medium text-border italic leading-6">Site is temporarily inaccessible, we'll be back shortly ...</p>

        </div>
    )
}

export default SiteDown