export interface Sale {
    sale_id?: number
    user_id: number
    outlet_id: number
    sale_date: Date
    sale_total: number
    sale_discount: number
    sale_price: number
}

export interface SaleItem {
    sale_item_id?: number
    sale_id: number
    product_id: number
    product_price: number
    sale_qty: number
    sale_total: number
}

export interface CreateSaleRequest {
    sale: Sale
    items: SaleItem[]
}