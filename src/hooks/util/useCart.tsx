//hooks
import useCustomer from "../mod/customer/useCustomer"
import { useState, useEffect } from "react"

//scripts
import Cart from "../../scripts/utils/feat/customer/cart"
import Session from "../../scripts/utils/session"

//types
import type Product from "../../scripts/interfaces/feat/product"
import type { CartItem } from "../../scripts/utils/feat/customer/cart"

interface CartData {
    loading: boolean
    addToCart: (prod: Product) => void
    removeFromCart: (prod: Product) => void
    increment: (id: number) => void
    decrement: (id: number) => void
    getItemTotal: (prod_id: number) => number
    getCartTotal: () => number
    clearCart: () => void
    checkout: (clear: boolean) => void
    items: Map<number, CartItem>
    productIds: Set<number>
}

export default function useCart(): CartData {
    const [cart, setCart] = useState<Cart>()
    const [cartLoading, setCartLoading] = useState<boolean>(false)

    const data = useCustomer()

    useEffect(() => {
        if (!data.loading) {
            try {
                setCartLoading(true)
                const c = new Cart(Number(Session.getUser().user_id))

                if (typeof c === 'undefined') return
                setCart(c)

            } catch (error) {

            } finally {
                setCartLoading(false)
            }
        }

    }, [data.loading])

    function getItemTotal(prod_id: number): number {
        let total: number = 0

        const items = cart?.items

        if (items?.has(prod_id)) {
            const exists = items.get(prod_id)

            if (typeof exists === 'undefined') throw new Error(
                'The specified item does not exist on the cart'
            )

            const product = Number(exists?.price) * Number(exists?.quantity)

            total += product
        }

        return total
    }

    return {
        loading: cartLoading,
        addToCart: cart?.addItem as (prod: Product) => void,
        removeFromCart: cart?.removeItem as (prod: Product) => void,
        increment: cart?.increment as (id: number) => void,
        decrement: cart?.decrement as (id: number) => void,
        getCartTotal: cart?.getCartTotal as () => number,
        getItemTotal: getItemTotal,
        clearCart: cart?.clearCart as () => void,
        checkout: cart?.checkout as (clear: boolean) => void,
        items: cart?.items as Map<number, CartItem>,
        productIds: cart?.product_ids as Set<number>
    }
}