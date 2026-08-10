//hooks
import useCustomer from "../../../hooks/mod/customer/useCustomer"

//components
import Page from "../../../components/Page"
import FancyLoad from "../../../views/FancyLoad"

export default function CustomerProducts() {
    const data = useCustomer()

    return (
        <Page>
            <FancyLoad loading={data.loading} />
            CustomerProducts
        </Page>
    )
}
