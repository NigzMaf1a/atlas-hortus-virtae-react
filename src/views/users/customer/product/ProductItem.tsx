
//components
import CustomDiv from "../../../../components/CustomDiv"

//types
import type Product from "../../../../scripts/interfaces/feat/product"

//styles
import ProductStyles from "../../../../styles/feat/customer/products"

interface Props {
    product: Product
}

export default function ProductItem(
    { product }: Props
) {
    return (
        <CustomDiv className={ProductStyles.productItem(product)}>
            ProductItem
        </CustomDiv>
    )
}
