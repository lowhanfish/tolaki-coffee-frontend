import React from 'react'
import HeaderPage from '@/components/HeaderPage'
import Impact from './components/Impact'
import Stories from './components/Stories'



const page = () => {
    return (
        <div className='bg relative'>
            <div className=''>
                <HeaderPage>
                    <div className='z-2 w-full px-5 lg:px-20 flex flex-col items-center justify-center xl:justify-start xl:items-start'>
                        <div className='w-full grid grid-cols-1 xl:grid-cols-2'>
                            <div>
                                <p className='title-text color-main'>PETANI DAN KEMITRAAN</p>
                                <p className='text-[45px]'>Anoa Coffee</p>
                                <p className='-mt-2'>Kami bekerja langsung bersama petani diberbagai wilayah Sulawesi Tenggara untuk menghasilkan kopi berkualitas tinggi dan meningkatkan kesejahteraan petani.</p>
                            </div>
                        </div>
                    </div>

                </HeaderPage>
            </div>

            <div className='min-h-75 px-5 lg:px-20 xl:px-45 pt-5 xl:pt-10'>
                <p className='title-header-3 text-neutral-700'>Headline & Impact</p>
                <Impact />
            </div>
            <div className='min-h-75 px-5 lg:px-20 xl:px-45 pt-5'>
                <p className='title-text color-main'>STORIES FROM THE GARDEN</p>
                <Stories />
            </div>
            <div className='min-h-75 px-5 lg:px-20 xl:px-45 pt-5'>
                <p className='title-text color-main'>PARTNERSHIP STANDARTD</p>
                {/* <Stories /> */}
            </div>

        </div>
    )
}

export default page
