import { useEffect, useState } from "react"

//components
import CustomDiv from "../components/CustomDiv"
import MenuItem from "./MenuItem"

//styles
import MenuStyles from "../styles/views/menu"

//scripts
import Session from "../scripts/utils/session"

export default function Menu() {
    const [regtype] = useState<string>(Session.getUser().reg_type)

    return (
        <CustomDiv className={MenuStyles.menuContainer()}>
            <MenuItem regtype={regtype} user="Customer" label="home" icon="/favicon.svg" route="/home" />
        </CustomDiv>
    )
}
