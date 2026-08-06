interface CreateOrder {
    cont: string
    body: string
    foot: string
}

export default class OrderStyles {

    static createOrder(): CreateOrder {
        const cont_dim = 'w-[300px] h-[400px]'
        const cont_bg = 'bg-blue-500'

        return {
            cont: `${cont_dim} ${cont_bg}`,
            body: ``,
            foot: ``
        }
    }
}