import { useNavigate } from "react-router-dom"

//components
import CustomDiv from "../components/CustomDiv"

interface Props {
    regtype: string
    user: 'Operant' | 'Customer' | 'Manager'
    route: string
    label: string
    icon: string
}

export default function MenuItem(
    { regtype, user, route, label, icon }: Props
) {
    const navigate = useNavigate()

    return (
        <>
            {
                regtype.toLowerCase() === String(user).toLowerCase() && <CustomDiv>
                    <CustomDiv>
                        <img src={icon} />
                    </CustomDiv>

                    <CustomDiv onClick={() => navigate(route)}>
                        {label}
                    </CustomDiv>
                </CustomDiv>
            }
        </>
    )
}
