//hooks
import useCustomer from "../../hooks/mod/useCustomer"
import useCustomerUtils from "../../hooks/util/customer"
import { useState, useEffect } from "react"

//components
import Page from "../../components/Page"
import FancyLoad from "../../views/FancyLoad"
import Tray from "../../components/Tray"
import Toaster from "../../scripts/utils/Toaster"

//styles
import StylesTwo from "../../styles/components"

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

    console.log('All deh data deh', processedData.hotProducts)

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout> | undefined

        if (!data.loading) {
            setShowHotProducts(true)
            setShowRecentPurchases(true)
            setShowRecentPayments(true)

            timeout = setTimeout(() => {
                setShowHotProducts(processedData.hotProducts.length > 0)
                setShowRecentPurchases(processedData.recentPurchases.length > 0)
                setShowRecentPayments(processedData.recentPayments.length > 0)
            }, 5000)
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        };
    }, [data.loading, processedData])

    return (
        <Page
            className={StylesTwo.page()}
        >
            <FancyLoad loading={data.loading} />

            <Tray
                show={showHotProducts}
                data={processedData.hotProducts}
                noDataMessage="No hot products found"
            >
                Hot products
            </Tray>

            <Tray
                show={showRecentPurchases}
                data={processedData.hotProducts}
                noDataMessage="No recent purchases found"
            >
                Recent Purchases
            </Tray>

            <Tray
                show={showRecentPayments}
                data={processedData.hotProducts}
                noDataMessage="No recent payments found"
            >
                Recent Payments
            </Tray>
        </Page>
    )
}
