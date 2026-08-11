//hooks
import useCustomer from "../../../hooks/mod/customer/useCustomer"
import { useState, useMemo } from "react"

//components
import Page from "../../../components/Page"
import FancyLoad from "../../../views/FancyLoad"
import ProductItemsContainer from "../../../views/users/customer/product/ProductItemsContainer"
import CartCont from "../../../views/users/customer/product/CartCont"

//styles
import ProductStyles from "../../../styles/feat/customer/products"

export default function CustomerProducts() {
    const data = useCustomer()
    const [searchQuery, setSearchQuery] = useState<string>('')

    const queried = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()

        if (!query) return data.products

        return data.products.filter(
            p => Object.values(p).some(
                value => String(value).toLowerCase().includes(query))
        )

    }, [searchQuery, data.loading])

    return (
        <Page
            className={ProductStyles.page()}
            showSearch={data.products.length > 5}
            value={searchQuery}
            setValue={setSearchQuery as (val: string | number) => void}
            searchPlaceholder="Search for product"
        >
            <FancyLoad loading={data.loading} />
            {
                !data.loading && <ProductItemsContainer products={queried} />
            }
            <CartCont />
        </Page>
    )
}
