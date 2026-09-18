'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HeaderPage from '@/components/HeaderPage'
import Button from '@/components/items/Button'
import InputField from '@/components/items/InputField'
import InputtextArea from '@/components/items/InputtextArea'
import { useCartStore } from '@/stores/cartStore'
import { useDataStore } from '@/stores/dataStore'
import { fetchApi } from '@/lib/apiFetch'
import { BsBagX, BsTrash, BsWhatsapp, BsCheckCircleFill, BsArrowRight } from 'react-icons/bs'

const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(val)

const CartPage = () => {
    const url = useDataStore((state) => state.url)
    const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore()

    const [mounted, setMounted] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [notes, setNotes] = useState('')
    const [loading, setLoading] = useState(false)
    const [completedOrder, setCompletedOrder] = useState<any>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const totalPrice = getTotalPrice()

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault()
        if (items.length === 0) {
            alert('Keranjang Anda kosong')
            return
        }
        if (!name || !phone || !address) {
            alert('Harap lengkapi nama, nomor telepon, dan alamat pengiriman.')
            return
        }

        setLoading(true)
        try {
            const payload = {
                customerName: name,
                customerPhone: phone,
                customerEmail: email || undefined,
                shippingAddress: address,
                notes: notes || undefined,
                totalAmount: totalPrice,
                items: items.map((item) => ({
                    productId: item.id,
                    title: item.title,
                    price: Number(item.price),
                    quantity: item.quantity,
                    subtotal: Number(item.price) * item.quantity,
                })),
            }

            const response = await fetchApi<any>(`${url}/order/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            setCompletedOrder(response)
            clearCart()
        } catch (error: any) {
            console.error('Checkout error:', error)
            alert(error.message || 'Gagal membuat pesanan. Silakan coba lagi.')
        } finally {
            setLoading(false)
        }
    }

    const getWhatsAppUrl = () => {
        if (!completedOrder) return '#'
        const orderNumber = completedOrder.orderNumber || 'TK-ORDER'
        const productList = completedOrder.items
            ?.map((it: any) => `- ${it.title} (${it.quantity}x) = ${formatRupiah(Number(it.subtotal))}`)
            .join('%0A') || ''

        const text = `Halo Admin Kopi Tolaki, saya ingin konfirmasi pesanan:%0A%0ANo Pesanan: *${orderNumber}*%0ANama: ${completedOrder.customerName}%0ANo HP: ${completedOrder.customerPhone}%0AAlamat: ${completedOrder.shippingAddress}%0A%0A*Rincian Pesanan:*%0A${productList}%0A%0A*Total: ${formatRupiah(Number(completedOrder.totalAmount))}*%0A%0AMohon diproses, terima kasih!`

        return `https://wa.me/6281234567890?text=${text}`
    }

    return (
        <div className='bg relative min-h-screen'>
            <HeaderPage height='h-24' image='/images/header_product7.webp'>
                <div className='z-2 flex flex-col items-center justify-center text-white'>
                    <p className='text-3xl font-bold md:text-5xl'>Keranjang Belanja</p>
                    <p className='mt-1 text-xs md:text-sm text-white/80'>Periksa pesanan Anda sebelum checkout</p>
                </div>
            </HeaderPage>

            <div className='mx-auto max-w-7xl px-4 py-8 md:px-8 xl:px-12 text-neutral-800'>
                {completedOrder ? (
                    <div className='mx-auto max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 text-center shadow-lg'>
                        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl text-emerald-600'>
                            <BsCheckCircleFill />
                        </div>
                        <h2 className='mt-4 text-2xl font-bold text-neutral-800'>Pesanan Berhasil Dibuat!</h2>
                        <p className='mt-1 text-xs text-neutral-500'>
                            Nomor Pesanan: <span className='font-mono font-bold text-amber-700'>{completedOrder.orderNumber}</span>
                        </p>
                        <p className='mt-3 text-xs leading-relaxed text-neutral-600'>
                            Terima kasih, <strong>{completedOrder.customerName}</strong>. Pesanan Anda telah tersimpan di sistem kami dengan total <strong>{formatRupiah(Number(completedOrder.totalAmount))}</strong>.
                        </p>

                        <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center'>
                            <a
                                href={getWhatsAppUrl()}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-emerald-700'
                            >
                                <BsWhatsapp className='text-base' />
                                Konfirmasi via WhatsApp
                            </a>
                            <button
                                onClick={() => setCompletedOrder(null)}
                                className='rounded-xl border border-neutral-300 px-5 py-3 text-xs font-bold text-neutral-700 transition hover:bg-neutral-100'
                            >
                                Belanja Lagi
                            </button>
                        </div>
                    </div>
                ) : items.length === 0 ? (
                    <div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white/60 p-12 text-center backdrop-blur-sm'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-2xl text-amber-700'>
                            <BsBagX />
                        </div>
                        <p className='mt-4 text-lg font-bold text-neutral-800'>Keranjang Belanja Masih Kosong</p>
                        <p className='mt-1 text-xs text-neutral-500'>Jelajahi berbagai pilihan kopi terbaik khas Tolaki sekarang juga.</p>
                        <Link href='/product' className='mt-6'>
                            <Button color='primary'>
                                <div className='flex items-center gap-2 px-3 py-1'>
                                    <span>Lihat Katalog Produk</span>
                                    <BsArrowRight />
                                </div>
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
                        {/* Kolom Daftar Produk */}
                        <div className='lg:col-span-7 xl:col-span-8 space-y-4'>
                            <div className='flex items-center justify-between border-b border-neutral-200 pb-3'>
                                <h1 className='text-lg font-bold text-neutral-800'>Daftar Item ({items.length})</h1>
                                <button
                                    onClick={clearCart}
                                    className='text-xs font-semibold text-rose-600 hover:underline cursor-pointer'
                                >
                                    Kosongkan Keranjang
                                </button>
                            </div>

                            <div className='divide-y divide-neutral-100 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm'>
                                {items.map((item) => (
                                    <div key={item.id} className='flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between'>
                                        <div className='flex items-center gap-3 min-w-0'>
                                            <div className='relative h-18 w-18 shrink-0 overflow-hidden rounded-xl bg-amber-50'>
                                                <Image
                                                    src={item.image || '/images/kopi1.png'}
                                                    alt={item.title}
                                                    fill
                                                    className='object-cover'
                                                />
                                            </div>
                                            <div className='min-w-0 flex-1'>
                                                <p className='truncate text-sm font-bold text-neutral-800'>{item.title}</p>
                                                <p className='text-[11px] text-neutral-400'>{item.unit_price || 'Pack'}</p>
                                                <p className='mt-1 text-xs font-bold text-amber-700'>{formatRupiah(Number(item.price))}</p>
                                            </div>
                                        </div>

                                        <div className='flex items-center justify-between gap-4 sm:justify-end'>
                                            {/* Counter */}
                                            <div className='flex items-center rounded-lg border border-neutral-200 bg-neutral-50'>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className='flex h-8 w-8 items-center justify-center font-bold text-neutral-600 hover:bg-neutral-200 rounded-l-lg cursor-pointer'
                                                >
                                                    -
                                                </button>
                                                <span className='w-10 text-center text-xs font-bold text-neutral-800'>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className='flex h-8 w-8 items-center justify-center font-bold text-neutral-600 hover:bg-neutral-200 rounded-r-lg cursor-pointer'
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <p className='w-24 text-right text-xs font-bold text-neutral-800'>
                                                {formatRupiah(Number(item.price) * item.quantity)}
                                            </p>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                aria-label='Hapus item'
                                                className='flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer'
                                            >
                                                <BsTrash className='text-sm' />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Kolom Checkout Form */}
                        <div className='lg:col-span-5 xl:col-span-4'>
                            <form onSubmit={handleCheckout} className='sticky top-24 space-y-4 rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm'>
                                <h2 className='text-sm font-bold uppercase tracking-wider text-neutral-700'>Rincian Pesanan</h2>

                                <div className='space-y-2 border-b border-neutral-100 pb-3 text-xs'>
                                    <div className='flex justify-between text-neutral-500'>
                                        <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} item)</span>
                                        <span className='font-semibold text-neutral-700'>{formatRupiah(totalPrice)}</span>
                                    </div>
                                    <div className='flex justify-between text-neutral-500'>
                                        <span>Estimasi Ongkir</span>
                                        <span className='font-semibold text-emerald-600'>Dikonfirmasi via WA</span>
                                    </div>
                                    <div className='flex justify-between pt-2 text-sm font-bold text-neutral-800'>
                                        <span>Total</span>
                                        <span className='text-base text-amber-700'>{formatRupiah(totalPrice)}</span>
                                    </div>
                                </div>

                                <div className='space-y-3 pt-2'>
                                    <p className='text-xs font-bold text-neutral-700'>Informasi Pengiriman</p>
                                    <InputField
                                        title='Nama Penerima'
                                        type='text'
                                        value={name}
                                        onChange={(v) => setName(v as string)}
                                        placholder='Contoh: Budi Santoso'
                                    />
                                    <InputField
                                        title='Nomor Telepon / WhatsApp'
                                        type='text'
                                        value={phone}
                                        onChange={(v) => setPhone(v as string)}
                                        placholder='081234567890'
                                    />
                                    <InputField
                                        title='Email (Opsional)'
                                        type='email'
                                        value={email}
                                        onChange={(v) => setEmail(v as string)}
                                        placholder='budi@example.com'
                                    />
                                    <InputtextArea
                                        title='Alamat Lengkap Pengiriman'
                                        value={address}
                                        onChange={(v) => setAddress(v as string)}
                                    />
                                    <InputField
                                        title='Catatan Tambahan (Opsional)'
                                        type='text'
                                        value={notes}
                                        onChange={(v) => setNotes(v as string)}
                                        placholder='Misal: Titip di pos sekuriti'
                                    />
                                </div>

                                <div className='pt-3'>
                                    <Button color='primary' htmlType='submit' disabled={loading}>
                                        <div className='flex items-center justify-center gap-2 py-1'>
                                            <span>{loading ? 'Memproses...' : 'Pesan Sekarang'}</span>
                                            <BsArrowRight />
                                        </div>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage
