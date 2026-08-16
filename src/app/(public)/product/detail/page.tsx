import React from 'react'
import HeaderPage from '@/components/HeaderPage';
import ProductImageSection from './components/ProductImageSection';
import ProductDescriptionSection from './components/ProductDescriptionSection';





const page = () => {
    return (

        <div className='bg relative '>
            <div className=''>
                <HeaderPage height='h-20' image={`/images/header_product6.webp`}>
                    <div className='z-2 flex flex-col items-center justify-center'>
                        <p className='text-[45px]'>Anoa Coffee</p>
                        <p className='-mt-2'>Product kami</p>
                    </div>
                </HeaderPage>
            </div>

            <div className='min-h-75 px-5 md:px-10 xl:px-20 py-5 xl:py-10 text-neutral-800'>
                <div className='w-full h-full pb-5'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-3'>
                        <div className='col-span-1 lg:col-span-5 '>
                            <ProductImageSection />
                        </div>


                        <div className='col-span-1 lg:col-span-7 w-full text-[13px] px-3 lg:px-7'>
                            <ProductDescriptionSection />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default page
