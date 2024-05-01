import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

export default function Myaccount() {
  const [orders, setOrders] = useState(true); // Set to true by default
  const [accountDetails, setAccountDetails] = useState(true); // Set to true by default
  const [wishlist, setWishList] = useState(true);

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
                      onClick={() => {}}
                    >
                      Dashboard
                    </button>
                    <button
                      className="text-start nav-link"
                      id="v-pills-orders-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-orders"
                      type="button"
                      role="tab"
                      // aria-controls="v-pills-orders"
                      aria-selected="false"
                      onClick={() => {
                        setOrders(true);
                        setWishList(false);
                        setAccountDetails(false);
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
                        setAccountDetails(true);
                        setWishList(false);
                        setOrders(false);
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
                        setWishList(true);
                        setAccountDetails(false);
                        setOrders(false);
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
                      onClick={() => {}}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8 mt-4 mt-md-5 mt-lg-0">
            <div className="tab-content px-lg-3" id="v-pills-tabContent">
              <div className="tab-pane fade show active" id="v-pills-dashboard" role="tabpanel" aria-labelledby="v-pills-dashboard-tab">
                <p>
                  Hello <strong>dhknd.inc</strong> (not <strong>dhknd.inc</strong>? <a href="#">Log out</a>)
                </p>
                <p>
                  From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and
                  account details.
                </p>
                <div className="row">
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="feature-box">
                      <a href="#">
                        <i className="bi bi-card-checklist"></i>
                        <h6 className="mb-0 feature-title">Orders</h6>
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="feature-box">
                      <a href="#">
                        <i className="bi bi-card-checklist"></i>
                        <h6 className="mb-0 feature-title">Account Details</h6>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="feature-box">
                      <a href="#">
                        <i className="bi bi-card-checklist"></i>
                        <h6 className="mb-0 feature-title">Wishlist</h6>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="feature-box">
                      <a href="#">
                        <i className="bi bi-card-checklist"></i>
                        <h6 className="mb-0 feature-title">Logout</h6>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* orders */}
              <div className="tab-pane fade" id="v-pills-orders" role="tabpanel" aria-labelledby="v-pills-orders-tab">
                {orders === true ? (
                  <div className="cart-table">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="product-orders">Orders</th>
                            <th className="product-date">Date</th>
                            <th className="product-status">Status</th>
                            <th className="product-total">Total</th>
                            <th className="product-actions">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="product-orders">
                              <a href="#">#11331</a>
                            </td>
                            <td className="product-date">October 3, 2021</td>
                            <td className="product-status text-success">Completed</td>
                            <td className="product-total">
                              <span className="text-primary">$5.25</span> for 1 item
                            </td>
                            <td className="product-actions d-flex align-items-center">
                              <a className="btn btn-sm btn-primary me-3" href="#">
                                View
                              </a>
                              <a className="btn btn-sm btn-gray" href="#">
                                Download Invoice
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="product-orders">
                              <a href="#">#11332</a>
                            </td>
                            <td className="product-date">October 3, 2021</td>
                            <td className="product-status text-warning">Processing</td>
                            <td className="product-total">
                              <span className="text-primary">$5.25</span> for 1 item
                            </td>
                            <td className="product-actions d-flex align-items-center">
                              <a className="btn btn-sm btn-primary me-3" href="#">
                                View
                              </a>
                              <a className="btn btn-sm btn-gray" href="#">
                                Cancel
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}

                {/* acccount details */}
                {accountDetails === true ? (
                  <div className="tab-pane fade" id="v-pills-account-details" role="tabpanel" aria-labelledby="v-pills-account-details-tab">
                    <form className="account-details-form">
                      <div className="row align-items-center">
                        <div className="mb-3 col-md-6">
                          <input type="text" className="form-control" id="firstName" placeholder="First Name" required />
                        </div>
                        <div className="mb-3 col-md-6">
                          <input type="text" className="form-control" id="lastName" placeholder="Last Name" required />
                        </div>
                        <div className="mb-3 col-12">
                          <input type="text" className="form-control" id="displayName" placeholder="Display Name" required />
                          <span>This will be how your name will be displayed in the account section and in reviews</span>
                        </div>
                        <div className="mb-3 col-12">
                          <input type="email" className="form-control" id="emailId" placeholder="Email Address" required />
                        </div>
                      </div>
                      <div className="mb-3 col-md-12">
                        <input type="password" className="form-control" id="confirmNewPass" placeholder="Confirm new password" required />
                      </div>
                      <div className="d-flex mt-4">
                        <a href="" className="btn btn-primary d-inline">
                          Save Changes
                        </a>
                      </div>
                    </form>
                  </div>
                ) : null}

                {/* whish list item */}
                {wishlist === true ? (
                  <div className="tab-pane fade" id="v-pills-wishlist" role="tabpanel" aria-labelledby="v-pills-wishlist-tab">
                    <div className="row">
                      <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="product">
                          <div className="product-label">
                            <span className="onsale">17%</span>
                          </div>
                          <div className="product-image">
                            <div className="product-thumb-inner">
                              <a href="#"></a>
                            </div>
                            <div className="custom-icon">
                              <ul className="list-unstyled">
                                <li>
                                  <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to cart">
                                    <i className="fas fa-shopping-cart"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare">
                                    <i className="fa-solid fa-code-compare"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Remove">
                                    <i className="bi bi-trash"></i>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="product-content">
                            <div className="product-info">
                              <div className="product-title">
                                <h3>
                                  <a href="shop-single.html">Hand Carving Sevan Wood Temple</a>
                                </h3>
                              </div>
                              <div className="product-star">
                                <ul className="list-unstyled mb-1">
                                  <li>
                                    <i className="fas fa-star"></i>
                                  </li>
                                  <li>
                                    <i className="fas fa-star"></i>
                                  </li>
                                  <li>
                                    <i className="fas fa-star"></i>
                                  </li>
                                  <li>
                                    <i className="fas fa-star"></i>
                                  </li>
                                  <li>
                                    <i className="far fa-star-half-alt"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="product-prize">
                              <p>
                                <span className="me-2">$81,000.00</span>$95,000.00
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="product">
                          <div className="product-label">
                            <span className="onsale">17%</span>
                          </div>
                          <div className="product-image">
                            <div className="product-thumb-inner">
                              <a href="#"></a>
                            </div>
                            <div className="custom-icon">
                              <ul className="list-unstyled">
                                <li>
                                  <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to cart">
                                    <i className="fas fa-shopping-cart"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare">
                                    <i className="fa-solid fa-code-compare"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Remove">
                                    <i className="bi bi-trash"></i>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-info">
                              <div className="product-title">
                                <h3>
                                  <a href="shop-single.html">Hand Carving Sevan Wood Temple</a>
                                </h3>
                              </div>
                              <div className="product-star">
                                <ul className="list-unstyled mb-1">
                                  <li>
                                    <i className="fas fa-star"></i>
                                  </li>
                                  <li>
                                    <i className="fas fa-star"></i>
                                  </li>
                                  <li>
                                    <i className="fas fa-star"></i>
                                  </li>
                                  <li>
                                    <i className="fas fa-star"></i>
                                  </li>
                                  <li>
                                    <i className="far fa-star-half-alt"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="product-prize">
                              <p>
                                <span className="me-2">$81,000.00</span>$95,000.00
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="tab-pane fade" id="v-pills-logout" role="tabpanel" aria-labelledby="v-pills-logout-tab">
                  {/* Insert Logout content here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
