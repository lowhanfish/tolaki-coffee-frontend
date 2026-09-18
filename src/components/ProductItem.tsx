"use client"

import Image from 'next/image'
import { BsBagPlus } from "react-icons/bs";
import Link from 'next/link';
import { ProductInterface } from "@/features/product/types"
import { useDataStore } from '@/stores/dataStore';
import { useCartStore } from '@/stores/cartStore';

interface LegacyProductItem {
    id: string | number
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
    const addItem = useCartStore((state) => state.addItem)

    const isApiProduct = 'unit_price' in item
    const filePath = isApiProduct
        ? item.files?.[0]?.path?.replace(/^\.\//, '').replaceAll('\\', '/')
        : undefined
    const imageUrl = isApiProduct
        ? filePath
            ? `${url}/${filePath}`
            : '/images/no-image.png'
        : item.img
    const subtitle = isApiProduct ? (item.description ? item.description.replace(/<[^>]*>?/gm, '') : '') : item.subtitle
    const unitPrice = isApiProduct ? item.unit_price : item.sat
    const detailLink = `/product/detail?id=${item.id}`

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addItem({
            id: String(item.id),
            title: item.title,
            price: Number(item.price),
            unit_price: unitPrice,
            image: imageUrl,
        }, 1)
        alert(`"${item.title}" berhasil ditambahkan ke keranjang!`)
    }

    return (
        <div className='w-full bg-white rounded-lg overflow-hidden border border-neutral-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'>
            <Link href={detailLink}>
                <div className='relative h-50 cursor-pointer overflow-hidden bg-amber-50'>
                    <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        className='object-cover transition duration-300 hover:scale-105'
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                </div>
            </Link>
            <div className='px-5 py-3 relative'>
                <Link href={detailLink}>
                    <p className='text-item-header line-clamp-1 hover:text-amber-800 transition'>{item.title}</p>
                    <p className='text-item-body line-clamp-2 mt-0.5 text-xs text-neutral-400'>{subtitle}</p>
                    <p className='text-item-regular pt-2 text-xs text-neutral-500'>
                        <span className='text-item-header font-bold text-amber-800'>Rp {Number(item.price).toLocaleString('id-ID')}</span> / {unitPrice}
                    </p>
                </Link>
                <button
                    onClick={handleAddToCart}
                    aria-label='Tambah ke Keranjang'
                    title='Tambah ke Keranjang'
                    className='absolute right-3 bottom-3 rounded-full border border-amber-600 bg-amber-50 text-amber-800 hover:bg-amber-600 hover:text-white transition w-10 h-10 flex justify-center items-center cursor-pointer shadow-sm'>
                    <BsBagPlus className='font-bold text-base' />
                </button>
            </div>
        </div>
    )
}

export default ProductItem
