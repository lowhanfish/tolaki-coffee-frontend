'use client'

import { useState } from 'react'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import Button from '@/components/items/Button'
import InputField from '@/components/items/InputField'
import InputtextArea from '@/components/items/InputtextArea'
import Modal from '@/components/items/Modal'
import {
    BsClock,
    BsEnvelope,
    BsGeoAlt,
    BsInputCursorText,
    BsMap,
    BsPencilSquare,
    BsPhone,
    BsSend,
} from 'react-icons/bs'

interface ContactPageData {
    hero: { title: string; subtitle: string }
    address: string
    phone: string
    email: string
    operationalDays: string
    latitude: number
    longitude: number
    formFields: Array<{ label: string; type: string; required: boolean }>
}

const contactData: ContactPageData = {
    hero: { title: 'Anoa Coffee', subtitle: 'Hubungi kami' },
    address: 'Kendari, Sulawesi Tenggara, Indonesia',
    phone: '+62 812-3456-7890',
    email: 'info@kopitolaki.id',
    operationalDays: 'Senin - Sabtu',
    latitude: -4.0435,
    longitude: 122.5264,
    formFields: [
        { label: 'Nama lengkap', type: 'Teks', required: true },
        { label: 'Email', type: 'Email', required: true },
        { label: 'Nomor telepon', type: 'Telepon', required: false },
        { label: 'Subjek', type: 'Teks', required: true },
        { label: 'Pesan', type: 'Teks panjang', required: true },
    ],
}

const Page = () => {
    const [data, setData] = useState<ContactPageData>(contactData)
    const [draft, setDraft] = useState<ContactPageData>(contactData)
    const [modal, setModal] = useState(false)

    const contactItems = [
        { label: 'Alamat', value: data.address, icon: BsGeoAlt, color: 'bg-amber-50 text-amber-700' },
        { label: 'Telepon', value: data.phone, icon: BsPhone, color: 'bg-emerald-50 text-emerald-700' },
        { label: 'Email', value: data.email, icon: BsEnvelope, color: 'bg-sky-50 text-sky-700' },
        { label: 'Jam Operasional', value: data.operationalDays, icon: BsClock, color: 'bg-violet-50 text-violet-700' },
    ]

    const openUpdateModal = () => {
        setDraft(data)
        setModal(true)
    }

    const updateField = <K extends keyof ContactPageData>(key: K, value: ContactPageData[K]) => {
        setDraft((current) => ({ ...current, [key]: value }))
    }

    const saveData = () => {
        setData(draft)
        setModal(false)
    }

    return (
        <main className='space-y-3 pb-3'>
            <AdminPageHeader
                eyebrow='Konten Website'
                title='Kelola Halaman Kontak'
                description='Informasi yang ditampilkan kepada pengunjung pada halaman kontak Kopi Tolaki.'
                icon={BsEnvelope}
                onAdd={openUpdateModal}
                addLabel='Perbarui data'
                actionIcon={BsPencilSquare}
            />

            <section className='grid grid-cols-1 gap-3 xl:grid-cols-12'>
                <article className='relative overflow-hidden rounded-xl bg-linear-to-br from-amber-600 to-amber-800 p-5 text-white shadow-sm xl:col-span-4'>
                    <div className='absolute -right-8 -top-8 h-32 w-32 rounded-full border-24 border-white/8' />
                    <p className='text-[9px] font-semibold uppercase tracking-[0.2em] text-amber-200'>Tampilan header publik</p>
                    <h2 className='relative mt-8 text-2xl font-bold'>{data.hero.title}</h2>
                    <p className='relative mt-1 text-xs text-white/65'>{data.hero.subtitle}</p>
                    <div className='relative mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[9px] font-semibold backdrop-blur-sm'>
                        <span className='h-1.5 w-1.5 rounded-full bg-emerald-300' />
                        Ditampilkan di halaman kontak
                    </div>
                </article>

                <article className='rounded-xl border border-neutral-100 bg-white p-4 shadow-sm xl:col-span-8'>
                    <div className='mb-4 flex items-center justify-between border-b border-neutral-100 pb-3'>
                        <div><h2 className='text-sm font-bold text-neutral-800'>Informasi kontak</h2><p className='mt-0.5 text-[10px] text-neutral-400'>Data pada bagian “Informasi Kontak” di website</p></div>
                        <span className='rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700'>4 informasi aktif</span>
                    </div>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                        {contactItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <div key={item.label} className='flex min-w-0 items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/60 p-3.5'>
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.color}`}><Icon /></div>
                                    <div className='min-w-0'><p className='text-[9px] font-semibold uppercase tracking-wider text-neutral-400'>{item.label}</p><p className='mt-0.5 truncate text-[11px] font-bold text-neutral-700'>{item.value}</p></div>
                                </div>
                            )
                        })}
                    </div>
                </article>
            </section>

            <section className='grid grid-cols-1 gap-3 xl:grid-cols-12'>
                <article className='rounded-xl border border-neutral-100 bg-white p-4 shadow-sm xl:col-span-5'>
                    <div className='flex items-center gap-3 border-b border-neutral-100 pb-3'>
                        <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-700'><BsMap /></div>
                        <div><h2 className='text-sm font-bold text-neutral-800'>Lokasi pada peta</h2><p className='text-[10px] text-neutral-400'>Titik lokasi yang digunakan Google Maps</p></div>
                    </div>
                    <div className='relative mt-4 flex min-h-48 items-center justify-center overflow-hidden rounded-xl bg-[#eee9df]'>
                        <div className='absolute inset-0 opacity-35 [background-image:linear-gradient(#c7bda9_1px,transparent_1px),linear-gradient(90deg,#c7bda9_1px,transparent_1px)] [background-size:28px_28px]' />
                        <div className='relative flex flex-col items-center text-center'>
                            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-amber-600 text-xl text-white shadow-lg ring-8 ring-amber-600/15'><BsGeoAlt /></div>
                            <p className='mt-3 text-xs font-bold text-neutral-700'>Kendari, Sulawesi Tenggara</p>
                            <p className='mt-1 text-[9px] text-neutral-500'>{data.latitude}, {data.longitude}</p>
                        </div>
                    </div>
                </article>

                <article className='rounded-xl border border-neutral-100 bg-white p-4 shadow-sm xl:col-span-7'>
                    <div className='flex items-center justify-between border-b border-neutral-100 pb-3'>
                        <div className='flex items-center gap-3'>
                            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700'><BsInputCursorText /></div>
                            <div><h2 className='text-sm font-bold text-neutral-800'>Formulir kirim pesan</h2><p className='text-[10px] text-neutral-400'>Data yang perlu diisi pengunjung</p></div>
                        </div>
                        <BsSend className='text-amber-600' />
                    </div>
                    <div className='mt-3 divide-y divide-neutral-100'>
                        {data.formFields.map((field, index) => (
                            <div key={field.label} className='flex items-center gap-3 py-2.5'>
                                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-[9px] font-bold text-neutral-500'>{index + 1}</span>
                                <p className='min-w-0 flex-1 text-[11px] font-semibold text-neutral-700'>{field.label}</p>
                                <span className='rounded-md bg-neutral-50 px-2 py-1 text-[9px] text-neutral-400'>{field.type}</span>
                                <span className={`w-12 text-right text-[9px] font-bold ${field.required ? 'text-amber-700' : 'text-neutral-400'}`}>{field.required ? 'Wajib' : 'Opsional'}</span>
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            <Modal key='contact-update-modal' size='md' openModal={modal} setOpenModal={setModal} color='primary' title='Perbarui Data Kontak'>
                <div className='flex flex-col gap-2 px-3 py-5'>
                    <div className='grid w-full grid-cols-1 gap-2 sm:grid-cols-2'>
                        <InputField
                            title='Judul'
                            type='text'
                            value={draft.hero.title}
                            onChange={(value) => setDraft((current) => ({ ...current, hero: { ...current.hero, title: value as string } }))}
                        />
                        <InputField
                            title='Subjudul'
                            type='text'
                            value={draft.hero.subtitle}
                            onChange={(value) => setDraft((current) => ({ ...current, hero: { ...current.hero, subtitle: value as string } }))}
                        />
                    </div>

                    <div className='w-full'>
                        <InputtextArea title='Alamat' value={draft.address} onChange={(value) => updateField('address', value as string)} />
                    </div>

                    <div className='grid w-full grid-cols-1 gap-2 sm:grid-cols-2'>
                        <InputField title='Telepon' type='text' value={draft.phone} onChange={(value) => updateField('phone', value as string)} />
                        <InputField title='Email' type='email' value={draft.email} onChange={(value) => updateField('email', value as string)} />
                    </div>

                    <div className='w-full'>
                        <InputField title='Jam operasional' type='text' value={draft.operationalDays} onChange={(value) => updateField('operationalDays', value as string)} />
                    </div>

                    <div className='mt-2 border-t border-neutral-100 pt-3'>
                        <p className='text-sm font-bold text-neutral-700'>Lokasi pada peta</p>
                        <p className='mt-0.5 text-[10px] text-neutral-400'>Koordinat titik lokasi yang ditampilkan pada Google Maps.</p>
                    </div>

                    <div className='grid w-full grid-cols-1 gap-2 sm:grid-cols-2'>
                        <InputField title='Latitude' type='number' value={draft.latitude} onChange={(value) => updateField('latitude', Number(value))} />
                        <InputField title='Longitude' type='number' value={draft.longitude} onChange={(value) => updateField('longitude', Number(value))} />
                    </div>
                </div>

                <div className='mx-3 mb-3 flex justify-end gap-2 border-y-[0.1px] border-black/20 py-2'>
                    <div className='w-25'><Button color='primary' onClick={saveData}>Simpan</Button></div>
                    <div className='w-25'><Button color='danger' onClick={() => setModal(false)}>Batal</Button></div>
                </div>
            </Modal>
        </main>
    )
}

export default Page
