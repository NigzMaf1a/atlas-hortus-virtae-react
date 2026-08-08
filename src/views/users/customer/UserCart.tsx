// hooks
import { useEffect, useState } from "react"
import useCart from "../../../hooks/util/useCart"

// components
import CustomDiv from "../../../components/CustomDiv"
import Modal from "../../../components/Modal"
import ButtonAdv from "../../../components/ButtonAdv"
import UserCartItem from "./UserCartItem"

// styles
import OrderStyles from "../../../styles/views/order"

// scripts
import Payments from "../../../scripts/utils/feat/customer/payments"

// types
import type Product from "../../../scripts/interfaces/feat/product"

export interface SelectedItem {
    quantity: number
    product: Product
}

interface Props {
    products: Product[]
}

export default function UserCart({ products }: Props) {
    const [showModal, setShowModal] = useState(false)
    const [amount, setAmount] = useState(0)
    const [cartItems, setCartItems] = useState<SelectedItem[]>([])
    const [isPaying, setIsPaying] = useState(false)

    const cart = useCart()

    const { productIds, items } = cart

    /**
     * Build the list of products currently in the cart.
     */
    useEffect(() => {
        if (!productIds || !items || !products.length) {
            setCartItems([])
            return
        }

        const selectedItems: SelectedItem[] = []

        for (const productId of productIds) {
            const cartItem = items.get(productId)
            const product = products.find(
                (item) => Number(item.product_id) === Number(productId)
            )

            if (!cartItem || !product) {
                continue
            }

            selectedItems.push({
                quantity: cartItem.quantity,
                product,
            })
        }

        setCartItems(selectedItems)
    }, [products, productIds, items])

    /**
     * Toggle the cart modal.
     */
    function toggleModal() {
        setShowModal((previous) => !previous)
    }

    /**
     * Calculate the total value of the cart.
     */
    useEffect(() => {
        const total = cartItems.reduce(
            (sum, item) =>
                sum + Number(item.product.product_price) * item.quantity,
            0
        )

        setAmount(total)
    }, [cartItems])

    /**
     * Process checkout.
     */
    async function pay() {
        if (cartItems.length === 0 || isPaying) {
            return
        }

        try {
            setIsPaying(true)

            const paid = await Payments.makePayment(amount)

            if (paid) {
                setAmount(0)
                setCartItems([])
                setShowModal(false)
            }
        } catch (error) {
            console.error("Checkout failed:", error)
        } finally {
            setIsPaying(false)
        }
    }

    return (
        <>
            <CustomDiv className={OrderStyles.cart().strip}>
                <CustomDiv
                    className={OrderStyles.cart().toggler}
                    onClick={toggleModal}
                >
                    Cart
                </CustomDiv>
            </CustomDiv>

            <Modal showModal={showModal}>
                <CustomDiv className={OrderStyles.cart().cont}>
                    <CustomDiv className={OrderStyles.cart().body}>
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <UserCartItem
                                    key={item.product.product_id}
                                    item={item}
                                    products={products}
                                    increment={cart.increment}
                                    decrement={cart.decrement}
                                />
                            ))
                        ) : (
                            <CustomDiv
                                className={OrderStyles.nullOrder()}
                            >
                                No items in the cart
                            </CustomDiv>
                        )}
                    </CustomDiv>

                    <CustomDiv className={OrderStyles.cart().foot}>
                        <ButtonAdv
                            label="Close"
                            onClick={toggleModal}
                        />

                        <ButtonAdv
                            label={isPaying ? "Processing..." : "Check out"}
                            onClick={pay}
                        />
                    </CustomDiv>
                </CustomDiv>
            </Modal>
        </>
    )
}
