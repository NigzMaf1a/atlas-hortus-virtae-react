//hooks
import useCustomer from "../../../hooks/mod/customer/useCustomer"
import useCart from "../../../hooks/feat/useCart"
import usePayment from "../../../hooks/feat/usePayment"
import { useState, useMemo } from "react"

//components
import Page from "../../../components/Page"
import FancyLoad from "../../../views/FancyLoad"
import ProductItemsContainer from "../../../views/users/customer/product/ProductItemsContainer"
import CartCont from "../../../views/users/customer/product/CartCont"
import CartModal from "../../../views/users/customer/product/CartModal"

//styles
import ProductStyles from "../../../styles/feat/customer/products"

export default function CustomerProducts() {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [showCart, setShowCart] = useState<boolean>(false)
    const data = useCustomer()
    const cart = useCart()
    const payment = usePayment()

    const queried = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()

        if (!query) return data.products

        return data.products.filter(
            p => Object.values(p).some(
                value => String(value).toLowerCase().includes(query))
        )

    }, [searchQuery, data.loading])

    function toggleCart() {
        setShowCart(prev => !prev)
    }

    return (
        <>
            <FancyLoad loading={data.loading} />

            <Page
                className={ProductStyles.page()}
                showSearch={data.products.length > 5}
                value={searchQuery}
                setValue={setSearchQuery as (val: string | number) => void}
                searchPlaceholder="Search for product"
            >
                {
                    !data.loading && <ProductItemsContainer products={queried} addToCart={cart.addToCart} />
                }
                <CartCont showCart={setShowCart} />
            </Page>

            <CartModal
                items={Array.from(cart.cart.values())}
                show={showCart}
                setShow={setShowCart}
                incrementQty={cart.incrementQty}
                decrementQty={cart.decrementQty}
                onClick={() => {
                    if (payment) {
                        const total = cart.total
                        console.log('Total', total)
                        cart.checkout(payment.status)
                    }
                }}
            />
        </>
    )
}
