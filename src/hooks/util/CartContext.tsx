import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react"

import Cart from "../../scripts/utils/feat/customer/cart"
import Session from "../../scripts/utils/session"

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

const CartContext = createContext<CartData | undefined>(undefined)

interface CartProviderProps {
    children: ReactNode
}

export function CartProvider({
    children,
}: CartProviderProps) {
    const [cart, setCart] = useState<Cart | null>(null)
    const [loading, setLoading] = useState(true)
    const [, forceUpdate] = useState(0)

    useEffect(() => {
        try {
            setLoading(true)

            const user = Session.getUser()

            if (!user?.user_id) {
                setCart(null)
                return
            }

            const instance = new Cart(
                Number(user.user_id)
            )

            setCart(instance)
        } catch (error) {
            console.error(
                "Failed to initialise cart:",
                error
            )

            setCart(null)
        } finally {
            setLoading(false)
        }
    }, [])

    /**
     * Notify React that the mutable Cart instance
     * has changed.
     */
    function refresh() {
        forceUpdate((value) => value + 1)
    }

    function addToCart(product: Product) {
        if (!cart) return

        cart.addItem(product)
        refresh()
    }

    function removeFromCart(product: Product) {
        if (!cart) return

        cart.removeItem(product)
        refresh()
    }

    function increment(id: number) {
        if (!cart) return

        cart.increment(id)
        refresh()
    }

    function decrement(id: number) {
        if (!cart) return

        cart.decrement(id)
        refresh()
    }

    function clearCart() {
        if (!cart) return

        cart.clearCart()
        refresh()
    }

    function checkout(clear: boolean) {
        if (!cart) return

        cart.checkout(clear)
        refresh()
    }

    function getItemTotal(prod_id: number): number {
        if (!cart) return 0

        const item = cart.items.get(prod_id)

        if (!item) {
            return 0
        }

        return (
            Number(item.price) *
            Number(item.quantity)
        )
    }

    function getCartTotal(): number {
        if (!cart) return 0

        return cart.getCartTotal()
    }

    const value = useMemo<CartData>(() => ({
        loading,

        addToCart,
        removeFromCart,

        increment,
        decrement,

        getItemTotal,
        getCartTotal,

        clearCart,
        checkout,

        items: cart?.items ?? new Map<number, CartItem>(),
        productIds: cart?.product_ids ?? new Set<number>(),
    }), [cart, loading])

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export default function useCart(): CartData {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error(
            "useCart must be used inside a CartProvider"
        )
    }

    return context
}
