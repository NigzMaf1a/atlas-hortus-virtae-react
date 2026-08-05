import type User from "../interfaces/user"

export default class Session {

    static storeToken(token: string) {
        localStorage.setItem('token', JSON.stringify(token))
    }

    static storeOutletId(outlet_id: number) {
        localStorage.setItem('outlet_id', JSON.stringify(outlet_id))
    }

    static storeUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user))
    }

    static getUser(): User {
        const userString = localStorage.getItem('user')
        const user = JSON.parse(userString as string)
        if (typeof user === 'undefined' || user === null) throw new Error('User is undefined')
        return user as User
    }

    static getToken(): string {
        const tokenString = localStorage.getItem('user')
        const token = JSON.parse(tokenString as string)
        if (typeof token === 'undefined' || token === null) throw new Error('User is undefined')
        return token as string
    }


    static getOutletId(): number {
        const tokenString = localStorage.getItem('outlet_id')
        const id = JSON.parse(tokenString as string)
        if (typeof id === 'undefined' || id === null) throw new Error('User is undefined')
        return id as number
    }

    static sessionStatus(): boolean {
        if (!this.getUser() || !this.getToken) return false
        return true
    }

    static sessionClear() {
        localStorage.clear()
    }
}