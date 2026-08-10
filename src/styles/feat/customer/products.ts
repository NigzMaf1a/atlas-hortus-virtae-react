import type Product from "../../../scripts/interfaces/feat/product"

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
            h-[50%] px-2 overflow-y-auto gap-2
        `
    }

    static productItem(): string {
        return `
            w-full border border-neutral-300 rounded-lg border-l-4
        `
    }
}