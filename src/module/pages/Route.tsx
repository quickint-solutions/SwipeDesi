import React, { lazy, useState, useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PayIcon from '../../images/pay-icon.png';
import { getUserDetail } from '../../helpers/common';
import { useMutation, useQuery } from 'react-query';
import { getCategories } from '../../apiV2/categories';
import { signup } from '../../apiV2/signup';
import ContactUs from './ContactUs';
import { login } from '../../apiV2/login';
import { AuthContext } from '../../context/auth.context';
import Products from './Products';

import PrivacyPolicy from './PrivacyPolicy';

import MyAccount from './MyAccountPage';
import { CartContext } from '../../context/cart.context';
import logo from '../../images/logo1.jpg';
import AboutUs from './AboutUs';
import languageLogo from '../../images/en.png';
import expertLogo from '../../images/topbar-avtar-icon.png';

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
  const storageUserDetail = getUserDetail();
  const [userDetail, setUserDetail] = useState({
    email: '',
    password: '',
  });

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

  const { user } = useContext(AuthContext);
  const { items, getTotal, getTotalCount, removeItem } = useContext(CartContext);

  const { isLoading: categoriesLoading, data: categories } = useQuery('getCategories', getCategories);

  const closeLoginModal = () => {
    setIsShowLoginForm(true);
    setUserDetail({
      email: '',
      password: '',
    });
  };

  const navigateToWishlist = () => {
    if (user) {
      navigate('/wishlist');
    } else {
      alert('Please login to view wishlist');
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
                    <div className="topbar-left mb-2 mb-lg-0">
                      <div className="dropdown right-menu d-inline-flex pe-3 topbar-divider">
                        <a
                          className="dropdown-toggle"
                          href="#"
                          id="dropdownMenuButton2"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <img className="img-fluid" src={languageLogo} alt="" /> English<i className="fas fa-chevron-down fa-xs"></i>
                        </a>
                        <div className="dropdown-menu mt-0" aria-labelledby="dropdownMenuButton2">
                          <a className="dropdown-item" href="#">
                            <img className="img-fluid country-flag" src="images/country-flags/02.jpg" alt="" />
                            English
                          </a>
                          <a
                            className="dropdown-item"
                            href="https://staging-dhknd-ca.translate.goog/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=en-US&_x_tr_pto=wapp"
                          >
                            <img className="img-fluid country-flag" src="images/country-flags/09.jpg" alt="" />
                            Francais
                          </a>
                          <a
                            className="dropdown-item"
                            href="https://staging-dhknd-ca.translate.goog/?_x_tr_sl=auto&_x_tr_tl=pa&_x_tr_hl=en-US&_x_tr_pto=wapp"
                          >
                            <img className="img-fluid country-flag" src="images/country-flags/12.jpg" alt="" />
                            Punjabi
                          </a>
                        </div>
                      </div>
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
                      <div className="topbar-call d-inline-flex topbar-divider pe-3">
                        <a href="tel:+1 (403) 801-6969">
                          <i className="bi bi-telephone me-2"></i>+1 (403) 801-69695
                        </a>
                      </div>
                      <div className="info-box-icon ps-3">
                        <a href="#" className="d-flex align-items-center">
                          <img src={expertLogo} alt="image" />
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
        <div className="header-middel">
          <div className="container position-relative">
            <div className="header-middel-container d-flex">
              <a className="navbar-brand" href="javascript:void(0)" onClick={() => navigate('/')}>
                <img className="img-fluid" style={{ objectFit: 'cover' }} src={logo} height="396px" width="150px" alt="logo" />
              </a>
              <form className="form-inline search-form">
                <div className="form-group z-0">
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
                  {auth.user && (
                    <div className="Compare-action woo-action-icon" onClick={() => navigate('my-account')} style={{ cursor: 'pointer' }}>
                      <a className="compare-icon" title="Compare products">
                        <i className="bi bi-person"></i>
                      </a>
                    </div>
                  )}
                  <div className="wishlist-action woo-action-icon">
                    <a href="javascript:void(0)" className="wishlist-icon" onClick={() => navigateToWishlist()}>
                      <i className="bi bi-heart"></i>
                    </a>
                  </div>
                  <div className="cart dropdown woo-action-icon">
                    {user ? (
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
                          <span className="cart-count">{getTotalCount()}</span>
                        </button>
                        {items.length > 0 ? (
                          <div className="dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <ul className="cart-list ps-0">
                              {items.map((value: any, key: number) => {
                                return (
                                  <li className="d-flex" key={key}>
                                    <a className="remove-item" href="javascript:void(0)" onClick={() => removeItem(value)}>
                                      <i className="fas fa-times"></i>
                                    </a>
                                    <img className="img-fluid me-3" src={value.images[0]} alt="cartImg" />
                                    <div className="cart-info">
                                      <a href="javascript:void(0)">{value.name || 'NO PRODUCT NAME'}</a>
                                      <span className="d-block">
                                        {value.quantity} x {value.price?.toFixed(2)}
                                      </span>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                            <div className="cart-footer">
                              <div className="d-flex mb-3">
                                <b className="me-auto text-dark">Subtotal:</b>
                                <span>${getTotal()?.toFixed(2)}</span>
                              </div>
                              <div className="d-inline-block d-sm-flex">
                                <a className="col btn btn-secondary btn-sm me-2 px-4" href="javascript:void(0)" onClick={() => navigate('/Cart')}>
                                  View Cart
                                </a>
                                <a
                                  className="col btn btn-sm btn-primary ms-0 mt-1 mt-sm-0 ms-sm-2 px-4"
                                  href="javascript:void(0)"
                                  onClick={() => navigate('/checkout')}
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
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
              <i className="fas fa-align-left"></i>
            </button>

            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                {!categoriesLoading && categories && categories?.result?.length > 0
                  ? categories?.result?.map((value: any, key: number) => {
                      if (value.parentCategory) return null;
                      return (
                        <li className="nav-item" onClick={() => navigate(`/products?category=${value._id}`)}>
                          <div className="nav-link nav-link-flex" aria-current="page">
                            <img src={value.icon} style={{ width: 18 }} />
                            <span>{value.name}</span>
                          </div>
                        </li>
                      );
                    })
                  : ''}
              </ul>
            </div>
            <div className="text-end free-shipping">
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
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/home" element={<Home />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/shopSingle" element={<ShopSingle />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/category" element={<Category />} />
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
