import React, { lazy, useState, useEffect, useContext } from 'react';
import { Navigate, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
// import logoImage from "../../../images/logo.png";
import PayIcon from '../../images/pay-icon.png';
import loginHttpRequest from '../../api/login/loginHttpRequest';
import { getUserDetail } from '../../helpers/common';
import cartHttpRequest from '../../api/cart/cartHttpRequest';
import { useAppDispatch, useAppSelector } from '../../api/store/configureStore';
import { getCartDetail, getCartTotal } from './Cart/cartSlice';
import { useMutation, useQuery } from 'react-query';
import { getCategories } from '../../apiV2/categories';
import { signup } from '../../apiV2/signup';
import { login } from '../../apiV2/login';
import { AuthContext } from '../../context/auth.context';
import Products from './Products';

// pages
const Login = lazy(() => import('./Login/Login'));
const Home = lazy(() => import('./Home/Home'));
const ShopSingle = lazy(() => import('./ShopSingle/ShopSingle'));
const Wishlist = lazy(() => import('./WishList/Wishlist'));
const Cart = lazy(() => import('./Cart/Cart'));
const Checkout = lazy(() => import('./Checkout/Checkout'));
const Category = lazy(() => import('./Category/Category'));
const RouteComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const storeData = useAppSelector((state: any) => state.cartSlice);
  const storageUserDetail = getUserDetail();
  const [userDetail, setUserDetail] = useState({
    email: '',
    password: '',
  });
  const [userData, setUserData] = useState(null);
  const [isShowLoginForm, setIsShowLoginForm] = useState(true);
  const [registrationDetail, setRegistrationDetail] = useState({
    first: '',
    last: '',
    countryCode: '',
    number: '',
    email: '',
    password: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    profileImage: '',
  });
  const [isShowRefisterFirstScreen, setIsShowRegisterFirstScreen] = useState(true);
  const [cartDetail, setCartDetail] = useState([]);
  const [cartTotal, setCartTotal] = useState<any>(0);

  const { isLoading: categoriesLoading, data: categories } = useQuery('getCategories', getCategories);

  useEffect(() => {
    if (storageUserDetail) {
      dispatch(getCartDetail(storageUserDetail.userID));
      // dispatch(getCartTotal(storageUserDetail.userID));
    }
  }, []);

  useEffect(() => {
    if (storeData?.cartDetail?.length > 0) {
      setCartDetail(storeData?.cartDetail);
      dispatch(getCartTotal(storeData?.cartDetail[0].cartID));
      // getCartTotal(storeData?.cartDetail[0].cartID);
    } else {
      setCartDetail([]);
    }
  }, [storeData?.cartDetail]);

  useEffect(() => {
    if (storeData?.cartTotal) {
      debugger;
      setCartTotal(storeData?.cartTotal?.Total);
      // getCartTotal(storeData?.cartDetail[0].cartID);
    }
  }, [storeData?.cartTotal]);

  const removeItemFromCart = async (cartData: any) => {
    let requestParam = {
      productID: cartData?.productID,
      userID: cartData?.userID,
    };
    let removeData = await cartHttpRequest.removeCartItem(requestParam);
    if (removeData?.status) {
      dispatch(getCartDetail(storageUserDetail.userID));
    } else {
      alert(removeData?.message);
    }
  };

  const handleLoginEvent = async () => {
    let loginData = await loginHttpRequest.postLoginEvent(userDetail.email, userDetail.password);
    if (loginData) {
      dispatch(getCartDetail(loginData.userID));
      (window as any).$('#formLoginRegister').modal('hide');
      setUserData(loginData);
      localStorage.setItem('UserDetail', JSON.stringify(loginData));
      setIsShowLoginForm(true);
      setUserDetail({
        email: '',
        password: '',
      });
    }
  };

  const closeLoginModal = () => {
    setIsShowLoginForm(true);
    setUserDetail({
      email: '',
      password: '',
    });
  };

  const navigateToWishlist = () => {
    if (storageUserDetail) {
      navigate('/Wishlist');
    } else {
      (window as any).$('#formLoginRegister').modal('show');
    }
  };

  const openLoginPopup = () => {
    (window as any).$('#formLoginRegister').modal('show');
  };

  const handleRegistrationDetail = (key: string, value: any) => {
    setRegistrationDetail((values: any) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleUserCredential = (key: string, value: any) => {
    setUserDetail((values: any) => ({
      ...values,
      [key]: value,
    }));
  };

  const auth = useContext(AuthContext);

  const { mutate: handleLogin } = useMutation(login, {
    onSuccess: data => {
      auth.login(data.data, data.token);
      // set modal close
      (window as any).$('#formLoginRegister').modal('hide');
    },
    onError: error => {
      alert('Invalid email or password');
      (window as any).$('#formLoginRegister').modal('hide');
    },
  });

  const { mutate: handleSignup } = useMutation(signup, {
    onSuccess: data => {
      (window as any).$('#formLoginRegister').modal('hide');
      alert('User registered successfully, Please Login now!');
    },
    onError: error => {
      console.log('error -> ', error);
    },
  });

  const handleUserLogout = () => {
    navigate('/');
    setUserData(null);
    localStorage.removeItem('UserDetail');
  };

  return (
    <React.Fragment>
      {/* <!--=================================
            header -->    */}
      <div className="header header-sticky default">
        <div className="topbar d-none d-md-block">
          <div className="container">
            <div className="topbar-inner">
              <div className="row">
                <div className="col-12">
                  <div className="d-lg-flex align-items-center text-center">
                    <div className="topbar-left justify-content-center mb-2 mb-lg-0">
                      <ul className="list-unstyled ps-2">
                        <li>
                          <a href="#">Gift cards</a>
                        </li>
                        <li>
                          <a href="#">Showrooms</a>
                        </li>
                        <li>
                          <a href="#">About Us</a>
                        </li>
                      </ul>
                    </div>
                    <div className="topbar-right ms-auto justify-content-center align-items-center">
                      <div className="topbar-call d-inline-flex topbar-divider pe-lg-3">
                        <a href="tel:+1 (403) 801-6969">
                          <i className="bi bi-telephone me-2"></i>+1 (403) 801-69695
                        </a>
                      </div>
                      <div className="info-box-icon ps-3 d-none d-lg-flex">
                        <a href="#" className="d-flex align-items-center">
                          {/* <img src="images/topbar-avtar-icon.png" alt="image" /> */}
                          <span className="ps-2">Contact with an expert</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middel d-none d-lg-block">
          <div className="container position-relative">
            <div className="header-middel-container d-flex">
              <a className="navbar-brand" href="javascript:void(0)" onClick={() => navigate('/')}>
                <img
                  className="img-fluid"
                  src="https://dhknd.ca/wp-content/uploads/2021/03/dhknd.ca-logo-web_Final-for-website_300px.jpg"
                  alt="logo"
                />
              </a>
              <form className="form-inline search-form d-none d-md-block">
                <div className="form-group mb-0 z-0">
                  <button className="search-button" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                  <input type="text" className="form-control" placeholder="Search for products" />
                </div>
              </form>

              <div className="add-listing">
                <div className="account-action">
                  {auth.user ? (
                    <a href="javascript:void(0)" className="account-icon" onClick={() => auth.logout()}>
                      <i className="bi bi-person"></i>
                      <span>Log Out</span>
                    </a>
                  ) : (
                    <a href="javascript:void(0)" className="account-icon" data-bs-toggle="modal" data-bs-target="#formLoginRegister">
                      <i className="bi bi-person"></i>
                      <span>Login / Register</span>
                    </a>
                  )}
                </div>
                <div className="woo-action d-flex align-items-center">
                  <div className="Compare-action woo-action-icon">
                    <a href="#" className="compare-icon" title="Compare products">
                      <i className="bi bi-shuffle"></i>
                    </a>
                  </div>
                  <div className="wishlist-action woo-action-icon">
                    <a href="javascript:void(0)" className="wishlist-icon" onClick={() => navigateToWishlist()}>
                      <i className="bi bi-heart"></i>
                    </a>
                  </div>
                  <div className="cart dropdown woo-action-icon">
                    {storageUserDetail ? (
                      <>
                        <button
                          className="dropdown-toggle p-0"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="bi bi-cart3"></i>
                          <span className="cart-count">{cartDetail.length}</span>
                        </button>
                        {cartDetail.length > 0 ? (
                          <div className="dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <ul className="cart-list ps-0">
                              {cartDetail.map((value: any, key: number) => (
                                <li className="d-flex" key={key}>
                                  <a className="remove-item" href="javascript:void(0)" onClick={() => removeItemFromCart(value)}>
                                    <i className="fas fa-times"></i>
                                  </a>
                                  <img
                                    className="img-fluid me-3"
                                    src={process.env.REACT_APP_IMAGE_BASE_URL + value.imagePath?.replace('~', '')}
                                    alt="cartImg"
                                  />
                                  <div className="cart-info">
                                    <a href="javascript:void(0)">{value.productName}</a>
                                    <span className="d-block">
                                      {value.quantity} x {value.price?.toFixed(2)}
                                    </span>
                                  </div>
                                </li>
                              ))}
                              {/* <li className="d-flex">
                                                    <a className="remove-item" href="#"><i className="fas fa-times"></i></a>
                                                    <img className="img-fluid me-3" src={Product01} alt="" />
                                                    <div className="cart-info">
                                                        <a href="#">Extra Fine Wool Jumpers</a>
                                                        <span className="d-block">1 x 12.49</span>
                                                    </div>
                                                </li>
                                                <li className="d-flex">
                                                    <a className="remove-item" href="#"><i className="fas fa-times"></i></a>
                                                    <img className="img-fluid me-3" src={Product01} alt="" />
                                                    <div className="cart-info">
                                                        <a href="#"> Men’s Standard Fit Crew T-Shirt</a>
                                                        <span className="d-block">1 x 28.72</span>
                                                    </div>
                                                </li> */}
                            </ul>
                            <div className="cart-footer">
                              <div className="d-flex mb-3">
                                <b className="me-auto text-dark">Subtotal:</b>
                                <span>${cartTotal?.toFixed(2)}</span>
                              </div>
                              <div className="d-inline-block d-sm-flex">
                                <a className="col btn btn-secondary btn-sm me-2 px-4" href="javascript:void(0)" onClick={() => navigate('/Cart')}>
                                  View Cart
                                </a>
                                <a
                                  className="col btn btn-sm btn-primary ms-0 mt-1 mt-sm-0 ms-sm-2 px-4"
                                  href="javascript:void(0)"
                                  onClick={() => navigate('/Checkout')}
                                >
                                  Checkout
                                </a>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                      </>
                    ) : (
                      <button className="dropdown-toggle p-0" type="button" id="dropdownMenuButton" onClick={() => openLoginPopup()}>
                        <i className="bi bi-cart3"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-static-top navbar-expand-lg">
          <div className="container main-header position-relative">
            <a className="navbar-brand d-flex d-lg-none" href="javascript:void(0)" onClick={() => navigate('/')}>
              <img className="img-fluid" src="https://dhknd.ca/wp-content/uploads/2021/03/dhknd.ca-logo-web_Final-for-website_300px.jpg" alt="logo" />
            </a>
            <div className="add-listing d-flex d-lg-none ms-auto">
              <div className="account-action">
                <a href="#" className="account-icon" data-bs-toggle="modal" data-bs-target="#formLoginRegister">
                  <i className="bi bi-person"></i>
                </a>
              </div>
              <div className="woo-action d-flex align-items-center d-flex d-lg-none">
                <div className="search-action woo-action-icon">
                  <a href="#" className="search-icon" title="Search Product">
                    <i className="bi bi-search"></i>
                  </a>
                </div>
                <div className="cart dropdown woo-action-icon">
                  <button
                    className="dropdown-toggle p-0"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="bi bi-cart3"></i>
                    <span className="cart-count">2</span>
                  </button>
                </div>
              </div>
            </div>

            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
              <i className="fas fa-align-left"></i>
            </button>

            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                {!categoriesLoading && categories && categories?.result?.length > 0
                  ? categories?.result?.map((value: any, key: number) => (
                      <li className="nav-item">
                        <a className="nav-link nav-link-flex" aria-current="page" href="#">
                          <img src={value.icon} style={{ width: 18 }} />
                          <span>{value.name}</span>
                        </a>
                      </li>
                    ))
                  : ''}
              </ul>
            </div>
            <div className="text-end free-shipping d-none d-lg-block">
              <a href="#">Free shipping for all orders of $1.300</a>
            </div>
          </div>
        </nav>
      </div>
      {/* <!--=================================
            header -->    */}

      {/* <!--=================================
            Login-register-form -->    */}

      <div
        className="modal fade login-register-modal"
        id="formLoginRegister"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="formLoginRegisterlabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" onClick={() => closeLoginModal()} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="box-content">
                <div className={isShowLoginForm ? 'form-login active' : 'form-login'}>
                  <form method="post" className="login">
                    <h4 className="form-title">Sign in</h4>
                    <div className="row content">
                      <div className="mb-3 col-sm-12 username">
                        <input
                          type="text"
                          className="form-control"
                          value={userDetail.email}
                          required
                          name="username"
                          id="username"
                          placeholder="Your Email"
                          onChange={e => handleUserCredential('email', e.target.value)}
                        />
                      </div>
                      <div className="mb-3 col-sm-12 password">
                        <input
                          className="form-control"
                          type="password"
                          value={userDetail.password}
                          required
                          name="password"
                          id="password"
                          placeholder="Password"
                          onChange={e => handleUserCredential('password', e.target.value)}
                        />
                      </div>
                      <div className="mb-3 col-sm-12 rememberme-lost d-flex justify-content-between">
                        <div className="rememberme">
                          <input name="rememberme" type="checkbox" id="rememberme" value="forever" />
                          <label htmlFor="rememberme" className="inline">
                            Remember me
                          </label>
                        </div>
                        <div className="lost_password">
                          <a href="#">Lost your password?</a>
                        </div>
                      </div>
                      <div className="col-sm-12 d-grid mb-3">
                        <button type="button" className="btn btn-secondary btn-flat" onClick={() => handleLogin(userDetail)}>
                          Sign in
                        </button>
                      </div>
                      <div className="col-sm-12 d-grid mb-3">
                        <button type="button" className="btn btn-gray btn-flat btn-next-register" onClick={() => setIsShowLoginForm(false)}>
                          Creat An Account
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className={!isShowLoginForm ? 'form-register active' : 'form-register'}>
                  <form method="post" className="register">
                    <h4 className="form-title">REGISTER</h4>
                    {isShowRefisterFirstScreen ? (
                      <div className="row content">
                        <div className="mb-3 col-sm-6 name">
                          <input
                            type="text"
                            className="form-control"
                            value={registrationDetail.first}
                            name="first"
                            id="first"
                            placeholder="First Name"
                            onChange={e => handleRegistrationDetail('first', e.target.value)}
                          />
                        </div>
                        <div className="mb-3 col-sm-6 name">
                          <input
                            type="text"
                            className="form-control"
                            value={registrationDetail.last}
                            name="lastName"
                            id="lastName"
                            placeholder="last Name"
                            onChange={e => handleRegistrationDetail('last', e.target.value)}
                          />
                        </div>
                        <div className="mb-3 col-sm-3 email">
                          <input
                            type="text"
                            className="form-control"
                            value={registrationDetail.countryCode}
                            name="countryCode"
                            id="countryCode"
                            placeholder="Country Code"
                            onChange={e => handleRegistrationDetail('countryCode', e.target.value)}
                          />
                        </div>
                        <div className="mb-3 col-sm-9 email">
                          <input
                            type="text"
                            className="form-control"
                            value={registrationDetail.number}
                            name="number"
                            id="number"
                            placeholder="Number"
                            onChange={e => handleRegistrationDetail('number', e.target.value)}
                          />
                        </div>
                        <div className="mb-3 col-sm-12 name">
                          <input
                            type="text"
                            className="form-control"
                            value={registrationDetail.email}
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={e => handleRegistrationDetail('email', e.target.value)}
                          />
                        </div>
                        <div className="mb-3 col-sm-12 password">
                          <input
                            className="form-control"
                            type="password"
                            value={registrationDetail.password}
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={e => handleRegistrationDetail('password', e.target.value)}
                          />
                        </div>

                        <div className="col-sm-12 d-grid mb-3">
                          <button type="button" className="btn btn-secondary btn-flat" onClick={() => setIsShowRegisterFirstScreen(false)}>
                            Next
                          </button>
                        </div>
                        {/* <div className="col-sm-12 d-grid mb-3">
                                                <button type="submit" className="btn btn-gray btn-flat btn-next-login">Already has an account</button>
                                            </div> */}
                      </div>
                    ) : (
                      <div className="row content">
                        <div className="mb-3 col-sm-12 password">
                          <input
                            className="form-control"
                            type="text"
                            value={registrationDetail.line1}
                            name="line1"
                            id="line1"
                            placeholder="Line1"
                            onChange={e => handleRegistrationDetail('line1', e.target.value)}
                          />
                        </div>
                        <div className="mb-3 col-sm-12 password">
                          <input
                            className="form-control"
                            type="text"
                            value={registrationDetail.line2}
                            name="line2"
                            id="line2"
                            placeholder="Line2"
                            onChange={e => handleRegistrationDetail('line2', e.target.value)}
                          />
                        </div>
                        <div className="mb-3 col-sm-6 password">
                          <input
                            className="form-control"
                            type="text"
                            value={registrationDetail.city}
                            name="city"
                            id="city"
                            placeholder="City"
                            onChange={e => handleRegistrationDetail('city', e.target.value)}
                          />
                        </div>
                        <div className="mb-3 col-sm-6 password">
                          <input
                            className="form-control"
                            type="text"
                            value={registrationDetail.state}
                            name="state"
                            id="state"
                            placeholder="State"
                            onChange={e => handleRegistrationDetail('state', e.target.value)}
                          />
                        </div>
                        <div className="mb-3 col-sm-6 password">
                          <input
                            className="form-control"
                            type="text"
                            value={registrationDetail.country}
                            name="country"
                            id="country"
                            placeholder="Country"
                            onChange={e => handleRegistrationDetail('country', e.target.value)}
                          />
                        </div>
                        <div className="mb-3 col-sm-6 password">
                          <input
                            className="form-control"
                            type="text"
                            value={registrationDetail.zip}
                            name="zip"
                            id="zip"
                            placeholder="Zip"
                            onChange={e => handleRegistrationDetail('zip', e.target.value)}
                          />
                        </div>
                        <div className="col-sm-12 d-grid mb-3">
                          <button type="button" className="btn btn-secondary btn-flat" onClick={() => handleSignup(registrationDetail)}>
                            Register
                          </button>
                        </div>
                        {/* <div className="col-sm-12 d-grid mb-3">
                                                <button type="submit" className="btn btn-gray btn-flat btn-next-login">Already has an account</button>
                                            </div> */}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!--=================================
            Login-register-form --> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shopSingle" element={<ShopSingle />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Category" element={<Category />} />
      </Routes>

      {/* <!--=================================
      footer--> */}
      <footer className="footer space-pt bg-secondary">
        <div className="container position-relative">
          <div className="row">
            <div className="col-sm-6 col-lg-4 mb-4 mb-lg-0">
              <h4 className="text-white mb-4">Contact Us</h4>
              <ul className="footer-contact list-unstyled">
                <li>
                  <div className="footer-contact-info">
                    <i className="bi bi-pin-map"></i>
                    <p className="mb-0">2101-111 Tarawood lane NE, Calgary, T3J5C2, Alberta, Canada</p>
                  </div>
                </li>
                <li>
                  <div className="footer-contact-info">
                    <i className="bi bi-telephone"></i>
                    <p className="mb-0">+1 (403) 801-6969,+1 (587) 969-7008</p>
                  </div>
                </li>
                <li>
                  <div className="footer-contact-info">
                    <i className="bi bi-envelope"></i>
                    {/* <p className="mb-0">dhknd.inc@gmail.com</p> */}
                    <a className="mb-0" href="mailto:dhknd.inc@gmail.com" target="_blank" style={{ color: '#fff' }}>
                      dhknd.inc@gmail.com
                    </a>
                    {/* target="_blank" href="mailto:beachpark@longbeachny.gov" */}
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 offset-lg-1 col-lg-2 mb-4 mb-lg-0">
              <div className="useful-links">
                <h4 className="text-white mb-4">Quick links</h4>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Testimonials</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-12 offset-lg-1 col-lg-4">
              <div className="footer-newsletter newsletter-style-02">
                <h4 className="text-white mb-4">Newsletter</h4>
                <p className="me-5">Subscribe to our newsletter for daily new and updates.</p>
                <form className="form-inline dark-form mb-4">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter email for newsletter" />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Get Notified
                  </button>
                </form>
                <div className="form-check">
                  <input className="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault" />
                  <label className="form-check-label text-white" htmlFor="flexCheckDefault">
                    I agree to the Privacy Policy.
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright position-relative">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-md-12 col-lg-6 justify-content-lg-startr">
                <p className="mb-0 text-white">
                  <a href="#!" className="text-white">
                    DHKND Management INC
                  </a>{' '}
                  © 2023 CREATED BY{' '}
                  <a href="#!" className="text-white">
                    WebMeHigh Infotech
                  </a>
                </p>
              </div>
              <div className="col-md-12 col-lg-6 justify-content-lg-end justify-content-md-start d-flex mt-lg-0 mt-md-4 mt-3">
                <div className="payment-img">
                  <a href="#">
                    <img className="img-fluid" src={PayIcon} alt="img" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!--=================================
      footer--> */}

      {/* <!--=================================
      Back To Top--> */}
      <div id="back-to-top" className="back-to-top">
        <a href="#">
          <i className="fas fa-angle-up"></i>
        </a>
      </div>
    </React.Fragment>
  );
};

export default RouteComponent;
