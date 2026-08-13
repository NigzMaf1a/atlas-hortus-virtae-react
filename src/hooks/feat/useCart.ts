import { useState } from "react"

// types
import type Product from "../../scripts/interfaces/feat/product"

//scripts
import Toaster from "../../scripts/utils/Toaster"

export interface CartItem {
    prod: Product
    qty: number
}

export interface CartObject {
    addToCart: (prod: Product) => void
    incrementQty: (prod: Product) => void
    decrementQty: (prod: Product) => void
    removeFromCart: (prod: Product) => void
    checkout: (status: boolean) => void
    cart: Map<number, CartItem>
    total: number
}

export default function useCart(): CartObject {
    const [cart, setCart] = useState<Map<number, CartItem>>(new Map())

    function addToCart(prod: Product) {
        setCart((prev) => {
            const next = new Map(prev)
            const id = Number(prod.product_id)

            const exists = next.get(id)

            if (exists) {
                next.set(id, {
                    prod: exists.prod,
                    qty: exists.qty + 1
                })
            } else {
                next.set(id, {
                    prod,
                    qty: 1
                })
            }

            return next
        })
        Toaster('Product added to cart successfully', 'success')
    }

    function incrementQty(prod: Product) {
        setCart((prev) => {
            const next = new Map(prev)
            const id = Number(prod.product_id)

            const exists = next.get(id)

            if (exists) {
                next.set(id, {
                    prod: exists.prod,
                    qty: exists.qty + 1
                })
            }

            return next
        })
        Toaster('Product added to cart successfully', 'success')
    }

    function decrementQty(prod: Product) {
        setCart((prev) => {
            const next = new Map(prev)
            const id = Number(prod.product_id)

            const exists = next.get(id)

            if (exists) {
                if (exists.qty > 1) {
                    next.set(id, {
                        prod: exists.prod,
                        qty: exists.qty - 1
                    })
                } else {
                    next.delete(id)
                }
            }

            return next
        })
        Toaster('Product removed from cart successfully', 'success')
    }

    function removeFromCart(prod: Product) {
        setCart((prev) => {
            const next = new Map(prev)
            next.delete(Number(prod.product_id))
            return next
        })
        Toaster('Product removed from cart successfully', 'success')
    }

    function checkout(status: boolean) {
        if (status) {
            setCart(new Map())
        }
        Toaster('Check out successfull', 'success')
    }

    function getCartTotal(): number {
        let total = 0

        cart.forEach((item) => {
            total += item.prod.product_price * item.qty
        })

        return total
    }

    return {
        addToCart,
        incrementQty,
        decrementQty,
        removeFromCart,
        checkout,
        cart: cart,
        total: getCartTotal()
    }
}