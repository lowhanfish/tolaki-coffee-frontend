import Image from 'next/image'
import React from 'react'
import { BsArrowRight } from "react-icons/bs";


const StoriesCard = () => {
    return (
        <div className='text-neutral-700 flex flex-col gap-2 rounded-lg border-[0.5px] border-neutral-400 relative overflow-hidden'>
            <div className='relative h-40'>
                <Image
                    alt='Image'
                    src={`/images/petani1.png`}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover'
                    loading="eager"
                />

            </div>
            <div className='p-2'>

                <div>
                    <p className='font-bold'>Pak Wayan, Konawe Selatan</p>
                    <p className='text-[12px] pt-2'>*Kemangi-aroma wangi dari kebun kami adalah hasil dari kesabaran merawat bumi."</p>
                </div>
                <div className='pt-2'>
                    <button className='cursor-pointer list-button flex gap-2 justify-center items-center'>
                        Selengkapnya
                        <BsArrowRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StoriesCard
