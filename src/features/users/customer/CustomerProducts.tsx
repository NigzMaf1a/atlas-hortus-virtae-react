//hooks
import useCustomer from "../../../hooks/mod/customer/useCustomer"

//components
import Page from "../../../components/Page"
import FancyLoad from "../../../views/FancyLoad"
import ProductItemsContainer from "../../../views/users/customer/product/ProductItemsContainer"

//styles
import ProductStyles from "../../../styles/feat/customer/products"

export default function CustomerProducts() {
    const data = useCustomer()

    return (
        <Page className={ProductStyles.page()}>
            <FancyLoad loading={data.loading} />
            {
                !data.loading && <ProductItemsContainer products={data.products} />
            }

        </Page>
    )
}
