"use client"

import { Fragment, ReactNode, useEffect } from 'react'
import { useDataStore, Profile } from '@/stores/dataStore'
import { fetchApi } from '@/lib/apiFetch'
import { useQuery, QueryClient, useQueryClient } from '@tanstack/react-query'

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const url = useDataStore(state => state.url)
    const setIsLogin = useDataStore((state) => state.setIsLogin);
    const setProfile = useDataStore((state) => state.setProfile);

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchApi<Profile>(
            `${url}/profile/me`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ),
        queryKey: ["checkAuth"],
        retry: false,
    })

    useEffect(() => {
        if (data) {
            console.log(data)
            setIsLogin(true)
            setProfile({
                name: data.name,
                email: data.email,
                avatarUrl: data.avatarUrl,
                avatarSource: data.avatarSource
            })
        } else if (isError) {
            setIsLogin(false)
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
