import ContentProfile from '@/features/profile/components/ContentProfile'
import HeaderPage from '@/components/HeaderPage'

const ProfilePage = () => {
    return (
        <main className='bg relative shrink-0'>
            <HeaderPage image='/images/header_product5.webp'>
                <div className='z-2 flex w-full flex-col items-center justify-center px-5 lg:px-20 xl:items-start xl:justify-start'>
                    <div className='grid w-full grid-cols-1 xl:grid-cols-2'>
                        <div>
                            <p className='title-text color-main'>PROFIL PERUSAHAAN</p>
                            <h1 className='text-[45px] leading-tight'>Anoa Coffee</h1>
                            <p className='mt-1 max-w-2xl text-sm leading-relaxed sm:text-base'>
                                Mengenal perjalanan, nilai, dan semangat kami dalam menghadirkan kopi terbaik dari Sulawesi Tenggara.
                            </p>
                        </div>
                    </div>
                </div>
            </HeaderPage>

            <div className='min-h-75 px-5 pb-12 pt-5 lg:px-20 xl:px-45 xl:pb-16 xl:pt-10'>
                <ContentProfile />
            </div>
        </main>
    )
}

export default ProfilePage
