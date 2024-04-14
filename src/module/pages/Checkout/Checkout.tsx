import React, { useEffect, useMemo, useState } from 'react';
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { useNavigate } from 'react-router-dom';
import checkoutHttpRequest from '../../../api/checkoutHttpRequest';
import { useAppDispatch, useAppSelector } from '../../../api/store/configureStore';
import { getUserDetail } from '../../../helpers/common';
import MandirBgImg from '../../../images/bg/mandir-banner.jpg';
import { getCartDetail } from '../Cart/cartSlice';

const Checkout: React.FC = () => {
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps } = usePaymentInputs();
  const userDetail = useMemo(() => getUserDetail(), []);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const storeData = useAppSelector((state: any) => state.cartSlice);
  const [cartData, setCartData] = useState([]);
  const [productDetail, setProductDetail] = useState<any>(null);
  const [billingDetail, setBillingDetail] = useState({
    fname: '',
    lname: '',
    companyName: '',
    country: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
  });
  const [paymentCardDetail, setPaymentCardDetail] = useState({
    cardNumber: '',
    cvv: '',
    expiryDate: '',
  });

  useEffect(() => {
    if (userDetail) {
      getCheckoutDetail();
    } else {
      navigate('/');
    }
  }, []);

  const getCheckoutDetail = async () => {
    let checkoutData = await checkoutHttpRequest.getCheckoutDetail(userDetail?.userID);
    debugger;
    setCartData(checkoutData?.CartDetail);
    setProductDetail(checkoutData?.PassDetail);
  };

  const handleChangeBillingDetail = (key: string, value: any) => {
    setBillingDetail((values: any) => ({
      ...values,
      [key]: value,
    }));
  };

  const saveBillingAddress = async () => {
    let requestParam = {
      addressID: 0,
      userID: userDetail?.userID,
      addressType: 'Billing',
      fullName: billingDetail.fname + billingDetail.lname,
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
        userID: userDetail.userID,
        cardNumber: paymentCardDetail.cardNumber,
        expiryDate: paymentCardDetail.expiryDate,
        cvv: paymentCardDetail.cvv,
      };
      let saveCardData = await checkoutHttpRequest.saveCardDetail(reqParam);
      if (saveCardData?.status) {
        let requestParam = {
          cartID: storeData?.cartDetail[0].cartID,
          userID: userDetail.userID,
          shippingAddress: billingDetail.addressLine1 + billingDetail.addressLine2,
          paymentMethod: 'card',
          paymentStatus: 'pending',
        };
        let orderData = await checkoutHttpRequest.placeOrder(requestParam);
        if (orderData?.status) {
          dispatch(getCartDetail(userDetail.userID));
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

      {cartData?.length > 0 ? (
        <section className="space-ptb">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
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
              <div className="col-md-6">
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
                        value={billingDetail.fname}
                        onChange={e => handleChangeBillingDetail('fname', e.target.value)}
                      />
                    </div>
                    <div className="mb-3 col-sm-12">
                      <label className="form-label">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={billingDetail.lname}
                        onChange={e => handleChangeBillingDetail('lname', e.target.value)}
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
                        <option value="Armenia" selected={true}>
                          Armenia
                        </option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Japan">Japan</option>
                        <option value="Jersey">Jersey</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Peru">Peru</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Réunion">Réunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint Lucia">Saint Lucia</option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Timor-Leste">Timor-Leste</option>
                        <option value="Togo">Togo</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Viet Nam">Viet Nam</option>
                        <option value="Western Sahara">Western Sahara</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
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
                      <select className="form-control basic-select" onChange={e => handleChangeBillingDetail('city', e.target.value)}>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Orissa">Orissa</option>
                        <option value="Pondicherry">Pondicherry</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttaranchal">Uttaranchal</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                    <div className="mb-3 select-border col-sm-12">
                      <label className="form-label">State</label>
                      <select className="form-control basic-select" onChange={e => handleChangeBillingDetail('state', e.target.value)}>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
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
                        {cartData.length > 0 ? (
                          cartData.map((value: any, key: number) => (
                            <tr>
                              <td>
                                {' '}
                                {value.ProductName} × {value.Quantity}{' '}
                              </td>
                              <td> ${(value.Quantity * value.Price).toFixed(2)} </td>
                            </tr>
                          ))
                        ) : (
                          <p>Your cart is empty</p>
                        )}
                        {/* <tr>
                                                <td> Printer Shelf Office Use Shelf × 9 </td>
                                                <td> $360.00 </td>
                                            </tr>
                                            <tr>
                                                <td> Fancy Mart Plastic & Wood × 3 </td>
                                                <td> $348.00 </td>
                                            </tr> */}
                        <tr>
                          <th className="product-name" scope="row">
                            Subtotal
                          </th>
                          <td className="product-total amount">
                            <strong> ${productDetail?.SubTotal?.toFixed(2)}</strong>
                          </td>
                        </tr>
                        <tr>
                          <th className="product-name" scope="row">
                            Tax
                          </th>
                          <td className="product-total amount">
                            <strong>
                              {' '}
                              ${productDetail?.TaxRateAmount ? productDetail?.TaxRateAmount?.toFixed(2) : '0.00'}{' '}
                              {productDetail?.TaxRate ? '(' + productDetail?.TaxRate + '%)' : ''}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <th className="product-name" scope="row">
                            Provincial Sales Tax
                          </th>
                          <td className="product-total amount">
                            <strong>
                              {' '}
                              ${productDetail?.ProvincialSalesTax ? productDetail?.ProvincialSalesTax?.toFixed(2) : '0.00'}{' '}
                              {productDetail?.ProvincialSalesTax ? '(' + productDetail?.ProvincialSalesTax + '%)' : ''}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <th className="product-name" scope="row">
                            Federal GST Amount
                          </th>
                          <td className="product-total amount">
                            <strong>
                              {' '}
                              ${productDetail?.FederalGSTAmount ? productDetail?.FederalGSTAmount?.toFixed(2) : '0.00'}{' '}
                              {productDetail?.FederalGST ? '(' + productDetail?.FederalGST + '%)' : ''}
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th className="shipping">Shipping</th>
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
                            <strong> $708.00 </strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="cardPayment">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseCardPayment"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          Card Payment <i className="fas fa-chevron-down fa-xs"></i>
                        </button>
                      </h2>
                      <div
                        id="collapseCardPayment"
                        className="accordion-collapse collapse show"
                        aria-labelledby="cardPayment"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <div>
                            <div style={{ position: 'relative' }}>
                              <svg
                                className="cardAll"
                                {...getCardImageProps({ images })}
                                style={{
                                  display: 'flex',
                                  height: '100%',
                                  position: 'absolute',
                                  zIndex: '1',
                                  alignItems: 'center',
                                  bottom: '0',
                                  left: '160px',
                                  top: '0',
                                  width: '35px',
                                }}
                              />
                              <input
                                value={paymentCardDetail.cardNumber}
                                {...getCardNumberProps({ onChange: (e: any) => handlechangePaymentCardDetail('cardNumber', e.target.value) })}
                                placeholder="Card Number"
                                className="input"
                              />
                              {/* <input type="text" placeholder="Card Number" value={paymentCardDetail.cardNumber} onChange={(e) => handlechangePaymentCardDetail("cardNumber", e.target.value)} /> */}
                            </div>
                          </div>
                          <div>
                            <input
                              value={paymentCardDetail.expiryDate}
                              {...getExpiryDateProps({ onChange: (e: any) => handlechangePaymentCardDetail('expiryDate', e.target.value) })}
                              placeholder="Expiry Date"
                              className="label"
                            />
                            {/* <input type="text" placeholder="Expiry Date" value={paymentCardDetail.expiryDate} onChange={(e) => handlechangePaymentCardDetail("expiryDate", e.target.value)} /> */}
                          </div>
                          <div>
                            <input
                              value={paymentCardDetail.cvv}
                              {...getCVCProps({ onChange: (e: any) => handlechangePaymentCardDetail('cvv', e.target.value) })}
                              placeholder="CVV"
                              className="input"
                            />
                            {/* <input type="text" placeholder="CVV" value={paymentCardDetail.cvv} onChange={(e) => handlechangePaymentCardDetail("cvv", e.target.value)} /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Direct bank transfer <i className="fas fa-chevron-down fa-xs"></i>
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be
                          shipped until the funds have cleared in our account.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Check payments <i className="fas fa-chevron-down fa-xs"></i>
                        </button>
                      </h2>
                      <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Cash on delivery<i className="fas fa-chevron-down fa-xs"></i>
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">Pay with cash upon delivery.</div>
                      </div>
                    </div>
                    <div className="accordion-item mb-0">
                      <h2 className="accordion-header" id="headingFour">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          PayPal <i className="fas fa-chevron-down fa-xs"></i>
                        </button>
                      </h2>
                      <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                        <div className="accordion-body">Pay with cash upon delivery.</div>
                      </div>
                    </div>
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
