//hooks
import { useMemo, useState } from "react"
import useOperantContext from "@/contexts/useOperantContext"

//components
import Page from "../../../components/Page"
import FancyLoad from "@/views/FancyLoad"
import CustomDiv from "@/components/CustomDiv"
import Tray from "@/components/Tray"
import ButtonedListItem from "@/components/ButtonedListItem"
import OperantProduct from "@/views/users/operant/OperantProduct"
import OperantProductDetail from "@/views/users/operant/OperantProductDetail"

//types
import type Product from "@/scripts/interfaces/feat/product"

export default function OperantProducts() {
    const [query, setQuery] = useState<string>('')
    const [showDetail, setShowDetail] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined)
    const { loading, products, markAvailable, markUnavailable } = useOperantContext()

    const filtered = useMemo((): Product[] => {
        const searchQuery = query.trim().toLowerCase()

        if (!searchQuery) return products

        return products.filter(
            p => Object.values(p).some(
                value => String(value).trim().toLowerCase().includes(searchQuery)
            )
        )
    }, [products, query])

    function view(prod: Product) {
        setSelectedProduct(prod)
        if (selectedProduct) setShowDetail(true)
    }

    return (
        <Page
            showSearch={true}
            value={query}
            setValue={setQuery as (val: string | number) => void}
            searchPlaceholder="Search products"
            className="px-2 py-2"
        >
            <FancyLoad loading={loading} />

            {
                !showDetail && <CustomDiv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filtered.map((p) => (
                        <OperantProduct
                            key={p.product_id}
                            product={p}
                            onClick={() => view(p)}
                        />
                    ))}
                </CustomDiv>
            }

            {
                showDetail && <OperantProductDetail
                    prod={selectedProduct as Product}
                    back={setShowDetail}
                    markAvailable={markAvailable}
                    markUnavailable={markUnavailable}
                />
            }
        </Page>
    )
}
