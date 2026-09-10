import React from 'react'
import { PiPlantDuotone } from "react-icons/pi";

interface CardImpactProps {
    border?: boolean
    position?: string,
    children?: React.ReactNode,
    total: string,
    title: string,
    subtitle: string
}

const positonMap: Record<string, string> = {
    center: 'items-center justify-center',
    start: 'items-center justify-center md:items-start',
    end: 'items-center justify-center md:items-end',
}



const CardImpact = ({ border = false, position, children, total, title, subtitle }: CardImpactProps) => {


    return (
        <div className={`w-full px-2 flex flex-col py-5 text-neutral-700 ${position ? positonMap[position] : positonMap['center']} ${border && `md:border-x-2 border-neutral-300`}`}>
            <div className='flex  gap-3 items-center'>
                <div className='
                    primary-color
                    text-[50px]
                    font-semibold
                 '>
                    {total}
                </div>
                <div className=''>
                    {children}
                </div>
            </div>
            <div className={`text-center ${position ? position == 'center' ? 'md:text-center' : position == 'end' ? 'md:text-right' : position == 'start' ? 'md:text-left' : '' : ''}`}>
                <p className='font-bold'>{title}</p>
                <p className='text-[12px]'>{subtitle}</p>
            </div>
        </div>
    )
}

export default CardImpact
