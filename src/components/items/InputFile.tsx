import { useState } from 'react'
import { BsFolder2Open } from "react-icons/bs";

interface InputFieldProps {
    title?: string,
    multiple?: boolean,
    onChange: (value: File[]) => void,
}

const InputFile = ({ title, multiple = true, onChange }: InputFieldProps) => {

    const [fileLength, SetFileLength] = useState(0)

    return (
        <div className='flex w-full flex-col' >
            <p className={`text-[11px] font-bold text-neutral-400 ${title ? 'block' : 'hidden'}`} >{title}</p>
            <label className='input-file-area w-full relative'>
                <input
                    className="input-file"
                    type="file"
                    multiple={multiple}
                    accept="image/*" // batasi khusus gambar jika ini form produk
                    onChange={(e) => {
                        if (e.target.files) {
                            // Ubah FileList menjadi File[] sebelum dimasukkan ke state
                            const filesArray = Array.from(e.target.files);
                            SetFileLength(filesArray.length)
                            // SetObjForm(filesArray, 'img');
                            onChange(filesArray)
                        }
                    }}
                />

                <div className='input-file-label'>
                    {
                        fileLength < 1 ? 'Select File' : `(${fileLength}) File Selected`
                    }

                </div>
                <div className='bg-neutral-500/50 input-file-icon'>
                    <BsFolder2Open className='text-white' />
                </div>


            </label>
        </div>
    )
}

export default InputFile
