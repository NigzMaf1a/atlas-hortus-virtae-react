//scripts
import Users from "../users"

//types
import type Task from "../../interfaces/tasks"
import type TaskAlloc from "../../interfaces/task_alloc"
import type Product from "../../interfaces/feat/product"
import type { Sale } from "../../interfaces/feat/sales"
import type Payment from "../../interfaces/feat/payments"
import type { SaleItem } from "../../interfaces/feat/sales"
import Toaster from "../Toaster"

export default class Operant extends Users {
    constructor(token: string) {
        super(token)
    }

    async getProducts(outlet_id: number): Promise<Product[]> {
        return await this.apiFetch(this.endpoints.product.get_by_outlet_id(outlet_id))
    }

    async getSales(outlet_id: number): Promise<Sale[]> {
        return await this.apiFetch(this.endpoints.sales.get_sales_by_outlet_id(outlet_id))
    }

    async getSaleItems(sale_id: number): Promise<SaleItem[]> {
        return await this.apiFetch(this.endpoints.sale_items.get_sale_item_by_sale(sale_id))
    }

    async getPayments(): Promise<Payment[]> {
        return await this.apiFetch(this.endpoints.payments.get)
    }
    async getTaskAllocs(): Promise<TaskAlloc[]> {
        return await this.apiFetch(this.endpoints.task_alloc.get)
    }

    async addProduct(prod: Product) {
        try {
            await this.apiFetch(this.endpoints.product.post,
                {
                    method: "POST",
                    body: JSON.stringify(prod)
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async attendToOrder(order: Sale) {
        try {
            console.log(order)
            Toaster('Haujaunda mzito', 'success')
        } catch (error) {

        }
    }

    async attendToTask(task: Task) {
        try {
            await this.apiFetch(this.endpoints.task.patch(Number(task.task_status)))
        } catch (error) {
            Toaster('Fix crud method', 'warn')
        }
    }
}