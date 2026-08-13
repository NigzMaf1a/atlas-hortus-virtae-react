//components
import CustomDiv from "../../../../components/CustomDiv"
import ProductItem from "./ProductItem"

//types
import type Product from "../../../../scripts/interfaces/feat/product"

//styles
import ProductStyles from "../../../../styles/feat/customer/products"

interface Props {
    products: Product[]
    addToCart: (prod: Product) => void
}

export default function ProductItemsContainer(
    { products, addToCart }: Props
) {
    return (
        <CustomDiv className={ProductStyles.productItemsContainer()}>
            {
                products && products.length > 0 && products.map(
                    (p) => <ProductItem product={p} onClick={() => addToCart(p)} />
                )
            }
        </CustomDiv>
    )
}
