import React, { useEffect, useState } from "react";
import moment from "moment";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import logoImage from "../../../images/logo.png";
import { ReactComponent as Icon1Svg } from '../../../images/icon-01.svg';
import { ReactComponent as Icon2Svg } from '../../../images/icon-02.svg';
import { ReactComponent as Icon3Svg } from '../../../images/icon-03.svg';
import { ReactComponent as Icon4Svg } from '../../../images/icon-04.svg';
import { ReactComponent as QuoteSvg } from '../../../images/testimonial/quote.svg';
import EnglishLang from "../../../images/en.png";
import AvtarIcon01 from "../../../images/avatar/01.jpg";
import AvtarIcon02 from "../../../images/avatar/02.jpg";
import AvtarIcon03 from "../../../images/avatar/03.jpg";
// import AvtarIcon04 from "../../../images/avatar/04.jpg";
import slider011 from "../../../images/slider/slider-011.jpg";
import sliderBanner from "../../../images/slider/slider-banner.jpg";
import sliderBanner2 from "../../../images/slider/slider-banner-02.gif";
import category01 from "../../../images/category-01.jpg";
import category02 from "../../../images/category-02.jpg";
import category03 from "../../../images/category-03.jpg";
import category04 from "../../../images/category-04.jpg";
import category05 from "../../../images/category-05.jpg";
import BannerSaleOff from "../../../images/banner-sale-off.jpg";
import FurnitureImg01 from "../../../images/furniture/img-01.jpg";
import FurnitureImg02 from "../../../images/furniture/img-02.jpg";
import FurnitureImg03 from "../../../images/furniture/img-03.jpg";
import Product01 from "../../../images/product/01.jpg";
import Bg01 from "../../../images/bg-01.jpg";
import Blog01 from "../../../images/blog-01.jpg";
import Blog02 from "../../../images/blog-02.jpg";
import Blog03 from "../../../images/blog-03.jpg";
import Instagram01 from "../../../images/instagram-01.jpg";
import Instagram02 from "../../../images/instagram-02.jpg";
import Instagram03 from "../../../images/instagram-03.jpg";
import Instagram04 from "../../../images/instagram-04.jpg";
import Instagram05 from "../../../images/instagram-05.jpg";
import Instagram06 from "../../../images/instagram-06.jpg";
import loginHttpRequest from "../../../api/login/loginHttpRequest";
import { useAppDispatch, useAppSelector } from "../../../api/store/configureStore";
import { getBannerCategoryData, getBannerImages, getBestCollectionData, getInTheSpotlightData, getLatestCollectioData, getRecentArticleData, getSaleBannerData, getTestimonialData } from "./loginSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const storeData = useAppSelector((state: any) => state.loginSlice);
    const [latestCollectionData, setLatestCollectionData] = useState<any>([]);
    const [bestCollectionData, setBestCollectionData] = useState<any>([]);
    const [recentArticleData, setRecentArticleData] = useState([]);
    const [spotlightData, setSpotlightData] = useState<any>([]);
    const [bannerCategoryData, setBannerCategoryData] = useState([]);
    const [saleBannerData, setSaleBannerData] = useState([]);
    const [testimonialData, setTestimonialData] = useState<any>([]);
    const [sliderImages, setSliderImages] = useState([]);
    const [sliderBannerImages, setSliderBannerImages] = useState<any>([]);
    console.log("storeDara", storeData)
    console.log("sliderImages", sliderImages)
    console.log("sliderBannerImages", sliderBannerImages);
    useEffect(() => {
        dispatch(getBannerImages());
        dispatch(getLatestCollectioData());
        dispatch(getBestCollectionData());
        dispatch(getRecentArticleData());
        dispatch(getInTheSpotlightData());
        dispatch(getBannerCategoryData());
        dispatch(getSaleBannerData());
        dispatch(getTestimonialData());
    }, []);

    useEffect(() => {
        if (storeData?.bannerImages && storeData?.bannerImages.length > 0) {
            let tempArr = [] as any;
            let tempArr2 = [] as any;
            for (let i = 0; i < 3; i++) {
                tempArr.push(storeData.bannerImages[i]);
            }
            setSliderImages(tempArr);
            if (storeData?.bannerImages.length > 2) {
                for (let i = 3; i < storeData?.bannerImages.length; i++) {
                    tempArr2.push(storeData.bannerImages[i]);
                }
            }
            setSliderBannerImages(tempArr2);
        }
    }, [storeData?.bannerImages]);

    useEffect(() => {
        if (storeData?.latestCollectionData && storeData?.latestCollectionData.length > 0) {
            setLatestCollectionData(storeData?.latestCollectionData);
        }
    }, [storeData?.latestCollectionData]);

    useEffect(() => {
        if (storeData?.bestCollectionData && storeData?.bestCollectionData.length > 0) {
            setBestCollectionData(storeData?.bestCollectionData);
        }
    }, [storeData?.bestCollectionData])

    useEffect(() => {
        if (storeData?.recentArticleData && storeData?.recentArticleData.length > 0) {
            setRecentArticleData(storeData?.recentArticleData);
        }
    }, [storeData?.recentArticleData])

    useEffect(() => {
        if (storeData?.spotlightData && storeData?.spotlightData.length > 0) {
            setSpotlightData(storeData?.spotlightData);
        }
    }, [storeData?.spotlightData])

    useEffect(() => {
        if (storeData?.bannerCategoryData && storeData?.bannerCategoryData.length > 0) {
            setBannerCategoryData(storeData?.bannerCategoryData);
        }
    }, [storeData?.bannerCategoryData])

    useEffect(() => {
        if (storeData?.saleBannerData && storeData?.saleBannerData.length > 0) {
            setSaleBannerData(storeData?.saleBannerData);
        }
    }, [storeData?.saleBannerData])

    useEffect(() => {
        if (storeData?.testimonialData && storeData?.testimonialData.length > 0) {
            setTestimonialData(storeData?.testimonialData);
        }
    }, [storeData?.testimonialData])

    const navigateToWishlist = (event: any) => {
        event.preventDefault(); 
        navigate("/wishlist");
    }


    return (
        <>
            {/* <!--=================================
            banner --> */}
            <section className="banner-02">
                <div className="banner-section-wrapper">
                    <div className="row g-1 g-lg-2">
                        <div className="col-7">
                            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {sliderImages.length > 0 ?
                                        sliderImages.map((value: any, key: number) => (
                                            <div className={key === 0 ? "carousel-item active" : "carousel-item"} key={key}>
                                                <img src={value?.ImagePath} className="d-block w-100" alt="..." />
                                            </div>
                                        ))
                                        : ""
                                    }
                                    {/* <div className="carousel-item active">
                                        <img src={slider011} className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={slider011} className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={slider011} className="d-block w-100" alt="..." />
                                    </div> */}
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
                        <div className="col-5">
                            <div className="row">
                                {sliderBannerImages.length > 0 ?
                                    <>
                                        <div className="col-12">
                                            <div className="slider-banner mb-1 mb-lg-2">
                                                <img className="img-fluid" src={sliderBannerImages[0].ImagePath} alt="image" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="slider-banner">
                                                <img className="img-fluid" src={sliderBannerImages[1].ImagePath} alt="image" />
                                            </div>
                                        </div>
                                    </>
                                    : ""
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--=================================
            banner --> */}
            {/* <!--=================================
            feature category --> */}
            <section className="space-ptb categories-section">
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
                    <div className="feature-categories-wrapper">
                        {bannerCategoryData.length > 0 ?
                            bannerCategoryData.map((value: any, key: number) => (
                                <div className="featured-categories-column text-center" key={key}>
                                    <div className="feature-categories-inner">
                                        <div className="categories-img">
                                            <a href="javascript:void(0)"> <img className="img-fluid" src={value.imagePath} alt="images" /></a>
                                        </div>
                                        <div className="categories-product text-center">
                                            {value.products} Products
                                        </div>
                                    </div>
                                    <h6 className="categories-title fw-medium mt-3"><a href="javascript:void(0)">{value.categoryName}</a></h6>
                                </div>
                            ))
                            : ""}
                        {/* <div className="featured-categories-column text-center">
                            <div className="feature-categories-inner">
                                <div className="categories-img">
                                    <a href="#"> <img className="img-fluid" src={category01} alt="images" /></a>
                                </div>
                                <div className="categories-product text-center">
                                    15 Products
                                </div>
                            </div>
                            <h6 className="categories-title fw-medium mt-3"><a href="#">Mandir</a></h6>
                        </div>
                        <div className="featured-categories-column text-center">
                            <div className="feature-categories-inner">
                                <div className="categories-img">
                                    <a href="#"> <img className="img-fluid" src={category02} alt="images" /></a>
                                </div>
                                <div className="categories-product text-center">
                                    10 Products
                                </div>
                            </div>
                            <h6 className="categories-title fw-medium mt-3"><a href="#">Furniture</a></h6>
                        </div>
                        <div className="featured-categories-column text-center">
                            <div className="feature-categories-inner">
                                <div className="categories-img">
                                    <a href="#"> <img className="img-fluid" src={category03} alt="images" /></a>
                                </div>
                                <div className="categories-product text-center">
                                    17 Products
                                </div>
                            </div>
                            <h6 className="categories-title fw-medium mt-3"><a href="#">Handicraft</a></h6>
                        </div>
                        <div className="featured-categories-column text-center">
                            <div className="feature-categories-inner">
                                <div className="categories-img">
                                    <a href="#"> <img className="img-fluid" src={category04} alt="images" /></a>
                                </div>
                                <div className="categories-product text-center">
                                    27 Products
                                </div>
                            </div>
                            <h6 className="categories-title fw-medium mt-3"><a href="#">Handicraft</a></h6>
                        </div>
                        <div className="featured-categories-column text-center">
                            <div className="feature-categories-inner">
                                <div className="categories-img">
                                    <a href="#"> <img className="img-fluid" src={category05} alt="images" /></a>
                                </div>
                                <div className="categories-product text-center">
                                    12 Products
                                </div>
                            </div>
                            <h6 className="categories-title fw-medium mt-3"><a href="#">Pooja Accessories</a></h6>
                        </div> */}
                    </div>
                </div>
            </section>
            {/* <!--=================================
            feature category --> */}

            {/* <!--=================================
            banner wrapper--> */}
            <section className="banner-wprapper">
                {saleBannerData.length > 0 ?
                    saleBannerData.map((value: any, key: number) => (
                        <div className="banner-inner py-5" style={{ backgroundImage: 'url(' + value.imagePath + ')', backgroundSize: "cover", backgroundPosition: "center center" }}>
                            <div className="container">
                                <div className="banner-content position-relative text-end">
                                    <h5>{value.discount}% Off</h5>
                                    <h6 className="text-uppercase fw-bold">{value.productName}</h6>
                                    <h2 className="mb-3 text-uppercase">Sale ends in 1 day</h2>
                                    <a href="#" className="btn btn-primary">Shop Now<i className="fas fa-arrow-right-long ps-3"></i></a>
                                </div>
                            </div>
                        </div>
                    ))
                    : ""
                }

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
                            <a href="#" className="btn btn-primary">View All<i className="fas fa-arrow-right-long ps-3"></i></a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="furniture-collection">
                                {bestCollectionData.length > 0 ?
                                    <>
                                        <div className="furniture-img">
                                            <img className="img-fluid" src={bestCollectionData[0].imagePath} alt="img" />
                                        </div>
                                        <div className="furniture-info">
                                            <p className="text-white text-uppercase mb-2">Sale up to 20% OFF all items</p>
                                            <h3 className="furniture-title text-white mb-3 mb-sm-4">{bestCollectionData[0].productName}</h3>
                                            <a href="#" className="btn btn-light">Shop Now<i className="fas fa-arrow-right-long ps-3"></i></a>
                                        </div>
                                    </>
                                    : ""
                                }

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                {bestCollectionData.length > 1 ?
                                    bestCollectionData.map((value: any, key: number) => (
                                        key !== 0 ?
                                            <div className="col-12">
                                                <div className="furniture-collection mb-4 mt-lg-0 mt-4">
                                                    <div className="furniture-img">
                                                        <img className="img-fluid" src={value.imagePath} alt="img" />
                                                        {/* <a href="javascript:void(0)"> <img className="img-fluid" src={value.imagePath} alt="images" /></a> */}
                                                    </div>
                                                    <div className="furniture-info">
                                                        <p className="text-white text-uppercase mb-2">Sale up to 20% OFF all items</p>
                                                        <h3 className="furniture-title text-white mb-3 mb-sm-4">{value.productName}</h3>
                                                        <a href="#" className="btn btn-light">Shop Now<i className="fas fa-arrow-right-long ps-3"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            : ""
                                    ))
                                    : ""
                                }
                                {/* <div className="col-12">
                                    <div className="furniture-collection mb-4 mt-lg-0 mt-4">
                                        <div className="furniture-img">
                                            <img className="img-fluid" src={FurnitureImg02} alt="img" />
                                        </div>
                                        <div className="furniture-info">
                                            <p className="text-white text-uppercase mb-2">Sale up to 20% OFF all items</p>
                                            <h3 className="furniture-title text-white mb-3 mb-sm-4">Wooden Sofa Set</h3>
                                            <a href="#" className="btn btn-light">Shop Now<i className="fas fa-arrow-right-long ps-3"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="furniture-collection">
                                        <div className="furniture-img">
                                            <img className="img-fluid" src={FurnitureImg03} alt="img" />
                                        </div>
                                        <div className="furniture-info">
                                            <p className="text-white text-uppercase mb-2">Sale up to 20% OFF all items</p>
                                            <h3 className="furniture-title text-white mb-3 mb-sm-4">Living Room Furniture</h3>
                                            <a href="#" className="btn btn-light">Shop Now<i className="fas fa-arrow-right-long ps-3"></i></a>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--=================================
            furniture --> */}

            {/* <!--=================================
            Product --> */}
            <section className="space-pt pb-md-5 pb-4">
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
                        {latestCollectionData.length > 0 ?
                            latestCollectionData.map((value: any, key: number) => (
                                <div className="col-xl-3 col-lg-4 col-md-6" key={key}>
                                    <div className="product" onClick={() => navigate(`/shopSingle?productId=${value.productId}&category=${value.category?.replace(/,/g, "-")}`)}>
                                        <div className="product-label">
                                            <span className="onsale">17%</span>
                                        </div>
                                        <div className="product-image">
                                            <div className="product-thumb-inner">
                                                <a href="javascript:void(0)">
                                                    <img className="img-fluid" src={value.imagePath} alt="image" />
                                                    {/* <img className="img-fluid" src={Product01} alt="image" /> */}
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
                                                <a href="javascript:void(0)" className="btn btn-light d-block">Add To cart<i className="fas fa-arrow-right-long ps-3"></i></a>
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
                                                <p><span className="me-2">$81,000.00</span>${value.price?.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : ""}
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
            {testimonialData.length ?
                <section className="position-relative testimonial-dark-bg bg-overlay-black-6 space-pt bg-holder" style={{ backgroundImage: 'url(' + testimonialData[0]?.imagePath + ')' }}>
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
                                    <OwlCarousel className='owl-theme' items={1} nav={true} dots={false} loop={true} margin={10}>

                                        <div className="testimonial">
                                            <div className="testimonial-quote-icon">
                                                <QuoteSvg></QuoteSvg>
                                            </div>
                                            <div className="testimonial-content">
                                                <p className="mb-0"><i>{testimonialData[0]?.description}</i> </p>
                                            </div>
                                            <div className="testimonial-author info-right">
                                                <div className="testimonial-avatar avatar">
                                                    <img className="img-fluid" src={AvtarIcon01} alt="" />
                                                </div>
                                                <div className="testimonial-name d-flex align-items-center">
                                                    <h6 className="author-tittle">Alice Williams</h6>
                                                    <span className="text-white">Product Designer</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="testimonial">
                                        <div className="testimonial-quote-icon">
                                            <QuoteSvg></QuoteSvg>
                                        </div>
                                        <div className="testimonial-content">
                                            <p className="mb-0 "><i>So, how can we stay on course with all the distractions in our lives? Willpower is a good start, the distractions are everywhere and endless but it’s very difficult to stay on track simply through willpower.</i> </p>
                                        </div>
                                        <div className="testimonial-author info-right">
                                            <div className="testimonial-avatar avatar">
                                                <img className="img-fluid" src={AvtarIcon02} alt="" />
                                            </div>
                                            <div className="testimonial-name d-flex align-items-center">
                                                <h6 className="author-tittle text-white">Harry Russell</h6>
                                                <span className="text-white">Advisors</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="testimonial">
                                        <div className="testimonial-quote-icon">
                                            <QuoteSvg></QuoteSvg>
                                        </div>
                                        <div className="testimonial-content">
                                            <p className="mb-0 "><i>So, how can we stay on course with all the distractions in our lives? Willpower is a good start, the distractions are everywhere and endless but it’s very difficult to stay on track simply through willpower.</i> </p>
                                        </div>
                                        <div className="testimonial-author info-right">
                                            <div className="testimonial-avatar avatar">
                                                <img className="img-fluid" src={AvtarIcon03} alt="" />
                                            </div>
                                            <div className="testimonial-name d-flex align-items-center">
                                                <h6 className="author-tittle text-white">Harry Russell</h6>
                                                <span className="text-white">Advisors</span>
                                            </div>
                                        </div>
                                    </div> */}

                                    </OwlCarousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : ""}
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
                            <a href="#" className="btn btn-primary">Visit the Blog<i className="fas fa-arrow-right-long ps-3"></i></a>
                        </div>
                    </div>
                    <div className="row">
                        {recentArticleData.length > 0 ?
                            recentArticleData.map((value: any, key: number) => (
                                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                    <div className="blog-post">
                                        <div className="blog-img">
                                            <img className="img-fluid" src={value.imagePath} alt="#" />
                                        </div>
                                        <div className="blog-info">
                                            <span>{moment(new Date(value.date)).format("MMM DD, YYYY")}</span>
                                            <h4 className="blog-tittle"><a href="blog-single.html">{value.articleName}</a></h4>
                                            <a className="blog-link" href="blog-single.html">Read More<i className="fa-solid fa-arrow-right-long ps-2"></i></a>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : ""}
                        {/* <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div className="blog-post">
                                <div className="blog-img">
                                    <img className="img-fluid" src={Blog01} alt="#" />
                                </div>
                                <div className="blog-info">
                                    <span>February 4, 2022</span>
                                    <h4 className="blog-tittle"><a href="blog-single.html">Better than snoozing: driving an EV</a></h4>
                                    <a className="blog-link" href="blog-single.html">Read More<i className="fa-solid fa-arrow-right-long ps-2"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div className="blog-post">
                                <div className="blog-img">
                                    <img className="img-fluid" src={Blog02} alt="#" />
                                </div>
                                <div className="blog-info">
                                    <span>March 8, 2022</span>
                                    <h4 className="blog-tittle"><a href="blog-single.html">Saving the world, one charge at a time</a></h4>
                                    <a className="blog-link" href="blog-single.html">Read More<i className="fa-solid fa-arrow-right-long ps-2"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="blog-post mb-0">
                                <div className="blog-img">
                                    <img className="img-fluid" src={Blog03} alt="#" />
                                </div>
                                <div className="blog-info">
                                    <span>April 7, 2022</span>
                                    <h4 className="blog-tittle"><a href="blog-single.html">It’s time to plug-in to the new road ahead!</a></h4>
                                    <a className="blog-link" href="blog-single.html">Read More<i className="fa-solid fa-arrow-right-long ps-2"></i></a>
                                </div>
                            </div>
                        </div> */}
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
                            {spotlightData.length > 0 ?
                                <OwlCarousel className='owl-theme' items={6} nav={true} dots={false}>
                                    {
                                        spotlightData.map((value: any, key: number) => (
                                            <div key={key}>
                                                <img src={value.imagePath} alt="Image" />
                                            </div>
                                        ))
                                    }
                                    {/* {spotlightData.length > 0 ?
                                    spotlightData.map((value: any, key: number) => (
                                        <div className="text-center" key={key}>
                                            <a href="j#"><img className="img-fluid" src={value.imagePath} alt="#" /></a>
                                        </div>
                                    ))
                                    : ""} */}
                                    {/* <div className="text-center">
                                    <a href="#"><img className="img-fluid" src={Instagram01} alt="#" /></a>
                                </div>
                                <div className="text-center">
                                    <a href="#"><img className="img-fluid" src={Instagram02} alt="#" /></a>
                                </div>
                                <div className="text-center">
                                    <a href="#"><img className="img-fluid" src={Instagram03} alt="#" /></a>
                                </div>
                                <div className="text-center">
                                    <a href="#"><img className="img-fluid" src={Instagram04} alt="#" /></a>
                                </div>
                                <div className="text-center">
                                    <a href="#"><img className="img-fluid" src={Instagram05} alt="#" /></a>
                                </div>
                                <div className="text-center">
                                    <a href="#"><img className="img-fluid" src={Instagram06} alt="#" /></a>
                                </div> */}
                                </OwlCarousel>
                                : ""}
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--=================================
            instagram --> */}


        </>
    )
}

export default Login;