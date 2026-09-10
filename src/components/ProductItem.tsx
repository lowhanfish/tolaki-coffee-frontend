"use client"

import Image from 'next/image'
import { BsBagPlus } from "react-icons/bs";
import Link from 'next/link';
import { ProductInterface } from "@/features/product/types"
import { useDataStore } from '@/stores/dataStore';

interface LegacyProductItem {
    title: string
    subtitle: string
    price: number
    sat: string
    img: string
}

interface ProductItemProps {
    item: ProductInterface | LegacyProductItem
}

const ProductItem = ({ item }: ProductItemProps) => {
    const url = useDataStore((state) => state.url)
    const isApiProduct = 'unit_price' in item
    const filePath = isApiProduct
        ? item.files[0]?.path.replace(/^\.\//, '').replaceAll('\\', '/')
        : undefined
    const imageUrl = isApiProduct
        ? filePath
            ? `${url}/${filePath}`
            : '/images/no-image.png'
        : item.img
    const subtitle = isApiProduct ? item.description ?? '' : item.subtitle
    const unitPrice = isApiProduct ? item.unit_price : item.sat

    return (
        // <div>
        <div className='w-full bg-white rounded-lg' >
            <div className='relative h-50'>
                <Image
                    src={imageUrl}
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
                    <p className='text-item-body'>{subtitle}</p>
                    <p className='text-item-regular pt-2'><span className='text-item-header'>Rp. {Number(item.price)}</span>/{unitPrice}</p>
                </div>
                {/* <div className='bg-red-400'> */}
                <Link href="/product/detail">
                    <button className='absolute right-3 bottom-3 rounded-full border border-yellow-600 w-10 h-10 flex justify-center items-center cursor-pointer'>
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
