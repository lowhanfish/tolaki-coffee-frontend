import HeaderPage from '@/components/HeaderPage'
import InformationContact from './components/InformationContact'
import SendMessage from './components/SendMessage'
import ConnectContact from './components/ConnectContact'



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

            <div className='min-h-75 px-5 md:px-20 xl:px-50 py-5 xl:py-10 text-neutral-800'>
                <div className='grid grid-cols-3 gap-3 md:gap-5 xl:gap-10'>
                    <div className='col-span-1'>
                        <p className='title-header-3'>Informasi Kontak</p>
                        <InformationContact />
                    </div>
                    <div className='col-span-2'>
                        <p className='title-header-3'>Kirim Pesan</p>
                        <SendMessage />
                    </div>
                </div>
                <div>
                    <ConnectContact />
                </div>
            </div>
        </div>
    )
}

export default page
