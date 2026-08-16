import useOperant from "../../hooks/mod/operant/useOperant"

//components
import Page from "../../components/Page"
import FancyLoad from "../../views/FancyLoad"

export default function OperantHome() {
    const operant = useOperant()

    return (
        <Page>
            <FancyLoad loading={operant.loading} />
        </Page>
    )
}