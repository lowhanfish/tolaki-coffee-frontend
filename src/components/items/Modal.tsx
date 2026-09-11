import { ReactNode, Dispatch, SetStateAction } from 'react'
// import ProductDetail from '../ProductDetail'


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
    primary: 'bg-linear-to-r from-amber-600 to-amber-500',
    warning: 'bg-linear-to-r from-orange-700 to-orange-500',
    danger: 'bg-linear-to-r from-rose-800 to-rose-600',
    success: 'bg-linear-to-r from-emerald-800 to-emerald-600',
    dark: 'bg-linear-to-r from-neutral-900 to-neutral-700',
}

const Modal = ({ size, children, openModal, setOpenModal, color, title }: ModalProps) => {
    return (
        <>
            {
                openModal && (

                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/65 p-4 backdrop-blur-sm'>
                        <div className={`relative flex max-h-[90vh] min-h-30 flex-col overflow-y-auto rounded-2xl bg-white shadow-2xl shadow-black/30 ${sizeMap[size]}`} role='dialog' aria-modal='true' aria-label={title || 'Dialog'}>

                            <div className={`sticky top-0 z-10 flex items-center px-5 py-3.5 ${color ? colorMap[color] : 'bg-neutral-900'}`}>
                                <div className='flex-1'>
                                    <p className='text-sm font-bold text-white'>{title ? title : ""}</p>
                                </div>

                                <button type='button' aria-label='Tutup dialog' onClick={() => setOpenModal(!openModal)} className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs text-white transition hover:bg-white/20'>
                                    ✕
                                </button>
                            </div>
                            <div>
                                {children}
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default Modal
