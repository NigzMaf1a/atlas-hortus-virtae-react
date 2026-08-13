import type Product from "../../../scripts/interfaces/feat/product"

interface CartStyles {
    cont: string
    btn: string
}

interface ItemInards {
    right: string
    left: string
    row: string
}

interface CartItems {
    cont: string
    detail: string
    inc_decr: string
    btn: string
    row: string
    label: string
    text: string
}

export default class ProductStyles {
    static page(): string {

        return `
            flex
            flex-col
            items-center
            gap-2
            mt-1
            mx-1
        `
    }

    static productItemsContainer(): string {
        return `
            w-full flex flex-col border rounded border-neutral-300
            h-[90%] px-2 overflow-y-auto gap-2 py-2
        `
    }

    static productItem(prod: Product): string {
        const border = prod.available === 'Yes' ? 'border-l-green-500' : 'border-l-red-500'

        return `
            w-full h-100 border border-green-200 ${border} rounded-lg border-l-6
            flex flex-row justify-between items-center py-2
        `
    }

    static cart(): CartStyles {
        return {
            cont: `w-full h-[10%] flex flex-row justify-end items-center pb-3 pr-2`,
            btn: `
                 w-[90px] h-full bg-blue-400 text-white flex
                 justify-center items-center hover:cursor-pointer
                 rounded-lg
            `
        }
    }

    static productItemInards(): ItemInards {
        return {
            right: `
                w-[25%] flex flex-row h-full justify-center items-center
            `,
            left: `
                w-[75%] h-full flex flex-col gap-1
            `,
            row: `w-full ml-2 flex flex-row items-center gap-3`
        }
    }

    static cartItem(): CartItems {
        return {
            cont: `
                w-full h-15 flex flex-row justify-between items-center 
                border-l-4 border-l-yellow-400 py-auto
            `,
            detail: `w-[60%] h-full flex flex-col gap-1`,
            inc_decr: `
                w-[20%] h-full flex flex-row justify-center items-center
                gap-1 mr-3
            `,
            btn: `
                w-[20px] h-[20px] flex justify-center items-center
                border border-neutral-300
            `,
            row: `w-full flex flex-row`,
            label: ``,
            text: ``
        }
    }
}