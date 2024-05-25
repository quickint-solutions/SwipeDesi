import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BgImg from '../../../images/new-bg/Cart.jpg';
import { AuthContext } from '../../../context/auth.context';
import { CartContext } from '../../../context/cart.context';
import { provinces } from '../../../utils/provinces';
import { tax_structure } from '../../../utils/tax';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { useMutation } from 'react-query';
import { createPaymentIntent } from '../../../apiV2/stripe';
import { createOrderAPI } from '../../../apiV2/orders';
import { stripePromise } from '../../../App';

const CheckoutComponent: React.FC = () => {
  const { items, getTotal, getTaxAmount, getFinalTotal, emptyCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState<any>(undefined);

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<any>(null);

  // check in query params if q is success then show success message
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get('q');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const orderID = Math.floor(Math.random() * 1000000);

    const orderItems = items.map((value: any) => ({
      item: value._id,
      quantity: value.quantity,
      rate: value.price,
    }));

    const orderDetails = {
      orderId: orderID,
      subTotal: getFinalTotal(tax_structure[0].total),
      shipping: 'shipping',
      tax: tax_structure[0].total,
      items: orderItems,
      address: {
        line1: billingDetail.addressLine1,
        line2: billingDetail.addressLine2,
        state: billingDetail.state,
        city: billingDetail.city,
        country: billingDetail.country,
        zip: billingDetail.zip,
      },
      shippingAddress: {
        name: {
          first: shippingDetail.firstName,
          last: shippingDetail.lastName,
        },
        phone: shippingDetail.phone,
        companyName: shippingDetail.companyName,
        line1: shippingDetail.addressLine1,
        line2: shippingDetail.addressLine2,
        state: shippingDetail.state,
        city: shippingDetail.city,
        country: shippingDetail.country,
        zip: shippingDetail.zip,
      },
    };

    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // check all fields in billing and shipping details are filled
    if (
      Object.values(billingDetail).some((value: any, index: any) => {
        if (value === '') {
          alert(`Please fill the ${Object.keys(billingDetail)[index]} field`);
          return true;
        } else {
          return false;
        }
      })
    ) {
      alert('Please fill all the fields in billing details');
      return;
    }

    if (Object.values(shippingDetail).some((value: any) => value === '')) {
      alert('Please fill all the fields in shipping details');
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const data = await createPayment({ amount: getFinalTotal(tax_structure[0].total) });

    setClientSecret(data.clientSecret);

    const { error: submitError } = await elements.submit();

    console.log('submitError -> ', submitError);

    const { error, paymentIntent } = await stripe.confirmPayment({
      clientSecret: data.clientSecret,
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: 'https://dhknd.ca/checkout?q=success',
      },
    });

    if (paymentIntent?.status === 'succeeded') {
      const order = await createOrder(orderDetails);

      localStorage.removeItem('orderDetails');

      emptyCart();
    } else {
      alert('Payment failed');
    }

    if (error) {
      alert(error.message);
      setError(error.message || "Can't process payment");
    } else {
      // Payment succeeded, handle success
    }
  };

  const { mutateAsync: createPayment, isLoading } = useMutation(createPaymentIntent);
  const { mutateAsync: createOrder, isLoading: createOrderLoading } = useMutation(createOrderAPI, {
    onSuccess: data => {
      alert('Order has been placed successfully');
      navigate('/my-account?ORDER=success');
    },
  });

  const navigate = useNavigate();

  const [shippingDetailsSameAsBilling, setShippingDetailsSameAsBilling] = useState(false);

  const [billingDetail, setBillingDetail] = useState({
    firstName: user?.name?.first,
    lastName: user?.name?.last,
    companyName: user?.company?.name || '',
    gst: user?.gst || '',
    country: 'CA',
    addressLine1: user?.address?.line1,
    addressLine2: user?.address?.line2,
    city: user?.address?.city,
    state: user?.address?.state || 'Alberta',
    zip: user?.address?.zip,
    phone: user?.phone?.number,
    countryCode: '+1',
    email: user?.email,
  });
  const [shippingDetail, setShippingDetail] = useState({
    firstName: user?.name?.first,
    lastName: user?.name?.last,
    companyName: user?.company?.name,
    country: 'CA',
    addressLine1: user?.address?.line1,
    addressLine2: user?.address?.line2,
    city: user?.address?.city,
    state: user?.address?.state,
    zip: user?.address?.zip,
    phone: user?.phone?.number,
    countryCode: '+1',
    gst: user?.gst,
    email: user?.email,
  });

  // const focus = async () => {
  //   const data = await createPayment({ amount: getFinalTotal(tax_structure[0].total) });
  //   setClientSecret(data.clientSecret);
  // };

  useEffect(() => {
    if (user) {
      // focus();
      const data = localStorage.getItem('orderDetails');
      if (data && success) {
        const orderDetails = JSON.parse(data);
        setBillingDetail({
          firstName: orderDetails.address.firstName,
          lastName: orderDetails.address.lastName,
          companyName: orderDetails.address.companyName,
          country: 'CA',
          addressLine1: orderDetails.address.line1,
          addressLine2: orderDetails.address.line2,
          city: orderDetails.address.city,
          state: orderDetails.address.state,
          zip: orderDetails.address.zip,
          phone: orderDetails.address.phone,
          countryCode: '+1',
          gst: orderDetails.address.gst,
          email: user?.email,
        });

        setShippingDetail({
          firstName: orderDetails.shippingAddress.name.first,
          lastName: orderDetails.shippingAddress.name.last,
          companyName: orderDetails.shippingAddress.companyName,
          country: 'CA',
          addressLine1: orderDetails.shippingAddress.line1,
          addressLine2: orderDetails.shippingAddress.line2,
          city: orderDetails.shippingAddress.city,
          state: orderDetails.shippingAddress.state,
          zip: orderDetails.shippingAddress.zip,
          phone: orderDetails.shippingAddress.phone,
          countryCode: '+1',
          gst: user?.gst,
          email: user?.email,
        });

        createOrder(orderDetails);
      }
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
    if (shippingDetailsSameAsBilling) {
      setShippingDetail((values: any) => ({
        ...values,
        [key]: value,
      }));
    }
  };

  const handleChangeShippingDetail = (key: string, value: any) => {
    setShippingDetail((values: any) => ({
      ...values,
      [key]: value,
    }));
  };

  // if (!clientSecret) return <div>Loading...</div>;

  return (
    <>
      <section className="header-inner header-inner-menu bg-overlay-secondary" style={{ backgroundImage: 'url(' + BgImg + ')' }}>
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
                    <div className="mb-3 col-sm-6">
                      <label className="form-label">
                        First name
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        required
                        value={billingDetail.firstName}
                        onChange={e => handleChangeBillingDetail('firstName', e.target.value)}
                      />
                    </div>

                    <div className="mb-3 col-sm-6">
                      <label className="form-label">
                        Last name
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        required
                        value={billingDetail.lastName}
                        onChange={e => handleChangeBillingDetail('lastName', e.target.value)}
                      />
                    </div>

                    <div className="mb-3 col-sm-6">
                      <label className="form-label">Company name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Company Name"
                        value={billingDetail.companyName}
                        onChange={e => handleChangeBillingDetail('companyName', e.target.value)}
                      />
                    </div>

                    <div className="mb-3 col-sm-6">
                      <label className="form-label">GST</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Gst NO"
                        value={billingDetail.gst}
                        onChange={e => handleChangeBillingDetail('gst', e.target.value)}
                      />
                    </div>

                    <div className="mb-3 select-border col-sm-12">
                      <label className="form-label">
                        Country
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <select className="form-control basic-select" onChange={e => handleChangeBillingDetail('country', e.target.value)}>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>

                    <div className="mb-3 col-sm-12">
                      <label className="form-label">
                        Street Address
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address Line 1"
                        required
                        value={billingDetail.addressLine1}
                        onChange={e => handleChangeBillingDetail('addressLine1', e.target.value)}
                      />
                    </div>

                    <div className="mb-3 col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="House number and street name"
                        required
                        value={billingDetail.addressLine2}
                        onChange={e => handleChangeBillingDetail('addressLine2', e.target.value)}
                      />
                    </div>

                    <div className="mb-3 col-sm-6 select-border">
                      <label className="form-label">
                        City
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        required
                        value={billingDetail.city}
                        onChange={e => handleChangeBillingDetail('city', e.target.value)}
                      />
                    </div>

                    <div className="mb-3 select-border col-sm-6">
                      <label className="form-label">
                        State
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <select className="form-control basic-select" onChange={e => handleChangeBillingDetail('state', e.target.value)}>
                        {provinces.map((value: any, key: number) => (
                          <option value={value.value} defaultValue={'Alberta'}>
                            {value.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3 col-sm-6">
                      <label className="form-label">
                        ZIP
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Zip Code"
                        required
                        value={billingDetail.zip}
                        onChange={e => handleChangeBillingDetail('zip', e.target.value)}
                      />
                    </div>

                    <div className="mb-3 col-sm-6">
                      <label className="form-label">
                        Phone
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        required
                        value={billingDetail.phone}
                        onChange={e => handleChangeBillingDetail('phone', e.target.value)}
                      />
                    </div>

                    <div className="col-sm-12 mb-0">
                      <label className="form-label">
                        Email Address
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        required
                        value={billingDetail.email}
                        onChange={e => handleChangeBillingDetail('email', e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="section-title mb-2 mt-4">
                  <h4 className="title fw-600">Shipping details</h4>
                </div>
                <div className="mb-4" style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => {
                      setShippingDetailsSameAsBilling(!shippingDetailsSameAsBilling);
                      if (!shippingDetailsSameAsBilling) {
                        setShippingDetail(billingDetail);
                      }
                    }}
                    style={{ marginRight: 10, fontSize: 20 }}
                    id="flexCheckChecked02"
                    checked={shippingDetailsSameAsBilling}
                  />
                  <span>Same as billing address</span>
                </div>

                {!shippingDetailsSameAsBilling && (
                  <div className="checkout checkout-form">
                    <form className="row">
                      <div className="mb-3 col-sm-6">
                        <label className="form-label">
                          First name
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          required
                          value={shippingDetail.firstName}
                          onChange={e => handleChangeShippingDetail('firstName', e.target.value)}
                        />
                      </div>
                      <div className="mb-3 col-sm-6">
                        <label className="form-label">
                          Last name
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          required
                          value={shippingDetail.lastName}
                          onChange={e => handleChangeShippingDetail('lastName', e.target.value)}
                        />
                      </div>
                      <div className="mb-3 col-sm-6">
                        <label className="form-label">Company name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Company Name"
                          value={shippingDetail.companyName}
                          onChange={e => handleChangeShippingDetail('companyName', e.target.value)}
                        />
                      </div>
                      <div className="mb-3 col-sm-6">
                        <label className="form-label">GST</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Gst NO"
                          value={shippingDetail.gst}
                          onChange={e => handleChangeShippingDetail('gst', e.target.value)}
                        />
                      </div>
                      <div className="mb-3 select-border col-sm-12">
                        <label className="form-label">
                          Country
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select className="form-control basic-select" onChange={e => handleChangeShippingDetail('country', e.target.value)}>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>
                      <div className="mb-3 col-sm-12">
                        <label className="form-label">
                          Street Address
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          placeholder="Address Line 1"
                          value={shippingDetail.addressLine1}
                          onChange={e => handleChangeShippingDetail('addressLine1', e.target.value)}
                        />
                      </div>
                      <div className="mb-3 col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          required
                          placeholder="House number and street name"
                          value={shippingDetail.addressLine2}
                          onChange={e => handleChangeShippingDetail('addressLine2', e.target.value)}
                        />
                      </div>
                      <div className="mb-3 col-sm-6 select-border">
                        <label className="form-label">
                          City <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City"
                          required
                          value={shippingDetail.city}
                          onChange={e => handleChangeShippingDetail('city', e.target.value)}
                        />
                      </div>
                      <div className="mb-3 select-border col-sm-6">
                        <label className="form-label">
                          State
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select className="form-control basic-select" onChange={e => handleChangeShippingDetail('state', e.target.value)}>
                          {provinces.map((value: any, key: number) => (
                            <option value={value.value} defaultValue={'Alberta'}>
                              {value.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3 col-sm-6">
                        <label className="form-label">
                          ZIP
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Zip Code"
                          required
                          value={shippingDetail.zip}
                          onChange={e => handleChangeShippingDetail('zip', e.target.value)}
                        />
                      </div>

                      <div className="mb-3 col-sm-6">
                        <label className="form-label">
                          Phone
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Phone Number"
                          required
                          value={shippingDetail.phone}
                          onChange={e => handleChangeShippingDetail('phone', e.target.value)}
                        />
                      </div>
                      <div className="col-sm-12 mb-0">
                        <label className="form-label">
                          Email Address
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          required
                          value={shippingDetail.email}
                          onChange={e => handleChangeShippingDetail('email', e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                )}
              </div>
              <div className="col-md-6 mt-5 mt-md-0">
                <div className="section-title mb-4">
                  <h4 className="title fw-600">Your order</h4>
                </div>
                <div className="checkout-review ">
                  <div className="table-responsive">
                    <form onSubmit={handleSubmit}>
                      <table className="table cart">
                        <tbody>
                          <tr>
                            <th className="border-top-0 product-name" scope="row" style={{ width: 250 }}>
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
                                    {value.name || 'NO PRODUCT NAME'} × {value.quantity}
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
                            <th className="product-total">
                              Shipping
                              <span style={{ color: 'red' }}>*</span>
                            </th>
                            <td>
                              <form>
                                <div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="exampleRadios"
                                      id="exampleRadios1"
                                      value="option1"
                                      checked
                                    />
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
                            <th className="product-total" style={{ alignContent: 'flex-start' }}>
                              Card Details
                              <span style={{ color: 'red' }}>*</span>
                            </th>
                            <td>
                              <PaymentElement
                                options={{
                                  layout: 'accordion',
                                }}
                                onReady={payments => {
                                  console.log('payments -> ', payments);
                                }}
                              />
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
                    </form>
                  </div>

                  <div className="col-12  mt-4">
                    {/* <a href="javascript:void(0)" className="btn btn-secondary checkout-button d-grid" onClick={() => saveBillingAddress()}> */}
                    <button
                      disabled={isLoading || createOrderLoading}
                      className="btn btn-secondary checkout-button d-grid"
                      type="submit"
                      style={{ width: '100%' }}
                      onClick={handleSubmit}
                    >
                      {isLoading || createOrderLoading ? 'Processing...' : 'Place Order'}
                    </button>
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

const Checkout = () => {
  const { items, getTotal, getTaxAmount, getFinalTotal, emptyCart } = useContext(CartContext);
  const taxDetails = tax_structure[0];
  const taxAmount = getTaxAmount(taxDetails?.total || 0);
  const amount = getFinalTotal(taxDetails?.total || 0) * 100;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: 'payment',
        amount: amount,
        currency: 'cad',
        payment_method_types: ['card', 'klarna'],

        // clientSecret: "pi_1JZzZvJvIVD3jVvjJFvRwvAO_secret_7Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2",
      }}
    >
      <CheckoutComponent />
    </Elements>
  );
};

export default Checkout;
