//hooks
import useCustomer from "../../../hooks/mod/customer/useCustomer"
import { useState, useEffect, useMemo } from "react"

//styles
import StylesTwo from "../../../styles/components"

//components
import Page from "../../../components/Page"
import Tray from "../../../components/Tray"
import ListItemWithBtn from "../../../components/ListItemWithBtn"
import FancyLoad from "../../../views/FancyLoad"
import MakeOrder from "../../../views/users/customer/MakeOrder"
import Modal from "../../../components/Modal"
import UserCart from "../../../views/users/customer/UserCart"

export default function CustomerProducts() {
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [showCreate, setShowCreate] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const data = useCustomer()

    useEffect(() => {
        if (!data.loading) {
            setShowSearch(data.products.length > 5)
        }

    }, [data.loading])

    const filtered = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()

        if (!query) return data.products

        return data.products.filter(
            f => Object.values((f)).some(
                (value) => String(value).toLowerCase().includes(query)))
    }, [data.products, searchQuery])

    function toggleCreate() {
        setShowCreate(prev => !prev)
    }

    function addToCart() { }

    return (
        <>
            <Page
                className={StylesTwo.page()}
                showSearch={showSearch}
                value={searchQuery}
                setValue={setSearchQuery as (val: string | number) => void}
                searchPlaceholder="Search products"
            >
                <FancyLoad loading={data.loading} />

                <UserCart />
                <Tray
                    data={filtered}
                    noDataMessage="Sorry, no products found"
                >
                    {
                        filtered && filtered.map((p) => <ListItemWithBtn
                            label_one="Product name"
                            label_two="Product price"
                            text_one={p.product_name}
                            text_two={`Ksh ${String(p.product_price)}`}
                            btn_label="Order"
                            btn_color="success"
                            onClick={() => toggleCreate()}
                        />)
                    }
                </Tray>
            </Page>

            <Modal showModal={showCreate}>
                <MakeOrder toggleModal={toggleCreate} addToCart={() => addToCart()} />
            </Modal>
        </>
    )
}
