import React from 'react'
import HomeHeader from '@/features/home/components/HomeHeader'
import HomeAbout from '@/features/home/components/HomeAbout'
import HomeProduct from '@/features/home/components/HomeProduct'
import HomeWhy from '@/features/home/components/HomeWhy'



const Page = () => {
    return (
        <>
            <div className='w-full'>
                <div className='w-full bg'>
                    <HomeHeader />
                </div>
                <div className=' w-full bg px-5 md:px-30 pt-10'>
                    <HomeAbout />
                </div>
                <div className='w-full bg px-5 md:px-30 pt-20'>
                    <HomeProduct />
                </div>
                <div className='w-full pt-20'>
                    <HomeWhy />
                </div>
            </div>
        </>
    )
}

export default Page
