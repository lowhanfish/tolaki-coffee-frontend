"use client"

import { ReactNode, useEffect } from 'react'
import useCheckAuth from '@/hooks/useCheckAuth'

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const checkAuth = useCheckAuth()

    useEffect(() => {
        checkAuth().catch(() => undefined)
    }, [checkAuth])

    return (
        <>{children}</>
    )
}

export default AuthProvider
