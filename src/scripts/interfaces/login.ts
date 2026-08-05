import type User from "./user"

export interface HortusVirtaeCred {
    email: string
    password: string
    outlet_id: number
}

export interface HortusLoginResponse {
    token: string
    user: User
    outlet_name: string
    outlet_id: number
}