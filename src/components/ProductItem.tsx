"use client"

import { useState } from 'react'
import Image from 'next/image'
import { BsBagPlus } from "react-icons/bs";
import Link from 'next/link';




interface ProductItemPropsItem {
    id: number,
    title: string,
    subtitle: string,
    price: number,
    sat: string,
    img: string,
}

interface ProductItemProps {
    item: ProductItemPropsItem
}

const ProductItem = ({ item }: ProductItemProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    return (
        // <div>
        <div className='w-full bg-white rounded-lg' >
            <div className='relative h-50'>
                <Image
                    src={item.img}
                    alt='Product'
                    fill
                    className='object-cover rounded-t-lg'
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
            </div>
            <div className='px-5 py-3 relative'>
                <div>
                    <p className='text-item-header'>{item.title}</p>
                    <p className='text-item-body'>{item.subtitle}</p>
                    <p className='text-item-regular pt-2'><span className='text-item-header'>Rp. {item.price}</span>/{item.sat}</p>
                </div>
                {/* <div className='bg-red-400'> */}
                <Link href="/product/detail">
                    <button onClick={() => setOpenModal(true)} className='absolute right-3 bottom-3 rounded-full border border-yellow-600 w-10 h-10 flex justify-center items-center cursor-pointer'>
                        <BsBagPlus className='text-yellow-600 font-bold' />
                    </button>
                </Link>
                {/* </div> */}
            </div>

        </div>

        // </div>
    )
}

export default ProductItem
