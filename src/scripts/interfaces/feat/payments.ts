export default interface Payment {
    payment_id: number
    user_id: number
    payment_date: Date
    sale_id: number
    sale_price: number
    payment_code: string
    payment_status: string
}