import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"

//components
import Page from "../components/Page"
import CustomDiv from "../components/CustomDiv"
import ButtonAdv from "../components/ButtonAdv"
import LabelledInput from "../components/LabelledInput"
import LabelledDropdown, { type DropDownValue } from "../components/LabelledDropdown"

//styles
import Styles from "../styles/sections"

//utils
import Toaster from "../scripts/utils/Toaster"
import AuthUtils, { login, getOutlets, getRoles } from "../scripts/utils/login"
import type { HortusVirtaeCred, HortusLoginResponse } from "../scripts/interfaces/login"
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

    const [rolz, setRolz] = useState<Role[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        async function init() {
            const r = await getRoles()
            const o = await getOutlets()

            const roleValues: DropDownValue[] = r.filter(
                r => Number(r.sector_id) === 5
            ).map((a): DropDownValue => {
                return {
                    label: a.role_title,
                    value: a.role_id as number
                }
            })

            const outletValues: DropDownValue[] = o.map((a): DropDownValue => {
                return {
                    label: a.name,
                    value: a.id as number
                }
            })

            setRolz(r)
            setRoles(roleValues)
            setOutlets(outletValues)
            console.log('Outlets', o)
            setShowRoleDropDown(true)
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

        const { token, user, outlet_id } = await login({
            email: email,
            password: password,
            outlet_id: outletId
        })

        if (Number(user.sector_id) !== 5) {
            Toaster('You are logging in from the wrong module', 'danger')
            Toaster('Please login from the right module', 'info')
            resetFields()
            return
        }

        Toaster('Login successful', 'success')

        Session.storeToken(token)
        Session.storeOutletId(outlet_id)
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