"use client"

import Pagination from '@/components/items/Pagination';
import SelectListShow from '@/components/items/SelectListShow';
import ProductItem from '@/components/ProductItem';
import { useState } from 'react'
import { BsChevronRight } from "react-icons/bs";


const List = [
    { id: 3, title: "Arabica Coffee", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi3.png" },
    { id: 1, title: "Tubruk Robusta", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi1.png" },
    { id: 4, title: "Kopi Tolaki", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi4.png" },
    { id: 2, title: "Tolaki Robusta", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi2.png" },
    { id: 5, title: "Arabica Coffee", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi3.png" },
    { id: 6, title: "Tubruk Robusta", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi1.png" },
    { id: 7, title: "Kopi Tolaki", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi4.png" },
    { id: 8, title: "Tolaki Robusta", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi2.png" },
    { id: 9, title: "Arabica Coffee", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi3.png" },
    { id: 10, title: "Tubruk Robusta", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi1.png" },
    { id: 11, title: "Kopi Tolaki", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi4.png" },
    { id: 12, title: "Tolaki Robusta", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi2.png" },
]

const ContentProduct = () => {

    const [pageShow, setPageShow] = useState<number | string>(8)


    return (
        <div>
            <div className='grid grid-cols-12 items-center'>
                <div className='col-span-2'>
                    <SelectListShow
                        onChange={(val) => {
                            setPageShow(val)
                        }}
                        size='sm' />
                </div>
                <div className='flex justify-end gap-2 col-span-10'>
                    <button className='btn-dropdown'>
                        <p className='flex-1'>Terpoluer</p>
                        <BsChevronRight className='w-5' />
                    </button>
                    <button className='btn-dropdown'>
                        <p className='flex-1'>Terpoluer</p>
                        <BsChevronRight className='w-5' />
                    </button>
                </div>

            </div>

            <div className='grid grid-cols-12 gap-3 mt-3'>
                {
                    List.map((item, i) => (

                        <div className='col-span-3' key={i}>
                            <ProductItem item={item} />
                        </div>
                    ))

                }
            </div>

            <div className='grid grid-cols-12 py-5'>
                <div className='col-span-10'>
                    <Pagination total={999} limit={5} />
                </div>
                <div className='col-span-2'>
                    <SelectListShow
                        onChange={(val) => {
                            setPageShow(val)
                        }}
                        size='sm' />
                </div>
            </div>

        </div>
    )
}

export default ContentProduct
