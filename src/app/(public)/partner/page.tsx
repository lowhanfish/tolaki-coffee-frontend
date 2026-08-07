import React from 'react'
import HeaderPage from '@/components/HeaderPage'
import Impact from './components/Impact'


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

            <div className='min-h-75 px-5 lg:px-20 xl:px-45 py-5 xl:py-10'>
                <Impact />
            </div>
        </div>
    )
}

export default page
