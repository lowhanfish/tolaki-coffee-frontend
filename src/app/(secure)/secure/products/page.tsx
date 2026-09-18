'use client'

import { useState } from 'react'
import { BsFillPencilFill, BsFillTrashFill, BsBoxSeam, BsBoxes, BsCurrencyDollar } from "react-icons/bs";
import { FaGear, FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image"
import Button from "@/components/items/Button"
import Modal from "@/components/items/Modal"
import Create from './components/create';
import Pagination from '@/components/items/Pagination';
import SelectListShow from '@/components/items/SelectListShow';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { useDataStore } from '@/stores/dataStore';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { fetchApi } from '@/lib/apiFetch';
import { ProductCreateInterface, ProductResponseInterface, ProductResponseListInterface } from './types';
import useDebouncedSearch from '@/hooks/useDebouncedSeacrh';

const Page = () => {
    const url = useDataStore((state) => state.url)
    const queryClient = useQueryClient()

    const [modal, SetModal] = useState<boolean>(false)
    const [modalCreate, SetModalCreate] = useState<boolean>(false)
    const [modalDetail, SetModalDetail] = useState<boolean>(false)
    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<ProductResponseInterface | null>(null)

    const [limit, setLimit] = useState<number>(8)
    const [skip, setSkip] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const debouncedSearch = useDebouncedSearch(search)

    const [form, setForm] = useState<ProductCreateInterface>({
        title: "",
        price: 0,
        unit_price: "",
        description: "",
        files: [],
    })

    const { data: dataResponse, isLoading } = useQuery({
        queryFn: () =>
            fetchApi<ProductResponseListInterface>(
                `${url}/product/read?search=${encodeURIComponent(debouncedSearch)}&skip=${(skip - 1) * limit}&limit=${limit}`,
            ),
        queryKey: ['products-admin', skip, limit, debouncedSearch],
    })

    const products = dataResponse?.data || []
    const total = dataResponse?.total || 0

    const deleteMutation = useMutation({
        mutationFn: (id: string) =>
            fetchApi(`${url}/product/delete/${id}`, {
                method: 'DELETE',
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products-admin'] })
            queryClient.invalidateQueries({ queryKey: ['product'] })
            SetModal(false)
            setSelectedProduct(null)
        },
        onError: (err: any) => {
            alert(err?.message || 'Gagal menghapus produk')
        },
    })

    const emptyForm = () => {
        setForm({
            title: "",
            price: 0,
            unit_price: "",
            description: "",
            files: [],
        })
        setSelectedProduct(null)
        setIsUpdate(false)
    }

    const openCreateModal = () => {
        emptyForm()
        setIsUpdate(false)
        SetModalCreate(true)
    }

    const openEditModal = () => {
        if (!selectedProduct) return
        setForm({
            title: selectedProduct.title,
            price: Number(selectedProduct.price),
            unit_price: selectedProduct.unit_price,
            description: selectedProduct.description || "",
            files: [],
        })
        setIsUpdate(true)
        SetModal(false)
        SetModalCreate(true)
    }

    const handleDelete = async () => {
        if (!selectedProduct) return
        if (confirm(`Yakin ingin menghapus produk "${selectedProduct.title}"?`)) {
            deleteMutation.mutate(selectedProduct.id)
        }
    }

    return (
        <main className='space-y-3 pb-3'>
            <AdminPageHeader
                eyebrow='Katalog'
                title='Kelola Produk'
                description='Atur produk kopi, harga, dan ketersediaan dalam satu tempat.'
                icon={BsBoxSeam}
                searchPlaceholder='Cari produk...'
                search={search}
                setInputSearch={setSearch}
                onAdd={openCreateModal}
                addLabel='Tambah produk'
            />

            <section className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
                <div className='flex items-center gap-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm'>
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-700'><BsBoxSeam /></div>
                    <div><p className='text-[10px] text-neutral-400'>Total produk</p><p className='text-lg font-bold text-neutral-800'>{total}</p></div>
                </div>
                <div className='flex items-center gap-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm'>
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700'><BsBoxes /></div>
                    <div><p className='text-[10px] text-neutral-400'>Produk di halaman ini</p><p className='text-lg font-bold text-neutral-800'>{products.length}</p></div>
                </div>
                <div className='flex items-center gap-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm'>
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700'><BsCurrencyDollar /></div>
                    <div>
                        <p className='text-[10px] text-neutral-400'>Katalog Aktif</p>
                        <p className='text-sm font-bold text-neutral-800'>{total > 0 ? 'Tersedia' : 'Kosong'}</p>
                    </div>
                </div>
            </section>

            <section className='rounded-xl border border-neutral-100 bg-white p-3 shadow-sm sm:p-4'>
                <div className='mb-4 flex items-center justify-between'>
                    <div><h2 className='text-sm font-bold text-neutral-800'>Daftar produk</h2><p className='text-[10px] text-neutral-400'>Katalog produk yang tampil di website</p></div>
                    <span className='rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700'>{total} terdaftar</span>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-64 animate-pulse rounded-xl bg-neutral-100" />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-sm font-bold text-neutral-700">Belum ada data produk</p>
                        <p className="mt-1 text-xs text-neutral-400">Klik &quot;Tambah produk&quot; untuk menambahkan katalog pertama.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {products.map((item) => {
                            const filePath = item.files?.[0]?.path?.replace(/^\.\//, '').replaceAll('\\', '/')
                            const imageSrc = filePath ? `${url}/${filePath}` : '/images/no-image.png'

                            return (
                                <article key={item.id} className='group relative overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md'>
                                    <div className='relative h-42 w-full overflow-hidden bg-amber-50'>
                                        <Image
                                            alt={item.title}
                                            src={imageSrc}
                                            fill
                                            className='object-cover transition duration-300 group-hover:scale-105'
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className='p-4'>
                                        <p className='text-sm font-bold text-neutral-800 line-clamp-1'>{item.title}</p>
                                        <p className='mt-1 text-[10px] text-neutral-400 line-clamp-2'>
                                            {item.description ? item.description.replace(/<[^>]*>?/gm, '') : '-'}
                                        </p>
                                        <div className='mt-3 flex items-end justify-between border-t border-neutral-100 pt-3'>
                                            <div>
                                                <p className='text-[9px] uppercase tracking-wider text-neutral-400'>Harga</p>
                                                <p className='text-xs font-bold text-amber-700'>Rp {Number(item.price).toLocaleString('id-ID')}</p>
                                            </div>
                                            <span className='rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700'>{item.unit_price}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setSelectedProduct(item)
                                            SetModal(true)
                                        }}
                                        aria-label={`Atur ${item.title}`}
                                        className='absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-neutral-950/75 text-white shadow-sm backdrop-blur-sm transition hover:bg-amber-500 hover:text-neutral-950'>
                                        <FaGear className='text-xs' />
                                    </button>
                                </article>
                            )
                        })}
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

            {/* Modal Option */}
            <Modal size="xxs" openModal={modal} setOpenModal={SetModal} color="dark" title="Pengaturan Produk">
                <div className="flex gap-2 flex-col py-5">
                    <Button
                        color="primary"
                        size="h-6"
                        type="rounded"
                        onClick={() => {
                            SetModal(false)
                            SetModalDetail(true)
                        }}
                    >
                        <div className="item-btn-primary text-[12px] flex items-center justify-center gap-2">
                            <FaMagnifyingGlass />
                            <p>Detail</p>
                        </div>
                    </Button>
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

            {/* Modal Detail */}
            <Modal size="md" openModal={modalDetail} setOpenModal={SetModalDetail} color="primary" title="Detail Produk">
                {selectedProduct && (
                    <div className="p-4 space-y-3 text-neutral-800">
                        <div className="flex gap-4 items-center">
                            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-amber-50">
                                <Image
                                    alt={selectedProduct.title}
                                    src={
                                        selectedProduct.files?.[0]?.path
                                            ? `${url}/${selectedProduct.files[0].path.replace(/^\.\//, '').replaceAll('\\', '/')}`
                                            : '/images/no-image.png'
                                    }
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{selectedProduct.title}</h3>
                                <p className="text-xs text-amber-700 font-bold mt-1">
                                    Rp {Number(selectedProduct.price).toLocaleString('id-ID')} / {selectedProduct.unit_price}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-neutral-100 pt-3 text-xs leading-relaxed">
                            <p className="font-bold text-neutral-500 uppercase tracking-wider text-[10px]">Deskripsi</p>
                            <div
                                className="mt-1"
                                dangerouslySetInnerHTML={{ __html: selectedProduct.description || '<p>Tidak ada deskripsi.</p>' }}
                            />
                        </div>
                    </div>
                )}
            </Modal>

            {/* Modal Create / Update */}
            <Create
                modal={modalCreate}
                SetModal={SetModalCreate}
                form={form}
                setForm={setForm}
                emptyForm={emptyForm}
                isUpdate={isUpdate}
                productId={selectedProduct?.id || null}
            />
        </main>
    )
}

export default Page
