'use client'

import React, { useState, Suspense } from 'react'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import HeaderPage from '@/components/HeaderPage'
import Button from '@/components/items/Button'
import { BsFillCartCheckFill, BsCartPlusFill, BsFillStarFill, BsArrowLeft } from 'react-icons/bs'
import { useQuery } from '@tanstack/react-query'
import { useDataStore } from '@/stores/dataStore'
import { useCartStore } from '@/stores/cartStore'
import { fetchApi } from '@/lib/apiFetch'
import { ProductResponseInterface } from '@/app/(secure)/secure/products/types'
import Link from 'next/link'

const defaultProduct = {
    id: 'default-arabica',
    title: 'Kopi Arabika Tolaki Spesial',
    price: 85000,
    unit_price: '250gr / Pack',
    description: '<p>Kopi Arabika Tolaki dipetik langsung dari kebun kopi pegunungan Sulawesi Tenggara dengan proses sangrai medium roast yang menghasilkan aroma floral lembut, rasa manis alami, dan tingkat keasaman yang seimbang.</p>',
    files: [{ path: '/images/kopi3.png' }],
}

const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(val)

const ProductDetailContent = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const id = searchParams.get('id')
    const url = useDataStore((state) => state.url)
    const addItem = useCartStore((state) => state.addItem)

    const [quantity, setQuantity] = useState(1)

    const { data: apiProduct, isLoading } = useQuery({
        queryFn: () => fetchApi<ProductResponseInterface>(`${url}/product/readOne/${id}`),
        queryKey: ['product-detail', id],
        enabled: Boolean(id),
    })

    const product: any = apiProduct || defaultProduct
    const filePath = product.files?.[0]?.path?.replace(/^\.\//, '').replaceAll('\\', '/')
    const imageUrl = filePath
        ? filePath.startsWith('http') || filePath.startsWith('/images')
            ? filePath
            : `${url}/${filePath}`
        : '/images/kopi3.png'

    const handleAddToCart = () => {
        addItem({
            id: String(product.id),
            title: product.title,
            price: Number(product.price),
            unit_price: product.unit_price,
            image: imageUrl,
        }, quantity)
        alert(`${quantity}x "${product.title}" berhasil ditambahkan ke keranjang!`)
    }

    const handleBuyNow = () => {
        addItem({
            id: String(product.id),
            title: product.title,
            price: Number(product.price),
            unit_price: product.unit_price,
            image: imageUrl,
        }, quantity)
        router.push('/cart')
    }

    return (
        <div className='bg relative min-h-screen'>
            <HeaderPage height='h-20' image='/images/header_product6.webp'>
                <div className='z-2 flex flex-col items-center justify-center text-white'>
                    <p className='text-3xl font-bold md:text-5xl'>Detail Produk</p>
                    <p className='mt-1 text-xs md:text-sm text-white/80'>Kualitas premium langsung dari petani lokal</p>
                </div>
            </HeaderPage>

            <div className='mx-auto max-w-7xl px-4 py-8 md:px-8 xl:px-16 text-neutral-800'>
                <Link href='/product' className='inline-flex items-center gap-2 text-xs font-semibold text-amber-800 hover:underline mb-6'>
                    <BsArrowLeft />
                    <span>Kembali ke Katalog Produk</span>
                </Link>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start rounded-2xl border border-neutral-100 bg-white p-6 md:p-8 shadow-sm'>
                    {/* Gambar Produk */}
                    <div className='lg:col-span-5'>
                        <div className='relative h-80 sm:h-96 w-full overflow-hidden rounded-xl bg-amber-50 shadow-inner'>
                            <Image
                                alt={product.title}
                                src={imageUrl}
                                fill
                                className='object-cover'
                                priority
                            />
                        </div>
                    </div>

                    {/* Deskripsi & Aksi Pembelian */}
                    <div className='lg:col-span-7 space-y-4'>
                        <div>
                            <span className='rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800'>
                                Kopi Tolaki Asli
                            </span>
                            <h1 className='mt-2 text-2xl md:text-3xl font-bold text-neutral-800'>{product.title}</h1>
                            <div className='flex items-center gap-2 mt-2'>
                                <div className='flex text-amber-500 text-xs'>
                                    <BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill />
                                </div>
                                <span className='text-xs text-neutral-400'>Produk Unggulan Sulawesi Tenggara</span>
                            </div>
                        </div>

                        <div className='rounded-xl bg-linear-to-r from-amber-600 to-amber-700 p-4 text-white shadow-md'>
                            <p className='text-xs text-amber-200 uppercase tracking-wider font-semibold'>Harga</p>
                            <p className='text-2xl md:text-3xl font-bold mt-0.5'>
                                {formatRupiah(Number(product.price))}
                                <span className='text-xs font-normal text-white/80 ml-2'>/ {product.unit_price}</span>
                            </p>
                        </div>

                        <div className='border-y border-neutral-100 py-4 space-y-3'>
                            <div className='flex items-center'>
                                <p className='w-28 font-semibold text-xs text-neutral-500'>Jumlah</p>
                                <div className='flex items-center rounded-lg border border-neutral-200 bg-neutral-50'>
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className='h-8 w-8 font-bold text-neutral-600 hover:bg-neutral-200 rounded-l-lg cursor-pointer'
                                    >
                                        -
                                    </button>
                                    <span className='w-10 text-center text-xs font-bold text-neutral-800'>
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className='h-8 w-8 font-bold text-neutral-600 hover:bg-neutral-200 rounded-r-lg cursor-pointer'
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className='flex items-start'>
                                <p className='w-28 font-semibold text-xs text-neutral-500 pt-1'>Deskripsi</p>
                                <div
                                    className='flex-1 text-xs leading-relaxed text-neutral-600'
                                    dangerouslySetInnerHTML={{
                                        __html: product.description || '<p>Kopi berkualitas tinggi hasil olahan biji kopi pilihan.</p>',
                                    }}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-3 pt-2'>
                            <div className='flex-1'>
                                <Button size='h-12' color='primary' onClick={handleBuyNow}>
                                    <div className='flex items-center justify-center gap-2'>
                                        <BsFillCartCheckFill className='text-base' />
                                        <span className='font-bold text-xs text-white'>Beli Sekarang</span>
                                    </div>
                                </Button>
                            </div>
                            <div className='flex-1'>
                                <Button size='h-12' color='danger' onClick={handleAddToCart}>
                                    <div className='flex items-center justify-center gap-2'>
                                        <BsCartPlusFill className='text-base' />
                                        <span className='font-bold text-xs text-white'>Masukkan Keranjang</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Page = () => {
    return (
        <Suspense fallback={<div className='min-h-screen flex items-center justify-center'>Memuat detail produk...</div>}>
            <ProductDetailContent />
        </Suspense>
    )
}

export default Page
