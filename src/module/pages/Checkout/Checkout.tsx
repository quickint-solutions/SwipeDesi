import React, { useContext, useEffect, useMemo, useState } from 'react';
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { useNavigate } from 'react-router-dom';
import checkoutHttpRequest from '../../../api/checkoutHttpRequest';
import { useAppDispatch, useAppSelector } from '../../../api/store/configureStore';
import { getUserDetail } from '../../../helpers/common';
import MandirBgImg from '../../../images/bg/mandir-banner.jpg';
import { getCartDetail } from '../Cart/cartSlice';
import { AuthContext } from '../../../context/auth.context';
import { CartContext } from '../../../context/cart.context';
import { provinces } from '../../../utils/provinces';
import { tax_structure } from '../../../utils/tax';

const Checkout: React.FC = () => {
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps } = usePaymentInputs();
  const { items, getTotal, getTaxAmount, getFinalTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const storeData = useAppSelector((state: any) => state.cartSlice);
  const [cartData, setCartData] = useState([]);
  const [productDetail, setProductDetail] = useState<any>(null);
  const [billingDetail, setBillingDetail] = useState({
    firstName: user?.name?.first,
    lastName: user?.name?.last,
    companyName: '',
    country: user?.address?.country,
    addressLine1: user?.address?.line1,
    addressLine2: user?.address?.line2,
    city: user?.address?.city,
    state: user?.address?.state,
    zip: user?.address?.zip,
    phone: '',
    email: user?.email,
  });
  const [paymentCardDetail, setPaymentCardDetail] = useState({
    cardNumber: '',
    cvv: '',
    expiryDate: '',
  });

  useEffect(() => {
    if (user) {
    } else {
      navigate('/');
    }
  }, []);

  const taxDetails = tax_structure.find((value: any) => value.province === billingDetail.state) || tax_structure[0];
  const taxAmount = getTaxAmount(taxDetails?.total || 0);

  const handleChangeBillingDetail = (key: string, value: any) => {
    setBillingDetail((values: any) => ({
      ...values,
      [key]: value,
    }));
  };

  const saveBillingAddress = async () => {
    let requestParam = {
      addressID: 0,
      userID: user?._id,
      addressType: 'Billing',
      fullName: billingDetail.firstName + billingDetail.lastName,
      companyName: billingDetail.companyName,
      addressLine1: billingDetail.addressLine1 + billingDetail.addressLine2,
      addressLine2: '',
      city: billingDetail.city,
      state: billingDetail.state,
      postalCode: billingDetail.zip,
      country: billingDetail.country,
      phoneNumber: billingDetail.phone,
      isDefault: true,
    };
    let billingAddressData = await checkoutHttpRequest.saveBillingAddressDetail(requestParam);
    if (billingAddressData.status) {
      // alert('Your address updated!');
      let reqParam = {
        paymentMethodID: 0,
        userID: user?._id,
        cardNumber: paymentCardDetail.cardNumber,
        expiryDate: paymentCardDetail.expiryDate,
        cvv: paymentCardDetail.cvv,
      };
      let saveCardData = await checkoutHttpRequest.saveCardDetail(reqParam);
      if (saveCardData?.status) {
        let requestParam = {
          cartID: storeData?.cartDetail[0].cartID,
          userID: user?._id,
          shippingAddress: billingDetail.addressLine1 + billingDetail.addressLine2,
          paymentMethod: 'card',
          paymentStatus: 'pending',
        };
        let orderData = await checkoutHttpRequest.placeOrder(requestParam);
        if (orderData?.status) {
          dispatch(getCartDetail(user?._id));
          navigate('/');
        } else {
          alert(orderData?.message);
        }
      } else {
        alert(saveCardData.message);
      }
    } else {
      alert('Something went wrong, Please try again!');
    }
  };

  const handlechangePaymentCardDetail = (key: string, value: any) => {
    setPaymentCardDetail((values: any) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleChangeCardNumber = () => {};

  return (
    <>
      <section className="header-inner header-inner-menu bg-overlay-secondary" style={{ backgroundImage: 'url(' + MandirBgImg + ')' }}>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 position-relative">
              <div className="header-inner-title">
                <div className="section-title">
                  <div className="sub-title">
                    <span></span>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a className="text-white text-uppercase" href="index.html">
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item active">Shop Checkout</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>Shop Checkout</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {items?.length > 0 ? (
        <section className="space-ptb">
          <div className="container">
            <div className="row">
              {!user && (
                <div className="col-md-12">
                  <div className="checkout-info bg-light mb-4 mb-md-5">
                    <span className="returning-icon">
                      <i className="bi bi-person" style={{ fontSize: '2rem' }}></i>
                    </span>

                    <p className="mb-0">
                      <span>Returning customer?</span>{' '}
                      <a className="text-secondary" href="sign-in.html">
                        Click here to login
                      </a>
                    </p>
                  </div>
                </div>
              )}
              <div className="col-md-12">
                <div className="checkout-info-coupon mb-4 mb-md-5">
                  <p className="checkout-info bg-light mb-4">
                    <span className="coupon-icon">
                      <i className="bi bi-wallet2" style={{ fontSize: '2rem' }}></i>
                    </span>
                    <span>Have a coupon?</span>
                    <a
                      className="text-secondary"
                      data-bs-toggle="collapse"
                      href="#collapsecoupon"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapsecoupon"
                    >
                      Click here to enter your code
                    </a>
                  </p>
                  <div className="collapse" id="collapsecoupon">
                    <div className="checkout-coupon">
                      <p>If you have a coupon code, please apply it below.</p>
                      <form className="form-row">
                        <div className="mb-3 col-sm-12">
                          <input type="text" className="form-control" id="coupon_code" placeholder="Coupon code" />
                        </div>
                      </form>
                      <a href="#" className="btn btn-secondary">
                        {' '}
                        <span> Apply coupon</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="section-title mb-4">
                  <h4 className="title fw-600">Billing details</h4>
                </div>
                <div className="checkout checkout-form">
                  <form className="row">
                    <div className="mb-3 col-sm-12">
                      <label className="form-label">First name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={billingDetail.firstName}
                        onChange={e => handleChangeBillingDetail('firstName', e.target.value)}
                      />
                    </div>
                    <div className="mb-3 col-sm-12">
                      <label className="form-label">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={billingDetail.lastName}
                        onChange={e => handleChangeBillingDetail('lastName', e.target.value)}
                      />
                    </div>
                    <div className="mb-3 col-sm-12">
                      <label className="form-label">Company name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Company Name"
                        value={billingDetail.companyName}
                        onChange={e => handleChangeBillingDetail('companyName', e.target.value)}
                      />
                    </div>
                    <div className="mb-3 select-border col-sm-12">
                      <label className="form-label">Country</label>
                      <select className="form-control basic-select" onChange={e => handleChangeBillingDetail('country', e.target.value)}>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>
                    <div className="mb-3 col-sm-12">
                      <label className="form-label">Street Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address Line 1"
                        value={billingDetail.addressLine1}
                        onChange={e => handleChangeBillingDetail('addressLine1', e.target.value)}
                      />
                    </div>
                    <div className="mb-3 col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="House number and street name"
                        value={billingDetail.addressLine2}
                        onChange={e => handleChangeBillingDetail('addressLine2', e.target.value)}
                      />
                    </div>
                    <div className="mb-3 col-sm-12 select-border">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        value={billingDetail.city}
                        onChange={e => handleChangeBillingDetail('city', e.target.value)}
                      />
                    </div>
                    <div className="mb-3 select-border col-sm-12">
                      <label className="form-label">State</label>
                      <select className="form-control basic-select" onChange={e => handleChangeBillingDetail('state', e.target.value)}>
                        {provinces.map((value: any, key: number) => (
                          <option value={value.value}>{value.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-sm-12">
                      <label className="form-label">ZIP</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Postal Code"
                        value={billingDetail.zip}
                        onChange={e => handleChangeBillingDetail('zip', e.target.value)}
                      />
                    </div>
                    <div className="mb-3 col-sm-12">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        value={billingDetail.phone}
                        onChange={e => handleChangeBillingDetail('phone', e.target.value)}
                      />
                    </div>
                    <div className="col-sm-12 mb-0">
                      <label className="form-label">Email Address:</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        value={billingDetail.email}
                        onChange={e => handleChangeBillingDetail('email', e.target.value)}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6 mt-5 mt-md-0">
                <div className="section-title mb-4">
                  <h4 className="title fw-600">Your order</h4>
                </div>
                <div className="checkout-review ">
                  <div className="table-responsive">
                    <table className="table cart">
                      <tbody>
                        <tr>
                          <th className="border-top-0 product-name" scope="row">
                            Product
                          </th>
                          <th className="border-top-0 product-total" scope="row">
                            Subtotal
                          </th>
                        </tr>
                        {items.length > 0 ? (
                          items.map((value: any, key: number) => {
                            return (
                              <tr>
                                <td>
                                  {value.name || 'NO PRODUCT NAME'} × {value.quantity}{' '}
                                </td>
                                <td> ${(value.quantity * value.price).toFixed(2)} </td>
                              </tr>
                            );
                          })
                        ) : (
                          <p>Your cart is empty</p>
                        )}
                        <tr>
                          <th className="product-name" scope="row">
                            Subtotal
                          </th>
                          <td className="product-total amount">
                            <strong> ${getTotal().toFixed(2)}</strong>
                          </td>
                        </tr>
                        <tr>
                          <th className="product-name" scope="row">
                            Tax ({taxDetails?.label})
                          </th>
                          <td className="product-total amount">
                            <strong>${taxAmount?.toFixed(2) || '0.00'}</strong>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th className="product-total">Shipping</th>
                          <td>
                            <form>
                              <div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                  <label className="form-check-label ps-1" htmlFor="exampleRadios1">
                                    Flat rate
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                                  <label className="form-check-label ps-1" htmlFor="exampleRadios2">
                                    Local pickup
                                  </label>
                                </div>
                              </div>
                            </form>
                          </td>
                        </tr>
                        <tr>
                          <th className="product-total" scope="row">
                            Total
                          </th>
                          <td className="product-total amount text-primary">
                            <strong>${getFinalTotal(taxDetails?.total || 0)} </strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="col-12  mt-4">
                    <a href="javascript:void(0)" className="btn btn-secondary checkout-button d-grid" onClick={() => saveBillingAddress()}>
                      Place Order
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="space-ptb">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2>Oops!! Your shopping cart is empty</h2>
                <h3>Click on button and let do order</h3>
                <a href="javascript:void(0)" className="btn btn-secondary checkout-button d-grid" onClick={() => navigate('/')}>
                  Go To Home
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Checkout;
