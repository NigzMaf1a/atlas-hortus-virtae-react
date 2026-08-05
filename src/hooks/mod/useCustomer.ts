import { useState, useEffect } from "react"

//types
import type Product from "../../scripts/interfaces/feat/product"
import type { Sale, SaleItem } from "../../scripts/interfaces/feat/sales"
import type Payment from "../../scripts/interfaces/feat/payments"

//scripts
import Customer from "../../scripts/utils/mod/customer"
import Session from "../../scripts/utils/session"
import Toaster from "../../scripts/utils/Toaster"

interface CustomerProps {
    loading: boolean
    products: Product[]
    sales: Sale[]
    sale_items: SaleItem[]
    payments: Payment[]
    customerInstance: Customer
}

export default function useCustomer(): CustomerProps {
    const [refreshPeriod, setRefreshPeriod] = useState<number>(185)

    // Customer instance
    const customer = new Customer(Session.getToken())

    //state
    const [loading, setLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([])
    const [sales, setSales] = useState<Sale[]>([])
    const [saleItems, setSaleItems] = useState<SaleItem[]>([])
    const [payments, setPayments] = useState<Payment[]>([])

    async function init(): Promise<void> {
        try {
            Toaster("Wait....", "info")
            setLoading(true)

            // Get the current user safely
            const user = Session.getUser()

            if (!user?.user_id) {
                throw new Error("User session is unavailable")
            }

            // Get the outlet safely
            const outletId = Session.getOutletId()

            if (outletId === undefined || outletId === null) {
                throw new Error("Outlet ID is unavailable")
            }

            //crud methods
            const prod = await customer.getProducts(Number(outletId))

            const selz = await customer.getCustomerSales(
                Number(user.user_id)
            )

            const pay = await customer.getCustomerPayments(
                Number(user.user_id)
            )

            // Get sale items for each sale
            const results = await Promise.all(
                selz.map(async (sale): Promise<SaleItem[]> => {
                    if (sale.sale_id === undefined) {
                        return []
                    }

                    return await customer.getCustomerSaleItems(
                        Number(sale.sale_id)
                    )
                })
            )

            const sale_items: SaleItem[] = results.flat()

            //state initialization
            setProducts(prod)
            setSales(selz)
            setPayments(pay)
            setSaleItems(sale_items)

        } catch (error) {
            console.error("Customer initialization error:", error)

            Toaster(
                "An error occurred while fetching customer data",
                "danger"
            )
        } finally {
            setLoading(false)
        }
    }

    // Initial load
    useEffect(() => {
        init()
    }, [])

    // Refresh every 185 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshPeriod(prev => {
                if (prev <= 1) {
                    return 185
                }

                return prev - 1
            })
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    // Perform refresh when timer reaches zero
    useEffect(() => {
        if (refreshPeriod !== 185) {
            return
        }

        // Don't refresh while already loading
        if (loading) {
            return
        }

        init()
    }, [refreshPeriod])

    return {
        loading,
        products,
        payments,
        sales,
        sale_items: saleItems,
        customerInstance: customer
    }
}