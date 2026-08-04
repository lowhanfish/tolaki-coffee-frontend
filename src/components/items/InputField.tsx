import React from 'react'


interface InputFieldProps {
    title?: string
    type: string,
    onChange: (value: string | number) => void
    value: string | number
    placholder?: string
}

const InputField = ({ title, type, onChange, value, placholder }: InputFieldProps) => {



    return (
        <div className='flex w-full flex-col' >
            <p className={`text-[11px] font-bold text-neutral-400 ${title ? 'block' : 'hidden'}`} >{title}</p>
            <input
                placeholder={placholder}
                className="input-field w-full"
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default InputField
