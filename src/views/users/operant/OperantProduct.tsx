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
}

export default function OperantProduct({ product }: Props) {
    return (
        <Card className="w-full sm:w-80">
            <CardHeader>
                <CardTitle>{product.product_name}</CardTitle>
            </CardHeader>

            <CardContent>
                <LabelledText label="Price" text={String(product.product_price)} />
            </CardContent>
        </Card>
    )
}
