//hooks
import { useEffect, useState } from "react"

//scripts
import Session from "../../../scripts/utils/session"
import Operant from "../../../scripts/utils/mod/operant"
import Toaster from "../../../scripts/utils/Toaster"

//types
import type { Sale, SaleItem } from "../../../scripts/interfaces/feat/sales"
import type Product from "../../../scripts/interfaces/feat/product"
import type Task from "../../../scripts/interfaces/tasks"
import type TaskAlloc from "../../../scripts/interfaces/task_alloc"
import type Payment from "../../../scripts/interfaces/feat/payments"

export interface OperantInit {
    loading: boolean
    sales: Sale[]
    products: Product[]
    taskAllocs: TaskAlloc[]
    payments: Payment[]

    //methods
    attendToSale: (sale: Sale) => Promise<boolean>
    attendToTask: (task: Task) => Promise<boolean>
    addProduct: (prod: Product) => Promise<boolean>
    getSaleItems: (id: number) => Promise<SaleItem[]>
    markAvailable: (prod_id: number) => Promise<boolean>
    markUnavailable: (prod_id: number) => Promise<boolean>
}

export default function useOperant(): OperantInit {
    const [loading, setLoading] = useState<boolean>(false)
    const [sales, setSales] = useState<Sale[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [payments, setPayments] = useState<Payment[]>([])
    const [taskAllocs, setTaskAllocs] = useState<TaskAlloc[]>([])

    const operant = new Operant(Session.getToken())

    async function init() {
        try {
            const ta: TaskAlloc[] = []
            const s = await operant.getSales(Number(Session.getOutletId()))
            Toaster('Sales fetched successfully')
            const p = await operant.getProducts(Number(Session.getOutletId()))
            Toaster('Products fetched successfully')
            const pays = await operant.getPayments()
            Toaster('Payments fetched successfully')
            // const ta = await operant.getTaskAllocs()
            // Toaster('Task allocations fetched successfully')

            setSales(s)
            setProducts(p)
            setPayments(pays)
            setTaskAllocs(ta)

            Toaster('Initialization successful', 'success')
        } catch (error) {
            Toaster('An error occurred while initializing data', 'danger')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        window.addEventListener('beforeunload', async () => {
            if (!loading) await init()
        })

        return () => {
            window.addEventListener('beforeunload', async () => {
                if (!loading) await init()
            })
        }
    }, [])

    return {
        loading: loading,
        sales: sales,
        products: products,
        taskAllocs: taskAllocs,
        payments: payments,

        attendToSale: async function (sale: Sale) {
            try {
                if (sale.sale_status !== 'Paid') {
                    Toaster('Order not paid', 'warn')
                    return false
                }

                await operant.attendToOrder(sale)
                return true
            } catch (error) {
                return false
            }
        },

        attendToTask: async function (task: Task) {
            try {
                await operant.attendToTask(task)
                return true
            } catch (error) {
                return false
            }
        },

        addProduct: async function (prod: Product) {
            try {
                await operant.addProduct(prod)
                return true
            } catch (error) {
                return false
            }
        },

        getSaleItems: async function (sale_id: number): Promise<SaleItem[]> {
            try {
                return await operant.getSaleItems(sale_id)
            } catch (error) {
                return []
            }
        },

        markAvailable: async function (prod_id: number) {
            try {
                await operant.markProductAvailable(prod_id)
                return true
            } catch (error) {
                return false
            }
        },

        markUnavailable: async function (prod_id: number) {
            try {
                await operant.markProductUnavailable(prod_id)
                return true
            } catch (error) {
                return false
            }
        }
    }
}