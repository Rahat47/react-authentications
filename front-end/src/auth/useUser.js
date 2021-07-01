import { useEffect, useState } from "react"
import { useToken } from "./useToken"

export const useUser = () => {
    const [token] = useToken()


    const getPayloadFromToken = (token) => {
        const encodedToken = token.split(".")[1]

        return JSON.parse(atob(encodedToken))
    }

    const [user, setUser] = useState(() => {
        if (!token) return null
        return getPayloadFromToken(token)
    })

    useEffect(() => {
        if (!token) return setUser(null)

        setUser(getPayloadFromToken(token))

    }, [token])



    return user
}