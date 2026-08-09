import React from 'react'


interface ItemStandardProps {
    title: string,
    children: React.ReactNode
}


const ItemStandard = ({ title, children }: ItemStandardProps) => {
    return (
        <div className='text-neutral-600 w-full h-full flex gap-1 flex-col items-center'>
            {/* <FaHandHoldingUsd className='text-center text-[39px] primary-color' /> */}
            {children}
            <p className='text-[12px] font-bold text-center'>{title}</p>
        </div>
    )
}

export default ItemStandard
