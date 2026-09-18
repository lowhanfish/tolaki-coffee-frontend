'use client'

import { useState } from 'react'
import { BsFillPencilFill, BsFillTrashFill, BsAward, BsCalendar3, BsCoin, BsPerson, BsShieldCheck } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import Button from "@/components/items/Button"
import Modal from "@/components/items/Modal"
import Create, { StandardFormProps } from './components/create';
import Pagination from '@/components/items/Pagination';
import SelectListShow from '@/components/items/SelectListShow';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { useDataStore } from '@/stores/dataStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/apiFetch';
import useDebouncedSearch from '@/hooks/useDebouncedSeacrh';

interface StandardItem {
    id: string
    title: string
    description: string
    icon: string
    createdAt: string
}

const Page = () => {
    const url = useDataStore((state) => state.url)
    const queryClient = useQueryClient()

    const [modal, SetModal] = useState<boolean>(false)
    const [modalCreate, SetModalCreate] = useState<boolean>(false)
    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<StandardItem | null>(null)

    const [limit, setLimit] = useState<number>(8)
    const [skip, setSkip] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const debouncedSearch = useDebouncedSearch(search)

    const [form, setForm] = useState<StandardFormProps>({
        title: '',
        description: '',
        icon: 'coin',
    })

    const { data: response, isLoading } = useQuery({
        queryFn: () =>
            fetchApi<{ total: number; data: StandardItem[] }>(
                `${url}/partnership-standard/read?search=${encodeURIComponent(debouncedSearch)}&skip=${(skip - 1) * limit}&limit=${limit}`,
            ),
        queryKey: ['standards-admin', skip, limit, debouncedSearch],
    })

    const standards = response?.data || []
    const total = response?.total || 0

    const deleteMutation = useMutation({
        mutationFn: (id: string) =>
            fetchApi(`${url}/partnership-standard/delete/${id}`, {
                method: 'DELETE',
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['standards-admin'] })
            queryClient.invalidateQueries({ queryKey: ['partnership-standard'] })
            SetModal(false)
            setSelectedItem(null)
        },
        onError: (err: any) => {
            alert(err?.message || 'Gagal menghapus standar kemitraan')
        },
    })

    const emptyForm = () => {
        setForm({
            title: '',
            description: '',
            icon: 'coin',
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
            title: selectedItem.title,
            description: selectedItem.description,
            icon: selectedItem.icon || 'coin',
        })
        setIsUpdate(true)
        SetModal(false)
        SetModalCreate(true)
    }

    const handleDelete = () => {
        if (!selectedItem) return
        if (confirm(`Hapus standar "${selectedItem.title}"?`)) {
            deleteMutation.mutate(selectedItem.id)
        }
    }

    const renderIcon = (iconName: string) => {
        switch (iconName?.toLowerCase()) {
            case 'award':
                return <BsAward />
            case 'shield':
                return <BsShieldCheck />
            default:
                return <BsCoin />
        }
    }

    return (
        <main className='space-y-3 pb-3'>
            <AdminPageHeader
                eyebrow='Petani & Kemitraan'
                title='Standar Kemitraan'
                description='Kelola prinsip kerja sama yang menjaga mutu, keadilan, dan keberlanjutan.'
                icon={BsAward}
                searchPlaceholder='Cari standar...'
                search={search}
                setInputSearch={setSearch}
                onAdd={openCreateModal}
                addLabel='Tambah standar'
            />

            <section className='rounded-xl border border-neutral-100 bg-white p-3 shadow-sm sm:p-4'>
                <div className='mb-4 flex items-center justify-between'>
                    <div>
                        <h2 className='text-sm font-bold text-neutral-800'>Prinsip kemitraan</h2>
                        <p className='text-[10px] text-neutral-400'>Nilai yang diterapkan dalam kerja sama dengan petani</p>
                    </div>
                    <span className='rounded-full bg-sky-50 px-2.5 py-1 text-[9px] font-bold text-sky-700'>
                        {total} standar
                    </span>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-32 animate-pulse rounded-xl bg-neutral-100" />
                        ))}
                    </div>
                ) : standards.length === 0 ? (
                    <div className="py-12 text-center text-neutral-400 text-xs">
                        Belum ada standar kemitraan. Klik &quot;Tambah standar&quot; untuk menambahkan.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {standards.map((item) => (
                            <article key={item.id} className='relative flex min-h-31 overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md'>
                                <div className='flex w-20 shrink-0 items-center justify-center bg-linear-to-br from-amber-500 to-amber-700 text-2xl text-white'>
                                    {renderIcon(item.icon)}
                                </div>
                                <div className='flex-1 p-4 pr-11'>
                                    <p className='text-sm font-bold text-neutral-800'>{item.title}</p>
                                    <p className='mt-1 text-[10px] leading-relaxed text-neutral-400 line-clamp-3'>{item.description}</p>
                                    <div className='mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-neutral-100 pt-3'>
                                        <div className='flex items-center gap-1.5 text-[9px] text-neutral-400'>
                                            <BsCalendar3 />
                                            <span>{new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                                        </div>
                                        <div className='flex items-center gap-1.5 text-[9px] text-neutral-400'>
                                            <BsPerson />
                                            <span>Kopi Tolaki</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedItem(item)
                                        SetModal(true)
                                    }}
                                    aria-label='Atur standar kemitraan'
                                    className='absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-neutral-100 text-neutral-400 transition hover:bg-amber-500 hover:text-neutral-950'>
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
