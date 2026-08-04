import React from 'react'
import HeaderPage from '@/components/HeaderPage'
import SideBarProduct from './components/SideBarProduct'
import ContentProduct from './components/ContentProduct'


const page = () => {
    return (
        <div className='bg relative '>
            <div className=''>
                <HeaderPage />
            </div>

            <div className='min-h-75 px-5 md:px-10 xl:px-20 py-5 xl:py-10 text-neutral-800'>
                <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-3'>
                        <SideBarProduct />
                    </div>
                    <div className='col-span-9 '>
                        <ContentProduct />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
