import type Product from "../../../interfaces/feat/product"

export interface CartItem {
    productId: number
    quantity: number
    price: number
}

type CartStatus = "Open" | "Cleared"

export default class Cart {
    public user_id: number
    public items: Map<number, CartItem> = new Map()
    public cart_status: CartStatus = "Open"

    constructor(user_id: number) {
        this.user_id = user_id
    }

    public addItem(product: Product): void {
        const productId = Number(product.product_id)

        const existing = this.items.get(productId)

        if (existing) {
            existing.quantity += 1

            this.items.set(productId, existing)

            return
        }

        const item: CartItem = {
            productId,
            quantity: 1,
            price: Number(product.product_price),
        }

        this.items.set(productId, item)

        this.cart_status = "Open"
    }

    public increment(productId: number): void {
        const id = Number(productId)

        const item = this.items.get(id)

        if (!item) {
            return
        }

        item.quantity += 1

        this.items.set(id, item)
    }

    public decrement(productId: number): void {
        const id = Number(productId)

        const item = this.items.get(id)

        if (!item) {
            return
        }

        if (item.quantity <= 1) {
            this.removeItemById(id)
            return
        }

        item.quantity -= 1

        this.items.set(id, item)
    }

    public removeItem(product: Product): void {
        this.removeItemById(Number(product.product_id))
    }

    private removeItemById(productId: number): void {
        this.items.delete(productId)
    }

    public getCartItems(): CartItem[] {
        return Array.from(this.items.values())
    }

    public getCartTotal(): number {
        if (this.cart_status !== "Open") {
            return 0
        }

        let total = 0

        for (const item of this.items.values()) {
            total += item.price * item.quantity
        }

        return total
    }

    public getItemTotal(productId: number): number {
        const item = this.items.get(Number(productId))

        if (!item) {
            return 0
        }

        return item.price * item.quantity
    }

    public clearCart(): void {
        this.items.clear()
        this.cart_status = "Cleared"
    }

    public checkout(clear: boolean): void {
        if (clear) {
            this.clearCart()
        }
    }

    public get product_ids(): Set<number> {
        return new Set(this.items.keys())
    }
}
