"use client"

import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import ProductItem from '@/components/ProductItem';
import Link from 'next/link';
import { fetchApi } from '@/lib/apiFetch';
import { useQuery } from '@tanstack/react-query';
import { useDataStore } from '@/stores/dataStore';
import { ProductListInterface } from "@/features/product/types"

const defaultList = [
    { id: "3", title: "Arabica Coffee", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi3.png" },
    { id: "1", title: "Tubruk Robusta", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi1.png" },
    { id: "4", title: "Kopi Tolaki", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi4.png" },
    { id: "2", title: "Tolaki Robusta", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi2.png" },
]

const HomeProduct = () => {
    const url = useDataStore(state => state.url)
    const skip = 0;
    const limit = 4
    const search = ""

    const { data: ListData, isLoading } = useQuery({
        queryFn: () => fetchApi<ProductListInterface>(`${url}/product/read?search=${search}&skip=${skip}&limit=${limit}`),
        queryKey: ["product-home", skip, limit, search]
    })

    const displayProducts = ListData?.data && ListData.data.length > 0
        ? ListData.data
        : defaultList

    return (
        <div className='text-neutral-800'>
            <p className='title-text color-main'>ETALASE PRODUK</p>
            <div className='flex flex-col md:flex-row items-center py-3'>
                <div className='flex-1 w-full'>
                    <p className='title-header-3'>Produk Pilihan Kami</p>
                </div>
                <div className='flex-1 flex w-full justify-end'>
                    <Link href="/product">
                        <button className='list-button cursor-pointer flex gap-2 justify-center items-center'>
                            <p>Lihat Semua Product</p>
                            <BsArrowRight />
                        </button>
                    </Link>
                </div>
            </div>

            <div className='grid grid-cols-12 md:flex-row gap-3 w-full pt-3'>
                {isLoading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className='col-span-12 md:col-span-6 xl:col-span-3 h-64 animate-pulse rounded-lg bg-white/50' />
                    ))
                ) : (
                    displayProducts.map((item, index: number) => (
                        <div className='col-span-12 md:col-span-6 xl:col-span-3' key={item.id || index}>
                            <ProductItem item={item} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default HomeProduct
