'use client'

import React from 'react'
import { PiPlantDuotone } from "react-icons/pi";
import { RiLandscapeAiLine } from "react-icons/ri";
import { IoMdPin } from "react-icons/io";
import CardImpact from './impact/CardImpact';
import { useQuery } from '@tanstack/react-query';
import { useDataStore } from '@/stores/dataStore';
import { fetchApi } from '@/lib/apiFetch';

const Impact = () => {
    const url = useDataStore((state) => state.url)

    const { data: response } = useQuery<{ total: number; data: any[] }>({
        queryFn: () => fetchApi(`${url}/partner/read`),
        queryKey: ['public-impact'],
    })

    const partners = response?.data || []
    const totalRegions = partners.length > 0 ? partners.length : 8
    const totalArea = partners.length > 0
        ? partners.reduce((acc, curr) => acc + (Number(curr.area) || 0), 0)
        : 150

    return (
        <div className='text-neutral-800'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-3'>
                <div className='col-span-1'>
                    <CardImpact
                        title='Kelompok Petani Mitra'
                        subtitle='Kemitraan erat bersama petani kopi lokal di Sulawesi Tenggara'
                        total={`${totalRegions * 15}+`}
                        position="start"
                    >
                        <PiPlantDuotone className='primary-color text-[50px]' />
                    </CardImpact>
                </div>
                <div className='col-span-1'>
                    <CardImpact
                        title='Hektar Lahan Berkelanjutan'
                        subtitle='Lahan binaan dikelola dengan praktik ramah lingkungan dan terintegrasi.'
                        total={String(Math.round(totalArea))}
                        border={true}
                        position="center"
                    >
                        <RiLandscapeAiLine className='primary-color text-[50px]' />
                    </CardImpact>
                </div>
                <div className='col-span-1'>
                    <CardImpact
                        title='Wilayah Sebaran di Sultra'
                        subtitle='Bermitra di wilayah dataran tinggi utama Sulawesi Tenggara.'
                        total={String(totalRegions)}
                        position="end"
                    >
                        <IoMdPin className='primary-color text-[50px]' />
                    </CardImpact>
                </div>
            </div>
        </div>
    )
}

export default Impact
