import React, { lazy, useState, useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PayIcon from '../../images/pay-icon.png';
import { getUserDetail } from '../../helpers/common';
import { useMutation, useQuery } from 'react-query';
import { getCategories } from '../../apiV2/categories';
import { signup } from '../../apiV2/signup';
import ContactUs from './ContactUs';
import FAQ from './FAQ';
import BlogSingle from './BlogSingle';
import Blogs from './Blogs/id';
import { login } from '../../apiV2/login';
import Testimonials from './Testimonials';
import { AuthContext } from '../../context/auth.context';
import Products from './Products';
import PrivacyPolicy from './PrivacyPolicy';
import TermsCondition from './TermsCondition';
import MyAccount from './MyAccountPage';
import { CartContext } from '../../context/cart.context';
import logo from '../../images/logo1.jpg';
import AboutUs from './AboutUs';
import languageLogo from '../../images/canada.png';
import expertLogo from '../../images/topbar-avtar-icon.png';
import homeIcon from '../../images/home.png';
import { getWishList } from '../../apiV2/wishlist';
import { sendLead } from '../../apiV2/leads';
import Order from './Order/Order';
import { forgotPasswordAPI } from '../../apiV2/forgotpassword';
import { resetPasswordAPI } from '../../apiV2/resetPassword';

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

  const [phoneNumber, setPhoneNumber] = useState('');

  const [isShowLoginForm, setIsShowLoginForm] = useState(true);

  const [isForgotPassword, setIsForgotPassword] = useState(true);
  const [forgotPasswordScreen1, setForgotPasswordScreen1] = useState(true);
  const [forgotPaswordDetails, setForgotPaswordDetails] = useState({
    email: '',
  });
  const [resetPaswordDetails, setResetPaswordDetails] = useState({
    otp: '',
    password1: '',
    password2: '',
  });

  const [registrationDetail, setRegistrationDetail] = useState({
    first: '',
    last: '',
    countryCode: '+1',
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

  const { user, search, setSearch, setCategories } = useContext(AuthContext);
  const { items, getTotal, getTotalCount, removeItem } = useContext(CartContext);

  const { data: wishlistData } = useQuery('getWishlist', getWishList);

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
  const handleResetPasswordDetail = (key: string, value: any) => {
    setResetPaswordDetails((values: any) => ({
      ...values,
      [key]: value,
    }));
  };
  const handleForgotPasswordDetail = (key: string, value: any) => {
    setForgotPaswordDetails((values: any) => ({
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

  const { mutate: handleSignup, isLoading } = useMutation(signup, {
    onSuccess: data => {
      (window as any).$('#formLoginRegister').modal('hide');
      alert('User registered successfully, Please Login now!');
    },
    onError: (error: any) => {
      alert(error.response.data.message);
    },
  });

  const { mutate: handleForgotPassword } = useMutation(forgotPasswordAPI, {
    onSuccess: data => {
      alert('Reset password link has been sent to your email');
    },
    onError: error => {
      console.log('error -> ', error);
    },
  });

  const { mutate: handleResetPassword } = useMutation(resetPasswordAPI, {
    onSuccess: data => {
      (window as any).$('#forgotPasswordModal').modal('hide');
      alert('Password reset successfully please login now!');
      (window as any).$('#formLoginRegister').modal('show');
    },
    onError: error => {
      console.log('error -> ', error);
    },
  });
  const [isVisible, setIsVisible] = useState(false);
  // Show or hide the button based on scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <React.Fragment>
      {/* <!--=================================
            header -->    */}
      <div className="header header-sticky default">
        <div className="topbar">
          <div className="container">
            <div className="topbar-inner">
              <div className="row">
                <div className="col-12">
                  <div className="d-flex align-items-center text-center">
                    <div className="topbar-left justify-content-center">
                      <div className="dropdown right-menu d-inline-flex pe-3 topbar-divider">
                        <a className="dropdown-toggle" href="#" id="dropdownMenuButton2" aria-haspopup="true" aria-expanded="false">
                          <img className="img-fluid" src={languageLogo} alt="" /> English<i className="fas fa-chevron-down fa-xs"></i>
                        </a>
                        <div className="dropdown-menu mt-0" aria-labelledby="dropdownMenuButton2">
                          <a className="dropdown-item" href="https://www.dhknd.ca/">
                            <img className="img-fluid country-flag" src="images/country-flags/02.jpg" alt="" />
                            English
                          </a>
                          <a
                            className="dropdown-item"
                            href="https://www-dhknd-ca.translate.goog/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=en-US&_x_tr_pto=wapp"
                          >
                            <img className="img-fluid country-flag" src="images/country-flags/09.jpg" alt="" />
                            Francais
                          </a>
                          <a
                            className="dropdown-item"
                            href="https://www-dhknd-ca.translate.goog/?_x_tr_sl=auto&_x_tr_tl=pa&_x_tr_hl=en-US&_x_tr_pto=wapp"
                          >
                            <img className="img-fluid country-flag" src="images/country-flags/12.jpg" alt="" />
                            Punjabi
                          </a>
                        </div>
                      </div>
                      <div className="d-none d-sm-block">
                        <ul className="list-unstyled ps-2">
                          {/* <li>
                            <a href="#">Gift cards</a>
                          </li> */}
                          <li>
                            <a href="/contact-us">Showrooms</a>
                          </li>
                          <li>
                            <a href="home/about-us">About Us</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="topbar-right ms-auto justify-content-center align-items-center">
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li>
                          <a href="https://www.instagram.com/dhknd.ca/" target="_blank">
                            <i className="fa-brands fa-square-instagram" style={{ fontSize: '20px' }}></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://ca.linkedin.com/company/dhknd-management" target="_blank">
                            <i className="fa-brands fa-linkedin" style={{ fontSize: '20px' }}></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com/dhknd.ca/" target="_blank">
                            <i className="fa-brands fa-square-facebook" style={{ fontSize: '20px' }}></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.twitter.com/dhknd.ca/" target="_blank">
                            <i className="fa-brands fa-square-x-twitter" style={{ fontSize: '20px' }}></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.youtube.com/@dhkndcanada1799" target="_blank">
                            <i className="fa-brands fa-square-youtube" style={{ fontSize: '20px' }}></i>
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="topbar-right ms-auto justify-content-center align-items-center">
                      <div className="topbar-call d-inline-flex topbar-divider pe-lg-3">
                        <a href="tel:+1 (587) 969-7008">
                          <i className="bi bi-telephone me-2"></i>+1 (587) 969-7008
                        </a>
                      </div>
                      <div className="info-box-icon ps-3 d-none d-lg-flex" style={{ cursor: 'pointer' }}>
                        <a
                          onClick={() =>
                            window.open(`https://api.whatsapp.com/send?phone=15879697008&text=Hello%20How%20Can%20I%20Help%20You%3F`, '_blank')
                          }
                          className="d-flex align-items-center"
                        >
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
                <img className="img-fluid" style={{ objectFit: 'cover' }} src={logo} height="396px" width="200px" alt="logo" />
              </a>
              <form
                className="form-inline search-form d-none d-lg-block"
                onSubmit={e => {
                  e.preventDefault();
                  navigate(`/products?search=${search}`);
                }}
              >
                <div className="form-group mb-0 z-0">
                  <button className="search-button" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                  <input
                    value={search}
                    type="text"
                    className="form-control"
                    placeholder="Search for products"
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </form>

              <div className="header-middel-right d-flex">
                <div className="add-listing">
                  <div className="account-action">
                    {auth.user ? (
                      <a href="javascript:void(0)" className="account-icon" onClick={() => auth.logout()}>
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Log Out</span>
                      </a>
                    ) : (
                      <a href="javascript:void(0)" className="account-icon" data-bs-toggle="modal" data-bs-target="#formLoginRegister">
                        <i className="bi bi-person"></i>
                        <span>Login</span>
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
                    <div className="cart dropdown woo-action-icon">
                      {wishlistData ? (
                        <a href="javascript:void(0)" className="wishlist-icon" onClick={() => navigateToWishlist()}>
                          <i className="bi bi-heart"></i>
                          <span className="cart-count">{wishlistData?.count}</span>
                        </a>
                      ) : (
                        <a href="javascript:void(0)" className="wishlist-icon" onClick={() => navigateToWishlist()}>
                          <i className="bi bi-heart"></i>
                        </a>
                      )}
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
                            <div className="dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                              <div className="cart-footer">
                                <div className="d-flex mb-3">
                                  <b className="me-auto text-dark">No items in cart</b>
                                </div>
                                <div className="d-inline-block d-sm-flex">
                                  <a
                                    className="col btn btn-secondary btn-sm me-2 px-4"
                                    href="javascript:void(0)"
                                    onClick={() => navigate('/products')}
                                  >
                                    Check products
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <button className="dropdown-toggle p-0" type="button" id="dropdownMenuButton" onClick={() => openLoginPopup()}>
                          <i className="bi bi-cart3"></i>
                          <span className="cart-count">{getTotalCount()}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
                  <i className="fas fa-align-left"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-static-top navbar-expand-lg">
          <div className="container main-header position-relative">
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li className="nav-item" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                  <div
                    className="nav-link nav-link-flex"
                    aria-current="page"
                    style={{ display: 'block', alignItems: 'center', placeContent: 'center' }}
                  >
                    <img src={homeIcon} style={{ width: '16px', marginRight: '2px' }} />
                    <span style={{ fontWeight: '600', fontSize: '15px', marginLeft: '2px' }}>Home</span>
                  </div>
                </li>
                {!categoriesLoading && categories && categories?.result?.length > 0
                  ? categories?.result?.map((value: any, key: number) => {
                      if (value.parentCategory) return null;
                      return (
                        <li
                          className="nav-item"
                          onClick={() => {
                            setCategories(value._id);
                            navigate(`/products?category=${value._id}`);
                          }}
                          style={{ cursor: 'pointer' }} // Add cursor style here
                          data-bs-toggle="collapse"
                          data-bs-target=".navbar-collapse"
                        >
                          <div className="nav-link nav-link-flex" aria-current="page">
                            <img src={value.icon} style={{ width: 18, marginRight: '2px' }} />
                            <span style={{ fontWeight: '600', fontSize: '15px' }}>{value.name}</span>
                          </div>
                        </li>
                      );
                    })
                  : ''}
              </ul>
            </div>
            <div className="text-end free-shipping d-none d-lg-block">
              <a href="#">Transforming Houses into Homes</a>
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
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" onClick={() => closeLoginModal()} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="box-content">
                <div className={isShowLoginForm ? 'form-login active' : 'form-login'}>
                  <form className="login">
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
                      <div className="mb-3 col-sm-12 rememberme-lost d-sm-flex justify-content-between">
                        <div className="rememberme">
                          <input name="rememberme" type="checkbox" id="rememberme" value="forever" />
                          <label htmlFor="rememberme" className="inline ps-1">
                            Remember me
                          </label>
                        </div>
                        <div className="lost_password">
                          <a
                            onClick={() => {
                              setIsForgotPassword(true);
                              (window as any).$('#formLoginRegister').modal('hide');
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#forgotPasswordModal"
                          >
                            Lost your password?
                          </a>
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
                  <form className="register">
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
                        {/* <div className="mb-3 col-sm-3 email">
                          <input
                            type="text"
                            className="form-control"
                            value={registrationDetail.countryCode}
                            name="countryCode"
                            id="countryCode"
                            placeholder="Country Code"
                            onChange={e => handleRegistrationDetail('countryCode', e.target.value)}
                          />
                        </div> */}
                        <div className="mb-3 col-sm-12 email">
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
                          <div style={{ display: 'flex', gap: '90px' }} className="col-sm-12 d-grid mb-3">
                            <button
                              disabled={isLoading}
                              type="button"
                              className="btn btn-secondary btn-flat"
                              onClick={() => {
                                // check all fields are filled
                                if (
                                  !registrationDetail.first ||
                                  !registrationDetail.last ||
                                  !registrationDetail.number ||
                                  !registrationDetail.email ||
                                  !registrationDetail.password
                                ) {
                                  alert('Please fill all fields');
                                  return;
                                }
                                handleSignup(registrationDetail);
                              }}
                            >
                              {isLoading ? 'Loading' : 'Register'}
                            </button>
                          </div>
                          {/* <button type="button" className="btn btn-secondary btn-flat" onClick={() => setIsShowRegisterFirstScreen(true)}>
                            Back
                          </button> */}
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
                        <div style={{ display: 'flex', gap: '90px' }} className="col-sm-12 d-grid mb-3">
                          <button
                            type="button"
                            className="btn btn-secondary btn-flat"
                            onClick={() => {
                              if (
                                !registrationDetail.first ||
                                !registrationDetail.last ||
                                !registrationDetail.number ||
                                !registrationDetail.email ||
                                !registrationDetail.password
                              ) {
                                alert('Please fill all fields');
                                return;
                              }
                              handleSignup(registrationDetail);
                            }}
                          >
                            Register
                          </button>
                        </div>
                        <div className="col-sm-12 d-grid mb-3 text-center">
                          {/* <button type="button" className="btn btn-secondary btn-flat" onClick={() => setIsShowRegisterFirstScreen(true)}>
                            Back
                          </button> */}
                          <a href="#" className="back-to-login" onClick={() => setIsShowRegisterFirstScreen(true)}>
                            <i className="bi bi-arrow-left me-2"></i>Back
                          </a>
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

      <div className="login-register-modal">
        <div className="modal" id="forgotPasswordModal">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="box-content">
                  <div className="form-forgot-password">
                    <form className="forgot-password">
                      {forgotPasswordScreen1 ? (
                        <>
                          <div className="row content">
                            <h4 className="form-title mb-2">Forgot Password</h4>
                            <p className="mb-4 pb-1">
                              Please enter your username or email address. You will receive a link to create a new password via email.
                            </p>
                            <div className="row content">
                              <div className="mb-3 col-sm-12 email">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={forgotPaswordDetails.email}
                                  name="forgotPaswordEmail"
                                  id="forgotPaswordEmail"
                                  placeholder="Enter your email"
                                  onChange={e => handleForgotPasswordDetail('email', e.target.value)}
                                />
                              </div>

                              <div className="col-sm-12 d-grid mb-3">
                                <button
                                  type="submit"
                                  className="btn btn-primary btn-flat"
                                  onClick={() => {
                                    setForgotPasswordScreen1(false);
                                    handleForgotPassword(forgotPaswordDetails);
                                  }}
                                >
                                  Next
                                </button>
                              </div>
                              <div className="col-sm-12 d-grid mb-3 text-center">
                                <a href="#" className="back-to-login">
                                  <i className="bi bi-arrow-left me-2"></i>Back to Login
                                </a>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="row content">
                          <h4 className="form-title mb-2">Reset Password</h4>
                          <p className="mb-4 pb-1">Please enter your OTP and create a new password.</p>
                          <div className="row content">
                            <div className="mb-3 col-sm-12 email">
                              <input
                                type="text"
                                className="form-control"
                                value={resetPaswordDetails.otp}
                                name="forgotPaswordOtp"
                                id="forgotPaswordOtp"
                                placeholder="Enter your Otp"
                                onChange={e => handleResetPasswordDetail('otp', e.target.value)}
                              />
                            </div>
                            <div className="mb-3 col-sm-12 email">
                              <input
                                type="password"
                                className="form-control"
                                value={resetPaswordDetails.password1}
                                name="forgotPaswordOtp"
                                id="forgotPaswordOtp"
                                placeholder="Create New Password"
                                onChange={e => handleResetPasswordDetail('password1', e.target.value)}
                              />
                            </div>
                            <div className="mb-3 col-sm-12 email">
                              <input
                                type="password"
                                className="form-control"
                                value={resetPaswordDetails.password2}
                                name="forgotPaswordOtp"
                                id="forgotPaswordOtp"
                                placeholder="Confirm New Password"
                                onChange={e => handleResetPasswordDetail('password2', e.target.value)}
                              />
                            </div>
                            <div className="col-sm-12 d-grid mb-3">
                              <button type="button" className="btn btn-primary btn-flat" onClick={() => handleResetPassword(resetPaswordDetails)}>
                                Reset Password
                              </button>
                            </div>
                            <div className="col-sm-12 d-grid mb-3 text-center">
                              <a className="back-to-login" onClick={() => setForgotPasswordScreen1(true)} style={{ cursor: 'pointer' }}>
                                <i className="bi bi-arrow-left me-2"></i>Back to Reset Password
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/home" element={<Home />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/terms-and-conditions" element={<TermsCondition />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog-single" element={<BlogSingle />} />
        <Route path="/shopSingle" element={<ShopSingle />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderDetails" element={<Order />} />
        <Route path="home/about-us" element={<AboutUs />} />
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
                    <p className="mb-0">260300 Writing Creek Cres, Balzac, AB T4A 0X8 CANADA</p>
                  </div>
                </li>
                <li>
                  <div className="footer-contact-info">
                    <i className="bi bi-telephone"></i>
                    <a href="tel:+15879697008">
                      <p className="mb-0">+1 (587) 969-7008</p>
                    </a>
                  </div>
                </li>
                <li>
                  <div className="footer-contact-info">
                    <i className="bi bi-telephone-plus"></i>
                    <a href="tel:+14038016969">
                      <p className="mb-0">+1 (403) 801-6969</p>
                    </a>
                  </div>
                </li>
                <li>
                  <div className="footer-contact-info">
                    <i className="bi bi-envelope"></i>
                    {/* <p className="mb-0">dhknd.inc@gmail.com</p> */}
                    <a className="mb-0" href="mailto:dhknd.inc@gmail.com" target="_blank" style={{ color: '#fff' }}>
                      dhknd.inc@gmail.com
                      <br></br>
                      <a className="mb-0" href="mailto:dhknd.customerservices@gmail.com" target="_blank" style={{ color: '#fff' }}>
                        dhknd.customerservices@gmail.com
                      </a>
                    </a>

                    {/* target="_blank" href="mailto:beachpark@longbeachny.gov" */}
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 offset-lg-1 col-lg-2 mb-4 mb-lg-0">
              <div className="useful-links">
                <h4 className="text-white mb-4">Let's help you</h4>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="/privacy-policy">Shipping rates & policies</a>
                  </li>
                  <li>
                    <a href="/terms-and-conditions">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="/contact-us">Contact us</a>
                  </li>
                  <li>
                    <a href="/testimonials">Testimonials</a>
                  </li>
                  <li>
                    <a href="/faqs">FAQs</a>
                  </li>
                  <li>
                    <a href="/blogs">Blogs</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-12 offset-lg-1 col-lg-4">
              <div className="footer-newsletter newsletter-style-02">
                <h4 className="text-white mb-4">Get Callback</h4>

                <div className="form-group">
                  <input
                    type="text"
                    value={phoneNumber}
                    className="form-control"
                    placeholder="Enter your phone number"
                    onChange={e => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                </div>
                <button
                  onClick={async () => {
                    setPhoneNumber('');
                    alert('We will call you back soon');
                    await sendLead({ phone: phoneNumber, message: 'Call back request', email: 'CALL BACK', name: 'CALL BACK' });
                  }}
                  className="btn btn-primary"
                >
                  Book call
                </button>

                {/* <div className="form-check">
                  <input className="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault" />
                  <label className="form-check-label text-white" htmlFor="flexCheckDefault">
                    I agree to the Privacy Policy.
                  </label>
                </div> */}
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
                  <a href="https://www.webmehigh.com/" target="_blank" className="text-white">
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

      <div id="back-to-top" className={`back-to-top ${isVisible ? 'show' : ''}`} onClick={scrollToTop}>
        <a>
          <i className="fas fa-angle-up"></i>
        </a>
      </div>
    </React.Fragment>
  );
};

export default RouteComponent;
