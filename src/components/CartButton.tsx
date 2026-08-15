import React from 'react'
import { BsCart4 } from "react-icons/bs";

const CartButton = () => {
    return (
        <button className="
            h-18 w-18 
            bg-linear-to-l from-yellow-900  to-amber-700 hover:from-yellow-700  hover:to-amber-900
            rounded-full 
            cursor-pointer 
            border-2 border-white
        ">
            <div className='h-full w-full flex justify-center items-center'>
                <p className='absolute bg-red-500 w-5 h-5 top-3 right-3 rounded-full text-[12px] font-bold'>5</p>
                <BsCart4 className='text-[30px]' />
            </div>
        </button>
    )
}

export default CartButton
