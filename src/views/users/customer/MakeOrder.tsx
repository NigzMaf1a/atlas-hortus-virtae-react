import { useState, useEffect } from "react"

//components
import CustomDiv from "../../../components/CustomDiv"
import Modal from "../../../components/Modal"
import ButtonAdv from "../../../components/ButtonAdv"

//styles
import OrderStyles from "../../../styles/views/order"

interface Props {
    showCreate: boolean
}

export default function MakeOrder(
    { showCreate }: Props
) {
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        setShow(showCreate)
    }, [])

    return (
        <Modal showModal={show}>
            <CustomDiv className={OrderStyles.createOrder().cont}>
                <CustomDiv className={OrderStyles.createOrder().body}>H</CustomDiv>
                <CustomDiv className={OrderStyles.createOrder().foot}>M</CustomDiv>
            </CustomDiv>
        </Modal>
    )
}
