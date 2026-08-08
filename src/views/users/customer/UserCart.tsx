//hooks
import { useState } from "react"

//components
import CustomDiv from "../../../components/CustomDiv"
import Modal from "../../../components/Modal"
import ButtonAdv from "../../../components/ButtonAdv"

//styles
import OrderStyles from "../../../styles/views/order"

//scripts
import Session from "../../../scripts/utils/session"
import Cart from "../../../scripts/utils/cart"
import Payments from "../../../scripts/utils/feat/customer/payments"

export default function UserCart() {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>(0)
    const cart = new Cart(Number(Session.getUser().user_id))

    function toggleModal() {
        setShowModal(p => !p)
    }

    async function pay() {
        const paid = await Payments.makePayment(amount)

        if (paid) {
            setAmount(0)
            toggleModal()
        }
    }

    return (
        <>
            <CustomDiv className={OrderStyles.cart().strip}>
                <CustomDiv
                    className={OrderStyles.cart().toggler}
                    onClick={() => toggleModal()}
                >
                    Cart
                </CustomDiv>
            </CustomDiv>

            <Modal showModal={showModal}>
                <CustomDiv className={OrderStyles.cart().cont}>

                    <CustomDiv className={OrderStyles.cart().body}>
                        H
                    </CustomDiv>

                    <CustomDiv className={OrderStyles.cart().foot}>
                        <ButtonAdv
                            label="Close"
                            onClick={() => toggleModal()}
                        />

                        <ButtonAdv
                            label="Check out"
                            onClick={async () => await pay()}
                        />
                    </CustomDiv>

                </CustomDiv>
            </Modal>
        </>
    )
}
