//hooks
import useOperant from "../../../hooks/mod/operant/useOperant"

//components
import Page from "../../../components/Page"

export default function OperantOrders() {
    const operant = useOperant()
    
    return (
        <Page>
            OperantOrders
        </Page>
    )
}
