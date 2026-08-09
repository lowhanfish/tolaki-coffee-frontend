"use client"
import { useState } from 'react'
import InputField from '@/components/items/InputField'
import Image from 'next/image'



const Joinus = () => {

    const [nama, setNama] = useState<string>("")


    return (
        <div className='relative  overflow-hidden w-full isolate'>
            <Image
                src={`/images/about.jpg`}
                alt='About Image'
                fill
                className='object-cover -z-1'
            />

            <div className='z-1 absolute inset-0 bg-neutral-900 opacity-85 shadow-[inset_0_0_70px_rgba(0,0,0,0.9)]' />

            <div className='z-9 relative inset-0 px-5 lg:px-20 xl:px-45 py-20 flex flex-col items-center'>
                <p className='title-text color-main'>CALL TO ACTION</p>

                <div className='grid gap-2 xl:gap-5 grid-cols-1 lg:grid-cols-4 pt-3'>
                    <div className='col-span-1'>
                        <p className='text-[18px] font-bold'>Gabung Kemitraan</p>
                        <p className='text-[12px] pt-2'>Mari bersama membangun ekosistem kopi yang berkelanjutan dan membawa manfaat bagi banyak pihak.</p>
                    </div>
                    <div className='col-span-2'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>

                            <div className='col-span-1'>
                                <div>
                                    <InputField
                                        type='text'
                                        value={nama}
                                        onChange={(e) => setNama(e as string)}
                                        placholder='Nama Lengkap'
                                    />
                                </div>
                                <div className='mt-0 md:mt-2'>
                                    <InputField
                                        type='text'
                                        value={nama}
                                        onChange={(e) => setNama(e as string)}
                                        placholder='Luas Lahan (Ha)'
                                    />
                                </div>
                            </div>
                            <div className='col-span-1'>
                                <div>
                                    <InputField
                                        type='text'
                                        value={nama}
                                        onChange={(e) => setNama(e as string)}
                                        placholder='Kelompok Tani / Lembaga'
                                    />
                                </div>
                                <div className='mt-0 md:mt-2'>
                                    <InputField
                                        type='text'
                                        value={nama}
                                        onChange={(e) => setNama(e as string)}
                                        placholder='Lokasi Daerah'
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className='col-span-1'>
                        <button className='bg3 rounded-2xl flex flex-col justify-center items-center px-3 py-3 cursor-pointer w-full'>
                            <p className='text-[18px] font-bold'>Ajukan Kemitraan</p>
                            <p className='text-center text-[12px]'>Kami akan menghubungi Anda segera setelah data diterima.</p>
                        </button>

                    </div>
                </div>

            </div>



        </div>
    )
}

export default Joinus
