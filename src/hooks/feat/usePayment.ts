import { useState } from "react"

interface Payment {
    status: boolean
}

export default function usePayment(): Payment {
    const [paid, setPaid] = useState<boolean>(false)

    return {
        status: paid
    }
}