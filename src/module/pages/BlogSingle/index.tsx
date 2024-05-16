import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import img from '../../../images/bg/mandir-banner.jpg';
import { fetchBlogs } from '../../../apiV2/blogs';
import { AuthContext } from '../../../context/auth.context';
import { getCategories } from '../../../apiV2/categories';

export default function BlogSingle() {
  //blogs mapping
  const { data: blogsList } = useQuery('Blogs', fetchBlogs);
  const blogsData = blogsList?.result || [];

  const { search, categories, setCategories } = useContext(AuthContext);

  const { data: categoriesList } = useQuery('categories', getCategories);
  const [openDropdown, setOpenDropdown] = useState(null);

  const categoriesData = categoriesList?.result?.filter((i: any) => !i.parentCategory) || [];

  const params = new URLSearchParams(window.location.search);
  const categoryName = params.get('category');
  const category = categoriesData.find((i: any) => {
    if (i._id === categoryName) {
      return i.name;
    }
  });
  useEffect(() => {
    setCategories(categoryName as string);
  }, [categoryName]);

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
                      <li className="breadcrumb-item active">Blog Single</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>Blog Single</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-inner-shape" style={{ backgroundImage: 'url(images/bg/02.png)' }}></div>
      </section>
      <section className="space-ptb">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <div className="blog-detail">
                <div className="blog-post">
                  <div className="blog-img">
                    <img className="img-fluid" src="images/blog-single.jpg" alt="#" />
                  </div>
                  <div className="blog-info">
                    <div className="blog-meta d-flex flex-wrap align-items-center pb-2">
                      <div className="time-card me-3 d-flex align-items-center">
                        <a href="#">
                          <i className="fa-regular fa-clock me-1 text-primary"></i>
                          <span>Feb 4, 2022 By</span>
                        </a>
                      </div>
                      <div className="user d-flex align-items-center me-3">
                        <a href="#">
                          <i className="fa-regular fa-user me-1 text-primary"></i>
                          <span>Sara Lisbon</span>
                        </a>
                      </div>
                      <div className="comment d-flex align-items-center">
                        <a href="#">
                          <i className="fa-regular fa-comment me-1 text-primary"></i>
                          <span>20</span>
                        </a>
                      </div>
                    </div>
                    <h4 className="blog-tittle">
                      <a href="blog-single.html">Better than snoozing: driving an EV</a>
                    </h4>
                    <p className="mt-3">
                      Was this just another little prank, courtesy of a mischievous Universe? Or is it possible to get good things coming your way
                      with only mild desire — maybe even a calm indifference? Many inspirational writers, including Napoleon Hill, have assured us
                      that a burning desire is one of the prerequisites of acquiring a fortune.
                    </p>
                    <p className="mt-3">
                      Was this just another little prank, courtesy of a mischievous Universe? Or is it possible to get good things coming your way
                      with only mild desire — maybe even a calm indifference? Many inspirational writers, including Napoleon Hill, have assured us
                      that a burning desire is one of the prerequisites of acquiring a fortune.
                    </p>
                  </div>
                </div>
                <div className="d-sm-flex bg-light p-4 p-md-4 mt-md-4 mb-4 mb-lg-5">
                  <i className="fas fa-quote-left pe-4 fa-5x text-primary"></i>
                  <p className="mb-0">
                    Politics can be attributed to his perseverance to overcome his personal liabilities, and his desire to constantly become better.
                    Next time you really want to achieve something, take time to focus on your own personal journal. What is your temptation that is
                    standing in your wayv to greatness.
                  </p>
                </div>

                <nav className="navigation post-navigation mb-4 mb-sm-5">
                  <div className="nav-links">
                    <div className="nav-previous">
                      <a href="#">
                        <span className="pagi-text"> PREV</span>
                        <span className="nav-title"> Cutting Your Losses In listing</span>
                      </a>
                    </div>
                    <div className="nav-next mt-2 mt-sm-0">
                      <a href="#">
                        <span className="nav-title"> How To Replace A Ceiling Fan</span> <span className="pagi-text">NEXT</span>
                      </a>{' '}
                    </div>
                  </div>
                </nav>
                <h4 className="fw-600 mb-4">Related Posts</h4>
                <div
                  className="owl-carousel owl-nav-center"
                  data-nav-dots="false"
                  data-nav-arrow="false"
                  data-items="2"
                  data-lg-items="2"
                  data-md-items="2"
                  data-sm-items="1"
                  data-space="30"
                  data-autoheight="true"
                >
                  <div className="item">
                    <div className="blog-post">
                      <div className="blog-img">
                        <img className="img-fluid" src="images/blog-01.jpg" alt="#" />
                      </div>
                      <div className="blog-info">
                        <div className="blog-meta d-flex flex-wrap align-items-center pb-2">
                          <div className="time-card me-3 d-flex align-items-center">
                            <a href="#">
                              <i className="fa-regular fa-clock me-1 text-primary"></i>
                              <span>Feb 4, 2022 By</span>
                            </a>
                          </div>
                          <div className="user d-flex align-items-center me-3">
                            <a href="#">
                              <i className="fa-regular fa-user me-1 text-primary"></i>
                              <span>Sara Lisbon</span>
                            </a>
                          </div>
                          <div className="comment d-flex align-items-center">
                            <a href="#">
                              <i className="fa-regular fa-comment me-1 text-primary"></i>
                              <span>20</span>
                            </a>
                          </div>
                        </div>
                        <h4 className="blog-tittle">
                          <a href="blog-single.html">Better than snoozing: driving an EV</a>
                        </h4>
                        <a className="blog-link" href="blog-single.html">
                          Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="blog-post">
                      <div className="blog-img">
                        <img className="img-fluid" src="images/blog-01.jpg" alt="#" />
                      </div>
                      <div className="blog-info">
                        <div className="blog-meta d-flex flex-wrap align-items-center pb-2">
                          <div className="time-card me-3 d-flex align-items-center">
                            <a href="#">
                              <i className="fa-regular fa-clock me-1 text-primary"></i>
                              <span>Feb 4, 2022 By</span>
                            </a>
                          </div>
                          <div className="user d-flex align-items-center me-3">
                            <a href="#">
                              <i className="fa-regular fa-user me-1 text-primary"></i>
                              <span>Sara Lisbon</span>
                            </a>
                          </div>
                          <div className="comment d-flex align-items-center">
                            <a href="#">
                              <i className="fa-regular fa-comment me-1 text-primary"></i>
                              <span>20</span>
                            </a>
                          </div>
                        </div>
                        <h4 className="blog-tittle">
                          <a href="blog-single.html">Better than snoozing: driving an EV</a>
                        </h4>
                        <a className="blog-link" href="blog-single.html">
                          Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4 my-sm-5" />
                <div className="row mt-4 mt-sm-5">
                  <div className="col-sm-12">
                    <h4 className="mb-4 mb-lg-5 fw-600">Comments (3)</h4>
                    <div className="d-sm-flex">
                      <img className="img-fluid avatar-lg border-radius align-self-start me-3" src="images/avatar/01.jpg" alt="..." />
                      <div className="bg-white border border-radius p-3 mt-3 mt-sm-0">
                        <h6 className="mt-0 mb-3 fw-600">John Doe</h6>
                        <p>
                          The best way is to develop and follow a plan. Start with your goals in mind and then work backwards to develop the plan.
                          What steps are required to get you to the goals.
                        </p>
                        <a href="#" className="btn btn-link p-0">
                          Reply
                        </a>
                      </div>
                    </div>
                    <div className="ps-4 ps-sm-5 mt-4 mt-sm-5">
                      <div className="d-sm-flex">
                        <img className="img-fluid avatar-lg border-radius align-self-start me-3" src="images/avatar/02.jpg" alt="..." />
                        <div className="bg-white border border-radius p-3 mt-3 mt-sm-0">
                          <h6 className="mt-0 mb-3 fw-600">Paul Flavius</h6>
                          <p>
                            Make the plan as detailed as possible. Try to visualize and then plan for, every possible setback. Commit the plan to
                            paper and then keep it with you at all times.
                          </p>
                          <a href="#" className="btn btn-link p-0">
                            Reply
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 mt-sm-5">
                      <div className="d-sm-flex">
                        <img className="img-fluid avatar-lg border-radius align-self-start me-3" src="images/avatar/03.jpg" alt="..." />
                        <div className="bg-white border border-radius p-3 mt-3 mt-sm-0">
                          <h6 className="mt-0 mb-3 fw-600">Martin Smith</h6>
                          <p>
                            Review it regularly and ensure that every step takes you closer to your Vision and Goals. If the plan doesn’t support the
                            vision then change it!
                          </p>
                          <a href="#" className="btn btn-link p-0">
                            Reply
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h4 className="mb-4 mb-lg-5 fw-600">Leave a Reply</h4>
                  <p>Your email address will not be published. Required fields are marked *</p>
                  <form>
                    <div className="row">
                      <div className="mb-3 col-md-4">
                        <input type="text" className="form-control" placeholder="Name" />
                      </div>
                      <div className="mb-3 col-md-4">
                        <input type="email" className="form-control" placeholder="Email" />
                      </div>
                      <div className="mb-3 col-md-4">
                        <input type="text" className="form-control" placeholder="Website" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3 col-md-12">
                        <textarea rows={8} className="form-control" id="sector" placeholder="Comment"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className=" mb-3 col-md-12">
                        <div className="custom-control form-check">
                          <input type="checkbox" className="form-check-input" id="customCheck1" />
                          <label className="form-check-label" htmlFor={'customCheck1'}>
                            I consent to having this website store my submitted information so they can respond to my inquiry.
                          </label>
                        </div>
                      </div>
                    </div>
                    <a href="#" className="btn btn-primary">
                      Post Comment
                    </a>
                  </form>
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
                            <span className="filter-color">
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
                            <span className="filter-color">
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
                            <span className="filter-color">
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
                            <span className="filter-color">
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
                            <span className="filter-color">
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
                            <span className="filter-color">
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
                            <span className="filter-color">
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
                            <span className="filter-color">
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
