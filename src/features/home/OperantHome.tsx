//hooks
import useOperantContext from "@/contexts/useOperantContext"

//components
import Page from "../../components/Page"
import FancyLoad from "../../views/FancyLoad"
import Tray from "../../components/Tray"
import ButtonedListItem from "../../components/ButtonedListItem"

export default function OperantHome() {
    const operant = useOperantContext()
    console.log('Operant', operant)

    return (
        <Page>
            <FancyLoad loading={operant.loading} />
        </Page>
    )
}