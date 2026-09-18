'use client'

import React from 'react'
import { PiMapPinLineDuotone, PiPhoneDuotone, PiEnvelopeDuotone, PiTimerDuotone } from "react-icons/pi";
import ItemInfoContact from './informationContact/ItemInfoContact';
import GoogleMap from "@/components/GoogleMap";
import { useQuery } from '@tanstack/react-query';
import { useDataStore } from '@/stores/dataStore';
import { fetchApi } from '@/lib/apiFetch';

const defaultInfo = {
    address: 'Kendari, Sulawesi Tenggara, Indonesia',
    phone: '+62 812-3456-7890',
    email: 'info@kopitolaki.id',
    openHours: 'Senin - Sabtu: 08.00 - 22.00',
    mapsUrl: 'https://maps.google.com',
}

const InformationContact = () => {
    const url = useDataStore((state) => state.url)

    const { data: response } = useQuery<any>({
        queryFn: () => fetchApi(`${url}/contact/read`),
        queryKey: ['public-contact-info'],
    })

    const contact = response?.data?.[0] || defaultInfo

    return (
        <div className='flex flex-col gap-3 pt-5 text-neutral-800'>
            <div>
                <ItemInfoContact
                    title='Alamat'
                    desc={contact.address || defaultInfo.address}
                >
                    <PiMapPinLineDuotone className='primary-color text-[20px]' />
                </ItemInfoContact>
            </div>
            <div>
                <ItemInfoContact
                    title='Telepon'
                    desc={contact.phone || defaultInfo.phone}
                >
                    <PiPhoneDuotone className='primary-color text-[20px]' />
                </ItemInfoContact>
            </div>
            <div>
                <ItemInfoContact
                    title='Email'
                    desc={contact.email || defaultInfo.email}
                >
                    <PiEnvelopeDuotone className='primary-color text-[20px]' />
                </ItemInfoContact>
            </div>
            <div>
                <ItemInfoContact
                    title='Jam Operasional'
                    desc={contact.openHours || defaultInfo.openHours}
                >
                    <PiTimerDuotone className='primary-color text-[20px]' />
                </ItemInfoContact>
            </div>

            <div>
                <GoogleMap />
            </div>

            <div>
                <a
                    href={contact.mapsUrl || 'https://maps.google.com'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block'
                >
                    <button className='border border-neutral-400 rounded-2xl w-full cursor-pointer py-2 hover:bg-neutral-100 transition'>
                        <p className='font-bold text-[12px] text-neutral-700'>Buka di Google Maps</p>
                    </button>
                </a>
            </div>
        </div>
    )
}

export default InformationContact
