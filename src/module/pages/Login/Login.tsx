import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import logoImage from '../../../images/logo.png';
import { ReactComponent as QuoteSvg } from '../../../images/testimonial/quote.svg';
import EnglishLang from '../../../images/en.png';
import AvtarIcon01 from '../../../images/avatar/01.jpg';
import BgImage from '../../../images/bg/banner-sale-off.jpg';
import BgImage1 from '../../../images/bg/bg-01.jpg';
import furnitureImage from '../../../images/furniture/img-01.jpg';
import furnitureImage1 from '../../../images/furniture/img-02.jpg';
import furnitureImage2 from '../../../images/furniture/img-03.jpg';
import BlogImage from '../../../images/blogimage/blog-01.jpg';
import BlogImage1 from '../../../images/blogimage/blog-02.jpg';
import BlogImage2 from '../../../images/blogimage/blog-03.jpg';
import Instagram1 from '../../../images/instagram/instagram-01.jpg';
import Instagram2 from '../../../images/instagram/instagram-02.jpg';
import Instagram3 from '../../../images/instagram/instagram-03.jpg';
import Instagram4 from '../../../images/instagram/instagram-04.jpg';
import Instagram5 from '../../../images/instagram/instagram-05.jpg';
import zula from '../../../images/zula.jpg';
import diwan from '../../../images/diwan.jpg';
import _ from 'lodash';

import { useAppSelector } from '../../../api/store/configureStore';

import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getBanners } from '../../../apiV2/banners';
import { getCategories } from '../../../apiV2/categories';
import { getFeaturedItems } from '../../../apiV2/items';
import ProductItem from '../../../components/ProductItem';
import { AuthContext } from '../../../context/auth.context';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const storeData = useAppSelector((state: any) => state.loginSlice);
  const [bestCollectionData, setBestCollectionData] = useState<any>([]);

  const { setCategories } = useContext(AuthContext);

  const [saleBannerData, setSaleBannerData] = useState([]);
  const [testimonialData, setTestimonialData] = useState<any>([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [sliderBannerImages, setSliderBannerImages] = useState<any>([]);

  const { isLoading: categoriesLoading, data: categories } = useQuery('getCategories', getCategories);

  const { isLoading: featuredItemsLoading, data: featuredItems } = useQuery('getFeaturedItems', getFeaturedItems);

  const { data: banners, isLoading: bannersLoading } = useQuery('getBanners', getBanners);
  // get first 2 banners
  const bannersList = banners?.result?.slice(0, 2) || [];

  // get other Banners
  const otherBanners = banners?.result?.slice(2) || [];

  const navigateToWishlist = (event: any) => {
    event.preventDefault();
    navigate('/wishlist');
  };

  const isMobile = window.innerWidth < 768;

  return (
    <>
      {/* <!--=================================
            banner --> */}
      <section className="banner-02">
        <div className="banner-section-wrapper">
          <div className="row g-0 g-md-1 g-lg-2">
            <div className="col-sm-7 col-12 mb-1">
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {otherBanners.length > 0
                    ? otherBanners.map((value: any, key: number) => (
                        <div className={key === 0 ? 'carousel-item active' : 'carousel-item'} key={key}>
                          <img
                            style={{ cursor: 'pointer' }}
                            src={value?.image}
                            className="d-block w-100"
                            alt="..."
                            onClick={() => navigate(`${value.link}`)}
                          />
                        </div>
                      ))
                    : ''}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col-sm-5 col-12">
              <div className="row g-1">
                {!bannersLoading &&
                  banners &&
                  bannersList.length > 0 &&
                  bannersList.map((banner: any, index: number) => (
                    <div className="col-6 col-sm-12">
                      <div className="slider-banner mb-1 mb-lg-2">
                        <img className="img-fluid" src={banner.image} alt="image" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--=================================
            banner --> */}
      {/* <!--=================================
            feature category --> */}
      <section className="space-ptb categories-section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title section-title-style-1 text-center">
                <span className="sub-title left-divider">Our Categories</span>
                <h2 className="title">Shop by Department</h2>
                <div className="description">
                  <p>Products with a tres chic attitude and a traditional twist end up becoming a nice piece of art.</p>
                </div>
              </div>
            </div>
          </div>

          <OwlCarousel autoplayTimeout={3000} autoplay={true} items={1} loop={true} margin={10}>
            {_.chunk(categories?.result?.filter((i: any) => !i.parentCategory) || [], isMobile ? 2 : 5).map((categoriesData: any, key: number) => {
              return (
                <div className={`feature-categories-wrapper`}>
                  {categoriesData.map((value: any, key: number) => {
                    if (value.parentCategory) return null;
                    const subCategories = categories?.result?.filter((i: any) => i.parentCategory?._id === value._id) || [];
                    const totalItems = subCategories?.length
                      ? subCategories.reduce((acc: any, curr: any) => acc + curr.itemCount, 0) + value.itemCount
                      : value.itemCount;

                    return (
                      <div
                        style={{ cursor: 'pointer' }}
                        className="featured-categories-column text-center"
                        key={key}
                        onClick={() => {
                          navigate(`/products?category=${value._id}`);
                          setCategories(value._id);
                        }}
                      >
                        <div className="feature-categories-inner">
                          <div className="categories-img">
                            <a href="javascript:void(0)">
                              {' '}
                              <img className="img-fluid" style={{}} src={value.image} alt="images" />
                            </a>
                          </div>
                          <div className="categories-product text-center">{totalItems} Products</div>
                        </div>
                        <h6 className="categories-title fw-medium mt-3">
                          <a href="javascript:void(0)">{value.name}</a>
                        </h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </OwlCarousel>

          {/* <div className="feature-categories-wrapper">
            {categories?.result?.length > 0
              ? categories?.result.map((value: any, key: number) => {
                  if (value.parentCategory) return null;
                  const subCategories = categories?.result?.filter((i: any) => i.parentCategory?._id === value._id) || [];
                  const totalItems = subCategories?.length
                    ? subCategories.reduce((acc: any, curr: any) => acc + curr.itemCount, 0) + value.itemCount
                    : value.itemCount;

                  return (
                    <div
                      style={{ cursor: 'pointer' }}
                      className="featured-categories-column text-center"
                      key={key}
                      onClick={() => {
                        navigate(`/products?category=${value._id}`);
                        setCategories(value._id);
                      }}
                    >
                      <div className="feature-categories-inner">
                        <div className="categories-img">
                          <a href="javascript:void(0)">
                            {' '}
                            <img className="img-fluid" style={{}} src={value.image} alt="images" />
                          </a>
                        </div>
                        <div className="categories-product text-center">{totalItems} Products</div>
                      </div>
                      <h6 className="categories-title fw-medium mt-3">
                        <a href="javascript:void(0)">{value.name}</a>
                      </h6>
                    </div>
                  );
                })
              : ''}
          </div> */}
        </div>
      </section>
      {/* <!--=================================
            feature category --> */}

      {/* <!--=================================
            banner wrapper--> */}
      <section className="banner-wprapper">
        {saleBannerData.length > 0
          ? saleBannerData.map((value: any, key: number) => (
              <div
                className="banner-inner py-5"
                style={{
                  backgroundImage: `url(${value.image}), url(${BgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}
                key={key}
              >
                <div className="container">
                  <div className="banner-content position-relative text-end">
                    <h5>{value.discount}% Off</h5>
                    <h6 className="text-uppercase fw-bold">{value.productName}</h6>
                    <h2 className="mb-3 text-uppercase">Sale ends in 1 day</h2>
                    <a href="#" className="btn btn-primary">
                      Shop Now<i className="fas fa-arrow-right-long ps-3"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))
          : ''}
      </section>

      {/* <!--=================================
            banner wrapper--> */}

      {/* <!--=================================
            furniture --> */}
      <section className="space-pt furniture-section">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-12 col-lg-8 col-xl-6">
              <div className="section-title section-title-style-1">
                <span className="sub-title left-divider">Best Collection</span>
                <h2 className="title">Living Room Furniture</h2>
                <div className="description">
                  <p>Products with a tres chic attitude and a traditional twist end up becoming a nice piece of art.</p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4 col-xl-6 text-lg-end text-start mb-4 mb-lg-0">
              <a onClick={() => navigate('/products?category=6628c8c9927e3edd23258e23')} className="btn btn-primary">
                View All<i className="fas fa-arrow-right-long ps-3"></i>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="furniture-collection">
                <div className="furniture-img">
                  <img className="img-fluid" src={furnitureImage} alt="img" />
                </div>
                <div className="furniture-info">
                  <p className="text-white text-uppercase mb-2">Sale up to 20% OFF all items</p>
                  <h3 className="furniture-title text-white mb-3 mb-sm-4">Dining Table Set</h3>
                  <a href="#" className="btn btn-light">
                    Shop Now<i className="fas fa-arrow-right-long ps-3"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12">
                  <div className="furniture-collection mb-4 mt-lg-0 mt-4">
                    <div className="furniture-img">
                      <img className="img-fluid" src={diwan} alt="img" />
                    </div>
                    <div className="furniture-info">
                      <p className="text-white text-uppercase mb-2">one of the most popular</p>
                      <h3 className="furniture-title text-white mb-3 mb-sm-4">Diwan</h3>
                      <a href="#" className="btn btn-light">
                        Shop Now<i className="fas fa-arrow-right-long ps-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="furniture-collection">
                    <div className="furniture-img">
                      <img className="img-fluid" src={zula} alt="img" />
                    </div>
                    <div className="furniture-info">
                      <p className="text-white text-uppercase mb-2">Handcrafted Traditional Wooden</p>
                      <h3 className="furniture-title text-white mb-3 mb-sm-4">Carving Zhula</h3>
                      <a href="#" className="btn btn-light">
                        Shop Now<i className="fas fa-arrow-right-long ps-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="furniture-collection">
                {bestCollectionData.length > 0 ? (
                  <>
                    <div className="furniture-img">
                      <img className="img-fluid" src={furnitureImage} alt="img" />
                    </div>
                    <div className="furniture-info">
                      <p className="text-white text-uppercase mb-2">Sale up to 20% OFF all items</p>
                      <h3 className="furniture-title text-white mb-3 mb-sm-4">{bestCollectionData[0].productName}</h3>
                      <a href="#" className="btn btn-light">
                        Shop Now<i className="fas fa-arrow-right-long ps-3"></i>
                      </a>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                {bestCollectionData.length > 1
                  ? bestCollectionData.map((value: any, key: number) =>
                      key !== 0 ? (
                        <div className="col-12">
                          <div className="furniture-collection mb-4 mt-lg-0 mt-4">
                            <div className="furniture-img">
                              <img className="img-fluid" src={furnitureImage1} alt="img" />
                              {/* <a href="javascript:void(0)"> <img className="img-fluid" src={value.imagePath} alt="images" /></a> */}
                            </div>
                            <div className="furniture-info">
                              <p className="text-white text-uppercase mb-2">Sale up to 20% OFF all items</p>
                              <h3 className="furniture-title text-white mb-3 mb-sm-4">{value.productName}</h3>
                              <a href="#" className="btn btn-light">
                                Shop Now<i className="fas fa-arrow-right-long ps-3"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ''
                      ),
                    )
                  : ''}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--=================================
            furniture --> */}

      {/* <!--=================================
            Product --> */}
      <section className="space-pt pb-md-5 pb-4" id="featuredItems">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title section-title-style-1 text-center">
                <span className="sub-title left-divider">Latest Collection</span>
                <h2 className="title">Featured Products</h2>
                <div className="description">
                  <p>Products with a tres chic attitude and a traditional twist end up becoming a nice piece of art.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {featuredItems?.result?.length > 0
              ? featuredItems?.result.map((value: any, key: number) => <ProductItem product={value} key={key} />)
              : ''}
            {/* <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="product">
                                <div className="product-label">
                                    <span className="onsale">17%</span>
                                </div>
                                <div className="product-image">
                                    <div className="product-thumb-inner">
                                        <a href="#">
                                            <img className="img-fluid" src={Product01} alt="image" />
                                        </a>
                                    </div>
                                    <div className="custom-icon">
                                        <ul className="list-unstyled">
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist"><i className="far fa-heart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to cart"><i className="fas fa-shopping-cart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="fa-solid fa-code-compare"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="product-btn">
                                        <a href="#" className="btn btn-light d-block">Add To cart<i className="fas fa-arrow-right-long ps-3"></i></a>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <div className="product-info">
                                        <div className="product-title">
                                            <h3><a href="shop-single.html">Hand Carving Sevan Wood Temple</a></h3>
                                        </div>
                                        <div className="product-star">
                                            <ul className="list-unstyled mb-1">
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="far fa-star-half-alt"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-prize">
                                        <p><span className="me-2">$81,000.00</span>$95,000.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="product">
                                <div className="product-label">
                                    <span className="onsale">Sale</span>
                                    <span className="featured">Hot</span>
                                </div>
                                <div className="product-image">
                                    <div className="product-thumb-inner">
                                        <a href="#">
                                            <img className="img-fluid" src={Product01} alt="image" />
                                        </a>
                                    </div>
                                    <div className="custom-icon">
                                        <ul className="list-unstyled">
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist"><i className="far fa-heart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to cart"><i className="fas fa-shopping-cart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="fa-solid fa-code-compare"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="product-btn">
                                        <a href="#" className="btn btn-light d-block">Add To cart<i className="fas fa-arrow-right-long ps-3"></i></a>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <div className="product-info">
                                        <div className="product-title">
                                            <h3><a href="shop-single.html">Hand Carving Sevan Wood Temple</a></h3>
                                        </div>
                                        <div className="product-star">
                                            <ul className="list-unstyled mb-1">
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="far fa-star-half-alt"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-prize">
                                        <p><span className="me-2">$81,000.00</span>$95,000.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="product">
                                <div className="product-label">
                                    <span className="featured">Hot</span>
                                </div>
                                <div className="product-image">
                                    <div className="product-thumb-inner">
                                        <a href="#">
                                            <img className="img-fluid" src={Product01} alt="image" />
                                        </a>
                                    </div>
                                    <div className="custom-icon">
                                        <ul className="list-unstyled">
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist"><i className="far fa-heart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to cart"><i className="fas fa-shopping-cart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="fa-solid fa-code-compare"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="product-btn">
                                        <a href="#" className="btn btn-light d-block">Add To cart<i className="fas fa-arrow-right-long ps-3"></i></a>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <div className="product-info">
                                        <div className="product-title">
                                            <h3><a href="shop-single.html">Hand Carving Sevan Wood Temple</a></h3>
                                        </div>
                                        <div className="product-star">
                                            <ul className="list-unstyled mb-1">
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="far fa-star-half-alt"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-prize">
                                        <p><span className="me-2">$81,000.00</span>$95,000.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="product">
                                <div className="product-label">
                                    <span className="onsale">20%</span>
                                    <span className="featured">Hot</span>
                                </div>
                                <div className="product-image">
                                    <div className="product-thumb-inner">
                                        <a href="#">
                                            <img className="img-fluid" src={Product01} alt="image" />
                                        </a>
                                    </div>
                                    <div className="custom-icon">
                                        <ul className="list-unstyled">
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist"><i className="far fa-heart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to cart"><i className="fas fa-shopping-cart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="fa-solid fa-code-compare"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="product-btn">
                                        <a href="#" className="btn btn-light d-block">Add To cart<i className="fas fa-arrow-right-long ps-3"></i></a>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <div className="product-info">
                                        <div className="product-title">
                                            <h3><a href="shop-single.html">Hand Carving Sevan Wood Temple</a></h3>
                                        </div>
                                        <div className="product-star">
                                            <ul className="list-unstyled mb-1">
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="far fa-star-half-alt"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-prize">
                                        <p><span className="me-2">$81,000.00</span>$95,000.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="product">
                                <div className="product-label">
                                    <span className="onsale">Sale</span>
                                </div>
                                <div className="product-image">
                                    <div className="product-thumb-inner">
                                        <a href="#">
                                            <img className="img-fluid" src={Product01} alt="image" />
                                        </a>
                                    </div>
                                    <div className="custom-icon">
                                        <ul className="list-unstyled">
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist"><i className="far fa-heart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to cart"><i className="fas fa-shopping-cart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="fa-solid fa-code-compare"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="product-btn">
                                        <a href="#" className="btn btn-light d-block">Add To cart<i className="fas fa-arrow-right-long ps-3"></i></a>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <div className="product-info">
                                        <div className="product-title">
                                            <h3><a href="shop-single.html">Hand Carving Sevan Wood Temple</a></h3>
                                        </div>
                                        <div className="product-star">
                                            <ul className="list-unstyled mb-1">
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="far fa-star-half-alt"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-prize">
                                        <p><span className="me-2">$81,000.00</span>$95,000.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="product">
                                <div className="product-label">
                                    <span className="onsale">30%</span>
                                    <span className="featured">Hot</span>
                                </div>
                                <div className="product-image">
                                    <div className="product-thumb-inner">
                                        <a href="#">
                                            <img className="img-fluid" src={Product01} alt="image" />
                                        </a>
                                    </div>
                                    <div className="custom-icon">
                                        <ul className="list-unstyled">
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist"><i className="far fa-heart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to cart"><i className="fas fa-shopping-cart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="fa-solid fa-code-compare"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="product-btn">
                                        <a href="#" className="btn btn-light d-block">Add To cart<i className="fas fa-arrow-right-long ps-3"></i></a>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <div className="product-info">
                                        <div className="product-title">
                                            <h3><a href="shop-single.html">Hand Carving Sevan Wood Temple</a></h3>
                                        </div>
                                        <div className="product-star">
                                            <ul className="list-unstyled mb-1">
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="far fa-star-half-alt"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-prize">
                                        <p><span className="me-2">$81,000.00</span>$95,000.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="product">
                                <div className="product-label">
                                    <span className="featured">Hot</span>
                                </div>
                                <div className="product-image">
                                    <div className="product-thumb-inner">
                                        <a href="#">
                                            <img className="img-fluid" src={Product01} alt="image" />
                                        </a>
                                    </div>
                                    <div className="custom-icon">
                                        <ul className="list-unstyled">
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist"><i className="far fa-heart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to cart"><i className="fas fa-shopping-cart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="fa-solid fa-code-compare"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="product-btn">
                                        <a href="#" className="btn btn-light d-block">Add To cart<i className="fas fa-arrow-right-long ps-3"></i></a>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <div className="product-info">
                                        <div className="product-title">
                                            <h3><a href="shop-single.html">Hand Carving Sevan Wood Temple</a></h3>
                                        </div>
                                        <div className="product-star">
                                            <ul className="list-unstyled mb-1">
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="far fa-star-half-alt"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-prize">
                                        <p><span className="me-2">$81,000.00</span>$95,000.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="product">
                                <div className="product-label">
                                    <span className="onsale">Sale</span>
                                    <span className="featured">Hot</span>
                                </div>
                                <div className="product-image">
                                    <div className="product-thumb-inner">
                                        <a href="#">
                                            <img className="img-fluid" src={Product01} alt="image" />
                                        </a>
                                    </div>
                                    <div className="custom-icon">
                                        <ul className="list-unstyled">
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist"><i className="far fa-heart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to cart"><i className="fas fa-shopping-cart"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="fa-solid fa-code-compare"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="product-btn">
                                        <a href="#" className="btn btn-light d-block">Add To cart<i className="fas fa-arrow-right-long ps-3"></i></a>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <div className="product-info">
                                        <div className="product-title">
                                            <h3><a href="shop-single.html">Hand Carving Sevan Wood Temple</a></h3>
                                        </div>
                                        <div className="product-star">
                                            <ul className="list-unstyled mb-1">
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="fas fa-star"></i></li>
                                                <li><i className="far fa-star-half-alt"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-prize">
                                        <p><span className="me-2">$81,000.00</span>$95,000.00</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
      </section>
      {/* <!--=================================
            Product--> */}

      {/* <!--=================================
            Testimonial --> */}

      <section
        className="position-relative testimonial-dark-bg bg-overlay-black-6 space-pt bg-holder"
        style={{ backgroundImage: ` url(${BgImage1})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="section-title section-title-style-1">
                <span className="sub-title left-divider">Testimonial</span>
                <h2 className="title text-white">What to say about the client</h2>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="testimonial-description">
                <OwlCarousel className="owl-theme" items={1} nav={true} dots={false} loop={true} margin={10}>
                  <div className="testimonial">
                    <div className="testimonial-quote-icon">
                      <QuoteSvg></QuoteSvg>
                    </div>
                    <div className="testimonial-content">
                      <p className="mb-0">
                        <i>
                          It had an amazing experience with you!!! Your products are just awesome and fantastic...Keep up with the same flow... I am
                          just glad that I bought from you guys!!! You are really doing a great job... And your service is just amazing 👍👍👍👍
                        </i>{' '}
                      </p>
                    </div>
                    <div className="testimonial-author info-right">
                      <div className="testimonial-avatar avatar">
                        <img className="img-fluid" src={AvtarIcon01} alt="" />
                      </div>
                      <div className="testimonial-name d-flex align-items-center">
                        <h6 className="author-tittle">Pooja Liladhar Bagul</h6>
                        {/* <span className="text-white">Product Designer</span> */}
                      </div>
                    </div>
                  </div>
                  <div className="testimonial">
                    <div className="testimonial-quote-icon">
                      <QuoteSvg></QuoteSvg>
                    </div>
                    <div className="testimonial-content">
                      <p className="mb-0">
                        <i>
                          Positive: Professionalism, Quality, Responsiveness, Value Perfect quality of all the goods, I have lather bags, wallet, and
                          I am SO happy about their finishing, color style. Experience of the best service 👌, SO happy to have DHKND in CANADA 🇨🇦.
                          Specially in CALGARY. Thank you very much DHKND.
                        </i>
                      </p>
                    </div>
                    <div className="testimonial-author info-right">
                      <div className="testimonial-avatar avatar">
                        <img className="img-fluid" src={AvtarIcon01} alt="" />
                      </div>
                      <div className="testimonial-name d-flex align-items-center">
                        <h6 className="author-tittle">Nikul panchal</h6>
                        {/* <span className="text-white">Product Designer</span> */}
                      </div>
                    </div>
                  </div>
                  <div className="testimonial">
                    <div className="testimonial-quote-icon">
                      <QuoteSvg></QuoteSvg>
                    </div>
                    <div className="testimonial-content">
                      <p className="mb-0">
                        <i>
                          I ordered panchdhatu mandir from DHKND. Talking about : Size and quality : 5/5 Finishing : 5/5 Design : 5/5 Price : very
                          fair They have fitted light inside the mandir which make it so beautiful. Everytime when I contact the people , they are
                          super humble to answer all my questions Highly recommended especially when you are looking for ethnic products from back
                          home Good to have you in Canada 😃👍
                        </i>{' '}
                      </p>
                    </div>
                    <div className="testimonial-author info-right">
                      <div className="testimonial-avatar avatar">
                        <img className="img-fluid" src={AvtarIcon01} alt="" />
                      </div>
                      <div className="testimonial-name d-flex align-items-center">
                        <h6 className="author-tittle">Jinal Desai</h6>
                        {/* <span className="text-white">Product Designer</span> */}
                      </div>
                    </div>
                  </div>
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--=================================
            Testimonial --> */}

      {/* <!--=================================
            Blog --> */}
      <section className="space-ptb blog-section">
        <div className="container">
          <div className="row d-flex align-items-center mb-4 pb-3">
            <div className="col-md-12 col-lg-8 col-xl-6">
              <div className="section-title section-title-style-1 mb-0">
                <span className="sub-title left-divider">RECENT ARTICLES</span>
                <h2 className="title mb-0">Recent articles and news</h2>
              </div>
            </div>
            <div className="col-md-12 col-lg-4 col-xl-6 text-lg-end text-start mt-4 mt-lg-0">
              <a href="#" className="btn btn-primary">
                Visit the Blog<i className="fas fa-arrow-right-long ps-3"></i>
              </a>
            </div>
          </div>
          <div className="row">
            {/* {recentArticleData.length > 0
              ? recentArticleData.map((value: any, key: number) => (
                  <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    <div className="blog-post">
                      <div className="blog-img">
                        <img className="img-fluid" src={BlogImage} alt="#" />
                      </div>
                      <div className="blog-info">
                        <span>{moment(new Date(value.date)).format('MMM DD, YYYY')}</span>
                        <h4 className="blog-tittle">
                          <a href="blog-single.html">{value.articleName}</a>
                        </h4>
                        <a className="blog-link" href="blog-single.html">
                          Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              : ''} */}
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="blog-post">
                <div className="blog-img">
                  <img className="img-fluid" src={BlogImage} alt="#" />
                </div>
                <div className="blog-info">
                  <span>April 27, 2024</span>
                  <h4 className="blog-tittle">
                    <a href="blog-single.html">Article 1</a>
                  </h4>
                  <a className="blog-link" href="blog-single.html">
                    Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="blog-post">
                <div className="blog-img">
                  <img className="img-fluid" src={BlogImage1} alt="#" />
                </div>
                <div className="blog-info">
                  <span>April 27, 2024</span>
                  <h4 className="blog-tittle">
                    <a href="blog-single.html">Article 1</a>
                  </h4>
                  <a className="blog-link" href="blog-single.html">
                    Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="blog-post mb-0">
                <div className="blog-img">
                  <img className="img-fluid" src={BlogImage2} alt="#" />
                </div>
                <div className="blog-info">
                  <span>April 27, 2024</span>
                  <h4 className="blog-tittle">
                    <a href="blog-single.html">Article 1</a>
                  </h4>
                  <a className="blog-link" href="blog-single.html">
                    Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--=================================
            Blog --> */}

      {/* <!--=================================
            instagram --> */}
      <section className="instagram-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title section-title-style-1 text-center">
                <span className="sub-title left-divider">IN THE SPOTLIGHT</span>
                <h2 className="title">Our Instagram</h2>
                <div className="description">
                  <p>" We sell simple products, that define simplicity ."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-xl-12 col-lg-12 h-100">
              <OwlCarousel className="owl-theme" items={6} nav={true} dots={false}>
                <div className="text-center">
                  <a href="#">
                    <img className="img-fluid" src={Instagram1} alt="#" />
                  </a>
                </div>
                <div className="text-center">
                  <a href="#">
                    <img className="img-fluid" src={Instagram2} alt="#" />
                  </a>
                </div>
                <div className="text-center">
                  <a href="#">
                    <img className="img-fluid" src={Instagram3} alt="#" />
                  </a>
                </div>
                <div className="text-center">
                  <a href="#">
                    <img className="img-fluid" src={Instagram4} alt="#" />
                  </a>
                </div>
                <div className="text-center">
                  <a href="#">
                    <img className="img-fluid" src={Instagram5} alt="#" />
                  </a>
                </div>
                <div className="text-center">
                  <a href="#">
                    <img className="img-fluid" src={Instagram2} alt="#" />
                  </a>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>
      {/* <!--=================================
            instagram --> */}
    </>
  );
};

export default Login;
