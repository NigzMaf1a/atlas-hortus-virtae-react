//components
import CustomDiv from "../../../../components/CustomDiv"

//styles
import ProductStyles from "../../../../styles/feat/customer/products"

export default function CartCont() {
    return (
        <CustomDiv className={ProductStyles.cart().cont}>
            <CustomDiv className={ProductStyles.cart().btn}>
                Order
            </CustomDiv>
        </CustomDiv>
    )
}
