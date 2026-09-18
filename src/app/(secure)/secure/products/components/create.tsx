"use client"

import { useState, Dispatch, SetStateAction } from "react"
import Modal from '@/components/items/Modal'
import Button from '@/components/items/Button'
import InputField from "@/components/items/InputField"
import InputFile from "@/components/items/InputFile"
import InputRichText from "@/components/items/InputRichText"
import { ProductCreateInterface } from "../types"
import { useDataStore } from "@/stores/dataStore"
import { fetchApi } from "@/lib/apiFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface CreateProps {
    modal: boolean
    SetModal: Dispatch<SetStateAction<boolean>>
    form: ProductCreateInterface
    setForm: Dispatch<SetStateAction<ProductCreateInterface>>
    emptyForm: () => void
    isUpdate: boolean
    productId: string | null
}

const Create = ({ modal, SetModal, form, setForm, emptyForm, isUpdate, productId }: CreateProps) => {
    const url = useDataStore((state) => state.url)
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)

    const SetObjForm = (data: string | number | File[], key: keyof ProductCreateInterface) => {
        setForm((prev) => ({
            ...prev,
            [key]: data,
        }))
    }

    const mutation = useMutation({
        mutationFn: async () => {
            const formData = new FormData()
            formData.append('title', form.title)
            formData.append('price', String(form.price))
            formData.append('unit_price', form.unit_price)
            formData.append('description', form.description || '')

            if (form.files && form.files.length > 0) {
                form.files.forEach((file) => {
                    formData.append('files', file)
                })
            }

            const endpoint = isUpdate && productId
                ? `${url}/product/update/${productId}`
                : `${url}/product/create`

            return fetchApi(endpoint, {
                method: isUpdate ? 'PATCH' : 'POST',
                body: formData,
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products-admin'] })
            queryClient.invalidateQueries({ queryKey: ['product'] })
            SetModal(false)
            emptyForm()
        },
        onError: (err: any) => {
            console.error(err)
            alert(err?.message || 'Gagal menyimpan produk')
        },
        onSettled: () => {
            setLoading(false)
        },
    })

    const saveData = () => {
        if (!form.title || !form.price || !form.unit_price) {
            alert('Harap isi nama produk, harga, dan satuan harga.')
            return
        }
        setLoading(true)
        mutation.mutate()
    }

    return (
        <Modal
            size="md"
            openModal={modal}
            setOpenModal={SetModal}
            color="primary"
            title={isUpdate ? "Edit Produk" : "Tambah Produk"}
        >
            <div className="flex gap-2 flex-col py-5 px-3">
                <div>
                    <InputField
                        title="Nama Produk"
                        type="text"
                        value={form.title}
                        onChange={(e) => SetObjForm(e as string, "title")}
                        placholder="Contoh: Kopi Robusta Tolaki"
                    />
                </div>
                <div className="flex gap-2 w-full">
                    <InputField
                        title="Harga (Rp)"
                        type="number"
                        value={form.price}
                        onChange={(e) => SetObjForm(Number(e), "price")}
                        placholder="85000"
                    />

                    <InputField
                        title="Satuan (Unit Price)"
                        type="text"
                        value={form.unit_price}
                        onChange={(e) => SetObjForm(e as string, "unit_price")}
                        placholder="Contoh: 250gr / Pack"
                    />
                </div>

                <div className="w-full">
                    <InputRichText
                        title="Deskripsi Produk"
                        value={form.description}
                        onChange={(htmlText) => SetObjForm(htmlText, 'description')}
                    />
                </div>

                <div className="w-full">
                    <InputFile
                        title="Foto Produk"
                        onChange={(val) => {
                            SetObjForm(val as File[], "files")
                        }}
                    />
                </div>
            </div>

            <div className="border-y-[0.1px] border-black/20 py-2 mb-3 mx-3 flex gap-2 justify-end">
                <div className="w-25">
                    <Button
                        color="primary"
                        disabled={loading}
                        onClick={saveData}
                    >
                        <div className="flex gap-2 items-center justify-center">
                            <p>💾</p>
                            <p className="text-white font-bold text-[12px]">{loading ? 'Menyimpan...' : 'Simpan'}</p>
                        </div>
                    </Button>
                </div>
                <div className="w-25">
                    <Button
                        color="danger"
                        disabled={loading}
                        onClick={() => {
                            SetModal(false)
                            emptyForm()
                        }}
                    >
                        <div className="flex gap-2 items-center justify-center">
                            <p>🚫</p>
                            <p className="text-white font-bold text-[12px]">Batal</p>
                        </div>
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default Create
