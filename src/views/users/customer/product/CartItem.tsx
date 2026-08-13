//components
import CustomDiv from "../../../../components/CustomDiv"

//styles
import ProductStyles from "../../../../styles/feat/customer/products"

//types
import type { CartItem } from "../../../../hooks/feat/useCart"
import type Product from "../../../../scripts/interfaces/feat/product"

interface Props {
    item: CartItem
    incrementQty: (prod: Product) => void
    decrementQty: (prod: Product) => void
}

export default function CartItems(
    {
        item,
        incrementQty,
        decrementQty
    }: Props
) {
    return (
        <CustomDiv className={ProductStyles.cartItem().cont}>

            <CustomDiv className={ProductStyles.cartItem().detail}>
                <CustomDiv className={ProductStyles.cartItem().row}>
                    <CustomDiv>{item.prod.product_name}</CustomDiv>
                </CustomDiv>

                <CustomDiv className={ProductStyles.cartItem().row}>
                    <CustomDiv>{item.prod.product_price}</CustomDiv>
                </CustomDiv>
            </CustomDiv>

            <CustomDiv className={ProductStyles.cartItem().inc_decr}>
                <CustomDiv
                    className={ProductStyles.cartItem().btn}
                    onClick={() => decrementQty(item.prod)}
                >
                    -
                </CustomDiv>

                <CustomDiv>{item.qty}</CustomDiv>

                <CustomDiv
                    className={ProductStyles.cartItem().btn}
                    onClick={() => incrementQty(item.prod)}
                >
                    +
                </CustomDiv>
            </CustomDiv>
        </CustomDiv>
    )
}
