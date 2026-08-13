
//components
import CustomDiv from "../../../../components/CustomDiv"
import ButtonAdv from "../../../../components/ButtonAdv"

//types
import type Product from "../../../../scripts/interfaces/feat/product"

//styles
import ProductStyles from "../../../../styles/feat/customer/products"

interface Props {
    product: Product
    onClick: () => void
}

export default function ProductItem(
    { product, onClick }: Props
) {
    return (
        <CustomDiv className={ProductStyles.productItem(product)}>
            <CustomDiv className={ProductStyles.productItemInards().left}>
                <CustomDiv className={ProductStyles.productItemInards().row}>
                    <CustomDiv>Product Name</CustomDiv>
                    <CustomDiv>{product.product_name}</CustomDiv>
                </CustomDiv>

                <CustomDiv className={ProductStyles.productItemInards().row}>
                    <CustomDiv>Product Price</CustomDiv>
                    <CustomDiv>{product.product_price}</CustomDiv>
                </CustomDiv>
            </CustomDiv>

            <CustomDiv className={ProductStyles.productItemInards().right}>
                <ButtonAdv
                    label="Add"
                    onClick={onClick}
                />
            </CustomDiv>
        </CustomDiv>
    )
}
