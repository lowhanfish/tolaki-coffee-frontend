// app/login/page.tsx
'use client';


import { useState } from 'react'
import InputField from '@/components/items/InputField';
import { GoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import Button from '@/components/items/Button';
import { PiLockKeyDuotone } from "react-icons/pi";




export default function LoginPage() {

    const [username, SetUsername] = useState<string>("")
    const [password, SetPassword] = useState<string>("")



    const handleSuccess = async (credentialResponse: any) => {
        // // credentialResponse.credential berisi ID Token dari Google
        // const res = await fetch('http://localhost:3000/auth/google', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ token: credentialResponse.credential }),
        // });

        // const data = await res.json();
        // // Simpan JWT access_token dari NestJS ke state / cookie / storage
        // console.log('Login sukses:', data);


        console.log(credentialResponse)
    };

    return (
        <main className='bg flex flex-col h-full text-neutral-800 md:p-1'>
            <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
                <section className='col-span-1 relative h-full hidden md:block'>
                    <Image
                        alt='Image Login'
                        src={`/images/bg.webp`}
                        fill
                        priority
                        className='object-cover'
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                </section>
                <section className='col-span-1 flex h-full w-full items-center justify-center relative'>

                    <div className='absolute inset-0 block md:hidden'>
                        <Image
                            alt='Image Login'
                            src={`/images/bg.webp`}
                            fill
                            priority
                            className='object-cover'
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    </div>

                    <div className='p-10 md:p-0 z-10 w-full flex justify-center'>
                        <div className='w-full md:w-100 px-10 md:px-15 py-5 md:py-10 rounded-sm shadow-md bg-white/20 md:bg-white/60 backdrop-blur-md'>

                            <div className='flex flex-col justify-center items-center text-center md:text-neutral-700 w-full '>

                                <div className='p-3 rounded-full bg-amber-600/40 md:bg-amber-600/20 '>
                                    <PiLockKeyDuotone className='text-[32px] text-white/60 md:text-yellow-600' />
                                </div>

                                <p className='text-[32px] font-bold'>Login User</p>
                                <div className='text-[11px] text-white/70 md:text-neutral-500 leading-4'>
                                    <p>Masuk ke Dashboard Admin Kopi Anoa</p>
                                    <p>Untuk mengelola konten dan data</p>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 pt-5'>
                                <InputField
                                    type='text'
                                    value={username}
                                    onChange={(e) => SetUsername(e as string)}
                                    title='Username'
                                />
                                <InputField
                                    type='text'
                                    value={username}
                                    onChange={(e) => SetUsername(e as string)}
                                    title='Password'
                                />
                                <div className='flex'>
                                    <label className='flex-1 flex gap-2 items-center cursor-pointer'>
                                        <input type="checkbox" className='accent-amber-600 cursor-pointer' />
                                        <span className='text-[12px] text-neutral-600 '>Ingat Saya</span>
                                    </label>

                                    <div className='flex-1 flex justify-end'>
                                        <p className='font-semibold text-[12px] text-yellow-700/70 cursor-pointer'>Lupa Password</p>
                                    </div>
                                </div>

                                <div>
                                    <Button>
                                        <p className='text-[13px] font-semibold text-white text-shadow-2xs'>Login</p>
                                    </Button>
                                </div>

                                <div className='pt-3'>
                                    <GoogleLogin onSuccess={handleSuccess} onError={() => console.log('Login Gagal')} />
                                </div>

                            </div>


                        </div>



                    </div>

                </section>
            </div>


        </main>
    );
}