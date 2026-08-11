import type Product from "../../../scripts/interfaces/feat/product"

interface CartStyles {
    cont: string
    btn: string
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
            w-full h-[100px] border border-green-100 ${border} rounded-lg border-l-6
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
}