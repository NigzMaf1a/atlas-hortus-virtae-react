export default interface Product {
    product_id: number
    outlet_id: number
    product_name: string
    product_price: number
    available: 'Yes' | 'No'
}