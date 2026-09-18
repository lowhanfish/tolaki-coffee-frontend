'use client'

import { useState, useEffect } from 'react'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import Button from '@/components/items/Button'
import InputField from '@/components/items/InputField'
import InputtextArea from '@/components/items/InputtextArea'
import Modal from '@/components/items/Modal'
import {
    BsClock,
    BsEnvelope,
    BsGeoAlt,
    BsMap,
    BsPencilSquare,
    BsPhone,
    BsTrash,
    BsChatLeftDots,
} from 'react-icons/bs'
import { useDataStore } from '@/stores/dataStore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchApi } from '@/lib/apiFetch'

interface ContactData {
    id?: string
    storeName: string
    address: string
    phone: string
    email?: string
    mapsUrl?: string
    openHours?: string
    instagram?: string
    facebook?: string
    tiktok?: string
    tokopedia?: string
    shopee?: string
}

interface Inquiry {
    id: string
    name: string
    email: string
    phone?: string
    subject: string
    message: string
    createdAt: string
}

const defaultContact: ContactData = {
    storeName: 'Kopi Tolaki Utama',
    address: 'Kendari, Sulawesi Tenggara, Indonesia',
    phone: '+62 812-3456-7890',
    email: 'info@kopitolaki.id',
    openHours: 'Senin - Sabtu: 08.00 - 22.00',
    mapsUrl: 'https://maps.google.com',
}

const Page = () => {
    const url = useDataStore((state) => state.url)
    const queryClient = useQueryClient()

    const [modal, setModal] = useState(false)
    const [draft, setDraft] = useState<ContactData>(defaultContact)

    // Query Contact Data
    const { data: contactResponse, isLoading: loadingContact } = useQuery({
        queryFn: () => fetchApi<any>(`${url}/contact/read`),
        queryKey: ['admin-contact'],
    })

    const contactItem: ContactData | null = contactResponse?.data?.[0] || null

    useEffect(() => {
        if (contactItem) {
            setDraft({
                id: contactItem.id,
                storeName: contactItem.storeName || '',
                address: contactItem.address || '',
                phone: contactItem.phone || '',
                email: contactItem.email || '',
                openHours: contactItem.openHours || '',
                mapsUrl: contactItem.mapsUrl || '',
                instagram: contactItem.instagram || '',
                facebook: contactItem.facebook || '',
                tiktok: contactItem.tiktok || '',
                tokopedia: contactItem.tokopedia || '',
                shopee: contactItem.shopee || '',
            })
        }
    }, [contactItem])

    // Query Messages
    const { data: messages = [], isLoading: loadingMessages } = useQuery<Inquiry[]>({
        queryFn: () => fetchApi<Inquiry[]>(`${url}/contact/messages`),
        queryKey: ['admin-messages'],
    })

    // Save Contact Mutation
    const saveContactMutation = useMutation({
        mutationFn: async (payload: ContactData) => {
            if (payload.id) {
                return fetchApi(`${url}/contact/update/${payload.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                })
            } else {
                return fetchApi(`${url}/contact/create`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                })
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-contact'] })
            setModal(false)
            alert('Data kontak berhasil disimpan!')
        },
        onError: (err: any) => {
            alert(err?.message || 'Gagal menyimpan kontak')
        },
    })

    // Delete Message Mutation
    const deleteMessageMutation = useMutation({
        mutationFn: (id: string) =>
            fetchApi(`${url}/contact/messages/${id}`, {
                method: 'DELETE',
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-messages'] })
        },
        onError: (err: any) => {
            alert(err?.message || 'Gagal menghapus pesan')
        },
    })

    const activeData = contactItem || defaultContact

    const contactItems = [
        { label: 'Nama Toko / Usaha', value: activeData.storeName, icon: BsGeoAlt, color: 'bg-amber-50 text-amber-700' },
        { label: 'Telepon', value: activeData.phone, icon: BsPhone, color: 'bg-emerald-50 text-emerald-700' },
        { label: 'Email', value: activeData.email || '-', icon: BsEnvelope, color: 'bg-sky-50 text-sky-700' },
        { label: 'Jam Operasional', value: activeData.openHours || '-', icon: BsClock, color: 'bg-violet-50 text-violet-700' },
    ]

    const handleSave = () => {
        saveContactMutation.mutate(draft)
    }

    return (
        <main className='space-y-4 pb-3'>
            <AdminPageHeader
                eyebrow='Konten Website'
                title='Kelola Halaman Kontak'
                description='Informasi toko dan pesan masuk dari para pengunjung Kopi Tolaki.'
                icon={BsEnvelope}
                onAdd={() => setModal(true)}
                addLabel='Perbarui Kontak'
                actionIcon={BsPencilSquare}
            />

            <section className='grid grid-cols-1 gap-3 xl:grid-cols-12'>
                <article className='relative overflow-hidden rounded-xl bg-linear-to-br from-amber-600 to-amber-800 p-5 text-white shadow-sm xl:col-span-4'>
                    <p className='text-[9px] font-semibold uppercase tracking-[0.2em] text-amber-200'>Identitas Kontak</p>
                    <h2 className='mt-4 text-2xl font-bold'>{activeData.storeName}</h2>
                    <p className='mt-2 text-xs text-white/80'>{activeData.address}</p>
                    <div className='mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[9px] font-semibold backdrop-blur-sm'>
                        <span className='h-1.5 w-1.5 rounded-full bg-emerald-300' />
                        Data aktif di halaman kontak publik
                    </div>
                </article>

                <article className='rounded-xl border border-neutral-100 bg-white p-4 shadow-sm xl:col-span-8'>
                    <div className='mb-4 flex items-center justify-between border-b border-neutral-100 pb-3'>
                        <div>
                            <h2 className='text-sm font-bold text-neutral-800'>Informasi Kontak Toko</h2>
                            <p className='text-[10px] text-neutral-400'>Data yang dilihat pengunjung pada website</p>
                        </div>
                        <span className='rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700'>
                            Aktif
                        </span>
                    </div>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                        {contactItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <div key={item.label} className='flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/60 p-3.5'>
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                                        <Icon />
                                    </div>
                                    <div className='min-w-0'>
                                        <p className='text-[9px] font-semibold uppercase tracking-wider text-neutral-400'>{item.label}</p>
                                        <p className='truncate text-[11px] font-bold text-neutral-700'>{item.value}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </article>
            </section>

            {/* Pesan Masuk dari Pengunjung */}
            <section className='rounded-xl border border-neutral-100 bg-white p-4 shadow-sm'>
                <div className='mb-4 flex items-center justify-between border-b border-neutral-100 pb-3'>
                    <div className='flex items-center gap-2'>
                        <BsChatLeftDots className='text-amber-600' />
                        <div>
                            <h2 className='text-sm font-bold text-neutral-800'>Pesan Masuk Pengunjung</h2>
                            <p className='text-[10px] text-neutral-400'>Pesan yang dikirim pengunjung melalui formulir kontak</p>
                        </div>
                    </div>
                    <span className='rounded-full bg-sky-50 px-2.5 py-1 text-[9px] font-bold text-sky-700'>
                        {messages.length} pesan
                    </span>
                </div>

                {loadingMessages ? (
                    <div className='space-y-2'>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className='h-16 animate-pulse rounded-lg bg-neutral-100' />
                        ))}
                    </div>
                ) : messages.length === 0 ? (
                    <div className='py-8 text-center text-xs text-neutral-400'>
                        Belum ada pesan masuk dari pengunjung.
                    </div>
                ) : (
                    <div className='divide-y divide-neutral-100'>
                        {messages.map((msg) => (
                            <div key={msg.id} className='flex flex-col gap-2 py-3 sm:flex-row sm:items-start sm:justify-between'>
                                <div className='space-y-1'>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-xs font-bold text-neutral-800'>{msg.name}</span>
                                        <span className='text-[10px] text-neutral-400'>• {msg.email}</span>
                                        {msg.phone && <span className='text-[10px] text-neutral-400'>• {msg.phone}</span>}
                                    </div>
                                    <p className='text-[11px] font-semibold text-amber-800'>{msg.subject}</p>
                                    <p className='text-xs leading-relaxed text-neutral-600'>{msg.message}</p>
                                    <p className='text-[9px] text-neutral-400'>
                                        {new Date(msg.createdAt).toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        if (confirm('Hapus pesan ini?')) {
                                            deleteMessageMutation.mutate(msg.id)
                                        }
                                    }}
                                    aria-label='Hapus pesan'
                                    className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-neutral-400 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer'
                                >
                                    <BsTrash className='text-xs' />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Modal Perbarui Kontak */}
            <Modal size='md' openModal={modal} setOpenModal={setModal} color='primary' title='Perbarui Data Kontak Toko'>
                <div className='flex flex-col gap-2 px-3 py-5'>
                    <InputField
                        title='Nama Toko / Usaha'
                        type='text'
                        value={draft.storeName}
                        onChange={(v) => setDraft((p) => ({ ...p, storeName: v as string }))}
                    />

                    <InputtextArea
                        title='Alamat Lengkap'
                        value={draft.address}
                        onChange={(v) => setDraft((p) => ({ ...p, address: v as string }))}
                    />

                    <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                        <InputField
                            title='Nomor Telepon'
                            type='text'
                            value={draft.phone}
                            onChange={(v) => setDraft((p) => ({ ...p, phone: v as string }))}
                        />
                        <InputField
                            title='Email'
                            type='email'
                            value={draft.email || ''}
                            onChange={(v) => setDraft((p) => ({ ...p, email: v as string }))}
                        />
                    </div>

                    <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                        <InputField
                            title='Jam Operasional'
                            type='text'
                            value={draft.openHours || ''}
                            onChange={(v) => setDraft((p) => ({ ...p, openHours: v as string }))}
                        />
                        <InputField
                            title='Link Google Maps'
                            type='text'
                            value={draft.mapsUrl || ''}
                            onChange={(v) => setDraft((p) => ({ ...p, mapsUrl: v as string }))}
                        />
                    </div>
                </div>

                <div className='mx-3 mb-3 flex justify-end gap-2 border-y-[0.1px] border-black/20 py-2'>
                    <div className='w-25'>
                        <Button color='primary' onClick={handleSave}>
                            Simpan
                        </Button>
                    </div>
                    <div className='w-25'>
                        <Button color='danger' onClick={() => setModal(false)}>
                            Batal
                        </Button>
                    </div>
                </div>
            </Modal>
        </main>
    )
}

export default Page
