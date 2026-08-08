//hooks
import useCustomer from "../../../hooks/mod/customer/useCustomer"
import useCart from "../../../hooks/util/useCart"
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

//scripts
import Toaster from "../../../scripts/utils/Toaster"

//types
import type Product from "../../../scripts/interfaces/feat/product"

export default function CustomerProducts() {
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [showCreate, setShowCreate] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [selectedProduct, setSelectedProduct] = useState<Product>()

    const data = useCustomer()
    const cart = useCart()

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

    function toggleCreate(prod: Product) {

        if (showCreate) {
            setSelectedProduct(undefined)
        } else setSelectedProduct(prod)

        setShowCreate(prev => !prev)
    }

    async function addToCart(prod: Product) {
        await cart.addToCart(prod)
        Toaster('Product added successfully', 'success')
    }

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

                <UserCart products={data.products} />

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
                            onClick={() => toggleCreate(p)}
                        />)
                    }
                </Tray>
            </Page>

            <Modal showModal={showCreate}>
                <MakeOrder
                    toggleModal={toggleCreate}
                    addToCart={() => addToCart(selectedProduct as Product)}
                    prod={selectedProduct as Product}
                />
            </Modal>
        </>
    )
}
