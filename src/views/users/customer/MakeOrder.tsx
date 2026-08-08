//components
import CustomDiv from "../../../components/CustomDiv"
import ButtonAdv from "../../../components/ButtonAdv"

//styles
import OrderStyles from "../../../styles/views/order"

//types
import type Product from "../../../scripts/interfaces/feat/product"

interface Props {
    toggleModal: (prod: Product) => void
    addToCart: (prod: Product) => void
    prod: Product
}

export default function MakeOrder(
    { toggleModal, addToCart, prod }: Props
) {

    return (
        <CustomDiv className={OrderStyles.createOrder().cont}>
            <CustomDiv className={OrderStyles.createOrder().body}>H</CustomDiv>
            <CustomDiv className={OrderStyles.createOrder().foot}>
                <ButtonAdv
                    label="Close"
                    onClick={() => toggleModal(prod)}
                />
                <ButtonAdv
                    label="Add"
                    onClick={() => addToCart(prod)}
                />
            </CustomDiv>
        </CustomDiv>
    )
}
