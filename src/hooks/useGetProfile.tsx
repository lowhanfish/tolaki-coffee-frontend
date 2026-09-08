import { useDataStore, Profile } from '@/stores/dataStore'
import { fetchApi } from '@/lib/apiFetch'
import { useQuery } from '@tanstack/react-query'

const useGetProfile = () => {
    const url = useDataStore((state) => state.url)

    const { data, isLoading, isError, error, refetch, } = useQuery({
        queryFn: () => fetchApi<Profile>(`${url}/profile/me`),
        queryKey: ["checkAuth"],
        retry: false,
    })

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
    }
}

export default useGetProfile


// import React from 'react'
// import { useDataStore, Profile } from '@/stores/dataStore'
// import { fetchApi } from '@/lib/apiFetch'
// import { useQuery } from '@tanstack/react-query'

// const useGetProfile = () => {
//     const url = useDataStore(state => state.url)
//     const { data, isLoading, isError, error } = useQuery({
//         queryFn: () => fetchApi<Profile>(`${url}/profile/me`),
//         queryKey: ["checkAuth"],
//         retry: false,
//     })
//     return {
//         data, isLoading, isError, error
//     }
// }

// export default useGetProfile
