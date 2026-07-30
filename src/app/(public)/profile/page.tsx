import React from 'react'
import ContentProfile from './components/ContentProfile'
import HeaderPage from '@/components/HeaderPage'

const page = () => {
    return (
        <div className='bg relative'>
            <div className=''>
                <HeaderPage />
            </div>

            <div className='min-h-75 px-5 md:px-10 xl:px-65 py-5 xl:py-10'>
                <ContentProfile />
            </div>
        </div>
    )
}

export default page
