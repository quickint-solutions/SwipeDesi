import React, { useContext, useEffect, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../../context/auth.context';
import { useMutation, useQuery } from 'react-query';
import { getOrderAPI } from '../../../apiV2/orders';
import { updateUserAPI } from '../../../apiV2/user';

export default function Myaccount() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const { data: orders } = useQuery('getOrders', getOrderAPI);
  const { user, logout } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const orderRender = searchParams.get('ORDER');
    if (orderRender) {
      setActiveTab('ORDERS');
    }
  }, []);

  const [userDetails, setUserDetails] = useState({
    firstName: user?.name?.first,
    lastName: user?.name?.last,
    email: user?.name?.email,
    line1: user?.address?.line1,
    line2: user?.address?.line2,
    city: user?.address?.city,
    country: user?.address?.country,
    zip: user?.address?.zip,
    state: user?.address?.state,
    password: user?.address?.password,
    mobile: user?.phone?.number,
    countryCode: user?.phone?.countryCode,
    profileImage: user?.profileImage,
    userId: user?._id,
  });

  const { mutate: updateUser } = useMutation(updateUserAPI, {
    onSuccess: data => {
      alert('User details updated successfully');
    },
    onError: error => {
      alert('Error updating user details');
    },
  });

  return (
    <section className="space-ptb">
      <div className="container">
        <div className="row d-flex align-items-start">
          <div className="col-xl-3 col-lg-4">
            <div className="sidebar">
              <div className="widget">
                <div className="widget-title">
                  <h5 className="title">My Account</h5>
                </div>
                <div className="widget-content">
                  <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button
                      className="text-start nav-link active"
                      id="v-pills-dashboard-tab"
                      data-bs-toggle="pill"
                      // data-bs-target="#v-pills-dashboard"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-dashboard"
                      aria-selected="true"
                      onClick={() => {
                        setActiveTab('DASHBOARD');
                      }}
                    >
                      Dashboard
                    </button>
                    <button
                      className="text-start nav-link"
                      type="button"
                      role="tab"
                      // aria-controls="v-pills-orders"
                      aria-selected="false"
                      onClick={() => {
                        setActiveTab('ORDERS');
                      }}
                    >
                      Orders
                    </button>

                    <button
                      className="text-start nav-link"
                      id="v-pills-account-details-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-account-details"
                      type="button"
                      role="tab"
                      aria-selected="false"
                      onClick={() => {
                        setActiveTab('ACCOUNT_DETAILS');
                      }}
                    >
                      Account Details
                    </button>

                    <button
                      className="text-start nav-link"
                      id="v-pills-wishlist-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-wishlist"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-wishlist"
                      aria-selected="false"
                      onClick={() => {
                        navigate('/wishlist');
                      }}
                    >
                      Wishlist
                    </button>
                    <button
                      className="text-start nav-link"
                      id="v-pills-logout-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-logout"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-logout"
                      aria-selected="false"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8 mt-4 mt-md-5 mt-lg-0">
            {activeTab === 'DASHBOARD' ? (
              <div>
                <p>
                  Hello{' '}
                  <strong>
                    {user?.name?.first} {user?.name?.last}{' '}
                  </strong>{' '}
                  (not{' '}
                  <strong>
                    {user?.name?.first} {user?.name?.last}{' '}
                  </strong>
                  ?{' '}
                  <a
                    onClick={() => {
                      logout();
                    }}
                  >
                    Log out
                  </a>
                  )
                </p>
                <p>
                  From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and
                  account details.
                </p>
                <div className="row">
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="feature-box">
                      <a onClick={() => setActiveTab('ORDERS')}>
                        <i className="bi bi-card-checklist"></i>
                        <h6 className="mb-0 feature-title">Orders</h6>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="feature-box">
                      <a onClick={() => setActiveTab('ACCOUNT_DETAILS')}>
                        <i className="bi bi-card-checklist"></i>
                        <h6 className="mb-0 feature-title">Account Details</h6>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="feature-box" style={{ cursor: 'pointer' }}>
                      <a onClick={() => navigate('/wishlist')}>
                        <i className="bi bi-card-checklist"></i>
                        <h6 className="mb-0 feature-title">Wishlist</h6>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="feature-box">
                      <a onClick={() => logout()}>
                        <i className="bi bi-card-checklist"></i>
                        <h6 className="mb-0 feature-title">Logout</h6>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === 'ORDERS' ? (
              <div className="cart-table" id="ORDERS_VIEW">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="product-orders">Orders</th>
                        <th className="product-date">Date</th>
                        <th className="product-status">Status</th>
                        <th className="product-total">Total</th>
                        {/* <th className="product-actions">Actions</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.result?.reverse()?.map((order: any) => {
                        return (
                          <tr>
                            <td className="product-orders">
                              <button style={{ background: 'none', border: 'none' }} onClick={() => navigate(`/orderDetails?orderId=${order._id}`)}>
                                {order.orderId}
                              </button>
                            </td>
                            <td className="product-date">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="product-status text-success">Completed</td>
                            <td className="product-total">
                              <span className="text-primary">${order.subTotal}</span>
                            </td>
                            {/* <td className="product-actions d-flex align-items-center">
                              <a className="btn btn-sm btn-primary me-3" href="#">
                                View
                              </a>
                              <a className="btn btn-sm btn-gray" href="#">
                                Download Invoice
                              </a>
                            </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

            {activeTab === 'ACCOUNT_DETAILS' ? (
              <form className="account-details-form">
                <div className="row align-items-center">
                  <div className="mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="First Name"
                      required
                      value={userDetails?.firstName}
                      onChange={e => {
                        setUserDetails({ ...userDetails, firstName: e.target.value });
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Last Name"
                      required
                      value={userDetails?.lastName}
                      onChange={e => {
                        setUserDetails({ ...userDetails, lastName: e.target.value });
                      }}
                    />
                  </div>
                  <div className="mb-3 col-12">
                    <span>This will be how your name will be displayed in the account section and in reviews</span>
                  </div>
                  <div className="mb-3 col-12">
                    <input
                      type="email"
                      className="form-control"
                      id="emailId"
                      placeholder="Email Address"
                      required
                      value={userDetails?.email}
                      onChange={e => {
                        setUserDetails({ ...userDetails, email: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3 col-md-12">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmNewPass"
                    placeholder="Confirm new password"
                    required
                    value={userDetails?.password}
                    onChange={e => {
                      setUserDetails({ ...userDetails, password: e.target.value });
                    }}
                  />
                </div>
                <div className="row align-items-center">
                  <div className="mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="line1"
                      placeholder="Address Line 1"
                      required
                      value={userDetails?.line1}
                      onChange={e => {
                        setUserDetails({ ...userDetails, line1: e.target.value });
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="line2"
                      placeholder="Address Line 2"
                      required
                      value={userDetails?.line2}
                      onChange={e => {
                        setUserDetails({ ...userDetails, line2: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="City"
                      required
                      value={userDetails?.city}
                      onChange={e => {
                        setUserDetails({ ...userDetails, city: e.target.value });
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      placeholder="Country"
                      required
                      value={userDetails?.country}
                      onChange={e => {
                        setUserDetails({ ...userDetails, country: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      placeholder="Zip"
                      required
                      value={userDetails?.zip}
                      onChange={e => {
                        const inputMobile = e.target.value;
                        const onlyNumbers = inputMobile.replace(/\D/g, ''); // Replace any non-digit character (\D) with an empty string
                        setUserDetails({ ...userDetails, zip: onlyNumbers });
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="State"
                      required
                      value={userDetails?.state}
                      onChange={e => {
                        setUserDetails({ ...userDetails, state: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      placeholder="Mobile Number"
                      required
                      value={userDetails?.mobile}
                      onChange={e => {
                        const inputMobile = e.target.value;
                        const onlyNumbers = inputMobile.replace(/\D/g, ''); // Replace any non-digit character (\D) with an empty string
                        setUserDetails({ ...userDetails, mobile: onlyNumbers });
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="countryCode"
                      placeholder="Country Code"
                      required
                      value={userDetails?.countryCode}
                      onChange={e => {
                        setUserDetails({ ...userDetails, countryCode: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex mt-4">
                  <a onClick={() => updateUser(userDetails)} className="btn btn-primary d-inline">
                    Save Changes
                  </a>
                </div>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
