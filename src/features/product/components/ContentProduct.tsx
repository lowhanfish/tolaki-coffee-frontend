"use client"

import { useState } from 'react'
import InputField from '@/components/items/InputField';
import Pagination from '@/components/items/Pagination';
import SelectListShow from '@/components/items/SelectListShow';
import ProductItem from '@/components/ProductItem';
import { useQuery } from '@tanstack/react-query';
import { useDataStore } from '@/stores/dataStore';
import { fetchApi } from '@/lib/apiFetch';
import { ProductListInterface } from '@/features/product/types';
import useDebouncedSearch from '@/hooks/useDebouncedSeacrh';

const defaultList = [
    { id: "3", title: "Arabica Coffee", subtitle: "Medium Roast (200gr)", price: 85000, sat: "Pack", img: "/images/kopi3.png" },
    { id: "1", title: "Tubruk Robusta", subtitle: "Medium Roast (200gr)", price: 85000, sat: "Pack", img: "/images/kopi1.png" },
    { id: "4", title: "Kopi Tolaki", subtitle: "Medium Roast (200gr)", price: 85000, sat: "Pack", img: "/images/kopi4.png" },
    { id: "2", title: "Tolaki Robusta", subtitle: "Medium Roast (200gr)", price: 85000, sat: "Pack", img: "/images/kopi2.png" },
    { id: "5", title: "Arabica Premium", subtitle: "Medium Roast (200gr)", price: 95000, sat: "Pack", img: "/images/kopi3.png" },
    { id: "6", title: "Robusta Gold", subtitle: "Dark Roast (200gr)", price: 75000, sat: "Pack", img: "/images/kopi1.png" },
]

const ContentProduct = () => {
    const url = useDataStore((state) => state.url)
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebouncedSearch(search)
    const [limit, setLimit] = useState(8)
    const [skip, setSkip] = useState(1)

    const { data: response, isLoading } = useQuery({
        queryFn: () =>
            fetchApi<ProductListInterface>(
                `${url}/product/read?search=${encodeURIComponent(debouncedSearch)}&skip=${(skip - 1) * limit}&limit=${limit}`,
            ),
        queryKey: ['products-public', skip, limit, debouncedSearch],
    })

    const hasApiData = response?.data && response.data.length > 0
    const products = hasApiData ? response.data : (debouncedSearch ? [] : defaultList)
    const total = response?.total || (hasApiData ? response.data.length : defaultList.length)

    return (
        <div>
            <div className='grid grid-cols-12 gap-2 items-center'>
                <div className='col-span-12 md:col-span-6'>
                    <InputField
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e as string)
                            setSkip(1)
                        }}
                        placholder="Cari produk kopi..."
                    />
                </div>
                <div className='col-span-12 md:col-span-6 flex justify-end items-center text-xs text-neutral-500'>
                    <span>Menampilkan {products.length} produk</span>
                </div>
            </div>

            {isLoading ? (
                <div className='grid grid-cols-12 gap-3 mt-4'>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 h-64 animate-pulse rounded-lg bg-neutral-200' />
                    ))}
                </div>
            ) : products.length === 0 ? (
                <div className='py-16 text-center text-neutral-400'>
                    <p className='text-base font-bold'>Produk tidak ditemukan</p>
                    <p className='mt-1 text-xs'>Coba kata kunci pencarian yang lain.</p>
                </div>
            ) : (
                <div className='grid grid-cols-12 gap-3 mt-4'>
                    {products.map((item: any, i) => (
                        <div className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3' key={item.id || i}>
                            <ProductItem item={item} />
                        </div>
                    ))}
                </div>
            )}

            <div className='flex flex-col sm:flex-row gap-4 justify-between items-center pt-8'>
                <Pagination
                    total={total}
                    limit={limit}
                    page={skip}
                    pageShow={5}
                    onPageChange={setSkip}
                />
                <div className='w-32'>
                    <SelectListShow
                        onChange={(val) => {
                            setLimit(Number(val))
                            setSkip(1)
                        }}
                        size='sm'
                    />
                </div>
            </div>
        </div>
    )
}

export default ContentProduct
