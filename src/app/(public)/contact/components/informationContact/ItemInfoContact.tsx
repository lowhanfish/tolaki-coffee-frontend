import React from 'react'
import { PiMapPinLineDuotone, PiPhoneDuotone } from "react-icons/pi";

interface ItemInfoContactProps {
    title: string,
    desc: string,
    children: React.ReactNode
}

const ItemInfoContact = ({ title, desc, children }: ItemInfoContactProps) => {
    return (
        <div className='flex gap-2 items-center'>
            <div className='w-10 h-10 rounded-full border-2 border-amber-800/50 flex justify-center items-center'>
                {/* <PiMapPinLineDuotone className='primary-color text-[20px]' /> */}
                {children}
            </div>
            <div>
                <p className='text-[13px] font-bold text-neutral-700'>{title}</p>
                <p className='text-[11px] text-neutral-600'>{desc}</p>
            </div>
        </div>
    )
}

export default ItemInfoContact
