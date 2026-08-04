import ProductItem from '@/components/ProductItem';
import React from 'react'
import { BsChevronRight } from "react-icons/bs";

const List = [
    { id: 3, title: "Arabica Coffee", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi3.png" },
    { id: 1, title: "Tubruk Robusta", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi1.png" },
    { id: 4, title: "Kopi Tolaki", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi4.png" },
    { id: 2, title: "Tolaki Robusta", subtitle: "Medium Roast", price: 85000, sat: "200gr", img: "/images/kopi2.png" },
]

const ContentProduct = () => {
    return (
        <div>
            <div className='flex gap-2'>
                <button className='btn-dropdown'>
                    <p className='flex-1'>Terpoluer</p>
                    <BsChevronRight className='w-5' />
                </button>
                <button className='btn-dropdown'>
                    <p className='flex-1'>Terpoluer</p>
                    <BsChevronRight className='w-5' />
                </button>
            </div>

            <div>
                {
                    List.map((item, i) => (

                        <div key={i}>
                            <ProductItem item={item} />
                        </div>
                    ))

                }
            </div>
        </div>
    )
}

export default ContentProduct
