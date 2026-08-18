//shadcn
import { Card } from "../../../components/ui/card"

//type
import type { Sale } from "../../../scripts/interfaces/feat/sales"

interface SectionProps {
    val: string | number
}

function Section(
    { val }: SectionProps
) {
    return (
        <Card></Card>
    )
}

interface ItemProps {
    data: Sale[]
}

export default function OperantDashboardItemOrders(
    { data }: ItemProps
) {
    return (
        <Card className="w-full h-20 flex flex-row">
        </Card>
    )
}
