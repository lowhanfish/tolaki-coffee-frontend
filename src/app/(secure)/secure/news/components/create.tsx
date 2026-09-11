"use client"

import { useState, Dispatch, SetStateAction } from "react"


import Modal from '@/components/items/Modal'
import Button from '@/components/items/Button'
import InputField from "@/components/items/InputField"
import InputFile from "@/components/items/InputFile"
import InputRichText from "@/components/items/InputRichText"
import { fetchApi } from "@/lib/apiFetch"
import { useQueryClient, useMutation } from "@tanstack/react-query"

import { NewsCreateInterface } from "../types"
import InputtextArea from "@/components/items/InputtextArea"
import { useDataStore } from "@/stores/dataStore"



interface createProps {
    modal: boolean,
    SetModal: Dispatch<SetStateAction<boolean>>
}

const Create = ({ modal, SetModal }: createProps) => {

    const querClient = useQueryClient()
    const url = useDataStore(state => state.url)

    const [form, setForm] = useState<NewsCreateInterface>({
        id: "",
        title: "",
        description: "",
        news: "",
        source: "",
        file: null,
    })

    const emptyForm = () => {
        setForm({
            id: "",
            title: "",
            description: "",
            news: "",
            source: "",
            file: null,
        })
    }

    const setDataMutation = useMutation({
        mutationFn: (formData: FormData) => fetchApi(`${url}/news/create`, {
            method: "POST",
            body: formData
        }),
        onSuccess: () => {
            querClient.invalidateQueries({ queryKey: ["product-admin"] })
            SetModal(false);
            emptyForm()
        },
        onError: (err: unknown) => {
            alert(`Error : ${err instanceof Error ? err.message : String(err)}`)
        }
    })

    const saveData = () => {
        const formData = new FormData()
        formData.append("title", form.title)
        formData.append("description", form.description)
        formData.append("news", form.news)
        formData.append("source", form.source)

        if (form.file) {
            formData.append("file", form.file)
        }


        setDataMutation.mutate(formData)
    }



    // const SetObjForm = (data: string | number | File | null, key: keyof NewsCreateInterface) => {
    //     setForm({
    //         ...form,
    //         [key]: data
    //     })
    // }

    const SetObjForm = <K extends keyof NewsCreateInterface>(value: NewsCreateInterface[K], key: K) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    return (
        <Modal size="md" openModal={modal} setOpenModal={SetModal} color="primary" title="Config">
            <div className="flex gap-2 flex-col py-5 px-3">

                <div>
                    <InputField
                        title="Title"
                        type="text"
                        value={form.title}
                        onChange={(e) => SetObjForm(e as string, "title")}
                    />
                </div>

                <div>
                    <InputtextArea
                        value={form.description}
                        onChange={(e) => SetObjForm(e as string, "description")}
                        title="Description"
                    />
                </div>

                <div className="w-full">
                    <InputRichText
                        title="News"
                        value={form.news}
                        onChange={(htmlText) => SetObjForm(htmlText, 'news')} // Mengirim data HTML kembali ke state 'desc'
                    />
                </div>

                <div className="w-full">
                    <InputFile
                        title="Image News"
                        multiple={false}
                        onChange={(val) => {
                            const selectedFile = val.length > 0 ? val[0] : null;
                            SetObjForm(selectedFile, "file");
                        }}
                    />
                </div>
            </div>

            <div className="border-y-[0.1px] border-black/20 py-2 mb-3 mx-3 flex gap-2 justify-end">
                <div className="w-25">

                    <Button
                        color="primary"
                        onClick={() => saveData()}
                    >
                        <div className="flex gap-2 items-center">
                            <p>💾</p>
                            <p className="text-white font-bold text-[12px]">Save</p>
                        </div>
                    </Button>
                </div>
                <div className="w-25">

                    <Button
                        color="danger"
                        onClick={() => SetModal(!modal)}
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
