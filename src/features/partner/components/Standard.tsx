import React, { Fragment } from 'react'
import ItemArea from './standard/ItemArea'
import ItemStandard from './standard/ItemStandard'
import { FaHandHoldingUsd } from "react-icons/fa";
import { PiStudentDuotone, PiPottedPlantDuotone, PiSealCheckDuotone, PiPlantDuotone, PiFarmLight } from "react-icons/pi";



const Standard = () => {
    return (
        <div className='text-neutral-700 '>
            <p className='title-header-3'>Standar Kemitraan</p>
            <p className='text-[13px]'>Kami menjalankan program kemitraan yang berlandaskan pada prinsip-prinsip berikut:</p>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-15 pt-5'>
                <div className='col-span-1'>

                    <div className=''>
                        <table className='w-full'>
                            <tbody>
                                <tr className=''>
                                    <td className='px-5 py-3 w-[33%] border-b-[0.5px] border-neutral-400'>
                                        <ItemStandard title='Harga yang adil'>
                                            <FaHandHoldingUsd className='text-center text-[50px] primary-color' />
                                        </ItemStandard>
                                    </td>
                                    <td className='px-5 py-3 w-[33%] border-[0.5px] border-t-0 border-neutral-400'>
                                        <ItemStandard title='Pelatihan & Pendampingan'>
                                            <PiStudentDuotone className='text-center text-[50px] primary-color' />
                                        </ItemStandard>
                                    </td>
                                    <td className='px-5 py-3 w-[33%] border-b-[0.5px] border-neutral-400'>
                                        <ItemStandard title='Keberlanjutan Lingkungan'>
                                            <PiPottedPlantDuotone className='text-center text-[50px] primary-color' />
                                        </ItemStandard>
                                    </td>
                                </tr>
                                <tr className=''>
                                    <td className='px-5 py-3 '>
                                        <ItemStandard title='Mutu & Kualitas Terjamin'>
                                            <PiSealCheckDuotone className='text-center text-[50px] primary-color' />
                                        </ItemStandard>
                                    </td>
                                    <td className='px-5 py-3 border-[0.5px] border-b-0 border-neutral-400'>
                                        <ItemStandard title='Pertanian Ramah Lingkungan'>
                                            <PiPlantDuotone className='text-center text-[50px] primary-color' />
                                        </ItemStandard>
                                    </td>
                                    <td className='px-5 py-3 '>
                                        <ItemStandard title='Pemberdayaan Petani'>
                                            <PiFarmLight className='text-center text-[50px] primary-color' />
                                        </ItemStandard>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className='border-[0.5px] border-neutral-400 rounded-2xl p-5 bg2'>
                        <p className='title-header-4'>Wilayah Kemitraan Kami</p>
                        <p className='text-[12px]'>Bermitra dengan petani kopi di berbagai daerah unggulan di Sulawesi Tenggara.</p>

                        <div className='grid grid-cols-2 gap-2 mt-5'>
                            <div className='col-span-1'>
                                <ItemArea title='Konawe Selatan' />
                            </div>
                            <div className='col-span-1'>
                                <ItemArea title='Konawe' />
                            </div>
                            <div className='col-span-1'>
                                <ItemArea title='Kolaka' />
                            </div>
                            <div className='col-span-1'>
                                <ItemArea title='Kolaka Timur' />
                            </div>
                            <div className='col-span-1'>
                                <ItemArea title='Bombana' />
                            </div>


                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Standard
