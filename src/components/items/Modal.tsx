import { ReactNode, Dispatch, SetStateAction } from 'react'
import ProductDetail from '../ProductDetail'


interface ModalProps {
    size: string,
    children: ReactNode,
    openModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>,
    color?: string,
    title?: string
}

const sizeMap: Record<string, string> = {
    xxs: 'w-full max-w-65',
    xs: 'w-full max-w-xs',
    sm: 'w-full max-w-md',
    md: 'w-full max-w-xl',
    lg: 'w-full max-w-4xl',
    xl: 'w-full max-w-6xl',
}

const colorMap: Record<string, string> = {
    primary: 'bg-linear-to-r from-amber-500 to-white',
    warning: 'bg-linear-to-r from-orange-500 to-white',
    danger: 'bg-linear-to-r from-red-800 to-white',
    success: 'bg-linear-to-r from-lime-700 to-white',
    dark: 'bg-linear-to-r from-neutral-800 to-white',
}

const Modal = ({ size, children, openModal, setOpenModal, color, title }: ModalProps) => {
    return (
        <>
            {
                openModal && (

                    <div className='fixed z-2 bg-black/50 inset-0 flex flex-col justify-center items-center'>
                        <div className={`bg shadow-md shadow-black/30 min-h-30 flex flex-col rounded-sm ${sizeMap[size]} relative overflow-scroll scrollbar-thumb-yellow-600`}>

                            <div className={`flex ${color ? colorMap[color] : ''} p-2 rounded-t-sm`}>
                                <div className='flex-1'>
                                    <p className='text-[16px] font-bold text-white text-shadow-sm text-shadow-black/10'>{title ? title : ""}</p>
                                </div>

                                <button onClick={() => setOpenModal(!openModal)} className='bg-black/10 rounded-full border border-white w-6 h-6 cursor-pointer'>
                                    ✖️
                                </button>
                            </div>
                            <div className='px-3'>
                                <ProductDetail />
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default Modal
