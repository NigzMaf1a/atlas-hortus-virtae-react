import apiFetch from "./apiFetch"
import endpoints from "./endpoints"
import type Sector from "../interfaces/sectors"
import type Outlet from "../interfaces/feat/outlets"
import type Role from "../interfaces/roles"
import type { HortusLoginResponse, HortusVirtaeCred } from "../interfaces/login"

export async function login({ email, password, outlet_id }: HortusVirtaeCred): Promise<HortusLoginResponse> {
    try {
        return await apiFetch<HortusLoginResponse>(endpoints.login, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
                outlet_id: outlet_id
            })
        }, 'http://localhost:8081/')
    } catch (error) {
        throw new Error('Error while attempting login', error as ErrorOptions)
    }
}

export async function getSectors(): Promise<Sector> {
    try {
        return await apiFetch<Sector>(endpoints.sector.get, {
            method: "GET"
        })
    } catch (error) {
        throw new Error('Error while fetching sectors', error as ErrorOptions)
    }
}


export async function getOutlets(): Promise<Outlet[]> {
    try {
        const response = await fetch(`http://localhost:8081/${endpoints.outlet.get}`)
        console.log('Response', response)
        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Fetch failed: ${response.status} ${JSON.stringify(error)}`)
        }
        return (await response.json()) as Outlet[]
    } catch (error) { throw new Error("Error while fetching outlets", { cause: error }) }
}

export async function getRoles(): Promise<Role[]> {
    try {
        return await apiFetch<Role[]>(endpoints.role.get, {
            method: "GET"
        })
    } catch (error) {
        throw new Error('Error while fetching outlets', error as ErrorOptions)
    }
}


export default class AuthUtils {
    static getRoleTitle(id: number, roles: Role[]): string {
        return roles.find(f => Number(f.role_id) === id)?.role_title as string
    }
}