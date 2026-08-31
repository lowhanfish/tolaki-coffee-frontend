
export const fetchApi = async <T>(url:string, refresh = true, option : RequestInit = {}): Promise<T> => {
    const {method, headers, ...otherOptions} = option
    try {
        const res = await fetch(url, {
            ...otherOptions,
            method : method ?? "GET",
            credentials : "include",
            headers : headers ?? {}
        })

        if(res.status ==401 && refresh){
            await refreshToken()
            return fetchApi<T>(url, false, option)
        }

        if (!res.ok) throw new Error(`HTTP Error. Message : ${res.status}`)
        return await (res.json()) as T
        
    } catch (error) {
        throw new Error(`Error while fetching. Message : ${error}`)
    }
}



const refreshToken = async () => {
    const res = await fetch("http://localhost:3001/auth/refresh", {
        method : "POST",
        credentials : "include",
        headers : {
            "Content-Type" : "application/json"
        }
    })

    if(!res.ok){
        if(typeof window !== "undefined"){
            window.location.href = "/login"
        }
        throw new Error("Refresh Token Invalid..!")
    }
}