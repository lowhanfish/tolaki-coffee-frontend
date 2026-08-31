// app/login/page.tsx
'use client';

import { useState } from 'react';
import InputField from '@/components/items/InputField';
import { GoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import Button from '@/components/items/Button';
import { PiLockKeyDuotone } from 'react-icons/pi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, SetUsername] = useState<string>('');
    const [password, SetPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    // Handler untuk Google OAuth Login
    const handleSuccess = async (credentialResponse: { credential?: string }) => {
        setIsLoading(true);
        try {
            if (!credentialResponse.credential) {
                alert('Credential Google tidak ditemukan. Silakan coba lagi.');
                return;
            }

            const res = await fetch('http://localhost:3001/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    credential: credentialResponse.credential,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                console.log('Login Google NestJS Sukses:', data.user);
                router.push('/home');
            } else {
                console.error('Login NestJS Gagal:', data.message);
                alert(`Login Gagal: ${data.message || 'Terjadi kesalahan'}`);
            }
        } catch (error) {
            console.error('Error saat menghubungi server backend:', error);
            alert('Gagal terhubung ke server NestJS.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handler untuk Form Manual (Username & Password)
    const handleManualLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('access_token', data.access_token);
                if (data.refresh_token) {
                    localStorage.setItem('refresh_token', data.refresh_token);
                }
                router.push('/dashboard');
            } else {
                alert(data.message || 'Username atau Password salah');
            }
        } catch (error) {
            console.error('Error saat login manual:', error);
            alert('Gagal terhubung ke server NestJS.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="bg flex flex-col h-full text-neutral-800 md:p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Gambar Kiri (Desktop) */}
                <section className="col-span-1 relative h-full hidden md:block">
                    <Image
                        alt="Image Login"
                        src="/images/bg.webp"
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                </section>

                {/* Form Kanan */}
                <section className="col-span-1 flex h-full w-full items-center justify-center relative">
                    {/* Gambar Background (Mobile) */}
                    <div className="absolute inset-0 block md:hidden">
                        <Image
                            alt="Image Login"
                            src="/images/bg.webp"
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    </div>

                    <div className="p-10 md:p-0 z-10 w-full flex justify-center">
                        <div className="w-full md:w-100 px-10 md:px-15 py-15 md:py-12 rounded-sm shadow-md bg-white/20 md:bg-white/60 backdrop-blur-md">
                            {/* Header */}
                            <div className="flex flex-col justify-center items-center text-center md:text-neutral-700 w-full">
                                <div className="p-3 rounded-full bg-amber-600/40 md:bg-amber-600/20">
                                    <PiLockKeyDuotone className="text-[32px] text-white/60 md:text-yellow-600" />
                                </div>

                                <p className="text-[32px] font-bold">Login User</p>
                                <div className="text-[11px] text-white/70 md:text-neutral-500 leading-4">
                                    <p>Masuk ke Dashboard Admin Kopi Anoa</p>
                                    <p>Untuk mengelola konten dan data</p>
                                </div>
                            </div>

                            {/* Form Input */}
                            <form onSubmit={handleManualLogin} className="flex flex-col gap-2 pt-5">
                                <InputField
                                    type="text"
                                    value={username}
                                    onChange={(e) => SetUsername(e as string)}
                                    title="Username"
                                />

                                {/* Fixed: Binding value & onChange disesuaikan ke state `password` */}
                                <InputField
                                    type="password"
                                    value={password}
                                    onChange={(e) => SetPassword(e as string)}
                                    title="Password"
                                />

                                <div className="flex">
                                    <label className="flex-1 flex gap-2 items-center cursor-pointer">
                                        <input type="checkbox" className="accent-amber-600 cursor-pointer" />
                                        <span className="text-[12px] text-neutral-600">Ingat Saya</span>
                                    </label>

                                    <div className="flex-1 flex justify-end">
                                        <p className="font-semibold text-[12px] text-yellow-700/70 cursor-pointer">
                                            Lupa Password
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <Button size="h-10">
                                        <p className="text-[13px] font-semibold text-white text-shadow-2xs">
                                            {isLoading ? 'Memuat...' : 'Login'}
                                        </p>
                                    </Button>
                                </div>

                                <div className="flex gap-2 items-center">
                                    <div className="w-full bg-white md:bg-black/20 h-[0.5px]"></div>
                                    <p className="text-[10px] text-white md:text-neutral-500">atau</p>
                                    <div className="w-full bg-white md:bg-black/20 h-[0.5px]"></div>
                                </div>


                                <GoogleLogin
                                    onSuccess={handleSuccess}
                                    onError={() => console.log('Login Gagal')}
                                />

                                <div className="pt-2">
                                    <Button
                                        type="button"
                                        size="h-12"
                                        onClick={() => router.back()}
                                        color="danger"
                                    >
                                        <p className="text-[13px] font-semibold text-white text-shadow-2xs">Cancel</p>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
