import React from 'react';

export default function Products() {
  return (
    <div>
      <section className="header-inner header-inner-menu bg-overlay-secondary" style={{ backgroundImage: "url('images/bg/mandir-banner.jpg')" }}>
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
                      <li className="breadcrumb-item active">Mandir</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>Mandir</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-inner-shape" style={{ backgroundImage: "url('images/bg/02.png')" }}></div>
      </section>

      <section className="space-ptb">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <div className="sidebar">
                <div className="widget">
                  <div className="widget-title">
                    <h5 className="title">Search</h5>
                  </div>
                  <div className="widget-content">
                    <div className="search">
                      <i className="fas fa-search"></i>
                      <input type="text" className="form-control" placeholder="Search" />
                    </div>
                  </div>
                </div>
                <div className="widget">
                  <div className="widget-title">
                    <h5 className="title">Categories</h5>
                  </div>
                  <div className="widget-content">
                    <div className="widget-categories">
                      <ul className="list-unstyled list-style list-style-underline mb-0">
                        <li>
                          <a className="d-flex" href="#">
                            Armchairs{' '}
                            <span className="ms-auto">
                              <div className="count">8</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            Dining Chair{' '}
                            <span className="ms-auto">
                              <div className="count">5</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            Dining Table{' '}
                            <span className="ms-auto">
                              <div className="count">14</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            Lighting{' '}
                            <span className="ms-auto">
                              <div className="count">13</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            Living Room
                            <span className="ms-auto">
                              <div className="count">10</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            Office{' '}
                            <span className="ms-auto">
                              <div className="count">7</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            Sofas{' '}
                            <span className="ms-auto">
                              <div className="count">9</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            Table{' '}
                            <span className="ms-auto">
                              <div className="count">4</div>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="widget">
                  <div className="widget-title">
                    <h5 className="title">Filter by price</h5>
                  </div>
                  <div className="widget-content">
                    <div className="mb-3">
                      <div className="collapse show" id="price">
                        <div className="property-price-slider">
                          <input type="text" id="property-price-slider" name="example_name" value="" />
                        </div>
                      </div>
                    </div>
                    <div className="price-filter">
                      <div className="price_label">
                        Price: <span className="from">$10 — $382</span>
                      </div>
                      <a className="" href="#">
                        <i className="fas fa-filter"></i>Filter
                      </a>
                    </div>
                  </div>
                </div>
                <div className="widget">
                  <div className="widget-title">
                    <h5 className="title">Color</h5>
                  </div>
                  <div className="widget-content">
                    <div className="widget-color">
                      <ul className="list-unstyled list-style list-style-underline mb-0">
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#dad810' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            Yellow
                            <span className="ms-auto">
                              <div className="count">8</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#10da21' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            Green
                            <span className="ms-auto">
                              <div className="count">16</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#1072da' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            Blue
                            <span className="ms-auto">
                              <div className="count">12</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#da10a4' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            Pink
                            <span className="ms-auto">
                              <div className="count">8</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#da1021' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            Red
                            <span className="ms-auto">
                              <div className="count">18</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#9b6c07' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            Brown
                            <span className="ms-auto">
                              <div className="count">20</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#9f9f9f' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            Grey
                            <span className="ms-auto">
                              <div className="count">12</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#e2e39d' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            nude
                            <span className="ms-auto">
                              <div className="count">9</div>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="widget">
                  <div className="widget-title">
                    <h5 className="title">Featured Product</h5>
                  </div>
                  <div className="widget-content">
                    <div className="widget-product">
                      <div className="product d-flex align-items-center mb-3">
                        <div className="product-image">
                          <div className="product-thumb-inner">
                            <a href="#">
                              <img className="img-fluid" src="images/product/02.jpg" alt="image" />
                            </a>
                          </div>
                        </div>
                        <div className="product-content py-0">
                          <div className="product-info">
                            <div className="product-title">
                              <h3>
                                <a href="shop-single.html">Dining Chair</a>
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
                      <div className="product d-flex align-items-center mb-3">
                        <div className="product-image">
                          <div className="product-thumb-inner">
                            <a href="#">
                              <img className="img-fluid" src="images/product/02.jpg" alt="image" />
                            </a>
                          </div>
                        </div>
                        <div className="product-content py-0">
                          <div className="product-info">
                            <div className="product-title">
                              <h3>
                                <a href="shop-single.html">Dining Chair</a>
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
                      <div className="product d-flex align-items-center">
                        <div className="product-image">
                          <div className="product-thumb-inner">
                            <a href="#">
                              <img className="img-fluid" src="images/product/02.jpg" alt="image" />
                            </a>
                          </div>
                        </div>
                        <div className="product-content py-0">
                          <div className="product-info">
                            <div className="product-title">
                              <h3>
                                <a href="shop-single.html">Dining Chair</a>
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

                <div className="widget mb-0">
                  <div className="widget-title">
                    <h5 className="title">Brands</h5>
                  </div>
                  <div className="widget-content">
                    <div className="popular-brand">
                      <ul className="list-unstyled mb-0">
                        <li>
                          <a href="#"> Daniela Anderson(1)</a>
                        </li>
                        <li>
                          <a href="#"> Caranila(8)</a>
                        </li>
                        <li>
                          <a href="#"> Moosa(4)</a>
                        </li>
                        <li>
                          <a href="#"> Florial(5)</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 mt-4 mt-md-5 mt-lg-0">
              <h5 className="widget-title">Product filters</h5>
              <div className="blog-sidebar-post-divider"></div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <input type="search" id="shop-filter-search" className="search-field mb-3" placeholder="Search products…" value="" name="s" />
                </div>
                <div className="col-lg-4">
                  <div className="mb-3 select-border">
                    <select className="form-control basic-select">
                      <option value="1">Accessories</option>
                      <option value="3">Belts</option>
                      <option value="4">Chair</option>
                      <option value="2">Stick</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3 select-border">
                    <select className="form-control basic-select">
                      <option value="1">Any rating</option>
                      <option value="2">5 Star</option>
                      <option value="3">4 Star</option>
                      <option value="4">3 Star</option>
                      <option value="5">2 Star</option>
                      <option value="6">1 Star</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3 select-border">
                    <select className="form-control basic-select">
                      <option value="1">Any color</option>
                      <option value="1">Black, brown</option>
                      <option value="2">Blue</option>
                      <option value="3">Dark grey</option>
                      <option value="4">Green</option>
                      <option value="5">Pink</option>
                      <option value="6">Red</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3 select-border">
                    <select className="form-control basic-select">
                      <option value="1">Any size</option>
                      <option value="2">L</option>
                      <option value="2">M</option>
                      <option value="3">S</option>
                      <option value="4">XS</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row my-2 align-items-center">
                <div className="col-lg-8">
                  <p>Showing all 2 results</p>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3 select-border">
                    <select className="form-control basic-select">
                      <option value="1">Default sorting</option>
                      <option value="2">Sort by popularity</option>
                      <option value="3">Sort by average rating</option>
                      <option value="4">Sort by latest</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-4 col-md-6">
                  <div className="product">
                    <div className="product-label">
                      <span className="onsale">17%</span>
                    </div>
                    <div className="product-image">
                      <div className="product-thumb-inner">
                        <a href="#">
                          <img className="img-fluid" src="images/product/01.jpg" alt="image" />
                        </a>
                      </div>
                      <div className="custom-icon">
                        <ul className="list-unstyled">
                          <li>
                            <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist">
                              <i className="far fa-heart"></i>
                            </a>
                          </li>
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
                        </ul>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="btn btn-light d-block">
                          Add To cart<i className="fas fa-arrow-right-long ps-3"></i>
                        </a>
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
                <div className="col-xl-4 col-md-6">
                  <div className="product">
                    <div className="product-label">
                      <span className="onsale">17%</span>
                    </div>
                    <div className="product-image">
                      <div className="product-thumb-inner">
                        <a href="#">
                          <img className="img-fluid" src="images/product/01.jpg" alt="image" />
                        </a>
                      </div>
                      <div className="custom-icon">
                        <ul className="list-unstyled">
                          <li>
                            <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist">
                              <i className="far fa-heart"></i>
                            </a>
                          </li>
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
                        </ul>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="btn btn-light d-block">
                          Add To cart<i className="fas fa-arrow-right-long ps-3"></i>
                        </a>
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
                <div className="col-xl-4 col-md-6">
                  <div className="product">
                    <div className="product-label">
                      <span className="onsale">17%</span>
                    </div>
                    <div className="product-image">
                      <div className="product-thumb-inner">
                        <a href="#">
                          <img className="img-fluid" src="images/product/01.jpg" alt="image" />
                        </a>
                      </div>
                      <div className="custom-icon">
                        <ul className="list-unstyled">
                          <li>
                            <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist">
                              <i className="far fa-heart"></i>
                            </a>
                          </li>
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
                        </ul>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="btn btn-light d-block">
                          Add To cart<i className="fas fa-arrow-right-long ps-3"></i>
                        </a>
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
                <div className="col-xl-4 col-md-6">
                  <div className="product">
                    <div className="product-label">
                      <span className="onsale">17%</span>
                    </div>
                    <div className="product-image">
                      <div className="product-thumb-inner">
                        <a href="#">
                          <img className="img-fluid" src="images/product/01.jpg" alt="image" />
                        </a>
                      </div>
                      <div className="custom-icon">
                        <ul className="list-unstyled">
                          <li>
                            <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist">
                              <i className="far fa-heart"></i>
                            </a>
                          </li>
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
                        </ul>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="btn btn-light d-block">
                          Add To cart<i className="fas fa-arrow-right-long ps-3"></i>
                        </a>
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
                <div className="col-xl-4 col-md-6">
                  <div className="product">
                    <div className="product-label">
                      <span className="onsale">17%</span>
                    </div>
                    <div className="product-image">
                      <div className="product-thumb-inner">
                        <a href="#">
                          <img className="img-fluid" src="images/product/01.jpg" alt="image" />
                        </a>
                      </div>
                      <div className="custom-icon">
                        <ul className="list-unstyled">
                          <li>
                            <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist">
                              <i className="far fa-heart"></i>
                            </a>
                          </li>
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
                        </ul>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="btn btn-light d-block">
                          Add To cart<i className="fas fa-arrow-right-long ps-3"></i>
                        </a>
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
                <div className="col-xl-4 col-md-6">
                  <div className="product">
                    <div className="product-label">
                      <span className="onsale">17%</span>
                    </div>
                    <div className="product-image">
                      <div className="product-thumb-inner">
                        <a href="#">
                          <img className="img-fluid" src="images/product/01.jpg" alt="image" />
                        </a>
                      </div>
                      <div className="custom-icon">
                        <ul className="list-unstyled">
                          <li>
                            <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist">
                              <i className="far fa-heart"></i>
                            </a>
                          </li>
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
                        </ul>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="btn btn-light d-block">
                          Add To cart<i className="fas fa-arrow-right-long ps-3"></i>
                        </a>
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
                <div className="col-xl-4 col-md-6">
                  <div className="product">
                    <div className="product-label">
                      <span className="onsale">17%</span>
                    </div>
                    <div className="product-image">
                      <div className="product-thumb-inner">
                        <a href="#">
                          <img className="img-fluid" src="images/product/01.jpg" alt="image" />
                        </a>
                      </div>
                      <div className="custom-icon">
                        <ul className="list-unstyled">
                          <li>
                            <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist">
                              <i className="far fa-heart"></i>
                            </a>
                          </li>
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
                        </ul>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="btn btn-light d-block">
                          Add To cart<i className="fas fa-arrow-right-long ps-3"></i>
                        </a>
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
          </div>
        </div>
      </section>
    </div>
  );
}
