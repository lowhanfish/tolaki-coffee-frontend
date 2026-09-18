"use client"

import { useState, Dispatch, SetStateAction } from "react"
import Modal from '@/components/items/Modal'
import Button from '@/components/items/Button'
import InputField from "@/components/items/InputField"
import InputRichText from "@/components/items/InputRichText"
import { useDataStore } from "@/stores/dataStore"
import { fetchApi } from "@/lib/apiFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export interface StoryFormProps {
    id?: string
    title: string
    news: string
    file: File | null
}

interface CreateProps {
    modal: boolean
    SetModal: Dispatch<SetStateAction<boolean>>
    form: StoryFormProps
    setForm: Dispatch<SetStateAction<StoryFormProps>>
    emptyForm: () => void
    isUpdate: boolean
}

const Create = ({ modal, SetModal, form, setForm, emptyForm, isUpdate }: CreateProps) => {
    const url = useDataStore((state) => state.url)
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)

    const SetObjForm = (data: string | File | null, key: keyof StoryFormProps) => {
        setForm((prev) => ({
            ...prev,
            [key]: data,
        }))
    }

    const mutation = useMutation({
        mutationFn: async () => {
            const formData = new FormData()
            formData.append('title', form.title)
            formData.append('news', form.news)
            if (form.file) {
                formData.append('file', form.file)
            }

            const endpoint = isUpdate && form.id
                ? `${url}/story-from-garden/update/${form.id}`
                : `${url}/story-from-garden/create`

            return fetchApi(endpoint, {
                method: isUpdate ? 'PATCH' : 'POST',
                body: formData,
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stories-admin'] })
            queryClient.invalidateQueries({ queryKey: ['story-from-garden'] })
            SetModal(false)
            emptyForm()
        },
        onError: (err: any) => {
            alert(err?.message || 'Gagal menyimpan cerita kebun')
        },
        onSettled: () => {
            setLoading(false)
        },
    })

    const saveData = () => {
        if (!form.title || !form.news) {
            alert('Harap isi judul dan cerita petani')
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
            title={isUpdate ? "Edit Cerita dari Kebun" : "Tambah Cerita dari Kebun"}
        >
            <div className="flex gap-2 flex-col py-5 px-3">
                <div>
                    <InputField
                        title="Judul Kisah / Nama Petani"
                        type="text"
                        value={form.title}
                        onChange={(e) => SetObjForm(e as string, "title")}
                        placholder="Contoh: Pak Maryan - Konawe Selatan"
                    />
                </div>

                <div className="w-full">
                    <InputRichText
                        title="Cerita / Kisah Petani"
                        value={form.news}
                        onChange={(htmlText) => SetObjForm(htmlText, 'news')}
                    />
                </div>

                <div>
                    <p className="text-[11px] font-semibold text-neutral-600 mb-1">Foto Petani / Kebun</p>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full text-xs text-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null
                            SetObjForm(file, 'file')
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
