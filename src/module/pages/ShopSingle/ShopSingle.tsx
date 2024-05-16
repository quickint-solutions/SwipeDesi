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
import { getCategories } from '../../../apiV2/categories';

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

  const [quantity, setQuantity] = useState(1);

  const { data: itemDetails, isLoading } = useQuery('itemDetails', async () => {
    let productId = searchParams.get('productId');
    if (productId) {
      return await getItemsById(productId);
    }
  });

  const { isLoading: categoriesLoading, data: categories } = useQuery('getCategories', getCategories);

  const { data: itemsByCategory } = useQuery('relatedProductData', async () => {
    let productId = searchParams.get('productId');
    if (productId) {
      let itemDetails = await getItemsById(productId);
      return await getItemsByCategory(itemDetails?.categories?._id);
    }
  });

  const categoriesDetails =
    categories?.result?.find((i: any) => i._id === itemDetails?.categories?.parentCategory || itemDetails?.categories?._id) || [];

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
  if (isLoading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h3>Please Wait...</h3>
      </div>
    );

  return (
    <>
      <section
        className="header-inner header-inner-menu bg-overlay-secondary mandir-bg"
        style={{ backgroundImage: 'url(' + categoriesDetails?.banner + ')' }}
      >
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
      </section>

      {itemDetails ? (
        <section className="space-ptb shop-single">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-md-5 mb-4 mb-md-0">
                    <OwlCarousel autoplayTimeout={3000} autoplay={true} items={1} loop={true} margin={10}>
                      {itemDetails?.images.map((value: any, key: number) => <img className="img-fluid" src={value} alt="" />)}
                    </OwlCarousel>
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
                            {itemDetails.oldPrice && <del>${Number(itemDetails.oldPrice)?.toFixed(2)}</del>}
                            <span>${Number(itemDetails.price)}</span>
                          </h4>
                        </div>
                      </div>
                      <p className="sora-fonts" dangerouslySetInnerHTML={{ __html: itemDetails.descriptions }}></p>
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
                <div className="row mt-5">
                  <div className="col-lg-12">
                    <div className="nav-tabs-02">
                      <nav>
                        <ul className="nav nav-tabs mb-4" id="myTab2" role="tablist">
                          <li className="nav-item" role="presentation">
                            {' '}
                            <a
                              className="nav-link active"
                              id="nav-description-tab"
                              data-bs-toggle="tab"
                              href="#nav-description"
                              role="tab"
                              aria-controls="nav-description"
                              aria-selected="true"
                            >
                              Description
                            </a>
                          </li>
                          <li className="nav-item" role="presentation">
                            <a
                              className="nav-link"
                              id="nav-reviews-tab"
                              data-bs-toggle="tab"
                              href="#nav-reviews"
                              role="tab"
                              aria-controls="nav-reviews"
                              aria-selected="false"
                            >
                              Reviews
                            </a>
                          </li>
                          <li className="nav-item" role="presentation">
                            <a
                              className="nav-link"
                              id="nav-custom-tab"
                              data-bs-toggle="tab"
                              href="#nav-custom"
                              role="tab"
                              aria-controls="nav-custom"
                              aria-selected="false"
                            >
                              Installation Guide
                            </a>
                          </li>
                        </ul>
                      </nav>
                      <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab">
                          <div className="row sora-fonts" dangerouslySetInnerHTML={{ __html: itemDetails?.custom }}></div>
                        </div>
                        <div className="tab-pane fade" id="nav-reviews" role="tabpanel" aria-labelledby="nav-reviews-tab">
                          <div className="row">
                            <div className="col-12">
                              <h5 className="mb-4 fw-600">Reviews for DHKND</h5>
                              <div className="commentlist">
                                {/* <div className="comment-author">
                                  <img className="avatar avatar-lg rounded-circle" src="images/avatar/01.jpg" alt="" />
                                </div> */}
                                <div className="comment-content">
                                  <div className="reviews">
                                    <p className="meta">
                                      <strong>Baadshah Hai From Fiji </strong> (verified buyer)
                                    </p>
                                    <div className="rating">
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                    </div>
                                  </div>
                                  <p>
                                    I was extremely excited about finding this hidden Gem of a place. The owners were very helpful at locating the
                                    exact Mandir I was in search for. The location had many more unique and stunning Mandirs, Swing sets and
                                    accessories that are hand-made in Gujarat and possibly other parts of India. The build quality was excellent for
                                    the product and very fairly priced. The service was exceptional and the owners actually helped me load my
                                    purchases in my vehicle. It was very much appreciated. Thank you kindly. Looking forward to doing more business
                                    with you.
                                  </p>
                                </div>
                              </div>
                              <div className="commentlist">
                                {/* <div className="comment-author">
                                  <img className="avatar avatar-lg rounded-circle" src="images/avatar/01.jpg" alt="" />
                                </div> */}
                                <div className="comment-content">
                                  <div className="reviews">
                                    <p className="meta">
                                      <strong>Deepti Kamal </strong> (verified buyer)
                                    </p>
                                    <div className="rating">
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                    </div>
                                  </div>
                                  <p>
                                    We had an absolutely fantastic experience with DHKND when we recently bought a temple from them! Heema was
                                    incredibly kind, courteous and cared about delivering the best product for our needs. The craftsman and quality of
                                    their work is high and every member of their staff added to the great service. Their shop serves a niche purpose
                                    so well that I would highly recommend this to anyone looking to purchase a temple or mandir for themselves. They
                                    went above and beyond the call of duty - helping us not only decide but then carry the heavy temple out, secure it
                                    in our truck and then even texted us when we got home to ensure we had no problems. Great price, great service and
                                    incredible people - what more can you ask for!
                                  </p>
                                </div>
                              </div>
                              <div className="commentlist">
                                {/* <div className="comment-author">
                                  <img className="avatar avatar-lg rounded-circle" src="images/avatar/01.jpg" alt="" />
                                </div> */}
                                <div className="comment-content">
                                  <div className="reviews">
                                    <p className="meta">
                                      <strong>Hemant Tripathi,Surrey, BC </strong> (verified buyer)
                                    </p>
                                    <div className="rating">
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                    </div>
                                  </div>
                                  <p>
                                    I’m thrilled with the Sevan Wood Mandir and the outstanding service your team provided.
                                    <br />
                                    <br />
                                    The Mandir’s craftsmanship exceeded expectations, adding an elegant touch to our space. The meticulous packaging
                                    ensured safe delivery to British Columbia, showcasing your commitment to quality.
                                    <br />
                                    <br />
                                    I appreciate the personalized call to showcase other collections and the effort to ensure timely delivery.
                                    However, a minor inconvenience was the light wiring socket was Indian, requiring an additional converter.
                                    <br />
                                    <br />
                                    Overall, we’re delighted with the product and your service. Thank you for delivering exactly what we were looking
                                    for.
                                  </p>
                                </div>
                              </div>
                              <div className="commentlist">
                                {/* <div className="comment-author">
                                  <img className="avatar avatar-lg rounded-circle" src="images/avatar/01.jpg" alt="" />
                                </div> */}
                                <div className="comment-content">
                                  <div className="reviews">
                                    <p className="meta">
                                      <strong>Parijat Hasija </strong> (verified owner)
                                    </p>
                                    <div className="rating">
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                      <i className="text-warning fas fa-star"></i>
                                    </div>
                                  </div>
                                  <p>
                                    Can’t describe Heema ji’s efforts and compassion in words. She helped us to get our new Mandir at our new home
                                    before hawan in every possible way. Arranging a new beautiful mandir and assembling it in just a one day notice
                                    time, and then further extending her warm help to drop my mom and wife to our new home, as Mandir won’t fit in
                                    without lowering my car’s seats, she truly stand out as a true person. I can’t thank enough for her beautiful
                                    gesture and kindness. Everyone at Hawan praised a lot for this beautiful mandir. Really happy to get a beautiful
                                    new home for our Kanha 🙏🏻 Thank you Heema ji. Stay blessed 🙏🏻
                                  </p>
                                </div>
                              </div>

                              {/* <div className="mt-4 ">
                                <h5 className="fw-600">Add a review</h5>
                                <p>Your email address will not be published. Required fields are marked *</p>
                              </div> */}
                              {/* <form className="row mt-4 align-items-center">
                                <div className="mb-3 col-sm-6">
                                  <label className="form-label">Name*</label>
                                  <input type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="mb-3 col-sm-6">
                                  <label className="form-label">Email</label>
                                  <input type="email" className="form-control" placeholder="" />
                                </div>
                                <div className="col-sm-12">
                                  <label className="form-label">Your review *</label>
                                  <div className="mb-3">
                                    <textarea className="form-control" rows={5} id="comment"></textarea>
                                  </div>
                                </div>
                                <div className="form-check col-sm-12 p-0">
                                  <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked02" checked={false} />
                                    <label className="form-check-label ps-2" htmlFor="flexCheckChecked02">
                                      Save my name, email, and website in this browser for the next time I comment.
                                    </label>
                                  </div>
                                </div>
                                <div className="col-sm-12">
                                  <label className="form-label">Your review *</label>
                                  <div className="product-rating">
                                    <i className="fas fa-star text-warning"></i>
                                    <i className="fas fa-star text-warning"></i>
                                    <i className="fas fa-star text-warning"></i>
                                    <i className="far fa-star text-warning"></i>
                                    <i className="far fa-star text-warning"></i>
                                  </div>
                                </div>
                                <div className="col-sm-12">
                                  <a className="btn btn-primary btn-md mt-4" href="#">
                                    {' '}
                                    Submit{' '}
                                  </a>
                                </div>
                              </form> */}
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="nav-custom" role="tabpanel" aria-labelledby="nav-custom-tab">
                          <div className="row">
                            <div className="col-12">
                              <div className="row sora-fonts" dangerouslySetInnerHTML={{ __html: itemDetails?.installationGuide }}></div>
                            </div>
                          </div>
                        </div>
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
