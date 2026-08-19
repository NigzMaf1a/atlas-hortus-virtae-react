//shadcn
import { Button } from "@/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from "@/components/ui/card"

//components
import LabelledText from "@/components/LabelledText"

//types
import type Product from "@/scripts/interfaces/feat/product"

interface Props {
    product: Product
    onClick: () => void
}

export default function OperantProduct({ product, onClick }: Props) {
    const hover = product.available === 'Yes' ? 'hover:bg-green-700' : 'hover:bg-red-700'
    const btn_styles = product.available === 'Yes' ? 'bg-green-500' : 'bg-red-500'

    return (
        <Card className="w-full sm:w-80">
            <CardHeader className="w-full flex flex-row justify-center items-center text-orange-400">
                <CardTitle>{product.product_name}</CardTitle>
            </CardHeader>

            <CardContent>
                <LabelledText label="Price" text={String(product.product_price)} />
                <LabelledText label="Available" text={String(product.available)} />
            </CardContent>

            <CardFooter className="w-full flex justify-center items-center">
                <Button
                    className={`${btn_styles} ${hover} hover:cursor-pointer`}
                    onClick={onClick}
                >
                    View
                </Button>
            </CardFooter>
        </Card>
    )
}
