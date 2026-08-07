//scripts
import Session from "../../session"
import Cart from "./cart"
import Toaster from "../../Toaster"

export default class Payments {
    public static user_id = Number(Session.getUser().user_id)
    public static cart = new Cart(this.user_id)
    public static total: number = 0
    public static payment: number = 0
    public static discount: number = 0

    public static async setTotal(): Promise<true> {
        const sum = this.cart.getCartTotal()
        this.total = sum

        return true
    }

    public static async discountSetter(): Promise<boolean> {
        if (await this.setTotal()) {
            this.discount = 5
            this.total = this.total - this.discount
            return true
        }

        return false
    }

    public static async makePayment(pay: number): Promise<boolean> {
        if (pay <= 0) return false

        if (await this.discountSetter()) {
            this.payment = pay

            if (this.total < this.payment) {
                Toaster('Please make a payment that is equal to the total', 'info')
                return false
            }

            if (this.payment !== 0) {
                if (this.payment > this.total) {
                    Toaster(
                        `Thanks for the Ksh: ${this.payment - this.total} tip`,
                        'success'
                    )
                }

                this.cart.checkout(true)
                return true
            }
        }

        return false
    }
}