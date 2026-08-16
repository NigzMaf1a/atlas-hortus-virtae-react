//scripts
import Users from "../users"

//types
import type Task from "../../interfaces/tasks"
import type TaskAlloc from "../../interfaces/task_alloc"
import type Product from "../../interfaces/feat/product"
import type { Sale } from "../../interfaces/feat/sales"

export default class Operant extends Users {
    constructor(token: string) {
        super(token)
    }

    async getProducts(): Promise<Product[]> { }
    async getSales(): Promise<Sale[]> { }
    async getTasks(): Promise<Task[]> { }
    async getTaskAllocs(): Promise<TaskAlloc[]> { }

    async addProduct(prod: Product) { }
    async attendToOrder(order: Sale) { }
}