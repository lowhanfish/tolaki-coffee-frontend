"use client"

import { useState, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"


const TanstackQuery = ({ children }: { children: ReactNode }) => {

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        gcTime: 1000 * 60 * 60 * 24, // 24 hours
                    },
                },
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools buttonPosition='top-left' />
        </QueryClientProvider>
    )
}

export default TanstackQuery
