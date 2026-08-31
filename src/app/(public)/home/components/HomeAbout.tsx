import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { BsArrowRight } from "react-icons/bs";


const HomeAbout = () => {
    return (

        <div className='grid grid-cols-9 gap-3 items-center'>
            <div className='col-span-9 xl:col-span-5'>
                <p className='title-text color-main'>TENTANG KAMI</p>
                <div className='text-neutral-900 pt-2 text-[35px] font-bold'>
                    <p className='text-[50px]'>Kopi Tolaki</p>
                    <p className='-mt-3'>Dari Daerah Untuk Dunia.</p>
                </div>

                <div className='pt-3 pr-20 text-[13px]'>
                    <p className='text-neutral-500'>
                        Kopi Tolaki hadir dari semangat petani lokal Sulawesi Tenggara yang diwariskan turun-temurun. Kami mengumpulkan biji kopi terbaik dari berbagai daerah, lalu mengolahnya dengan standar tinggi untuk menghaslikan cita rasa yang khas, konsisten, dan membanggakan.
                    </p>
                </div>

                <Link href="/profile">
                    <button className='mt-6 cursor-pointer list-button flex gap-2 justify-center items-center'>
                        <p>Selengkapnya tentang kami</p>
                        <BsArrowRight />

                    </button>
                </Link>
            </div>

            <div className='col-span-9 xl:col-span-4 w-full rounded-2xl p-2 h-full bg-linear-to-l from-amber-900 via-amber-500 to-transparent'>
                <div className='relative rounded-2xl '>
                    <Image
                        src={`/images/about.png`}
                        alt='About Image'
                        className='relative object-cover rounded-2xl z-3 opacity-90 -rotate-5 hover:rotate-0 transition-all duration-300 ease-in-out'
                        height={300}
                        width={500}
                        priority
                        loading="eager"
                        style={{ width: '95%', height: 'auto' }} // 💡 Solusi pamungkas: Deklarasikan keduanya secara eksplisit
                    />

                    <Image
                        src={`/images/about-bg.png`}
                        alt='About Image'
                        className='absolute inset-0 object-center rounded-2xl shadow-[inset_0_0_50px_rgba(15,23,42,0.7)] z-2'
                        fill
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    // style={{ width: '100%', height: 'auto' }}
                    />

                    {/* <div className='absolute inset-0 bg-linear-330 from-black via-amber-700 via-50% to-black opacity-70 z-1 rounded-2xl'>

                    </div> */}


                </div>

            </div>

        </div>

    )
}

export default HomeAbout
