import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MandirBgImg from '../../../images/bg/mandir-banner.jpg';

import { AuthContext } from '../../../context/auth.context';
import { CartContext } from '../../../context/cart.context';
import { useMutation } from 'react-query';
import { getOrderById } from '../../../apiV2/orders';
import ReactToPrint from 'react-to-print';

const Order: React.FC = () => {
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');

  const { user } = useContext(AuthContext);
  const { items, removeItem, updateQuantity, getTotal } = useContext(CartContext);

  // get orderId from params
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('orderId');

  const { data, isLoading, mutate } = useMutation(getOrderById);

  useEffect(() => {
    if (user) {
      mutate(orderId as string);
      // dispatch(getCartDetail(userDetail.userID));
    } else {
      navigate('/');
    }
  }, []);

  const printSection = useRef<any>(null);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h3>Loading...</h3>
      </div>
    );
  }

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
                        <a className="text-white text-uppercase" href="javascript:void(0)" onClick={() => navigate('/')}>
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item active">Order Details</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>Order Details</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-ptb bg-holder">
        <div className="container">
          <div className="row" ref={printSection}>
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="cart-table">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="product-thumbnail">&nbsp;</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.items?.length > 0 ? (
                        data?.items.map((value: any, key: number) => {
                          console.log('value -> ', value);
                          return (
                            <tr key={key}>
                              <td className="product-thumbnail">
                                <a href="javascript:void(0)">
                                  <img src={value.item.images?.[0]} alt="" />
                                </a>
                              </td>
                              <td className="product-name">
                                <a href="javascript:void(0)">{value.item.name || 'No Name'}</a>
                              </td>
                              <td className="product-price">
                                <span className="amount">${Number(value.rate)?.toFixed(2)}</span>
                              </td>
                              <td className="product-quantity">
                                <span className="amount">{value.quantity}</span>
                              </td>
                              <td className="product-subtotal">
                                <span className="subtotal">${(value.quantity * value.rate).toFixed(2)}</span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>No Record Found</tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="cart-total-sidebar">
                <div className="cart-totals widget">
                  <h4 className="cart-totals-title fw-600">Order Details</h4>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr className="cart-subtotal">
                          <th>Order Id</th>
                          <td>
                            <span className="subtotal"># {data?.orderId}</span>
                          </td>
                        </tr>
                        <tr className="cart-subtotal">
                          <th>Status</th>
                          <td>
                            <span className="subtotal" style={{ textTransform: 'capitalize' }}>
                              {data?.status}
                            </span>
                          </td>
                        </tr>
                        <tr className="cart-subtotal">
                          <th>Taxes</th>
                          <td>
                            <span className="subtotal">{data?.tax} %</span>
                          </td>
                        </tr>
                        {/* <tr className="shipping">
                          <th>Shipping</th>
                          <td>
                            <form>
                              <div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                  <label className="form-check-label" htmlFor="exampleRadios1">
                                    Flat rate
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                                  <label className="form-check-label" htmlFor="exampleRadios2">
                                    Local pickup
                                  </label>
                                </div>
                              </div>
                            </form>
                            <p className="mb-2">
                              Shipping to <strong>CA.</strong>
                            </p>
                            <a href="#">
                              Change address <i className="fas fa-shopping-cart ms-2"></i>
                            </a>
                          </td>
                        </tr> */}
                        <tr className="order-total">
                          <th>Total</th>
                          <td>
                            <span className="amount">${Number(data?.subTotal)?.toFixed(2)}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-left">
            <ReactToPrint
              trigger={() => {
                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                // to the root node of the returned component as it will be overwritten.
                return (
                  <a href="javascript:void(0)" className="btn btn-primary checkout-button">
                    Print Invoice
                  </a>
                );
              }}
              content={() => printSection.current}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;
