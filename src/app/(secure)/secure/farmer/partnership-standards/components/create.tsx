"use client"

import { useState, Dispatch, SetStateAction } from "react"
import Modal from '@/components/items/Modal'
import Button from '@/components/items/Button'
import InputField from "@/components/items/InputField"
import InputtextArea from "@/components/items/InputtextArea"
import { useDataStore } from "@/stores/dataStore"
import { fetchApi } from "@/lib/apiFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export interface StandardFormProps {
    id?: string
    title: string
    description: string
    icon: string
}

interface CreateProps {
    modal: boolean
    SetModal: Dispatch<SetStateAction<boolean>>
    form: StandardFormProps
    setForm: Dispatch<SetStateAction<StandardFormProps>>
    emptyForm: () => void
    isUpdate: boolean
}

const Create = ({ modal, SetModal, form, setForm, emptyForm, isUpdate }: CreateProps) => {
    const url = useDataStore((state) => state.url)
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)

    const SetObjForm = (data: string, key: keyof StandardFormProps) => {
        setForm((prev) => ({
            ...prev,
            [key]: data,
        }))
    }

    const mutation = useMutation({
        mutationFn: async () => {
            const endpoint = isUpdate && form.id
                ? `${url}/partnership-standard/update/${form.id}`
                : `${url}/partnership-standard/create`

            return fetchApi(endpoint, {
                method: isUpdate ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: form.title,
                    description: form.description,
                    icon: form.icon || 'coin',
                }),
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['standards-admin'] })
            queryClient.invalidateQueries({ queryKey: ['partnership-standard'] })
            SetModal(false)
            emptyForm()
        },
        onError: (err: any) => {
            alert(err?.message || 'Gagal menyimpan standar kemitraan')
        },
        onSettled: () => {
            setLoading(false)
        },
    })

    const saveData = () => {
        if (!form.title || !form.description) {
            alert('Harap isi judul dan deskripsi prinsip.')
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
            title={isUpdate ? "Edit Standar Kemitraan" : "Tambah Standar Kemitraan"}
        >
            <div className="flex gap-2 flex-col py-5 px-3">
                <div>
                    <InputField
                        title="Judul Standar"
                        type="text"
                        value={form.title}
                        onChange={(e) => SetObjForm(e as string, "title")}
                        placholder="Contoh: Harga yang Adil"
                    />
                </div>

                <div className="w-full">
                    <InputtextArea
                        title="Deskripsi / Komitmen"
                        value={form.description}
                        onChange={(e) => SetObjForm(e as string, "description")}
                    />
                </div>

                <div>
                    <InputField
                        title="Tipe Ikon (opsional: coin, award, tree, shield)"
                        type="text"
                        value={form.icon}
                        onChange={(e) => SetObjForm(e as string, "icon")}
                        placholder="coin"
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
