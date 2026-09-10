import React from 'react'
import { PiPlantDuotone } from "react-icons/pi";
import { RiLandscapeAiLine } from "react-icons/ri";
import { IoMdPin } from "react-icons/io";
import CardImpact from './impact/CardImpact';


const Impact = () => {
    return (
        <div className='text-neutral-800'>

            <div className='grid grid-cols-1 md:grid-cols-3'>

                <div className='col-span-1'>
                    <CardImpact
                        title='Petani Mitra Lokal'
                        subtitle='Kopi pilihan dari petani lokal di Sulawesi Tenggara'
                        total="250+"
                        position="start"
                    >
                        <PiPlantDuotone className='primary-color text-[50px]' />
                    </CardImpact>
                </div>
                <div className='col-span-1'>
                    <CardImpact
                        title='Hektar Lahan Berkelanjutan'
                        subtitle='Lahan kopi seluas lebih dari 150 hektar dikelola secara berkelanjutan.'
                        total="150"
                        border={true}
                        position="center"
                    >
                        <RiLandscapeAiLine className='primary-color text-[50px]' />
                        {/* <div className='text-[15px] font-bold text-neutral-400 leading-5.5'>
                            <p>Hektar Lahan</p>
                            <p>Berkelanjutan</p>
                            </div> */}
                    </CardImpact>
                </div>
                <div className='col-span-1'>
                    <CardImpact
                        title='Wilayah Sebaran di Sultra'
                        subtitle='Bermitra di S wilayah utama Sulawesi Tenggara.'
                        total="5"
                        position="end"
                    >
                        <IoMdPin className='primary-color text-[50px]' />
                        {/* <div className='text-[15px] font-bold text-neutral-400 leading-5.5'>
                            <p>Wilayah Sebaran</p>
                            <p>di Sultra</p>
                        </div> */}
                    </CardImpact>
                </div>
            </div>

        </div>
    )
}

export default Impact
