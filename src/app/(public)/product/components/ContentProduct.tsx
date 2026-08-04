"use client"

import InputField from '@/components/items/InputField';
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

interface formProps {
    id: string,
    title: string,
    price: number,
    unit_price: string,
    stock: number,
    desc: string,
    img: File[],
}


const ContentProduct = () => {

    const [pageShow, setPageShow] = useState<number | string>(8)
    const [form, setForm] = useState<formProps>({
        id: "",
        title: "",
        price: 0,
        unit_price: "",
        stock: 0,
        desc: "",
        img: [],
    })

    const SetObjForm = (data: string | number | File[], key: keyof formProps) => {
        setForm({
            ...form,
            [key]: data
        })
    }



    return (
        <div>
            <div className='grid grid-cols-12 items-center'>
                <div className='col-span-5'>
                    <InputField
                        type="text"
                        value={form.unit_price}
                        onChange={(e) => SetObjForm(e, "unit_price")}
                        placholder="Cari Product"
                    />
                </div>
                <div className='flex justify-end gap-2 col-span-7'>
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

            <div className='flex justify-center items-center pt-10'>
                <div className=''>
                    <Pagination total={999} limit={5} />
                </div>
            </div>

        </div>
    )
}

export default ContentProduct
