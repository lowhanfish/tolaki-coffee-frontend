'use client'

import { useState } from 'react'
import { BsFillPencilFill, BsFillTrashFill, BsGeoAlt } from "react-icons/bs";
import { GiPlantRoots, GiMountainRoad } from "react-icons/gi";
import { FaPeopleRoof, FaGear } from "react-icons/fa6";
import Button from "@/components/items/Button"
import Modal from "@/components/items/Modal"
import Create, { PartnerFormProps } from './components/create';
import Pagination from '@/components/items/Pagination';
import SelectListShow from '@/components/items/SelectListShow';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { useDataStore } from '@/stores/dataStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/apiFetch';
import useDebouncedSearch from '@/hooks/useDebouncedSeacrh';

interface PartnerItem {
    id: string
    partner: string
    area: number
    altitude_from: number
    altitude_to: number
    createdAt: string
}

const Page = () => {
    const url = useDataStore((state) => state.url)
    const queryClient = useQueryClient()

    const [modal, SetModal] = useState<boolean>(false)
    const [modalCreate, SetModalCreate] = useState<boolean>(false)
    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<PartnerItem | null>(null)

    const [limit, setLimit] = useState<number>(8)
    const [skip, setSkip] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const debouncedSearch = useDebouncedSearch(search)

    const [form, setForm] = useState<PartnerFormProps>({
        partner: '',
        area: 0,
        altitude_from: 0,
        altitude_to: 0,
    })

    const { data: response, isLoading } = useQuery({
        queryFn: () =>
            fetchApi<{ total: number; data: PartnerItem[] }>(
                `${url}/partner/read?search=${encodeURIComponent(debouncedSearch)}&skip=${(skip - 1) * limit}&limit=${limit}`,
            ),
        queryKey: ['partners-admin', skip, limit, debouncedSearch],
    })

    const partners = response?.data || []
    const total = response?.total || 0

    const deleteMutation = useMutation({
        mutationFn: (id: string) =>
            fetchApi(`${url}/partner/delete/${id}`, {
                method: 'DELETE',
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partners-admin'] })
            queryClient.invalidateQueries({ queryKey: ['partner'] })
            SetModal(false)
            setSelectedItem(null)
        },
        onError: (err: any) => {
            alert(err?.message || 'Gagal menghapus wilayah kemitraan')
        },
    })

    const emptyForm = () => {
        setForm({
            partner: '',
            area: 0,
            altitude_from: 0,
            altitude_to: 0,
        })
        setSelectedItem(null)
        setIsUpdate(false)
    }

    const openCreateModal = () => {
        emptyForm()
        setIsUpdate(false)
        SetModalCreate(true)
    }

    const openEditModal = () => {
        if (!selectedItem) return
        setForm({
            id: selectedItem.id,
            partner: selectedItem.partner,
            area: selectedItem.area,
            altitude_from: selectedItem.altitude_from,
            altitude_to: selectedItem.altitude_to,
        })
        setIsUpdate(true)
        SetModal(false)
        SetModalCreate(true)
    }

    const handleDelete = () => {
        if (!selectedItem) return
        if (confirm(`Hapus wilayah "${selectedItem.partner}"?`)) {
            deleteMutation.mutate(selectedItem.id)
        }
    }

    return (
        <main className='space-y-3 pb-3'>
            <AdminPageHeader
                eyebrow='Petani & Kemitraan'
                title='Headline & Dampak'
                description='Kelola wilayah kemitraan dan ringkasan dampak Kopi Tolaki bagi petani.'
                icon={FaPeopleRoof}
                searchPlaceholder='Cari wilayah...'
                search={search}
                setInputSearch={setSearch}
                onAdd={openCreateModal}
                addLabel='Tambah wilayah'
            />

            <section className='rounded-xl border border-neutral-100 bg-white p-3 shadow-sm sm:p-4'>
                <div className='mb-4 flex items-center justify-between'>
                    <div>
                        <h2 className='text-sm font-bold text-neutral-800'>Wilayah binaan</h2>
                        <p className='text-[10px] text-neutral-400'>Ringkasan dampak pada setiap wilayah</p>
                    </div>
                    <span className='rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700'>
                        {total} wilayah
                    </span>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-44 animate-pulse rounded-xl bg-neutral-100" />
                        ))}
                    </div>
                ) : partners.length === 0 ? (
                    <div className="py-12 text-center text-neutral-400 text-xs">
                        Belum ada wilayah kemitraan terdaftar. Klik &quot;Tambah wilayah&quot; untuk menambahkan.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {partners.map((item) => (
                            <article key={item.id} className='relative overflow-hidden rounded-xl border border-neutral-100 bg-linear-to-br from-white to-amber-50/60 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md'>
                                <div className='mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700'>
                                    <BsGeoAlt />
                                </div>
                                <p className='text-sm font-bold text-neutral-800'>{item.partner}</p>
                                <div className='mt-3 space-y-2 border-t border-neutral-100 pt-3'>
                                    <div className='flex items-center gap-3'>
                                        <FaPeopleRoof className='text-base text-amber-700' />
                                        <p className='text-[10px] text-neutral-500'>Kemitraan Petani</p>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <GiPlantRoots className='text-base text-emerald-600' />
                                        <p className='text-[10px] text-neutral-500'><span className='text-xs font-bold text-neutral-700'>{item.area}</span> Hektare</p>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <GiMountainRoad className='text-base text-sky-600' />
                                        <p className='text-[10px] text-neutral-500'><span className='text-xs font-bold text-neutral-700'>{item.altitude_from}–{item.altitude_to}</span> Mdpl</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedItem(item)
                                        SetModal(true)
                                    }}
                                    aria-label='Atur wilayah'
                                    className='absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white text-neutral-400 shadow-sm ring-1 ring-neutral-100 transition hover:bg-amber-500 hover:text-neutral-950'>
                                    <FaGear className='text-xs' />
                                </button>
                            </article>
                        ))}
                    </div>
                )}

                <div className='mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
                    <Pagination
                        total={total}
                        limit={limit}
                        page={skip}
                        pageShow={5}
                        onPageChange={setSkip}
                    />
                    <div className='w-full sm:w-40'>
                        <SelectListShow
                            onChange={(val) => {
                                setLimit(Number(val))
                                setSkip(1)
                            }}
                            size='sm'
                        />
                    </div>
                </div>
            </section>

            <Modal size="xxs" openModal={modal} setOpenModal={SetModal} color="dark" title="Pengaturan">
                <div className="flex gap-2 flex-col py-5">
                    <Button color="warning" size="h-6" type="rounded" onClick={openEditModal}>
                        <div className="item-btn-warning text-[12px] flex items-center justify-center gap-2">
                            <BsFillPencilFill />
                            <p>Update</p>
                        </div>
                    </Button>
                    <Button color="danger" size="h-6" type="rounded" onClick={handleDelete}>
                        <div className="item-btn-danger text-[12px] flex items-center justify-center gap-2">
                            <BsFillTrashFill />
                            <p>Delete</p>
                        </div>
                    </Button>
                </div>
            </Modal>

            <Create
                modal={modalCreate}
                SetModal={SetModalCreate}
                form={form}
                setForm={setForm}
                emptyForm={emptyForm}
                isUpdate={isUpdate}
            />
        </main>
    )
}

export default Page
