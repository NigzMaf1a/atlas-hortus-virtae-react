import { useCallback } from "react"

export default function useLocalStorage() {

    const setItem = useCallback(
        <T,>(key: string, value: T): void => {
            localStorage.setItem(
                key,
                JSON.stringify(value)
            )
        },
        []
    )

    const getItem = useCallback(
        <T,>(key: string): T | null => {
            const value = localStorage.getItem(key)

            if (value === null) {
                return null
            }

            return JSON.parse(value) as T
        },
        []
    )

    const removeItem = useCallback(
        (key: string): void => {
            localStorage.removeItem(key)
        },
        []
    )

    const clear = useCallback(
        (): void => {
            localStorage.clear()
        },
        []
    )

    return {
        setItem,
        getItem,
        removeItem,
        clear
    }
}