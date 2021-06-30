import { useEffect, useState } from "react"
import { useToken } from "./useToken"

export const useUser = () => {
    const [token] = useToken()
    const [user, setUser] = useState(() => {
        if (!token) return null
        getPayloadFromToken(token)

    })

    useEffect(() => {
        if (!token) return setUser(null)

        setUser(getPayloadFromToken(token))

    }, [token])

    const getPayloadFromToken = (token) => {
        const encodedToken = token.split(".")[1]

        return JSON.parse(atob(encodedToken))
    }


    return user
}