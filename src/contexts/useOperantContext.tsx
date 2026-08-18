//hooks
import { createContext, useContext } from "react"

//types
import type { OperantInit } from "@/hooks/mod/operant/useOperant"

//scripts
import useOperant from "@/hooks/mod/operant/useOperant"

const OperantContext = createContext<OperantInit | undefined>(undefined)

interface OperantProviderProps {
    children: React.ReactNode
}

export function OperantProvider(
    { children }: OperantProviderProps
) {
    const operant = useOperant()

    return (
        <OperantContext.Provider value={operant}>
            {children}
        </OperantContext.Provider>
    )
}

export default function useOperantContext(): OperantInit {
    const context = useContext(OperantContext)

    if (!context) throw new Error('useOperant must be used within an operant context')

    return context
}
