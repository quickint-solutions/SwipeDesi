import { apiRequests } from "./httpRequest";

const shopSingleHttpRequest = {
    getProductDetailById: (productId: number) => apiRequests.get(`api/shopsingleproduct/GetProductDetailsById?productId=${productId}`),
    getRelatedProductDetailByCategory: (category: string) => apiRequests.get(`api/home/GetRelatedProductDetailByCategory?category=${category}`),
    addToWishlist: (userId: number, productId: number, action: string) => apiRequests.get(`api/shopsingleproduct/ManageWishList?userid=${userId}&productid=${productId}&action=${action}`)
}

export default shopSingleHttpRequest;