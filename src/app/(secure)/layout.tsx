'use client';

import { ReactNode, useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { IoIosMenu } from "react-icons/io";
import { useDataStore } from '@/stores/dataStore';
import { usePathname, useRouter } from 'next/navigation';
import ImageProfileNavbar from '@/components/ImageProfileNavbar';





interface ChildrensProps {
    children: ReactNode
}


const SecureLayout = ({ children }: ChildrensProps) => {

    const isLogin = useDataStore(state => state.isLogin)
    const router = useRouter()
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const pageTitle = pathname.split('/').filter(Boolean).at(-1)
        ?.split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') ?? 'Dashboard'

    useEffect(() => {
        if (isLogin == "unauthenticated") {
            router.replace('/home');
        }
    }, [isLogin, router])

    useEffect(() => {
        if (!isSidebarOpen) return

        const closeWithEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsSidebarOpen(false)
        }

        window.addEventListener('keydown', closeWithEscape)
        return () => window.removeEventListener('keydown', closeWithEscape)
    }, [isSidebarOpen])

    return (
        <>
            {
                isLogin == "authenticated" && (
                    <div className='h-full w-full overflow-hidden bg-[#f5f2ed] text-neutral-800'>
                        <div className='flex h-full w-full'>
                            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                            {isSidebarOpen && (
                                <button
                                    type='button'
                                    aria-label='Tutup menu navigasi'
                                    onClick={() => setIsSidebarOpen(false)}
                                    className='fixed inset-0 z-30 cursor-default bg-neutral-950/55 backdrop-blur-[2px] lg:hidden'
                                />
                            )}
                            <div className='flex min-w-0 flex-1 flex-col'>
                                <header className='z-10 flex h-17 shrink-0 items-center border-b border-neutral-200/80 bg-white/90 px-4 shadow-sm backdrop-blur-xl sm:px-6'>
                                    <div className='flex-1 flex gap-2 items-center'>
                                        <button
                                            type='button'
                                            onClick={() => setIsSidebarOpen((current) => !current)}
                                            aria-label={isSidebarOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                                            aria-expanded={isSidebarOpen}
                                            className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-amber-50 text-amber-700 ring-1 ring-amber-100 transition hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 lg:hidden'
                                        >
                                            <IoIosMenu className='text-lg' />
                                        </button>
                                        <div>
                                            <p className='text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-400'>Panel Admin</p>
                                            <p className='text-sm font-bold text-neutral-800'>{pageTitle}</p>
                                        </div>
                                    </div>
                                    <div className='flex-1 flex gap-2 items-center justify-end'>
                                        <ImageProfileNavbar />
                                    </div>
                                </header>

                                <div className='flex-1 overflow-y-auto p-3 sm:p-4 lg:p-5'>
                                    <div className='mx-auto w-full max-w-400'>
                                        {children}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                )
            }
        </>



    )
}

export default SecureLayout
