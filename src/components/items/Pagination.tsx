'use client'

import { useState } from 'react'

interface PaginationProps {
    total: number
    limit: number
    pageShow?: number
    page?: number
    onPageChange?: (page: number) => void
}

const Pagination = ({
    total,
    limit,
    pageShow = 5,
    page,
    onPageChange,
}: PaginationProps) => {
    const [internalPage, setInternalPage] = useState(1)

    const safeLimit = Math.max(1, Math.floor(limit))
    const safePageShow = Math.max(3, Math.floor(pageShow))
    const totalPages = Math.ceil(Math.max(0, total) / safeLimit)
    const requestedPage = page ?? internalPage
    const currentPage = totalPages === 0
        ? 1
        : Math.min(Math.max(1, requestedPage), totalPages)

    const hasHiddenPages = totalPages > safePageShow
    const middlePageCount = Math.max(1, safePageShow - 2)
    const middleStart = Math.min(
        Math.max(2, currentPage - Math.floor(middlePageCount / 2)),
        Math.max(2, totalPages - middlePageCount),
    )
    const groupStart = hasHiddenPages ? middleStart : 1
    const groupEnd = hasHiddenPages
        ? Math.min(totalPages - 1, groupStart + middlePageCount - 1)
        : totalPages
    const pages = Array.from(
        { length: Math.max(0, groupEnd - groupStart + 1) },
        (_, index) => groupStart + index,
    )

    const changePage = (nextPage: number) => {
        if (totalPages === 0) return

        const validPage = Math.min(Math.max(1, nextPage), totalPages)

        if (page === undefined) {
            setInternalPage(validPage)
        }

        onPageChange?.(validPage)
    }

    const isPreviousDisabled = totalPages === 0 || currentPage === 1
    const isNextDisabled = totalPages === 0 || currentPage === totalPages
    const navigationButtonClass = `
        flex h-8 min-w-8 cursor-pointer items-center justify-center
        rounded-lg border border-neutral-200 bg-white px-2 shadow-sm transition
        hover:border-amber-300 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-40
    `
    const pageButtonClass = (isActive: boolean) => `
        ${isActive ? 'bg-amber-500 text-neutral-950' : 'border border-neutral-200 bg-white text-neutral-500 hover:border-amber-300 hover:text-amber-700'}
        flex h-8 min-w-8 cursor-pointer items-center justify-center
        rounded-lg px-2 text-[10px] font-bold shadow-sm transition
    `

    return (
        <nav aria-label="Pagination">
            <div className="flex gap-1">
                <button
                    type="button"
                    onClick={() => changePage(currentPage - 1)}
                    disabled={isPreviousDisabled}
                    aria-label="Halaman sebelumnya"
                    className={navigationButtonClass}
                >
                    <span aria-hidden="true" className="text-sm">‹</span>
                </button>

                {groupStart > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => changePage(1)}
                            aria-label="Halaman 1"
                            className={pageButtonClass(currentPage === 1)}
                        >
                            <span>1</span>
                        </button>

                        <span
                            aria-hidden="true"
                            className="flex h-8 min-w-8 items-center justify-center text-[10px] text-neutral-400"
                        >
                            …
                        </span>
                    </>
                )}

                {pages.map((item) => (
                    <button
                        type="button"
                        key={item}
                        onClick={() => changePage(item)}
                        aria-label={`Halaman ${item}`}
                        aria-current={currentPage === item ? 'page' : undefined}
                        className={pageButtonClass(currentPage === item)}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                {groupEnd < totalPages && (
                    <>
                        <span
                            aria-hidden="true"
                            className="flex h-8 min-w-8 items-center justify-center text-[10px] text-neutral-400"
                        >
                            …
                        </span>

                        <button
                            type="button"
                            onClick={() => changePage(totalPages)}
                            aria-label={`Halaman ${totalPages}`}
                            className={pageButtonClass(currentPage === totalPages)}
                        >
                            <span>{totalPages}</span>
                        </button>
                    </>
                )}

                <button
                    type="button"
                    onClick={() => changePage(currentPage + 1)}
                    disabled={isNextDisabled}
                    aria-label="Halaman berikutnya"
                    className={navigationButtonClass}
                >
                    <span aria-hidden="true" className="text-sm">›</span>
                </button>
            </div>
        </nav>
    )
}

export default Pagination
