import { useDataStore } from '@/stores/dataStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'


const postData = async (url: string) => {
    const res = await fetch(url, {
        method: "POST",
        headers: { Accept: "*/*" },
        credentials: "include",
    });

    if (!res.ok) throw new Error("Gagal Logout");
    return;
};

const useLogout = () => {
    const url = useDataStore(state => state.url)
    const queryClient = useQueryClient()
    const clearAuth = useDataStore((state) => state.clearAuth);

    const useDataMutation = useMutation({
        mutationFn: () => postData(
            `${url}/auth/logout`,
        ),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["checkAuth"] });
            clearAuth();
        },
        onError: (error: Error) => {
            alert("Error : " + error)
        }
    })

    return useDataMutation

}

export default useLogout
