import { apiRequests } from "../httpRequest";

const cartHttpRequest = {
    addProductToCart: (requestParam: any) => apiRequests.post('api/carts/AddProductToCart', requestParam),
    getCartItem: (userId: number) => apiRequests.get(`api/carts/GetCartItems?UserID=${userId}`),
    removeCartItem: (requestParam: any) => apiRequests.post('api/carts/RemoveProductFromCart', requestParam),
    updateCartItem: (requestParam: any) => apiRequests.post('api/carts/UpdateProductCart', requestParam),
    getCartTotal: (cartId: number) => apiRequests.get(`api/carts/GetCartTotals?cartId=${cartId}`),
    getCouponByCode: (couponCode: string) => apiRequests.get(`api/coupon/GetCouponByCode?code=${couponCode}`),
    applyCouponCode: (requestParam: any) => apiRequests.post('api/coupon/ApplyCouponDiscount', requestParam),
    removeCoupon: (requestParam: any) => apiRequests.post('api/coupon/RemoveCouponFromCart', requestParam)
}

export default cartHttpRequest;