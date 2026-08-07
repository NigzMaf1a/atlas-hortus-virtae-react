import { useState } from "react"

//components
import CustomDiv from "../../../components/CustomDiv"
import Modal from "../../../components/Modal"
import ButtonAdv from "../../../components/ButtonAdv"

//styles
import OrderStyles from "../../../styles/views/order"

export default function Cart() {
    const [showModal, setShowModal] = useState<boolean>(false)

    function toggleModal() {
        setShowModal(p => !p)
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
                            onClick={() => { }}
                        />
                    </CustomDiv>

                </CustomDiv>
            </Modal>
        </>
    )
}
