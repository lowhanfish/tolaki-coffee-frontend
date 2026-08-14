import React from 'react'
import ContentProfile from './components/ContentProfile'
import HeaderPage from '@/components/HeaderPage'

const page = () => {
    return (
        <div className='bg relative'>
            <div className=''>
                <HeaderPage image='/images/header_product5.webp'>
                    <div className='z-2 flex flex-col items-center justify-center'>
                        <p className='text-[45px]'>Anoa Coffee</p>
                        <p className='-mt-2'>Pelajari tentang kami</p>
                    </div>
                </HeaderPage>
            </div>

            <div className='min-h-75 px-5 md:px-10 xl:px-65 py-5 xl:py-10'>
                <ContentProfile />
            </div>
        </div>
    )
}

export default page
