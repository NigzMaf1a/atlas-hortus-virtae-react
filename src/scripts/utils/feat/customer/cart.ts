import type Product from "../../../interfaces/feat/product"

export interface CartItem {
    productId: number
    quantity: number
    price: number
}

type CartStatus = 'Open' | 'Cleared'

export default class Cart {

    public user_id: number
    public items: Map<number, CartItem> = new Map()
    public product_ids: Set<number> = new Set()
    public cart_status: CartStatus

    constructor(user_id: number) {
        this.user_id = user_id
        this.cart_status = 'Open'
    }

    public addItem(prod: Product) {
        let cart_item: CartItem

        if (this.product_ids.has(Number(prod.product_id))) {
            if (this.items.has(Number(prod.product_id))) {
                const exists = this.items.get(Number(prod.product_id))

                if (typeof exists !== 'undefined') {
                    exists.quantity++
                    this.items.set(Number(prod.product_id), exists)
                }
            }
        } else {
            this.product_ids.add(Number(prod.product_id))

            cart_item = {
                productId: Number(prod.product_id),
                quantity: 1,
                price: Number(prod.product_price)
            }

            this.items.set(Number(prod.product_id), cart_item)
        }

        return
    }

    public decrement(product_id: number) {
        if (this.product_ids.has(product_id)) {
            if (this.items.has(product_id)) {
                const exists = this.items.get(Number(product_id)) as CartItem

                if (typeof exists !== 'undefined') {
                    exists.quantity--
                    this.items.set(Number(product_id), exists)
                }
            }
        }
    }

    public increment(product_id: number) {
        if (this.product_ids.has(product_id)) {
            if (this.items.has(product_id)) {
                const exists = this.items.get(Number(product_id)) as CartItem

                if (typeof exists !== 'undefined') {
                    exists.quantity++
                    this.items.set(Number(product_id), exists)
                }
            }
        }
    }

    public removeItem(prd: Product) {
        if (this.product_ids.has(Number(prd.outlet_id))) {
            this.product_ids.delete(Number(prd.outlet_id))
            this.items.delete(Number(prd.outlet_id))
        }

        return
    }

    public getCartItems() {
        return Array.from(this.items.values())
    }

    public getCartTotal(): number {
        let price: number = 0

        if (this.cart_status === 'Open') {
            for (const [key, value] of this.items) {
                console.log(key)
                const item_price: number = value.price * value.quantity

                price += item_price
            }
        }

        return price
    }

    public clearCart() {
        this.product_ids.clear()
        this.items.clear()
        this.cart_status = 'Cleared'
        return
    }

    public checkout(clear: boolean) {
        if (clear) this.clearCart()
        return
    }
}