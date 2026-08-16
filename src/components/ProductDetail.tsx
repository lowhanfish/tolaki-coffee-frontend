import React from 'react'
import Image from 'next/image'
import Button from './items/Button'
import { BsFillCartCheckFill, BsCartPlusFill, BsFillStarFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";



const ProductDetail = () => {
    return (
        <div className='w-full h-full pb-5'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-3'>
                <div className='col-span-1 lg:col-span-5 relative '>
                    <div className='w-full h-100 relative'>
                        <Image
                            alt='Product Image'
                            src={`/images/kopi4.png`}
                            sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
                            fill
                            className='object-cover'
                            loading='eager'
                        />
                    </div>



                    <div className='
                    absolute inset-0 
                    bg-red-300
                    flex
                    '>
                        <button className='w-10 flex items-center justify-center bg-blue-300'>
                            <BsChevronLeft className='' />
                        </button>
                        <div className='flex-1 flex items-center justify-center'>yyy</div>
                        <button className='w-10 flex items-center justify-center bg-blue-300'>zzz</button>
                    </div>
                </div>
                <div className='col-span-1 lg:col-span-7 w-full text-[13px] px-3 lg:px-7'>
                    <p className='text-[22px] font-bold'>Posh Hijab Spray Cologne Green Blossom Botol 150 ml x2</p>
                    <div className='flex gap-3 items-center'>
                        <div className='flex gap-1'>
                            <BsFillStarFill className='text-amber-500' />
                            <BsFillStarFill className='text-amber-500' />
                            <BsFillStarFill className='text-amber-500' />
                            <BsFillStarFill className='text-amber-500' />
                            <BsFillStarFill className='text-neutral-700' />
                        </div>
                        <div>
                            <p>66 Penilaian</p>
                        </div>
                        <div>
                            <p>1 Ribu+ Terjual</p>
                        </div>
                    </div>
                    <div className='
                        flex gap-3 items-center
                        w-full lg:w-100 p-3 mt-5
                        rounded-md
                        bg-linear-to-r
                        from-yellow-500
                        to-amber-400
                        text-white text-[26px] font-bold
                        text-shadow-md
                    '>
                        <p>Rp37.400</p>
                        <p className='text-neutral-600 text-[16px] text-shadow-none font-light line-through'>Rp46.000</p>
                        <p className='text-[13px]'>-19%</p>
                    </div>
                    <div className=' border-y-2 border-dashed mt-5 py-3 border-neutral-300'>
                        <div className='flex items-center'>
                            <p className='w-25 font-semibold text-neutral-700'>Size</p>
                            <div className='
                            flex-1 
                            flex gap-3
                            items-center
                        '>

                                <label className='cheklist-product'>
                                    <input type="checkbox" name="" id="" />
                                    <p className='text-[12px] text-neutral-600 font-semibold'>300 gr</p>
                                </label>
                                <label className='cheklist-product'>
                                    <input type="checkbox" name="" id="" />
                                    <p className='text-[12px] text-neutral-600 font-semibold'>300 gr</p>
                                </label>
                                <label className='cheklist-product'>
                                    <input type="checkbox" name="" id="" />
                                    <p className='text-[12px] text-neutral-600 font-semibold'>300 gr</p>
                                </label>

                            </div>
                        </div>

                        <div className='flex items-center mt-3'>
                            <p className='w-25 font-semibold text-neutral-700'>Kuantitas</p>
                            <div className='flex'>
                                <button className='h-8 w-10 bg-neutral-400 cursor-pointer font-bold text-white'>-</button>
                                <input className='h-8 w-20 bg-white p-2' type="number" />
                                <button className='h-8 w-10 bg-neutral-400 cursor-pointer font-bold text-white'>+</button>
                            </div>
                            <p className='pl-3'>Tersedia</p>
                        </div>
                        <div className='flex items-center mt-3'>
                            <p className='w-25 font-semibold text-neutral-700'>Tersedia</p>
                            <p className=''>12 Product</p>
                        </div>
                        <div className='flex  mt-3'>
                            <p className='w-25 font-semibold text-neutral-700'>Deskripsi</p>
                            <p className='flex-1'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae eaque explicabo dolorem! Quod magni, cupiditate corporis sunt facere provident delectus porro earum voluptatibus suscipit, nihil eligendi. Cupiditate est repellat beatae.</p>
                        </div>

                    </div>

                    <div className='flex flex-col md:flex-row gap-3 md:gap-5 mt-5'>
                        <div className='w-full lg:w-50'>
                            <Button size='h-15 md:h-10 '>
                                <div className='flex gap-3 justify-center items-center'>
                                    <BsFillCartCheckFill className='text-[22px] text-neutral-100' />
                                    <p className='text-neutral-100 text-[13px] font-bold text-shadow-md'>Beli Sekarang</p>
                                </div>
                            </Button>
                        </div>
                        <div className='w-full lg:w-50'>
                            <Button size='h-15 md:h-10 ' color='danger'>
                                <div className='flex gap-3 justify-center items-center'>
                                    <BsCartPlusFill className='text-[22px] text-neutral-100' />
                                    <p className='text-neutral-100 text-[13px] font-bold text-shadow-md'>Masukkan Keranjang</p>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
