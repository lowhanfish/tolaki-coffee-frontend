"use client"

import { useState } from 'react'
import Button from '@/components/items/Button';
import InputField from '@/components/items/InputField'
import InputtextArea from '@/components/items/InputtextArea'
import { useDataStore } from '@/stores/dataStore';
import { fetchApi } from '@/lib/apiFetch';
import { BsSendFill } from 'react-icons/bs';

const SendMessage = () => {
    const url = useDataStore((state) => state.url)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !email || !subject || !message) {
            alert('Harap lengkapi nama, email, subjek, dan pesan Anda.')
            return
        }

        setLoading(true)
        try {
            await fetchApi(`${url}/contact/send-message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    phone: phone || undefined,
                    subject,
                    message,
                }),
            })

            alert('Terima kasih! Pesan Anda telah berhasil dikirim ke tim Kopi Tolaki.')
            setName('')
            setEmail('')
            setPhone('')
            setSubject('')
            setMessage('')
        } catch (error: any) {
            console.error('Send message error:', error)
            alert(error?.message || 'Gagal mengirim pesan. Silakan coba lagi.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-3 pt-2 text-neutral-800'>
            <p className='text-[12px] text-neutral-500'>
                Punya pertanyaan, tawaran kerja sama, atau ingin berkunjung ke kebun mitra kami? Isi formulir di bawah ini.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 pt-2'>
                <InputField
                    title='Nama Lengkap'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e as string)}
                    placholder='Nama Anda'
                />
                <InputField
                    title='Email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e as string)}
                    placholder='email@example.com'
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <InputField
                    title='Nomor Telepon / WA (Opsional)'
                    type='text'
                    value={phone}
                    onChange={(e) => setPhone(e as string)}
                    placholder='081234567890'
                />
                <InputField
                    title='Subjek Pesan'
                    type='text'
                    value={subject}
                    onChange={(e) => setSubject(e as string)}
                    placholder='Contoh: Permintaan Kemitraan'
                />
            </div>

            <div>
                <InputtextArea
                    title='Pesan Anda'
                    value={message}
                    onChange={(e) => setMessage(e as string)}
                />
            </div>

            <div className='pt-2'>
                <Button color='primary' htmlType='submit' disabled={loading}>
                    <div className='flex items-center justify-center gap-2 py-1 px-4'>
                        <BsSendFill className='text-xs' />
                        <span className='text-xs font-bold text-white'>
                            {loading ? 'Mengirim...' : 'Kirim Pesan'}
                        </span>
                    </div>
                </Button>
            </div>
        </form>
    )
}

export default SendMessage
