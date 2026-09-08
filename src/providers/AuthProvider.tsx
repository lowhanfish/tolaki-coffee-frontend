"use client"

import { Fragment, ReactNode, useEffect } from 'react'
import { useDataStore, Profile } from '@/stores/dataStore'
import useGetProfile from '@/hooks/useGetProfile'

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const setIsLogin = useDataStore((state) => state.setIsLogin);
    const setProfile = useDataStore((state) => state.setProfile);

    const { data, isLoading, isError, error } = useGetProfile()

    useEffect(() => {
        if (data) {
            console.log(data)
            setIsLogin("authenticated")
            setProfile({
                name: data.name,
                email: data.email,
                avatarUrl: data.avatarUrl,
                avatarSource: data.avatarSource
            })
        } else if (isError) {
            setIsLogin("unauthenticated")
            setProfile(null)
        }

    }, [data, isError])



    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default AuthProvider
