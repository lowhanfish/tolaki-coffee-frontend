import Image from 'next/image'
import React from 'react'

import { PiFarmFill, PiCoffeeBold } from "react-icons/pi";
import { GiCoffeeBeans, GiKnapsack } from "react-icons/gi";



const List = [
    { id: 1, title: "Dari Petani Lokal", desc: "Bekerja sama langsung dengan petani untuk kualitas terbaik dan kesejahteraan bersama.", path: "", icon: PiFarmFill },
    { id: 2, title: "Biji Kopi Berkualitas", desc: "Dipilih secara selektif dari kebun terbaik di Sulawesi Tenggara", path: "", icon: GiCoffeeBeans },
    { id: 3, title: "Diolah dengan cermat", desc: "Proses pengolahan modern dan higienis untuk menjaga cita-rasa alami kopi", path: "", icon: PiCoffeeBold },
    { id: 4, title: "Kemasan Premium", desc: "Dirancang elegan dengan material berkualitas untuk menjaga kesegaran", path: "", icon: GiKnapsack }
]

const HomeWhy = () => {
    return (
        <div className='relative md:h-130 lg:h-120 xl:h-75 overflow-hidden w-full isolate'>


            <Image
                src={`/images/about.jpg`}
                alt='About Image'
                fill
                className='object-cover -z-1'
            />

            <div className='z-1 absolute inset-0 bg-neutral-900 opacity-85 shadow-[inset_0_0_70px_rgba(0,0,0,0.9)]' />


            <div className='z-9 relative inset-0 py-10'>
                <div className='flex justify-center items-center pb-7'>
                    <p className='color-main font-bold text-[14px]'>KENAPA MEMILIH KOPI TOLAKI?</p>
                </div>
                <div className='
                w-full grid grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-0 
                justify-center items-center
                px-3 md:px-8 lg:px-30
                '>
                    {
                        List.map((item, index) => (

                            <div key={index} className={`col-span-2 md:col-span-1
                            flex flex-col items-center justify-center
                            px-5 border-r ${index == 0 && 'border-l'} border-neutral-700
                            `}>
                                <item.icon className='text-[60px] color-main' />
                                <div className='text-center opacity-80 mt-3'>
                                    <p className='text-[16px] font-bold'>{item.title}</p>
                                    <p className='text-[14px] mt-2'>{item.desc}.</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default HomeWhy
