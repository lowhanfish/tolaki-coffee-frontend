import Image from 'next/image'
import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";


interface CardNewsProps {
    id: string,
    title: string,
    description: string,
    file: string
}

const CardNews = ({ id, title, description, file }: CardNewsProps) => {
    return (
        <div className='relative rounded-2xl overflow-hidden border-[0.5px] border-neutral-400'>
            <p className='absolute z-3 bg-orange-300/70 text-black text-[10px] font-bold ml-2 mt-2 py-1 px-3 rounded-2xl shadow-2xl'>
                BERITA PERUSAHAAN
            </p>
            <div className='relative w-full h-45'>
                <Image
                    alt='Image News'
                    src={file}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover'
                    loading="eager"
                />
                <div className='absolute z-3 bottom-2 left-2 flex gap-2 items-center'>
                    <FaCalendarAlt className='text-[13px] color-main' />
                    <p className='text-neutral-300 text-[12px]'>2 Agustus 2026</p>
                </div>
                <div className='bg-linear-to-t from-black via-10% to-transparent w-full h-full absolute'></div>
            </div>
            <div className='p-3'>
                <p className='font-bold pt-1 cursor-pointer'>{title}</p>
                <p className='text-[12px] pt-2 line-clamp-2'>{description}</p>

                <button className="
                        w-full py-1 mt-5  
                        rounded-4xl 
                        cursor-pointer 
                        flex items-center justify-center gap-3 
                        shadow-2xl
                        hover:bg-neutral-300
                        primary-color
                    ">
                    <p className="text-[12px] font-bold">Selengkapnya</p>
                    <BsArrowRight />
                </button>

            </div>
        </div>
    )
}

export default CardNews
