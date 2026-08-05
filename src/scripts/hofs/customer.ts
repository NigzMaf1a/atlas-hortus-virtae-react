//types
import type Payment from "../interfaces/feat/payments"
import type { SaleItem, Sale } from "../interfaces/feat/sales"
import type Product from "../interfaces/feat/product"

export default class CustomerHOFs {
    static topThreeOccurringNumbers(numbers: number[]): number[] {
        const counts = new Map<number, number>()

        for (const number of numbers) {
            counts.set(number, (counts.get(number) ?? 0) + 1)
        }

        return [...counts.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([number]) => number)
    }

    static getThreeMostRecentPayments(payments: Payment[]): Payment[] {
        return [...payments]
            .sort(
                (a, b) =>
                    b.payment_date.getTime() - a.payment_date.getTime()
            )
            .slice(0, 3)
    }

    static getThreeMostSoldProducts(
        saleItems: SaleItem[],
        products: Product[]
    ): Product[] {
        const quantities = new Map<number, number>()

        // Total quantity sold per product
        for (const item of saleItems) {
            quantities.set(
                item.product_id,
                (quantities.get(item.product_id) ?? 0) + item.sale_qty
            )
        }

        // Sort product IDs by quantity sold and take the top 3
        const topProductIds = [...quantities.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([productId]) => productId)

        // Return the corresponding Product objects
        return topProductIds
            .map(productId =>
                products.find(product => product.product_id === productId)
            )
            .filter((product): product is Product => product !== undefined)
    }

    static getMostRecentSales(sales: Sale[]): Sale[] {
        return [...sales]
            .sort(
                (a, b) =>
                    b.sale_date.getTime() - a.sale_date.getTime()
            )
            .slice(0, 3)
    }
}