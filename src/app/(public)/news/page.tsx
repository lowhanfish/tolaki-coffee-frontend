import HeaderPage from '@/components/HeaderPage'
import ListNews from './components/ListNews'
import SideBarNews from './components/SideBarNews'

const page = () => {
    return (
        <div className='bg relative '>
            <div className=''>
                <HeaderPage image={`/images/header_product2.webp`}>
                    <div className='z-2 flex flex-col items-center justify-center'>
                        <p className='text-[45px]'>Anoa Coffee</p>
                        <p className='-mt-2'>Product kami</p>
                    </div>
                </HeaderPage>
            </div>

            <div className='min-h-75 px-5 md:px-10 xl:px-20 py-5 xl:py-10 text-neutral-800'>
                <p className='text-[32px] font-bold'>Semua Berita</p>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-3'>
                    <div className='col-span-9'>
                        <ListNews />
                    </div>
                    <div className='col-span-3 '>
                        <SideBarNews />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
