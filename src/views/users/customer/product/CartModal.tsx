import { useState } from "react"

//components
import Modal from "../../../../components/Modal"
import CustomDiv from "../../../../components/CustomDiv"
import ButtonAdv from "../../../../components/ButtonAdv"
import Input from "../../../../components/Input"
import CartItems from "./CartItem"

//styles
import ModalStyles from "../../../../styles/feat/customer/modal"

//types
import type { CartItem } from "../../../../hooks/feat/useCart"
import type Product from "../../../../scripts/interfaces/feat/product"

interface Props {
    show: boolean
    setShow: (show: boolean) => void
    onClick: () => void
    items: CartItem[]
    incrementQty: (prod: Product) => void
    decrementQty: (prod: Product) => void
}


export default function CartModal(
    {
        show, setShow, onClick, items,
        incrementQty, decrementQty
    }: Props
) {
    const [showCurrencyInput, setShowCurrencyInput] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>(0)

    return (
        <Modal showModal={show}>
            <CustomDiv className={ModalStyles.container()}>
                {
                    showCurrencyInput && <CustomDiv className="w-full flex flex-col gap-2 items-center p-1 mt-7">
                        <Input
                            value={amount}
                            onChange={setAmount as (val: string | number) => void}
                        />

                        <CustomDiv className="w-full flex flex-row justify-evenly items-center">

                            <ButtonAdv
                                label="Back"
                                onClick={() => setShowCurrencyInput(false)}
                            />

                            <ButtonAdv
                                label="Pay"
                                onClick={
                                    () => {
                                        onClick()
                                    }
                                }
                            />
                        </CustomDiv>
                    </CustomDiv>
                }

                {
                    !showCurrencyInput && <CustomDiv>

                        <CustomDiv className={ModalStyles.body()}>
                            {
                                items.map((item) => (
                                    <CartItems
                                        key={item.prod.product_id}
                                        item={item}
                                        incrementQty={incrementQty}
                                        decrementQty={decrementQty}
                                    />
                                ))
                            }
                        </CustomDiv>

                        <CustomDiv className={ModalStyles.footer()}>
                            <ButtonAdv
                                label="Close"
                                onClick={() => setShow(false)}
                            />

                            <ButtonAdv
                                label="Check out"
                                onClick={
                                    () => {
                                        setShowCurrencyInput(true)
                                        onClick()
                                    }
                                }
                            />
                        </CustomDiv>
                    </CustomDiv>
                }
            </CustomDiv>
        </Modal>
    )
}
