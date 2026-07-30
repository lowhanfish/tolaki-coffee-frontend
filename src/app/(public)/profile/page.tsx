import React from 'react'
import ContentProfile from './components/ContentProfile'
import HeaderPage from '@/components/HeaderPage'

const page = () => {
    return (
        <div className='bg relative'>
            <div className=''>
                <HeaderPage />
            </div>

            <div className='min-h-50'>
                <ContentProfile />
            </div>

        </div>
    )
}

export default page
