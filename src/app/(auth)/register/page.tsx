'use client'

import { useState } from 'react'
import InputField from '@/components/items/InputField'
import Image from 'next/image'
import Button from '@/components/items/Button'
import { PiUserPlusDuotone } from 'react-icons/pi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useDataStore } from '@/stores/dataStore'
import useCheckAuth from '@/hooks/useCheckAuth'

export default function RegisterPage() {
    const url = useDataStore((state) => state.url)
    const router = useRouter()
    const checkAuth = useCheckAuth()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [loadingState, setLoadingState] = useState(false)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password || !passwordConfirmation) {
            alert('Harap isi semua kolom wajib.')
            return
        }

        if (password !== passwordConfirmation) {
            alert('Konfirmasi password tidak cocok.')
            return
        }

        if (password.length < 6 || password.length > 12) {
            alert('Password harus antara 6 hingga 12 karakter.')
            return
        }

        setLoadingState(true)
        try {
            const res = await fetch(`${url}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    name: name || undefined,
                    password,
                    passwordConfirmation,
                }),
            })

            const data = await res.json()

            if (res.ok) {
                alert('Registrasi berhasil!')
                await checkAuth()
                router.push('/home')
            } else {
                alert(data.message || 'Registrasi gagal')
            }
        } catch (error) {
            console.error('Error saat registrasi:', error)
            alert('Gagal terhubung ke server.')
        } finally {
            setLoadingState(false)
        }
    }

    return (
        <main className="bg flex flex-col h-full text-neutral-800 md:p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Gambar Kiri (Desktop) */}
                <section className="col-span-1 relative h-full hidden md:block">
                    <Image
                        alt="Image Register"
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
                            alt="Image Register"
                            src="/images/bg.webp"
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    </div>

                    <div className="p-10 md:p-0 z-10 w-full flex justify-center">
                        <div className="w-full md:w-105 px-8 md:px-12 py-10 md:py-10 rounded-sm shadow-md bg-white/20 md:bg-white/70 backdrop-blur-md">
                            {/* Header */}
                            <div className="flex flex-col justify-center items-center text-center md:text-neutral-700 w-full">
                                <div className="p-3 rounded-full bg-amber-600/40 md:bg-amber-600/20">
                                    <PiUserPlusDuotone className="text-[32px] text-white/60 md:text-yellow-600" />
                                </div>

                                <p className="text-[30px] font-bold">Daftar Akun Baru</p>
                                <div className="text-[11px] text-white/70 md:text-neutral-500 leading-4">
                                    <p>Bergabunglah bersama keluarga besar Kopi Tolaki</p>
                                </div>
                            </div>

                            {/* Form Input */}
                            <form onSubmit={handleRegister} className="flex flex-col gap-2 pt-4">
                                <InputField
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e as string)}
                                    title="Nama Lengkap (Opsional)"
                                    placholder="Nama Anda"
                                />

                                <InputField
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e as string)}
                                    title="Email"
                                    placholder="email@example.com"
                                />

                                <InputField
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e as string)}
                                    title="Password (6-12 karakter)"
                                />

                                <InputField
                                    type="password"
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e as string)}
                                    title="Ulangi Password"
                                />

                                <div className="pt-2">
                                    <Button size="h-10" htmlType="submit" disabled={loadingState}>
                                        <p className="text-[13px] font-semibold text-white text-shadow-2xs">
                                            {loadingState ? 'Mendaftar...' : 'Daftar Sekarang'}
                                        </p>
                                    </Button>
                                </div>

                                <div className="text-center pt-2 text-xs text-neutral-600">
                                    <span>Sudah punya akun? </span>
                                    <Link href="/login" className="font-bold text-amber-800 hover:underline">
                                        Masuk di sini
                                    </Link>
                                </div>

                                <div className="pt-1">
                                    <Button
                                        htmlType="button"
                                        disabled={loadingState}
                                        size="h-10"
                                        onClick={() => router.back()}
                                        color="danger"
                                    >
                                        <p className="text-[13px] font-semibold text-white text-shadow-2xs">Batal</p>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
