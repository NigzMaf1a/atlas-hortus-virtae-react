const endpoints = {
    login: '/api/auth/login',
    user: {
        post: 'api/reg/post',
        get: 'api/reg/get',
        patch: (id: number) => `/api/reg/patch/${id}`
    },
    sector: {
        post: '/api/sect/post',
        get: '/api/sect/get',
        patch: (id: number) => `/api/sect/patch/${id}`
    },
    role: {
        post: '/api/roles/post',
        get: '/api/roles/get',
        patch: (id: number) => `/api/roles/patch/${id}`
    },
    task: {
        post: '/api/task/post',
        get: '/api/task/get',
        patch: (id: number) => `/api/task/patch/${id}`
    },
    task_alloc: {
        post: '/api/alloc/post',
        get: '/api/alloc/get'
    },
    about: {
        get: '/api/about/get',
        patch: (id: number) => `/api/about/patch/${id}`
    },
    contact: {
        get: '/api/contact/get',
        patch: (id: number) => `/api/contact/patch/${id}`
    },
    outlet: {
        post: '/api/outlets/post',
        get: '/api/outlets/get',
        get_by_id: (id: number) => `/api/outlets/${id}`,
        get_by_networth: (id: number) => `/api/outlets/${id}/networth`,
        get_by_status: (id: number) => `/api/outlets/${id}/status`
    },
    product: {
        post: `/api/products/post`,
        get: `/api/products/get`,
        get_by_outlet_id: (id: number) => `/api/products/outlet/${id}`
    },
    sales: {
        post: `/api/sales/post`,
        get: `/api/sales/get`,
        get_sales_by_user_id: (id: number) => `/api/sales/user/${id}`,
        get_sales_by_outlet_id: (id: number) => `/api/sales/user/${id}`,
        get_sales_by_date: (date: Date) => `/api/sales/date/${date}`
    },
    sale_items: {
        post: `/api/sale-items/post`,
        get: `/api/sale-items/get`,
        get_sale_item_by_sale: (sale_id: number) => `/api/sale-items/sale/${sale_id}`,
        get_sale_items_by_product: (prod_id: number) => `/api/sale-items/product/${prod_id}`
    },
    payments: {
        post: `/api/payments/post`,
        get: `/api/payments/get`,
        get_by_user_id: (id: number) => `/api/payments/user/${id}`,
        patch_status: (id: number) => `/api/payments/${id}/status`
    }
}

export default endpoints