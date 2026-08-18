import useOperant from "../../hooks/mod/operant/useOperant"

//components
import Page from "../../components/Page"
import FancyLoad from "../../views/FancyLoad"
import Tray from "../../components/Tray"
import ButtonedListItem from "../../components/ButtonedListItem"

export default function OperantHome() {
    const operant = useOperant()

    return (
        <Page>
            <FancyLoad loading={operant.loading} />
        </Page>
    )
}