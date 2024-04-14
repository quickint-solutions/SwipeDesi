import { apiRequests } from './httpRequest';

const checkoutHttpRequest = {
  getCheckoutDetail: (userId: number) => apiRequests.get(`api/carts/GetCartItemsforCheckout?userId=${userId}`),
  saveBillingAddressDetail: (requestParam: any) => apiRequests.post('api/address/CreateOrUpdateAddress', requestParam),
  saveCardDetail: (requestParam: any) => apiRequests.post('api/paymentmethods/UpsertPaymentMethod', requestParam),
  placeOrder: (requestParam: any) => apiRequests.post('api/carts/PlaceOrderfromCheckout', requestParam),
};

export default checkoutHttpRequest;
