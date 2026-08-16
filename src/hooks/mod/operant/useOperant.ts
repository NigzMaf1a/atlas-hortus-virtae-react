//hooks
import { useEffect, useState } from "react"

//scripts
import Session from "../../../scripts/utils/session"
import Operant from "../../../scripts/utils/mod/operant"
import Toaster from "../../../scripts/utils/Toaster"

//types
import type { Sale } from "../../../scripts/interfaces/feat/sales"
import type Product from "../../../scripts/interfaces/feat/product"
import type Task from "../../../scripts/interfaces/tasks"
import type TaskAlloc from "../../../scripts/interfaces/task_alloc"

interface OperantInit {
    loading: boolean
    sales: Sale[]
    products: Product[]
    taskAllocs: TaskAlloc[]
}

export default function useOperant(): OperantInit {
    const [loading, setLoading] = useState<boolean>(false)
    const [sales, setSales] = useState<Sale[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [tasks, setTasks] = useState<Task[]>([])
    const [taskAllocs, setTaskAllocs] = useState<TaskAlloc[]>([])

    const operant = new Operant(Session.getToken())

    useEffect(() => {
        async function init() {
            try {
                const s = await operant.getSales()
                const p = await operant.getProducts()
                const t = await operant.getTasks()
                const ta = await operant.getTaskAllocs()

                setSales(s)
                setProducts(p)
                setTasks(t)
                setTaskAllocs(ta)

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
        loading: loading,
        sales: sales,
        products: products,
        taskAllocs: taskAllocs
    }
}