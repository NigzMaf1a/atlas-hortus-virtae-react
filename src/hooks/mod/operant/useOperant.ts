//hooks
import { useEffect, useState } from "react"

//scripts
import Session from "../../../scripts/utils/session"
import Toaster from "../../../scripts/utils/Toaster"

interface OperantInit {
    loading: boolean
}

export default function useOperant(): OperantInit {
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function init() {
            try {
                Toaster('Initialization successful', 'success')
            } catch (error) {
                Toaster('An error occurred while initializing', 'danger')
            } finally {
                setLoading(false)
            }
        }

        init()
    }, [])

    return {
        loading: loading
    }
}