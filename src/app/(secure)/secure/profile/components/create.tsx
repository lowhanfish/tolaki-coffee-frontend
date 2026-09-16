"use client"

import { Dispatch, SetStateAction } from "react"

import Modal from '@/components/items/Modal'
import Button from '@/components/items/Button'
import InputField from "@/components/items/InputField"
import InputFile from "@/components/items/InputFile"
import InputRichText from "@/components/items/InputRichText"
import InputtextArea from "@/components/items/InputtextArea"
import { fetchApi } from "@/lib/apiFetch"
import { useDataStore } from "@/stores/dataStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ProfileCreateInterface } from '../types'

interface createProps {
    modal: boolean,
    form: ProfileCreateInterface,
    setForm: Dispatch<SetStateAction<ProfileCreateInterface>>
    profileId: string | null,
    emptyForm: () => void,
    isUpdate: boolean,
    SetModal: Dispatch<SetStateAction<boolean>>
}

const Create = ({ modal, form, setForm, profileId, emptyForm, isUpdate, SetModal }: createProps) => {
    const queryClient = useQueryClient()
    const url = useDataStore((state) => state.url)

    const closeModal = () => {
        SetModal(false)
        emptyForm()
    }

    const createMutation = useMutation({
        mutationFn: (formData: FormData) => fetchApi(`${url}/company-profile/create`, {
            method: "POST",
            body: formData,
        }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["profile"] })
            closeModal()
        },
        onError: (error: unknown) => {
            alert(error instanceof Error ? error.message : String(error))
        },
    })

    const updateMutation = useMutation({
        mutationFn: ({ formData, id }: { formData: FormData, id: string }) =>
            fetchApi(`${url}/company-profile/update/${id}`, {
                method: "PATCH",
                body: formData,
            }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["profile"] })
            closeModal()
        },
        onError: (error: unknown) => {
            alert(error instanceof Error ? error.message : String(error))
        },
    })

    const saveData = () => {
        const formData = new FormData()

        formData.append("brand", form.brand)
        formData.append("quotes", form.quotes)
        formData.append("description", form.description)
        formData.append("detail", form.detail)
        formData.append("email", form.email ?? "")
        formData.append("phone", form.phone ?? "")
        formData.append("address", form.address ?? "")

        if (form.file) {
            formData.append("file", form.file)
        }

        if (isUpdate) {
            if (!profileId) return

            updateMutation.mutate({ formData, id: profileId })
            return
        }

        createMutation.mutate(formData)
    }

    const SetObjForm = <K extends keyof ProfileCreateInterface>(value: ProfileCreateInterface[K], key: K) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const isPending = createMutation.isPending || updateMutation.isPending
    const isFormInvalid = !(form.brand ?? "").trim()
        || !(form.quotes ?? "").trim()
        || !(form.description ?? "").trim()
        || !(form.detail ?? "").trim()
        || (isUpdate && !profileId)

    return (
        <Modal
            size="lg"
            openModal={modal}
            setOpenModal={SetModal}
            color="primary"
            title={isUpdate ? "Update Company Profile" : "Create Company Profile"}
        >
            <div className="flex gap-2 flex-col py-5 px-3">
                <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/60 p-3">
                    <InputFile
                        title="Upload Profile Image"
                        multiple={false}
                        onChange={(files) => SetObjForm(files[0] ?? null, "file")}
                    />
                    <p className="mt-1 text-[10px] text-neutral-500">
                        {form.file
                            ? `Selected file: ${form.file.name}`
                            : isUpdate
                                ? "Leave empty to keep the current image."
                                : "Choose one image file for the company profile."}
                    </p>
                </div>

                <div>
                    <InputField
                        title="Brand Name"
                        type="text"
                        value={form.brand}
                        onChange={(e) => SetObjForm(e as string, "brand")}
                    />
                </div>
                <div>
                    <InputField
                        title="Quote / Tagline"
                        type="text"
                        value={form.quotes}
                        onChange={(e) => SetObjForm(e as string, "quotes")}
                    />
                </div>
                <div>
                    <InputtextArea
                        title="Description"
                        value={form.description}
                        onChange={(e) => SetObjForm(e as string, "description")}
                    />
                </div>

                <div className="w-full">
                    <InputRichText
                        title="Profile Detail"
                        value={form.detail}
                        onChange={(htmlText) => SetObjForm(htmlText, "detail")}
                    />
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <InputField
                        title="Email"
                        type="email"
                        value={form.email ?? ""}
                        onChange={(e) => SetObjForm(e as string, "email")}
                    />
                    <InputField
                        title="Phone Number"
                        type="tel"
                        value={form.phone ?? ""}
                        onChange={(e) => SetObjForm(e as string, "phone")}
                    />
                </div>

                <div>
                    <InputtextArea
                        title="Address"
                        value={form.address ?? ""}
                        onChange={(e) => SetObjForm(e as string, "address")}
                    />
                </div>

            </div>

            <div className="border-y-[0.1px] border-black/20 py-2 mb-3 mx-3 flex gap-2 justify-end">
                <div className="w-25">

                    <Button
                        color="primary"
                        disabled={isPending || isFormInvalid}
                        onClick={() => saveData()}
                    >
                        <div className="flex gap-2 items-center">
                            <p>💾</p>
                            <p className="text-white font-bold text-[12px]">
                                {isPending ? "Saving..." : isUpdate ? "Update" : "Save"}
                            </p>
                        </div>
                    </Button>
                </div>
                <div className="w-25">

                    <Button
                        color="danger"
                        disabled={isPending}
                        onClick={closeModal}
                    >
                        <div className="flex gap-2 items-center">
                            <p>🚫</p>
                            <p className="text-white font-bold text-[12px]">Cancel</p>
                        </div>
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default Create
