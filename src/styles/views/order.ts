interface CreateOrder {
    cont: string
    body: string
    foot: string
}

interface Cart {
    strip: string
    toggler: string
    cont: string
    body: string
    foot: string
}

export default class OrderStyles {

    static createOrder(): CreateOrder {
        const cont_dim = 'w-[300px] h-[400px] rounded-lg'
        const cont_bg = 'bg-white'

        return {
            cont: `${cont_dim} ${cont_bg}`,
            body: `w-full h-[350px] flex flex-col items-center`,
            foot: `w-full flex flex-row items-center justify-between px-2`
        }
    }

    static cart(): Cart {
        return {
            strip: `w-full h-[80px] px-2 flex flex-row items-center justify-end py-auto my-2`,
            toggler: `w-[80px] h-[30px] flex items-center justify-center text-white bg-blue-400 rounded-lg hover:cursor-pointer`,
            cont: `w-[250px] h-[400px] flex flex-col rounded-lg border border-neutral-300 bg-white`,
            body: `w-full h-[350px] flex flex-col items-center overflow-y-auto`,
            foot: `w-full flex justify-evenly items-center`
        }
    }
}