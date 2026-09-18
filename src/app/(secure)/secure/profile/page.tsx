"use client"

import { useState } from 'react'
import Image from 'next/image'
import ItemList from '@/components/items/ItemList'
import Create from './components/create';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { BsBuilding, BsCheckCircle, BsQuote } from 'react-icons/bs';

import { useDataStore } from '@/stores/dataStore';
import { useQuery } from '@tanstack/react-query';
import { ProfileCreateInterface, ProfileResponseInterface } from './types'
import { fetchApi } from '@/lib/apiFetch';


const Page = () => {


    const url = useDataStore(state => state.url);
    const [modalCreate, SetModalCreate] = useState<boolean>(false);

    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [profileId, setProfileId] = useState<string | null>(null);

    const [form, setForm] = useState<ProfileCreateInterface>({
        brand: "",
        quotes: "",
        description: "",
        detail: "",
        email: "",
        phone: "",
        address: "",
        file: null,
    })

    const { data: profiles, isLoading, isError } = useQuery({
        queryFn: () => fetchApi<ProfileResponseInterface[]>(
            `${url}/company-profile/read/me`
        ),
        queryKey: ["profile"]
    })

    const profile = profiles?.[0]
    const profileImage = profile?.file ? `${url}/uploads/company/${profile.file}` : null

    const selectData = (data: ProfileResponseInterface) => {
        setProfileId(data.id)
        setForm((prev) => ({
            ...prev,
            brand: data.brand ?? "",
            quotes: data.quotes ?? "",
            description: data.description ?? "",
            detail: data.detail ?? "",
            email: data.email ?? "",
            phone: data.phone ?? "",
            address: data.address ?? "",
            file: null,
        }))
    }

    const emptyForm = () => {
        setProfileId(null)
        setForm({
            brand: "",
            quotes: "",
            description: "",
            detail: "",
            email: "",
            phone: "",
            address: "",
            file: null,
        })
    }

    return (
        <main className='space-y-3 pb-3'>
            <AdminPageHeader
                eyebrow='Identitas Brand'
                title='Profil Kopi Tolaki'
                description='Kelola cerita, pesan, dan identitas utama yang dikenalkan kepada pengunjung.'
                icon={BsBuilding}
                onAdd={() => {
                    if (profile) {
                        selectData(profile)
                        setIsUpdate(true)
                    } else {
                        emptyForm()
                        setIsUpdate(false)
                    }

                    SetModalCreate(true)
                }}
                addLabel='Perbarui profil'
            />

            {isLoading ? (
                <section className='grid grid-cols-1 gap-3 xl:grid-cols-12'>
                    <div className='h-80 animate-pulse rounded-xl bg-neutral-100 xl:col-span-5' />
                    <div className='space-y-3 xl:col-span-7'>
                        <div className='h-32 animate-pulse rounded-xl bg-neutral-100' />
                        <div className='h-44 animate-pulse rounded-xl bg-neutral-100' />
                    </div>
                </section>
            ) : profile ? (
                <section className='grid grid-cols-1 gap-3 xl:grid-cols-12'>
                    <article className='overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm xl:col-span-5'>
                        <div className='bg-linear-to-br from-amber-50 to-white p-4'>
                            <ItemList title='Image'>
                                <div className='flex min-h-64 items-center justify-center'>
                                    {profileImage ? (
                                        <Image
                                            alt={`Logo ${profile.brand}`}
                                            src={profileImage}
                                            width={500}
                                            height={300}
                                            className='max-h-72 w-auto rounded-sm border-5 border-white object-contain shadow-md'
                                        />
                                    ) : (
                                        <p className='text-xs text-neutral-400'>Belum ada gambar profil.</p>
                                    )}
                                </div>
                            </ItemList>
                        </div>
                        <div className='border-t border-neutral-100 p-5'>
                            <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700'>Nama brand</p>
                            <h2 className='mt-1 text-2xl font-bold text-neutral-800'>{profile.brand}</h2>
                            <div className='mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700'><BsCheckCircle /><span>Profil aktif di website</span></div>
                        </div>
                    </article>

                    <div className='space-y-3 xl:col-span-7'>
                        <article className='relative overflow-hidden rounded-xl bg-amber-600 p-5 text-white shadow-sm'>
                            <BsQuote className='absolute -right-2 -top-4 text-8xl text-white/10' />
                            <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-100'>Pesan utama</p>
                            <p className='relative mt-3 text-xl font-bold leading-snug'>“{profile.quotes}”</p>
                        </article>
                        <article className='rounded-xl border border-neutral-100 bg-white p-5 shadow-sm'>
                            <p className='text-sm font-bold text-neutral-800'>Tentang brand</p>
                            <p className='mt-3 whitespace-pre-line text-xs leading-6 text-neutral-500'>{profile.description}</p>
                        </article>
                        <article className='rounded-xl border border-neutral-100 bg-white p-5 shadow-sm'>
                            <p className='text-sm font-bold text-neutral-800'>Cerita lengkap</p>
                            <div
                                className='mt-3 text-xs leading-6 text-neutral-500'
                                dangerouslySetInnerHTML={{ __html: profile.detail }}
                            />
                        </article>
                        <article className='rounded-xl border border-neutral-100 bg-white p-5 shadow-sm'>
                            <p className='text-sm font-bold text-neutral-800'>Kontak</p>
                            <div className='mt-3 grid grid-cols-1 gap-3 text-xs sm:grid-cols-3'>
                                <div>
                                    <p className='font-semibold text-neutral-400'>Email</p>
                                    <p className='mt-1 break-words text-neutral-600'>{profile.email || '-'}</p>
                                </div>
                                <div>
                                    <p className='font-semibold text-neutral-400'>Telepon</p>
                                    <p className='mt-1 text-neutral-600'>{profile.phone || '-'}</p>
                                </div>
                                <div>
                                    <p className='font-semibold text-neutral-400'>Alamat</p>
                                    <p className='mt-1 whitespace-pre-line text-neutral-600'>{profile.address || '-'}</p>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            ) : (
                <section className='rounded-xl border border-dashed border-amber-200 bg-amber-50 p-8 text-center'>
                    <p className='text-sm font-bold text-neutral-800'>Profil perusahaan belum dibuat.</p>
                    <p className='mt-1 text-xs text-neutral-500'>Gunakan tombol “Perbarui profil” untuk menambahkan profil pertama.</p>
                    {isError && <p className='mt-3 text-xs text-rose-600'>Data profil tidak dapat dimuat.</p>}
                </section>
            )}


            <Create
                modal={modalCreate}
                SetModal={SetModalCreate}
                form={form}
                setForm={setForm}
                profileId={profileId}
                emptyForm={emptyForm}
                isUpdate={isUpdate}
            />



        </main>
    )
}

export default Page
