import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Slider from 'react-slick';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Product1 from '../../../images/product/01.jpg';
import Product2 from '../../../images/product/02.jpg';
import MandirBgImg from '../../../images/bg/mandir-banner.jpg';
import MandirBgImg2 from '../../../images/bg/Mandir-1920-x-490-px.jpg';
import shopSingleHttpRequest from '../../../api/shopSingleHttpRequest';
import { useAppSelector } from '../../../api/store/configureStore';
import { getUserDetail } from '../../../helpers/common';
import cartHttpRequest from '../../../api/cart/cartHttpRequest';
import { useQuery } from 'react-query';
import { getItemsByCategory, getItemsById } from '../../../apiV2/items';
import { AuthContext } from '../../../context/auth.context';
import { CartContext } from '../../../context/cart.context';
import ProductItem from '../../../components/ProductItem';

const ShopSingle: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storeData = useAppSelector((state: any) => state.loginSlice);
  const userDetail = getUserDetail();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [relatedProductData, setRelatedProductData] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { data: itemDetails } = useQuery('itemDetails', async () => {
    let productId = searchParams.get('productId');
    if (productId) {
      return await getItemsById(productId);
    }
  });

  const { data: itemsByCategory } = useQuery('relatedProductData', async () => {
    let productId = searchParams.get('productId');
    if (productId) {
      let itemDetails = await getItemsById(productId);
      return await getItemsByCategory(itemDetails?.categories?._id);
    }
  });

  const addToWishlist = async () => {
    if (userDetail) {
      let wishlistData = await shopSingleHttpRequest.addToWishlist(userDetail?.userID, itemDetails?._id, 'add');
      if (wishlistData[0]?.Status) {
        navigate(`/wishlist?productId=${itemDetails?._id}`);
      } else {
        alert(wishlistData[0].Message);
      }
    } else {
      (window as any).$('#formLoginRegister').modal('show');
    }
  };

  const { user } = useContext(AuthContext);
  const { addItem, isItemInCart, items } = useContext(CartContext);

  const addToCart = async () => {
    let productId = searchParams.get('productId');
    if (user) {
      addItem(itemDetails, quantity);
      alert(quantity + ' Product added to cart');
    } else {
      (window as any).$('#formLoginRegister').modal('show');
    }
  };

  const findCartItem = items.find((cartItem: any) => cartItem._id === itemDetails._id);

  return (
    <>
      <section className="header-inner header-inner-menu bg-overlay-secondary" style={{ backgroundImage: `url('${itemDetails?.images?.[0]}')` }}>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 position-relative">
              <div className="header-inner-title">
                <div className="section-title">
                  <div className="sub-title">
                    <span></span>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a className="text-white text-uppercase" href="javascript:void(0)" onClick={() => navigate('/')}>
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item active">{`Product View`}</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>{itemDetails?.name || 'No item name'}</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="header-inner-shape" style={{ backgroundImage: 'url(' + MandirBgImg2 + ')' }}></div> */}
      </section>
      {itemDetails ? (
        <section className="space-ptb shop-single">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-md-5 mb-4 mb-md-0">
                    <div className="slider-slick">
                      <div className="slider slider-for detail-big-car-gallery">
                        {itemDetails?.images.map((value: any, key: number) => <img className="img-fluid" src={value} alt="" />)}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="product-detail">
                      <h4 className="fw-600">{itemDetails?.name || 'No Product name'}</h4>
                      <div className="product-price-rating">
                        <div className="product-rating d-flex">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star-half-alt text-warning"></i>
                          <i className="far fa-star text-warning"></i>
                          <div className="text-dark ms-2" rel="nofollow">
                            (<span className="count">4</span> customer reviews)
                          </div>
                        </div>
                        <div className="product-price">
                          <h4>
                            <del>${Number(itemDetails.price)?.toFixed(2)}</del>
                            <span>${Number(itemDetails.price)}</span>
                          </h4>
                        </div>
                      </div>
                      <p dangerouslySetInnerHTML={{ __html: itemDetails.descriptions }}></p>
                      {/* <p className="mb-4 mb-sm-5">The best way is to develop and follow a plan. Start with your goals in mind and then work backwards to develop the plan. What steps are required to get you to the goals? Make the plan as detailed as possible. Try to visualize and then plan for, every possible setback. Commit the plan to paper and then keep it with you at all times. Review it regularly and ensure that every step takes you closer to your Vision and Goals. If the plan doesn’t support the vision then change it!</p> */}
                      <div className="justify-content-start d-flex add-to-cart-input">
                        <div className="input-group">
                          <input
                            type="number"
                            name="quant[1]"
                            className="form-control input-number mt-2 mt-sm-0"
                            value={quantity}
                            min="1"
                            max="10"
                            onChange={e => setQuantity(Number(e.target.value))}
                          />
                        </div>
                        <a className="btn btn-primary mt-2 mt-sm-0" href="javascript:void(0)" onClick={() => addToCart()}>
                          {' '}
                          <span> Add To Cart </span>{' '}
                        </a>
                      </div>
                      <div style={{ marginTop: 5 }}>
                        {isItemInCart(itemDetails) ? `${findCartItem.quantity} quantity of this item is already in cart` : null}
                      </div>

                      <div className="product-summary">
                        <a className="" href="javascript:void(0)" onClick={() => addToWishlist()}>
                          <i className="far fa-heart"></i>Add to Wishlist
                        </a>
                      </div>
                      <hr className="hr-dark" />
                      <div className="product-detail-meta">
                        <span>SKU: {itemDetails.sku} </span>

                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          Category:
                          <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>{itemDetails?.categories?.name || 'No item category'}</span>
                        </span>
                      </div>
                      <div className="product-detail-social">
                        <span>Share :</span>
                        <ul>
                          <li>
                            <a
                              onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`, '_blank')}
                              target="_blank"
                            >
                              <i className="fab fa-whatsapp"></i>
                            </a>
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
      ) : (
        ''
      )}
      {itemsByCategory?.result?.length > 0 ? (
        <section className="space-pb">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="title mb-4">
                  <h4 className="fw-600">Related products</h4>
                </div>
                <div className="row">{itemsByCategory?.result?.map((value: any, key: number) => <ProductItem product={value} key={key} />)}</div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default ShopSingle;
