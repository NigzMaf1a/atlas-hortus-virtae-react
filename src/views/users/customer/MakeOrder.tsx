//components
import CustomDiv from "../../../components/CustomDiv"
import ButtonAdv from "../../../components/ButtonAdv"

//styles
import OrderStyles from "../../../styles/views/order"

interface Props {
    toggleModal: () => void
    addToCart: () => void
}

export default function MakeOrder(
    { toggleModal, addToCart }: Props
) {

    return (
        <CustomDiv className={OrderStyles.createOrder().cont}>
            <CustomDiv className={OrderStyles.createOrder().body}>H</CustomDiv>
            <CustomDiv className={OrderStyles.createOrder().foot}>
                <ButtonAdv
                    label="Close"
                    onClick={() => toggleModal()}
                />
                <ButtonAdv
                    label="Add"
                    onClick={() => addToCart()}
                />
            </CustomDiv>
        </CustomDiv>
    )
}
