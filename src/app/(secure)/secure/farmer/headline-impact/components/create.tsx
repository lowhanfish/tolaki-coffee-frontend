"use client"

import { useState, Dispatch, SetStateAction } from "react"
import Modal from '@/components/items/Modal'
import Button from '@/components/items/Button'
import InputField from "@/components/items/InputField"
import { useDataStore } from "@/stores/dataStore"
import { fetchApi } from "@/lib/apiFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export interface PartnerFormProps {
    id?: string
    partner: string
    area: number
    altitude_from: number
    altitude_to: number
}

interface CreateProps {
    modal: boolean
    SetModal: Dispatch<SetStateAction<boolean>>
    form: PartnerFormProps
    setForm: Dispatch<SetStateAction<PartnerFormProps>>
    emptyForm: () => void
    isUpdate: boolean
}

const Create = ({ modal, SetModal, form, setForm, emptyForm, isUpdate }: CreateProps) => {
    const url = useDataStore((state) => state.url)
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)

    const SetObjForm = (data: string | number, key: keyof PartnerFormProps) => {
        setForm((prev) => ({
            ...prev,
            [key]: data,
        }))
    }

    const mutation = useMutation({
        mutationFn: async () => {
            const endpoint = isUpdate && form.id
                ? `${url}/partner/update/${form.id}`
                : `${url}/partner/create`

            return fetchApi(endpoint, {
                method: isUpdate ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    partner: form.partner,
                    area: Number(form.area),
                    altitude_from: Number(form.altitude_from),
                    altitude_to: Number(form.altitude_to),
                }),
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partners-admin'] })
            queryClient.invalidateQueries({ queryKey: ['partner'] })
            SetModal(false)
            emptyForm()
        },
        onError: (err: any) => {
            alert(err?.message || 'Gagal menyimpan data wilayah')
        },
        onSettled: () => {
            setLoading(false)
        },
    })

    const saveData = () => {
        if (!form.partner) {
            alert('Harap isi nama wilayah kemitraan')
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
            title={isUpdate ? "Edit Wilayah Kemitraan" : "Tambah Wilayah Kemitraan"}
        >
            <div className="flex gap-2 flex-col py-5 px-3">
                <div>
                    <InputField
                        title="Nama Wilayah / Kelompok"
                        type="text"
                        value={form.partner}
                        onChange={(e) => SetObjForm(e as string, "partner")}
                        placholder="Contoh: Konawe Selatan"
                    />
                </div>
                <div className="flex gap-2 w-full">
                    <InputField
                        title="Luas Area (Hektare)"
                        type="number"
                        value={form.area}
                        onChange={(e) => SetObjForm(Number(e), "area")}
                        placholder="55"
                    />
                </div>
                <div className="flex gap-2 w-full">
                    <InputField
                        title="Ketinggian Dari (Mdpl)"
                        type="number"
                        value={form.altitude_from}
                        onChange={(e) => SetObjForm(Number(e), "altitude_from")}
                        placholder="500"
                    />
                    <InputField
                        title="Ketinggian Sampai (Mdpl)"
                        type="number"
                        value={form.altitude_to}
                        onChange={(e) => SetObjForm(Number(e), "altitude_to")}
                        placholder="1000"
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
