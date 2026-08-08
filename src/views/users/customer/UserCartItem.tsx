//styles
import OrderStyles from "../../../styles/views/order"

//components
import CustomDiv from "../../../components/CustomDiv"

//types
import type { CartItem } from "../../../scripts/utils/cart"
import type Product from "../../../scripts/interfaces/feat/product"

interface Props {
    item: CartItem
    products: Product[]
}

export default function UserCartItem(
    { item, products }: Props
) {

    const product = products.find(p => Number(p.product_id) === Number(item.productId))

    return (
        <CustomDiv className={OrderStyles.cartItem().cont}>
            <CustomDiv className={OrderStyles.cartItem().left}>
                <CustomDiv className={OrderStyles.cartItem().row}>
                    <CustomDiv>Name</CustomDiv>
                    <CustomDiv>{product?.product_name}</CustomDiv>
                </CustomDiv>

                <CustomDiv className={OrderStyles.cartItem().row}>
                    <CustomDiv>Price</CustomDiv>
                    <CustomDiv>{product?.product_price}</CustomDiv>
                </CustomDiv>
            </CustomDiv>

            <CustomDiv className={OrderStyles.cartItem().right}>
                <CustomDiv className={OrderStyles.cartItem().row}>
                    <CustomDiv>-</CustomDiv>
                    <CustomDiv>{item.quantity}</CustomDiv>
                    <CustomDiv>+</CustomDiv>
                </CustomDiv>
            </CustomDiv>
        </CustomDiv>
    )
}
