//hooks
import useCustomer from "../../hooks/mod/useCustomer"
import useCustomerUtils from "../../hooks/util/customer"
import { useState, useEffect } from "react"

//components
import Page from "../../components/Page"
import FancyLoad from "../../views/FancyLoad"
import Tray from "../../components/Tray"

export default function CustomerHome() {
    const [showHotProducts, setShowHotProducts] = useState<boolean>(false)
    const [showRecentPurchases, setShowRecentPurchases] = useState<boolean>(false)
    const [showRecentPayments, setShowRecentPayments] = useState<boolean>(false)

    const data = useCustomer()

    const processedData = useCustomerUtils({
        products: data.products,
        payments: data.payments,
        sales: data.sales,
        saleItems: data.sale_items
    })

    useEffect(() => {
        if (!data.loading) {
            setShowHotProducts(processedData.hotProducts.length > 0)
            setShowRecentPurchases(processedData.recentPurchases.length > 0)
            setShowRecentPayments(processedData.recentPayments.length > 0)
        }
    }, [data])

    return (
        <Page>
            <FancyLoad loading={data.loading} />

            <Tray show={showHotProducts}>
                Hot products
            </Tray>

            <Tray show={showRecentPurchases}>
                Recent Purchases
            </Tray>

            <Tray show={showRecentPayments}>
                Recent Payments
            </Tray>
        </Page>
    )
}
