import React from 'react'
import { PiMapPinLineDuotone, PiPhoneDuotone, PiEnvelopeDuotone, PiTimerDuotone } from "react-icons/pi";
import ItemInfoContact from './informationContact/ItemInfoContact';
import GoogleMap from "@/components/GoogleMap";
import Button from '@/components/items/Button';


const InformationContact = () => {
    return (
        <div className='flex flex-col gap-3 pt-5'>
            <div>
                <ItemInfoContact
                    title='Alamat'
                    desc='Kendari, Sulawesi Tenggara Indonesia'
                >
                    <PiMapPinLineDuotone className='primary-color text-[20px]' />
                </ItemInfoContact>
            </div>
            <div>
                <ItemInfoContact
                    title='Telepon'
                    desc='+62 812-3456-7890'
                >
                    <PiPhoneDuotone className='primary-color text-[20px]' />
                </ItemInfoContact>
            </div>
            <div>
                <ItemInfoContact
                    title='Email'
                    desc='info@kopitolaki.id'
                >
                    <PiEnvelopeDuotone className='primary-color text-[20px]' />
                </ItemInfoContact>
            </div>
            <div>
                <ItemInfoContact
                    title='Jam Operasional'
                    desc='Senin - Sabtu'
                >
                    <PiTimerDuotone className='primary-color text-[20px]' />
                </ItemInfoContact>
            </div>

            <div>
                <GoogleMap />
            </div>

            <div>
                <button className='border border-neutral-400 rounded-2xl 
                w-full 
                cursor-pointer
                py-1
                '>
                    <div>
                        <p className='font-bold text-[12px]'>Dapatkan Arah</p>
                    </div>
                </button>

            </div>
        </div>
    )
}

export default InformationContact
