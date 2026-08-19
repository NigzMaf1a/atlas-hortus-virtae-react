import { useState, useEffect } from "react"

//shadcn
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LabelledText from "@/components/LabelledText"
import LabelledInput from "@/components/LabelledInput"

//types
import type Product from "@/scripts/interfaces/feat/product"

//scripts
import Toaster from "@/scripts/utils/Toaster"

interface Props {
    prod: Product
    back: (bool: boolean) => void
    markAvailable: (prod_id: number) => Promise<boolean>
    markUnavailable: (prod_id: number) => Promise<boolean>
}

export default function OperantProductDetail(
    {
        prod, back, markAvailable, markUnavailable
    }: Props
) {
    const [available, setAvailable] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [edit, setEdit] = useState<boolean>(false)

    useEffect(() => {
        setAvailable(prod.available === 'Yes' ? true : false)
    }, [prod])

    const action_label = available ? 'Avail' : 'Not Avail'

    async function action() {
        if (available) {
            if (await markUnavailable(Number(prod.product_id))) {
                Toaster('Action successful', 'success')
                return
            } else {
                Toaster('Action unsuccessful', 'danger')
                return
            }
        } else {
            if (await markAvailable(Number(prod.product_id))) {
                Toaster('Action successful', 'success')
                return
            } else {
                Toaster('Action unsuccessful', 'danger')
                return
            }
        }
    }

    function toggleEdit() {
        setEdit(prev => !prev)
    }

    async function editProduct() { }

    const btn = 'w-30 h-10 text-white'

    const styles = {
        header: `w-full flex justify-center items-center`,
        content: `w-full h-[85%] grid grid-cols-2`,
        btn_back: `${btn} bg-blue-500 hover:bg-blue-700`,
        btn_acc: `${btn} bg-green-500 hover:bg-green-700`,
        footer: `w-full h-[5%] flex flex-row justify-evenly items-center`,
        prod_detail: ``,
    }

    return (
        <Card className="w-full h-full border border-neutral-200">
            <CardHeader className={styles.header}>
                <CardTitle className={'text-orange-400'}>{prod.product_name}</CardTitle>
            </CardHeader>

            <CardContent className={`${styles.content}`}>
                <CardContent className={`grid grid-cols-2`}>
                    <CardContent className={styles.prod_detail}>
                        <LabelledText label="Name" text={prod.product_name} />
                        <LabelledText label="Price" text={String(prod.product_price)} />
                        <LabelledText label="Available" text={prod.available} />
                    </CardContent>

                    <CardContent>
                        <Button
                            onClick={() => toggleEdit()}
                        >
                            Edit
                        </Button>
                    </CardContent>
                </CardContent>

                <CardContent className="flex flex-col gap-2">
                    <Card className="w-full h-10 border rounded-sm">

                    </Card>

                    <LabelledInput
                        label="Name"
                        value={name}
                        onChange={setName}
                        placeholder="Please enter a product name here"
                    />

                    <LabelledInput
                        label="Price"
                        value={price}
                        onChange={setPrice}
                        placeholder="Please enter a product name here"
                    />

                    <Button className={'text-white bg-green-500 hover:bg-green-700 hover:cursor-pointer'}>
                        Submit
                    </Button>

                </CardContent>
            </CardContent>


            <CardFooter className={styles.footer}>
                <Button
                    className={styles.btn_back}
                    onClick={() => back(false)}
                >
                    Back
                </Button>

                <Button
                    className={styles.btn_acc}
                    onClick={async () => action()}
                >
                    {action_label}
                </Button>
            </CardFooter>
        </Card>
    )
}