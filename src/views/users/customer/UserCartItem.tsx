//styles
import OrderStyles from "../../../styles/views/order"

//components
import CustomDiv from "../../../components/CustomDiv"

//types
import type { SelectedItem } from "./UserCart"
import type Product from "../../../scripts/interfaces/feat/product"

interface Props {
    item: SelectedItem
    products: Product[]
    increment: (id: number) => void
    decrement: (id: number) => void
}

export default function UserCartItem(
    { item, products, increment, decrement }: Props
) {

    let btn_styles: string
    let set_styles: string
    let caption: string
    let text: string

    const product = products.find(p => Number(p.product_id) === Number(item.product.product_id)) as Product
    btn_styles = `${OrderStyles.cartItem().btn}`
    set_styles = `${OrderStyles.cartItem().setter}`
    text = `${OrderStyles.cartItem().text}`
    caption = `${OrderStyles.cartItem().text}`

    return (
        <CustomDiv className={OrderStyles.cartItem().cont}>
            <CustomDiv className={OrderStyles.cartItem().left}>
                <CustomDiv className={OrderStyles.cartItem().row}>
                    <CustomDiv className={caption}>Name</CustomDiv>
                    <CustomDiv className={text}>{product?.product_name}</CustomDiv>
                </CustomDiv>

                <CustomDiv className={OrderStyles.cartItem().row}>
                    <CustomDiv className={caption}>Price</CustomDiv>
                    <CustomDiv className={text}>{product?.product_price}</CustomDiv>
                </CustomDiv>
            </CustomDiv>

            <CustomDiv className={OrderStyles.cartItem().right}>
                <CustomDiv className={OrderStyles.cartItem().row}>
                    <CustomDiv
                        className={set_styles}
                        onClick={() => decrement(Number(item.product.product_id))}
                    >-</CustomDiv>

                    <CustomDiv className={text}>
                        {item.quantity}
                    </CustomDiv>

                    <CustomDiv
                        className={set_styles}
                        onClick={() => increment(Number(item.product.product_id))}
                    >+</CustomDiv>

                </CustomDiv>
            </CustomDiv>
        </CustomDiv >
    )
}
