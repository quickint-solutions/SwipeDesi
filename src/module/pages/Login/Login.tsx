import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { ReactComponent as QuoteSvg } from '../../../images/testimonial/quote.svg';
import AvtarIcon01 from '../../../images/avatar/01.jpg';
import BgImage from '../../../images/bg/banner-sale-off.jpg';
import BgImage1 from '../../../images/bg/bg-01.jpg';
import furnitureImage from '../../../images/furniture/img-01.jpg';
import furnitureImage1 from '../../../images/furniture/img-02.jpg';
import BlogImage from '../../../images/blogimage/blog-01.jpg';
import BlogImage1 from '../../../images/blogimage/blog-02.jpg';
import BlogImage2 from '../../../images/blogimage/blog-03.jpg';
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
import { InstagramEmbed } from 'react-social-media-embed';
import { getInstagram } from '../../../apiV2/instagram';

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

  const { isLoading: instagramLoading, data: instagramImages } = useQuery('instagramImages', getInstagram);

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
                        <img
                          className="img-fluid"
                          style={{ cursor: 'pointer' }}
                          src={banner.image}
                          alt="image"
                          onClick={() => navigate(`${banner.link}`)}
                        />
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
          <div className={`feature-categories-wrapper`}>
            <OwlCarousel
              className="owl-theme"
              autoplayTimeout={2500}
              autoplay={true}
              items={isMobile ? 2 : 5}
              loop={true}
              margin={10}
              nav={true}
              dots={false}
              animateIn="fadeIn"
              animateOut="fadeOut"
              mouseDrag={true}
            >
              {_.chunk(categories?.result?.filter((i: any) => !i.parentCategory) || []).map((categoriesData: any, key: number) => {
                return categoriesData.map((value: any, key: number) => {
                  if (value.parentCategory) return null;
                  const subCategories = categories?.result?.filter((i: any) => i.parentCategory?._id === value._id) || [];
                  const totalItems = subCategories?.length
                    ? subCategories.reduce((acc: any, curr: any) => acc + curr.itemCount, 0) + value.itemCount
                    : value.itemCount;
                  return (
                    <div
                      style={{ cursor: 'pointer', width: '100%' }}
                      className="featured-categories-column text-center"
                      onClick={() => {
                        navigate(`/products?category=${value._id}`);
                        setCategories(value._id);
                      }}
                    >
                      <div className="feature-categories-inner" key={key}>
                        <div className="categories-img">
                          <a href="javascript:void(0)">
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
                });
              })}
            </OwlCarousel>
          </div>

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
              <a href={`/products?category=6628c8c9927e3edd23258e23`} className="btn btn-primary">
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
                  <a href={`/products?category=6628c8c9927e3edd23258e23`} className="btn btn-light">
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
                      <a href={`/products?category=6628c8c9927e3edd23258e23`} className="btn btn-light">
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
                      <a href={`/products?category=6628c8c9927e3edd23258e23`} className="btn btn-light">
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
                          I was extremely excited about finding this hidden Gem of a place. The owners were very helpful at locating the exact Mandir
                          I was in search for. The location had many more unique and stunning Mandirs, Swing sets and accessories that are hand-made
                          in Gujarat and possibly other parts of India. The build quality was excellent for the product and very fairly priced. The
                          service was exceptional and the owners actually helped me load my purchases in my vehicle. It was very much appreciated.
                          Thank you kindly. Looking forward to doing more business with you.
                        </i>{' '}
                      </p>
                    </div>
                    <div className="testimonial-author info-right">
                      <div className="testimonial-avatar avatar"></div>
                      <div className="testimonial-name d-flex align-items-center">
                        <h6 className="author-tittle">Baadshah Hai From Fiji</h6>
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
                          We had an absolutely fantastic experience with DHKND when we recently bought a temple from them! Heema was incredibly kind,
                          courteous and cared about delivering the best product for our needs. The craftsman and quality of their work is high and
                          every member of their staff added to the great service. Their shop serves a niche purpose so well that I would highly
                          recommend this to anyone looking to purchase a temple or mandir for themselves. They went above and beyond the call of duty
                          - helping us not only decide but then carry the heavy temple out, secure it in our truck and then even texted us when we got
                          home to ensure we had no problems. Great price, great service and incredible people - what more can you ask for
                        </i>
                      </p>
                    </div>
                    <div className="testimonial-author info-right">
                      <div className="testimonial-avatar avatar"></div>
                      <div className="testimonial-name d-flex align-items-center">
                        <h6 className="author-tittle"> Deepti Kamal</h6>
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
                          I’m thrilled with the Sevan Wood Mandir and the outstanding service your team provided. The Mandir’s craftsmanship exceeded
                          expectations, adding an elegant touch to our space. The meticulous packaging ensured safe delivery to British Columbia,
                          showcasing your commitment to quality. I appreciate the personalized call to showcase other collections and the effort to
                          ensure timely delivery. However, a minor inconvenience was the light wiring socket was Indian, requiring an additional
                          converter. Overall, we’re delighted with the product and your service. Thank you for delivering exactly what we were looking
                          for
                        </i>{' '}
                      </p>
                    </div>
                    <div className="testimonial-author info-right">
                      <div className="testimonial-avatar avatar"></div>
                      <div className="testimonial-name d-flex align-items-center">
                        <h6 className="author-tittle"> Hemant Tripathi,Surrey, BC</h6>
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
                          Can’t describe Heema ji’s efforts and compassion in words. She helped us to get our new Mandir at our new home before hawan
                          in every possible way. Arranging a new beautiful mandir and assembling it in just a one day notice time, and then further
                          extending her warm help to drop my mom and wife to our new home, as Mandir won’t fit in without lowering my car’s seats, she
                          truly stand out as a true person. I can’t thank enough for her beautiful gesture and kindness. Everyone at Hawan praised a
                          lot for this beautiful mandir. Really happy to get a beautiful new home for our Kanha Thank you Heema ji. Stay blessed
                        </i>
                      </p>
                    </div>
                    <div className="testimonial-author info-right">
                      <div className="testimonial-avatar avatar"></div>
                      <div className="testimonial-name d-flex align-items-center">
                        <h6 className="author-tittle"> Parijat Hasija</h6>
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
              <div style={{ display: 'flex', justifyContent: 'center' }}></div>
              <OwlCarousel className="owl-theme" items={6} nav={true} dots={false}>
                {((instagramImages || []) as any)?.data
                  ?.filter((i: any) => i.thumbnail_url)
                  ?.map((media: any) => (
                    <div className="text-center">
                      <a href="https://www.instagram.com/dhknd.ca/">
                        <img className="img-fluid" src={media.thumbnail_url} alt="#" />
                      </a>
                    </div>
                  ))}
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
