import React from 'react'
import { PiMapPinLineDuotone, PiPhoneDuotone, PiEnvelopeDuotone, PiTimerDuotone } from "react-icons/pi";
import ItemInfoContact from './informationContact/ItemInfoContact';
import GoogleMap from "@/components/GoogleMap";

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
        </div>
    )
}

export default InformationContact
