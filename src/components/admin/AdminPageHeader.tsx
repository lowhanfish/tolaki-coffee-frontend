'use client'

import { IconType } from 'react-icons'
import { BsPlusLg, BsSearch } from 'react-icons/bs'

interface AdminPageHeaderProps {
    eyebrow: string
    title: string
    description: string
    icon: IconType
    searchPlaceholder?: string
    onAdd?: () => void
    addLabel?: string
}

const AdminPageHeader = ({
    eyebrow,
    title,
    description,
    icon: Icon,
    searchPlaceholder,
    onAdd,
    addLabel = 'Tambah data',
}: AdminPageHeaderProps) => {
    return (
        <section className='relative overflow-hidden rounded-xl bg-linear-to-r from-neutral-900 via-neutral-800 to-amber-900 px-5 py-5 text-white shadow-sm'>
            <div className='absolute -right-10 -top-14 h-40 w-40 rounded-full border-28 border-amber-400/10' />
            <div className='absolute -bottom-16 right-32 h-32 w-32 rounded-full bg-amber-400/8' />

            <div className='relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
                <div className='flex items-start gap-3'>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-amber-300 backdrop-blur-sm'>
                        <Icon className='text-xl' />
                    </div>
                    <div>
                        <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400'>{eyebrow}</p>
                        <h1 className='mt-1 text-xl font-bold tracking-tight sm:text-2xl'>{title}</h1>
                        <p className='mt-1 max-w-xl text-[11px] leading-relaxed text-white/60 sm:text-xs'>{description}</p>
                    </div>
                </div>

                {(searchPlaceholder || onAdd) && (
                    <div className='flex w-full flex-col gap-2 sm:flex-row lg:w-auto'>
                        {searchPlaceholder && (
                            <label className='flex h-10 min-w-0 items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 backdrop-blur-sm sm:min-w-64'>
                                <BsSearch className='shrink-0 text-sm text-white/45' />
                                <input
                                    type='text'
                                    placeholder={searchPlaceholder}
                                    aria-label={searchPlaceholder}
                                    className='w-full bg-transparent text-xs text-white outline-none placeholder:text-white/40'
                                />
                            </label>
                        )}
                        {onAdd && (
                            <button
                                type='button'
                                onClick={onAdd}
                                className='flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 text-xs font-bold text-neutral-900 shadow-sm transition hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300'
                            >
                                <BsPlusLg />
                                {addLabel}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

export default AdminPageHeader
