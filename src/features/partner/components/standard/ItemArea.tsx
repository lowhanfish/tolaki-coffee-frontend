import React from 'react'
import { TbPlant } from "react-icons/tb";

interface ItemAreaProps {
    title: string
}

const ItemArea = ({ title }: ItemAreaProps) => {
    return (
        <div className='p-2 flex gap-2 bg rounded-2xl text-neutral-700'>
            <div className='w-5 flex justify-center items-center'>
                <TbPlant className='text-[20px] primary-color' />
            </div>
            <p className='flex-1 text-[13px] font-bold'>{title}</p>
        </div>
    )
}

export default ItemArea
