//components
import CustomDiv from "../../../../components/CustomDiv"

//styles
import ProductStyles from "../../../../styles/feat/customer/products"

interface Props {
    showCart: (show: boolean) => void
}

export default function CartCont(
    { showCart }: Props
) {
    return (
        <CustomDiv className={ProductStyles.cart().cont}>
            <CustomDiv
                className={ProductStyles.cart().btn}
                onClick={() => showCart(true)}
            >
                Order
            </CustomDiv>
        </CustomDiv>
    )
}
