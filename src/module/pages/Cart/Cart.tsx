import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import MandirBgImg from '../../../images/bg/mandir-banner.jpg';
import Product1 from '../../../images/product/01.jpg';
import Product2 from '../../../images/product/02.jpg';
import { getUserDetail } from '../../../helpers/common';
import cartHttpRequest from '../../../api/cart/cartHttpRequest';
import { useAppDispatch, useAppSelector } from '../../../api/store/configureStore';
import { getCartDetail, getCartTotal } from './cartSlice';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userDetail = getUserDetail();
  const storeData = useAppSelector((state: any) => state.cartSlice);
  const [cartDetail, setCartDetail] = useState<any>([]);
  const [cartTotalData, setCartTotalData] = useState<any>(0);
  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState<any>(null);

  useEffect(() => {
    if (userDetail) {
      // getCartData();
      dispatch(getCartDetail(userDetail.userID));
      // dispatch(getCartTotal(userDetail.userID));
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (storeData?.cartDetail?.length > 0) {
      dispatch(getCartTotal(storeData?.cartDetail[0].cartID));
      let cardArray = [] as any;
      let cardObj;
      for (let i = 0; i < storeData?.cartDetail.length; i++) {
        cardObj = {
          cartID: storeData?.cartDetail[i].cartID,
          cartItemID: storeData?.cartDetail[i].cartItemID,
          imagePath: storeData?.cartDetail[i].imagePath,
          price: storeData?.cartDetail[i].price,
          productID: storeData?.cartDetail[i].productID,
          productName: storeData?.cartDetail[i].productName,
          quantity: storeData?.cartDetail[i].quantity,
          userID: storeData?.cartDetail[i].userID,
        };
        cardArray.push(cardObj);
      }
      setCartDetail(cardArray);
      // setCartDetail(storeData?.cartDetail);
      // getCartTotal(storeData?.cartDetail[0].cartID);
    } else {
      setCartDetail([]);
    }
  }, [storeData?.cartDetail]);

  useEffect(() => {
    if (storeData?.cartTotal) {
      setCartTotalData(storeData?.cartTotal);
      // getCartTotal(storeData?.cartDetail[0].cartID);
    } else {
      setCartTotalData(0);
    }
  }, [storeData?.cartTotal]);

  // const getCartTotal = async (cartId: number) => {
  //     let cartTotalData = await cartHttpRequest.getCartTotal(cartId);
  //     setCartTotalData(cartTotalData);
  // }

  const removeItemFromCart = async (cartData: any) => {
    let requestParam = {
      productID: cartData?.productID,
      userID: cartData?.userID,
    };
    let removeData = await cartHttpRequest.removeCartItem(requestParam);
    if (removeData?.status) {
      dispatch(getCartDetail(userDetail.userID));
      // getCartData();
      // let tempArr = [...cartDetail];
      // let findIndex = tempArr.findIndex((a: any) => a.cartItemID === cartData.cartItemID) as any;
      // if(findIndex > 0){
      //     tempArr.splice(0, findIndex);
      // }
      // setCartDetail(tempArr);
    } else {
      alert(removeData?.message);
    }
  };

  const handleCartQuantity = (qty: number, cartData: any) => {
    let tempCartData = [...cartDetail];
    let filterData = tempCartData.filter((a: any) => a.cartItemID === cartData.cartItemID)[0] as any;
    if (filterData) {
      filterData.quantity = qty;
    }
    setCartDetail(tempCartData);
  };

  const updateCart = async () => {
    let updateCartData = await cartHttpRequest.updateCartItem(cartDetail);
    if (updateCartData?.status) {
      // getCartTotal(cartDetail[0].cartID);
      dispatch(getCartDetail(userDetail.userID));
      dispatch(getCartTotal(userDetail.userID));
    }
  };

  const applyCoupon = async () => {
    let couponData = await cartHttpRequest.getCouponByCode(couponCode);
    setCouponData(couponData);
    let requestParam = {
      cartID: cartDetail[0].cartID,
      couponCode: couponCode,
    };
    let applyCouponData = await cartHttpRequest.applyCouponCode(requestParam);
    // updateCart();
    // getCartTotal(cartDetail[0].cartID);
    dispatch(getCartTotal(userDetail.userID));
  };

  const removeCoupon = async () => {
    let reqParam = {
      cartId: cartDetail[0].cartID,
    };
    let couponData = await cartHttpRequest.removeCoupon(reqParam);
    if (couponData?.status) {
      dispatch(getCartTotal(userDetail.userID));
    }
  };

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
                      <li className="breadcrumb-item active">Shop Cart</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>Shop Cart</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-ptb bg-holder">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="cart-table">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="product-remove">&nbsp;</th>
                        <th className="product-thumbnail">&nbsp;</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartDetail?.length > 0 ? (
                        cartDetail.map((value: any, key: number) => (
                          <tr key={key}>
                            <td className="product-remove">
                              <a href="javascript:void(0)" onClick={() => removeItemFromCart(value)}>
                                <i className="fa-solid fa-xmark"></i>
                              </a>
                            </td>
                            <td className="product-thumbnail">
                              <a href="javascript:void(0)">
                                <img src={process.env.REACT_APP_IMAGE_BASE_URL + value.imagePath?.replace('~', '')} alt="" />
                              </a>
                            </td>
                            <td className="product-name">
                              <a href="javascript:void(0)">{value.productName}</a>
                            </td>
                            <td className="product-price">
                              <span className="amount">${value.price?.toFixed(2)}</span>
                            </td>
                            <td className="product-quantity">
                              <form>
                                <div>
                                  <input
                                    type="number"
                                    className="form-control"
                                    min={1}
                                    id="number"
                                    value={value.quantity}
                                    onChange={e => handleCartQuantity(Number(e.target.value), value)}
                                  />
                                </div>
                              </form>
                            </td>
                            <td className="product-subtotal">
                              <span className="subtotal">${(value.quantity * value.price).toFixed(2)}</span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>No Record Found</tr>
                      )}
                      {/* <tr>
                                                <td className="product-remove"><a href="#"><i className="fa-solid fa-xmark"></i></a></td>
                                                <td className="product-thumbnail"><a href="#"><img src={Product1} alt="" /></a></td>
                                                <td className="product-name"><a href="#">Hand Carving Sevan Wood Temple</a></td>
                                                <td className="product-price"><span className="amount">$180</span></td>
                                                <td className="product-quantity">
                                                    <form>
                                                        <div>
                                                            <input type="number" className="form-control" id="number" value="1" />
                                                        </div>
                                                    </form>
                                                </td>
                                                <td className="product-subtotal"><span className="subtotal">$180</span></td>
                                            </tr>
                                            <tr>
                                                <td className="product-remove"><a href="#"><i className="fa-solid fa-xmark"></i></a></td>
                                                <td className="product-thumbnail"><a href="#"><img src={Product2} alt="" /></a></td>
                                                <td className="product-name"><a href="#">Dining Chair</a></td>
                                                <td className="product-price"><span className="amount">$180</span></td>
                                                <td className="product-quantity">
                                                    <form>
                                                        <div>
                                                            <input type="number" className="form-control" id="number2" value="2" />
                                                        </div>
                                                    </form>
                                                </td>
                                                <td className="product-subtotal"><span className="subtotal">$180</span></td>
                                            </tr>
                                            <tr>
                                                <td className="product-remove"><a href="#"><i className="fa-solid fa-xmark"></i></a></td>
                                                <td className="product-thumbnail"><a href="#"><img src={Product1} alt="" /></a></td>
                                                <td className="product-name"><a href="#">Hand Carving Sevan Wood Temple</a></td>
                                                <td className="product-price"><span className="amount">$200</span></td>
                                                <td className="product-quantity">
                                                    <form>
                                                        <div>
                                                            <input type="number" className="form-control" id="number3" value="3" />
                                                        </div>
                                                    </form>
                                                </td>
                                                <td className="product-subtotal"><span className="subtotal">$200</span></td>
                                            </tr> */}
                    </tbody>
                  </table>
                </div>
                {cartDetail?.length > 0 ? (
                  <div className="actions">
                    <div className="coupon mt-2 mt-lg-0 mt-md-0 mt-sm-0">
                      <form>
                        <input
                          type="text"
                          name="coupon_code"
                          className="input-text"
                          id="coupon_code"
                          value={couponCode}
                          placeholder="Coupon code"
                          onChange={e => setCouponCode(e.target.value)}
                        />
                        {couponData ? (
                          <a className="btn btn-primary" href="javascript:void(0)" onClick={() => removeCoupon()}>
                            Remove coupon
                          </a>
                        ) : (
                          <a className="btn btn-primary" href="javascript:void(0)" onClick={() => applyCoupon()}>
                            {' '}
                            Apply coupon
                          </a>
                        )}
                      </form>
                      {couponData && couponCode ? (
                        <ul>
                          <li>{couponData?.description}</li>
                          <li>Expiry Date - {moment(new Date(couponData?.expiryDate)).format('MMM DD, YYYY')}</li>
                        </ul>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="update-cart mt-3 mt-md-0">
                      {' '}
                      <a className="btn btn-secondary" href="javascript:void(0)" onClick={() => updateCart()}>
                        {' '}
                        Update cart
                      </a>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="cart-total-sidebar">
                <div className="cart-totals widget">
                  <h4 className="cart-totals-title fw-600">Cart Totals</h4>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr className="cart-subtotal">
                          <th>Subtotal</th>
                          <td>
                            <span className="subtotal">${cartDetail?.length > 0 ? cartTotalData?.Subtotal?.toFixed(2) : '0.00'}</span>
                          </td>
                        </tr>
                        <tr className="shipping">
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
                        </tr>
                        <tr className="order-total">
                          <th>Total</th>
                          <td>
                            <span className="amount">${cartDetail?.length > 0 ? cartTotalData?.Total?.toFixed(2) : '0.00'}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center">
                    <a href="javascript:void(0)" className="btn btn-primary checkout-button" onClick={() => navigate('/Checkout')}>
                      Proceed to checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
