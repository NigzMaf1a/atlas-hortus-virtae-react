import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

//components
import Page from "../components/Page"
import CustomDiv from "../components/CustomDiv"
import ButtonAdv from "../components/ButtonAdv"
import LabelledInput from "../components/LabelledInput"
import LabelledDropdown, { type DropDownValue } from "../components/LabelledDropdown"
import FancyLoad from "../views/FancyLoad"

//styles
import Styles from "../styles/sections"

//utils
import Toaster from "../scripts/utils/Toaster"
import AuthUtils, { login, getOutlets, getRoles } from "../scripts/utils/login"
import type { HortusLoginResponse } from "../scripts/interfaces/login"
import Session from "../scripts/utils/session"
import type Role from "../scripts/interfaces/roles"

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [roleId, setRoleId] = useState<number>(0)
    const [outletId, setOutletId] = useState<number>(0)
    const [showOutletDropDown, setShowOutletDropDown] = useState<boolean>(false)
    const [showRoleDropDown, setShowRoleDropDown] = useState<boolean>(false)
    const [roles, setRoles] = useState<DropDownValue[]>([])
    const [outlets, setOutlets] = useState<DropDownValue[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const [rolz, setRolz] = useState<Role[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        async function init() {
            setLoading(true)

            try {
                console.log("Loading login data...")

                const [r, o] = await Promise.all([
                    getRoles(),
                    getOutlets()
                ])

                console.log("Roles:", r)
                console.log("Outlets:", o)

                const roleValues: DropDownValue[] = r
                    .filter(role => Number(role.sector_id) === 5)
                    .map(role => ({
                        label: role.role_title,
                        value: role.role_id as number
                    }))

                const outletValues: DropDownValue[] = o.map(outlet => ({
                    label: outlet.name,
                    value: outlet.id as number
                }))

                setRolz(r)
                setRoles(roleValues)
                setOutlets(outletValues)
                setShowRoleDropDown(true)
            } catch (err) {
                console.error("Failed to initialize login page:", err)
                Toaster("Failed to load login data", "danger")
            } finally {
                console.log("Loading finished")
                setLoading(false)
            }
        }

        init()
    }, [])

    async function loginUser() {
        if (!email) {
            Toaster('Please enter an email to login', 'info')
            return
        }

        if (!password) {
            Toaster('Please enter a password to login', 'info')
            return
        }

        console.log({
            email,
            password,
            outlet_id: outletId,
            type: typeof outletId
        })

        const { token, user }: HortusLoginResponse = await login({
            email: email,
            password: password,
            outlet_id: Number(outletId)
        })

        if (Number(user.sector_id) !== 5) {
            Toaster('You are logging in from the wrong module', 'danger')
            Toaster('Please login from the right module', 'info')
            resetFields()
            return
        }

        Toaster('Login successful', 'success')

        Session.storeToken(token)
        Session.storeOutletId(Number(outletId))
        Session.storeUser(user)

        resetFields()

        setTimeout(() => {
            switch (user.reg_type.trim().toLowerCase()) {
                case 'customer':
                    navigate('/customer/home', { replace: true })
                    break
                default:
                    Toaster('Your module is still under construction', 'info')
            }
        }, 1500)
    }

    function resetFields() {
        setEmail('')
        setPassword('')
    }

    useEffect(() => {
        function unmountDropdowns() {
            if (roleId > 0) {
                if (AuthUtils.getRoleTitle(roleId, rolz) !== 'Customer') { }
                setShowRoleDropDown(false)
                setShowOutletDropDown(true)
            }
        }

        unmountDropdowns()
    }, [roleId])

    return (
        <Page className={Styles.centered()}>
            <FancyLoad loading={loading} />
            <CustomDiv className={Styles.form()}>
                <LabelledInput
                    label="Email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Enter email"
                />

                <LabelledInput
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Enter password"
                />

                {
                    showRoleDropDown && <LabelledDropdown
                        label="Role"
                        value={roleId}
                        onChange={setRoleId as (val: string | number) => void}
                        values={roles}
                    />
                }

                {
                    showOutletDropDown && <LabelledDropdown
                        label="Outlet"
                        value={outletId}
                        onChange={setOutletId as (val: string | number) => void}
                        values={outlets}
                    />
                }



                <CustomDiv className={Styles.formFooter()}>
                    <ButtonAdv
                        label="Login"
                        onClick={() => loginUser()}
                        btn_type="primary"
                        color="info"
                        size="lg"
                    />
                </CustomDiv>
            </CustomDiv>
        </Page>
    )
}