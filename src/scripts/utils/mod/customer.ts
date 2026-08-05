import Users from "../users"

//types
import type Product from "../../interfaces/feat/product"
import type { Sale, SaleItem } from "../../interfaces/feat/sales"
import type Payment from "../../interfaces/feat/payments"

export default class Customer extends Users {
    constructor(token: string) {
        super(token)
    }

    async getProducts(outlet_id: number): Promise<Product[]> {
        return await this.apiFetch<Product[]>(this.endpoints.product.get_by_outlet_id(outlet_id),
            {
                method: "GET"
            }
        )
    }

    async getCustomerSales(customer_id: number): Promise<Sale[]> {
        return await this.apiFetch<Sale[]>(this.endpoints.sales.get_sales_by_user_id(customer_id),
            {
                method: "GET"
            }
        )
    }

    async getCustomerSaleItems(sale_id: number): Promise<SaleItem[]> {
        return await this.apiFetch<SaleItem[]>(this.endpoints.sale_items.get_sale_item_by_sale(sale_id),
            {
                method: "GET"
            }
        )
    }

    async getCustomerPayments(customer_id: number): Promise<Payment[]> {
        return await this.apiFetch<Payment[]>(this.endpoints.payments.get_by_user_id(customer_id),
            {
                method: "GET"
            }
        )
    }
}