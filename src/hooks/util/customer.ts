import { useState, useEffect } from "react"

//types
import type Payment from "../../scripts/interfaces/feat/payments"
import type Product from "../../scripts/interfaces/feat/product"
import type { Sale, SaleItem } from "../../scripts/interfaces/feat/sales"

//scripts
import CustomerHOFs from "../../scripts/hofs/customer"
import Toaster from "../../scripts/utils/Toaster"

interface CustUtils {
    hotProducts: Product[]
    recentPayments: Payment[]
    recentPurchases: Sale[]
}

interface CustUtilProps {
    products: Product[]
    payments: Payment[]
    sales: Sale[]
    saleItems: SaleItem[]
}

export default function useCustomerUtils(
    { products, payments, sales, saleItems }: CustUtilProps
): CustUtils {

    const [data, setData] = useState<CustUtils>({
        hotProducts: [],
        recentPayments: [],
        recentPurchases: []
    })

    function setup(): void {
        try {
            const hot_prods = CustomerHOFs.getThreeMostSoldProducts(
                saleItems,
                products
            )

            const rec_pay = CustomerHOFs.getThreeMostRecentPayments(
                payments
            )

            const rec_pur = CustomerHOFs.getMostRecentSales(
                sales
            )

            setData({
                hotProducts: hot_prods,
                recentPayments: rec_pay,
                recentPurchases: rec_pur
            })

        } catch (error) {
            console.error("Customer utils error:", error)

            Toaster(
                "An error occurred while extracting data",
                "warn"
            )
        }
    }

    useEffect(() => {
        setup()
    }, [products, payments, sales, saleItems])

    return data
}