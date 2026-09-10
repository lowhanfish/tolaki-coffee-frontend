"use client"

import { useState, Dispatch, SetStateAction } from "react"


import Modal from '@/components/items/Modal'
import Button from '@/components/items/Button'
import InputField from "@/components/items/InputField"
import InputFile from "@/components/items/InputFile"
import InputRichText from "@/components/items/InputRichText"
import { fetchApi } from "@/lib/apiFetch"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"

import { NewsResponseInterface, NewsCreateInterface } from "../types"
import InputtextArea from "@/components/items/InputtextArea"



interface createProps {
    modal: boolean,
    SetModal: Dispatch<SetStateAction<boolean>>
}

// interface NewsCreateInterface {
//     id: string,
//     title: string,
//     price: number,
//     unit_price: string,
//     stock: number,
//     desc: string,
//     img: File[],
// }

const Create = ({ modal, SetModal }: createProps) => {
    const [form, setForm] = useState<NewsCreateInterface>({
        id: "",
        title: "",
        description: "",
        news: "",
        source: "",
        file: [],
    })

    const saveData = () => {
        console.log(form)
    }

    const SetObjForm = (data: string | number | File[], key: keyof NewsCreateInterface) => {
        setForm({
            ...form,
            [key]: data
        })
    }

    return (
        <Modal size="md" openModal={modal} setOpenModal={SetModal} color="primary" title="Config">
            <div className="flex gap-2 flex-col py-5 px-3">
                <div>
                    <InputField
                        title="Title"
                        type="text"
                        value={form.title}
                        onChange={(e) => SetObjForm(e, "title")}
                    />
                </div>
                <div>
                    <InputtextArea
                        value={form.description}
                        onChange={(e) => SetObjForm(e, "description")}
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
                        onChange={(val) => {
                            SetObjForm(val, "file")
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
