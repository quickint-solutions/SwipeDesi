import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getItems } from '../../../apiV2/items';
import ProductItem from '../../../components/ProductItem';
import { getCategories } from '../../../apiV2/categories';
import { useNavigate } from 'react-router-dom';
import img from '../../../images/bg/mandir-banner.jpg';

export default function Blogs() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  const [categoryValue, setCategoryValue] = useState(category);
  const [blogs, setBlogs] = useState<any[]>([]);

  const navigate = useNavigate();

  const { data: getProducts, mutate } = useMutation(getItems);

  const { data: categoriesList } = useQuery('categories', getCategories);

  const categoriesData = categoriesList?.result || [];

  useEffect(() => {
    mutate({ categories: categoryValue });
  }, [categoryValue]);

  return (
    <div>
      <section className="header-inner header-inner-menu bg-overlay-secondary" style={{ backgroundImage: `url(${img})` }}>
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
                      <li className="breadcrumb-item active">Blog</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>Blog</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-inner-shape"></div>
      </section>
      <section className="space-ptb">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <div className="row">
                <div className="col-md-6 col-12 mb-4">
                  <div className="blog-post">
                    <div className="blog-img">
                      <img className="img-fluid" src="images/blog-01.jpg" alt="#" />
                    </div>
                    <div className="blog-info">
                      <span>February 4, 2022</span>
                      <h4 className="blog-tittle">
                        <a href="blog-single.html">Better than snoozing: driving an EV</a>
                      </h4>
                      <a className="blog-link" href="blog-single.html">
                        Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-4">
                  <div className="blog-post">
                    <div className="blog-img">
                      <img className="img-fluid" src="images/blog-02.jpg" alt="#" />
                    </div>
                    <div className="blog-info">
                      <span>March 8, 2022</span>
                      <h4 className="blog-tittle">
                        <a href="blog-single.html">Saving the world, one charge at a time</a>
                      </h4>
                      <a className="blog-link" href="blog-single.html">
                        Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-4">
                  <div className="blog-post mb-0">
                    <div className="blog-img">
                      <img className="img-fluid" src="images/blog-03.jpg" alt="#" />
                    </div>
                    <div className="blog-info">
                      <span>April 7, 2022</span>
                      <h4 className="blog-tittle">
                        <a href="blog-single.html">It’s time to plug-in to the new road ahead!</a>
                      </h4>
                      <a className="blog-link" href="blog-single.html">
                        Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-4">
                  <div className="blog-post">
                    <div className="blog-img">
                      <img className="img-fluid" src="images/blog-02.jpg" alt="#" />
                    </div>
                    <div className="blog-info">
                      <span>March 8, 2022</span>
                      <h4 className="blog-tittle">
                        <a href="blog-single.html">Saving the world, one charge at a time</a>
                      </h4>
                      <a className="blog-link" href="blog-single.html">
                        Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-4">
                  <div className="blog-post mb-0">
                    <div className="blog-img">
                      <img className="img-fluid" src="images/blog-03.jpg" alt="#" />
                    </div>
                    <div className="blog-info">
                      <span>April 7, 2022</span>
                      <h4 className="blog-tittle">
                        <a href="blog-single.html">It’s time to plug-in to the new road ahead!</a>
                      </h4>
                      <a className="blog-link" href="blog-single.html">
                        Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-4">
                  <div className="blog-post mb-0">
                    <div className="blog-img">
                      <img className="img-fluid" src="images/blog-03.jpg" alt="#" />
                    </div>
                    <div className="blog-info">
                      <span>April 7, 2022</span>
                      <h4 className="blog-tittle">
                        <a href="blog-single.html">It’s time to plug-in to the new road ahead!</a>
                      </h4>
                      <a className="blog-link" href="blog-single.html">
                        Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-4 mb-md-0 mb-4">
                  <div className="blog-post mb-0">
                    <div className="blog-img">
                      <img className="img-fluid" src="images/blog-03.jpg" alt="#" />
                    </div>
                    <div className="blog-info">
                      <span>April 7, 2022</span>
                      <h4 className="blog-tittle">
                        <a href="blog-single.html">It’s time to plug-in to the new road ahead!</a>
                      </h4>
                      <a className="blog-link" href="blog-single.html">
                        Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="blog-post mb-0">
                    <div className="blog-img">
                      <img className="img-fluid" src="images/blog-03.jpg" alt="#" />
                    </div>
                    <div className="blog-info">
                      <span>April 7, 2022</span>
                      <h4 className="blog-tittle">
                        <a href="blog-single.html">It’s time to plug-in to the new road ahead!</a>
                      </h4>
                      <a className="blog-link" href="blog-single.html">
                        Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-center mt-4 mt-sm-5">
                  <nav>
                    <ul className="pagination justify-content-center mb-0">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">«</span>
                          <span className="sr-only">Previous</span>
                        </a>
                      </li>
                      <li className="page-item active">
                        <span className="page-link">
                          1<span className="sr-only">(current)</span>
                        </span>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          4
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          5
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          6
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">»</span>
                          <span className="sr-only">Next</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 mt-4 mt-md-5 mt-lg-0">
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
                            <span className="filter-color" style={{ backgroundColor: '#ff0000' }}>
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
                            <span className="filter-color" style={{ backgroundColor: '#ff0000' }}>
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
                            <span className="filter-color" style={{ backgroundColor: '#ff0000' }}>
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
                            <span className="filter-color" style={{ backgroundColor: '#ff0000' }}>
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
                            <span className="filter-color" style={{ backgroundColor: '#ff0000' }}>
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
                            <span className="filter-color" style={{ backgroundColor: '#ff0000' }}>
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
                            <span className="filter-color" style={{ backgroundColor: '#ff0000' }}>
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
                            <span className="filter-color" style={{ backgroundColor: '#ff0000' }}>
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
                          <a href="#" className="category">
                            Cable
                          </a>
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
                          <a href="#" className="category">
                            Cable
                          </a>
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
                          <a href="#" className="category">
                            Cable
                          </a>
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
          </div>
        </div>
      </section>
    </div>
  );
}
