export default class ModalStyles {
    static container(): string {
        return `
            w-[300px] h-[400px] flex flex-col
            gap-2 bg-white rounded-lg overflow-y-auto
        `
    }

    static body(): string {
        return `
            w-full h-[90%] flex flex-col
            items-center gap-1
        `
    }

    static footer(): string {
        return `
            w-full h-[10%] flex flex-row justify-evenly items-center
            mt-auto mb-2
        `
    }
}