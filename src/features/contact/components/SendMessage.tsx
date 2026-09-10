"use client"

import { useState } from 'react'
import Button from '@/components/items/Button';
import InputField from '@/components/items/InputField'
import InputtextArea from '@/components/items/InputtextArea'




const SendMessage = () => {

    const [input, setInput] = useState<string>("")

    return (
        <div>
            <p className='text-[12px]'>Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.</p>

            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-3 pt-5'>
                <div className='col-span-1'>
                    <InputField
                        title='Nama Lengkap'
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e as string)}
                    />
                </div>
                <div className='col-span-1'>
                    <InputField
                        title='Nama Lengkap'
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e as string)}
                    />
                </div>
            </div>
            <div className='pt-3'>
                <InputField
                    title='Nama Lengkap'
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e as string)}
                />
            </div>
            <div className='pt-3'>
                <InputField
                    title='Nama Lengkap'
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e as string)}
                />
            </div>
            <div className='pt-3'>
                <InputtextArea
                    title='Pesan Anda'
                    value={input}
                    onChange={(e) => setInput(e as string)}
                />
            </div>

            <div className='mt-5'>
                {/* <button className='hei'>
                    Dapatkan Arah
                </button> */}
                <Button>
                    <p>sdfsdfsdf</p>
                </Button>
            </div>
        </div>
    )
}

export default SendMessage
