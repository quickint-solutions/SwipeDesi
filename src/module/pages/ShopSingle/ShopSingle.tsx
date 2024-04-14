import React, { useEffect, useState } from 'react';
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
  const [productDetail, setProductDetail] = useState<any>(null);
  const [relatedProductData, setRelatedProductData] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let productId = searchParams.get('productId');
    if (productId) {
      getProductDetail(Number(productId));
    }
  }, []);

  const getProductDetail = async (productId: number) => {
    let productData = await shopSingleHttpRequest.getProductDetailById(productId);
    setProductDetail(productData);
    // let filterData = storeData?.latestCollectionData?.filter((a: any) => a.productId === productId)[0];
    let category = searchParams.get('category');
    if (category) {
      category = category.replace(/-/g, ',');
      let relatedData = await shopSingleHttpRequest.getRelatedProductDetailByCategory(category);
      setRelatedProductData(relatedData);
    }
  };

  const addToWishlist = async () => {
    if (userDetail) {
      let wishlistData = await shopSingleHttpRequest.addToWishlist(userDetail?.userID, productDetail?.productID, 'add');
      if (wishlistData[0]?.Status) {
        navigate(`/wishlist?productId=${productDetail?.productID}`);
      } else {
        alert(wishlistData[0].Message);
      }
    } else {
      (window as any).$('#formLoginRegister').modal('show');
    }
  };

  const addToCart = async () => {
    let productId = searchParams.get('productId');
    if (userDetail) {
      let requestParam = {
        productID: productId ? Number(productId) : 0,
        quantity: quantity,
        userID: userDetail?.userID,
      };
      let cartData = await cartHttpRequest.addProductToCart(requestParam);
      if (cartData?.status) {
        navigate('/Cart');
      } else {
        alert(cartData?.message);
      }
    } else {
      (window as any).$('#formLoginRegister').modal('show');
    }
  };

  console.log('relatedProductData', relatedProductData);

  return (
    <>
      <section
        className="header-inner header-inner-menu bg-overlay-secondary"
        style={{ backgroundImage: 'url(' + process.env.REACT_APP_IMAGE_BASE_URL + productDetail?.imagePath?.replace('~', '') + ')' }}
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
                      <li className="breadcrumb-item active">Shop Single</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>Shop Single</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="header-inner-shape" style={{ backgroundImage: 'url(' + MandirBgImg2 + ')' }}></div> */}
      </section>
      {productDetail ? (
        <section className="space-ptb shop-single">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-md-5 mb-4 mb-md-0">
                    <div className="slider-slick">
                      <div className="slider slider-for detail-big-car-gallery">
                        {productDetail?.galleries?.length > 0 ? (
                          <Slider {...settings}>
                            {productDetail?.galleries.map((value: any, key: number) => (
                              <img className="img-fluid" src={process.env.REACT_APP_IMAGE_BASE_URL + value.imagePath?.replace('~', '')} alt="" />
                            ))}
                            {/* <img className="img-fluid" src={Product1} alt="" />
                                                    <img className="img-fluid" src={Product2} alt="" />
                                                    <img className="img-fluid" src={Product1} alt="" />
                                                    <img className="img-fluid" src={Product2} alt="" />
                                                    <img className="img-fluid" src={Product1} alt="" />
                                                    <img className="img-fluid" src={Product2} alt="" /> */}
                          </Slider>
                        ) : (
                          ''
                        )}
                        {/* <Slider {...settings}>
                                                    <img className="img-fluid" src={Product1} alt="" />
                                                    <img className="img-fluid" src={Product2} alt="" />
                                                    <img className="img-fluid" src={Product1} alt="" />
                                                    <img className="img-fluid" src={Product2} alt="" />
                                                    <img className="img-fluid" src={Product1} alt="" />
                                                    <img className="img-fluid" src={Product2} alt="" />
                                                </Slider> */}
                        {/* <img className="img-fluid" src={Product1} alt="" />
                                            <img className="img-fluid" src={Product2} alt="" />
                                            <img className="img-fluid" src={Product1} alt="" />
                                            <img className="img-fluid" src={Product2} alt="" />
                                            <img className="img-fluid" src={Product1} alt="" />
                                            <img className="img-fluid" src={Product2} alt="" /> */}
                      </div>
                      {/* <div className="slider slider-nav mt-2">
                                            <img className="img-fluid" src={Product1} alt="" />
                                            <img className="img-fluid" src={Product2} alt="" />
                                            <img className="img-fluid" src={Product1} alt="" />
                                            <img className="img-fluid" src={Product2} alt="" />
                                            <img className="img-fluid" src={Product1} alt="" />
                                            <img className="img-fluid" src={Product2} alt="" />
                                        </div> */}
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="product-detail">
                      <h4 className="fw-600">{productDetail.productName}</h4>
                      <div className="product-price-rating">
                        <div className="product-rating d-flex">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star-half-alt text-warning"></i>
                          <i className="far fa-star text-warning"></i>
                          <a href="#reviews" className="text-dark ms-2" rel="nofollow">
                            (<span className="count">4</span> customer reviews)
                          </a>
                        </div>
                        <div className="product-price">
                          <h4>
                            <del>${productDetail.oldPrice?.toFixed(2)}</del>
                            <span>${productDetail.price}</span>
                          </h4>
                        </div>
                      </div>
                      <p dangerouslySetInnerHTML={{ __html: productDetail.shortDescription }}></p>
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
                      <div className="product-summary">
                        <a className="" href="javascript:void(0)" onClick={() => addToWishlist()}>
                          <i className="far fa-heart"></i>Add to Wishlist
                        </a>
                        <a className="" href="#">
                          <i className="fa fa-compress-alt" aria-hidden="true"></i>Compare
                        </a>
                      </div>
                      <hr className="hr-dark" />
                      <div className="product-detail-meta">
                        <span>SKU: {productDetail.sku} </span>
                        {/* <span>Category: <a href="#"> Travel, </a> <a href="#"> Lifestyle</a> </span> */}
                        <span>
                          Category:
                          {productDetail?.category?.length > 0
                            ? productDetail?.category?.map((value: any, key: number) => <a href="#"> {value.category}, </a>)
                            : '-'}
                        </span>
                        {/* <span>Tags: <a href="#">Fashion,</a> <a href="#">Lifestyle,</a> <a href="#">Travel</a>   </span> */}
                        <span>
                          Tags:
                          {productDetail?.tags?.length > 0
                            ? productDetail?.tags.map((value: any, key: number) => <a href="#"> {value.tag}, </a>)
                            : '-'}
                        </span>
                      </div>
                      <div className="product-detail-social">
                        <span>Share :</span>
                        <ul>
                          <li>
                            <a href="#">
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-instagram"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-pinterest-p"></i>
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
                              Custom
                            </a>
                          </li>
                        </ul>
                      </nav>
                      <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab">
                          <div className="row" dangerouslySetInnerHTML={{ __html: productDetail?.description }}>
                            {/* <div className="col-sm-12">
                                                            <div className="mb-4">
                                                                <h5 className="mb-3 fw-600">So why do we do it?</h5>
                                                                <p className="mb-0"> The best way is to develop and follow a plan. Start with your goals in mind and then work backwards to develop the plan. What steps are required to get you to the goals? Make the plan as detailed as possible. Try to visualize and then plan for, every possible setback. Commit the plan to paper and then keep it with you at all times. Review it regularly and ensure that every step takes you closer to your Vision and Goals. If the plan doesn’t support the vision then change it!</p>
                                                            </div>
                                                            <div className="mb-4">
                                                                <h5 className="mb-3 fw-600">Does it need to be done at all?</h5>
                                                                <p className="mb-0">Along with your plans, you should consider developing an action orientation that will keep you motivated to move forward at all times. This requires a little self-discipline, but is a crucial component to achievement of any kind. Before starting any new activity, ask yourself if that activity will move you closer to your goals. If the answer is no, you may want to reconsider doing it at that time.</p>
                                                            </div>
                                                            <div className="mb-4">
                                                                <h5 className="mb-3 fw-600">Can it be done by someone else?</h5>
                                                                <p>The first thing to remember about success is that it is a process – nothing more, nothing less. There is really no magic to it and it’s not reserved only for a select few people. As such, success really has nothing to do with luck, coincidence or fate. It really comes down to understanding the steps in the process and then executing on those steps.</p>
                                                                <p className="mb-0">There are basically six key areas to higher achievement. Some people will tell you there are four while others may tell you there are eight. One thing for certain though, is that irrespective of the number of steps the experts talk about, they all originate from the same roots.</p>
                                                            </div>
                                                            <div className="mb-4">
                                                                <h5 className="mb-3 fw-600">Can the particular activity be done later?</h5>
                                                                <p className="mb-0">What is the exact sequence of events that will take you to where you want to be? Have a think consciously of what you need to do. Every outcome begins with the first step. When you decide you want to have a romantic meal for two, there are many steps that you need to perform in order for that to happen. (Check the fridge, do you have what you want to serve up? No? Find keys, open garage door, drive car to the supermarket etc. etc.) You need to determine the exact sequence of events and write it down. Begin with the outcome in mind. Write without stopping. 10 years from now, I plan to be living in a… at…. With…. Get really detailed about it. Why? Because you are hooking up the neural connections in your brain. You must improve upon, clarify and make clear just exactly who and what you are going to be doing, experiencing, living and having in 10 years. This is the first step of the process! Key: Notice how you felt excited and optimistic when you did this? The reason is simple. It’s the life you are designing instead of the one that was given you and that you have lived with less intention and purpose to date.</p>
                                                            </div>
                                                        </div> */}
                          </div>
                          {/* <div className="row mt-4">
                                                        <div className="col-md-4">
                                                            <div className="d-flex mb-5 mb-md-0">
                                                                <div className="feature-info-icon">
                                                                    <i className="fas fa-truck-pickup fs-1"></i>
                                                                </div>
                                                                <div className="ms-4">
                                                                    <h5 className="feature-info-title mb-3 fw-600">Free shipping</h5>
                                                                    <p>Free Shipping on orders $199.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="d-flex mb-5 mb-md-0">
                                                                <div className="feature-info-icon">
                                                                    <i className="far fa-comments fs-1"></i>
                                                                </div>
                                                                <div className="ms-4">
                                                                    <h5 className="feature-info-title mb-3 fw-600">24/7 Support</h5>
                                                                    <p>Online and phone support 24 / 7</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="d-flex mb-0">
                                                                <div className="feature-info-icon">
                                                                    <i className="fas fa-sync-alt fs-1"></i>
                                                                </div>
                                                                <div className="ms-4">
                                                                    <h5 className="feature-info-title mb-3 fw-600">30 Days return</h5>
                                                                    <p>30 days money-back guarantee.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                        </div>
                        <div className="tab-pane fade" id="nav-reviews" role="tabpanel" aria-labelledby="nav-reviews-tab">
                          <div className="row">
                            <div className="col-12">
                              <h5 className="mb-4 fw-600">4 Reviews for women’s fabric mix midi wrap jumpsuit</h5>
                              {productDetail?.review?.length > 0
                                ? productDetail.review.map((value: any, key: number) => (
                                    <div className="commentlist" key={key}>
                                      <div className="comment-author">
                                        <img className="avatar avatar-lg rounded-circle" src="images/avatar/01.jpg" alt="" />
                                      </div>
                                      <div className="comment-content">
                                        <div className="reviews">
                                          <p className="meta">
                                            <strong>Sara Lisbon </strong>(verified owner) – November 8, 2022
                                          </p>
                                          <div className="rating">
                                            <i className="text-warning fas fa-star"></i>
                                            <i className="text-warning fas fa-star"></i>
                                            <i className="text-warning fas fa-star"></i>
                                            <i className="text-warning fas fa-star-half-alt"></i>
                                            <i className="far fa-star text-warning"></i>
                                          </div>
                                        </div>
                                        <p>
                                          For those of you who are serious about having more, doing more, giving more and being more, success is
                                          achievable with some understanding of what to do, some discipline around planning and execution of those
                                          plans and belief that you can achieve your desires.
                                        </p>
                                      </div>
                                    </div>
                                  ))
                                : ''}
                              {/* <div className="commentlist">
                                                                <div className="comment-author">
                                                                    <img className="avatar avatar-lg rounded-circle" src="images/avatar/01.jpg" alt="" />
                                                                </div>
                                                                <div className="comment-content">
                                                                    <div className="reviews">
                                                                        <p className="meta">
                                                                            <strong>Sara Lisbon </strong>(verified owner) – November 8, 2022
                                                                        </p>
                                                                        <div className="rating">
                                                                            <i className="text-warning fas fa-star"></i>
                                                                            <i className="text-warning fas fa-star"></i>
                                                                            <i className="text-warning fas fa-star"></i>
                                                                            <i className="text-warning fas fa-star-half-alt"></i>
                                                                            <i className="far fa-star text-warning"></i>
                                                                        </div>
                                                                    </div>
                                                                    <p>For those of you who are serious about having more, doing more, giving more and being more, success is achievable with some understanding of what to do, some discipline around planning and execution of those plans and belief that you can achieve your desires.</p>
                                                                </div>
                                                            </div>
                                                            <div className="commentlist">
                                                                <div className="comment-author">
                                                                    <img className="avatar avatar-lg rounded-circle" src="images/avatar/02.jpg" alt="" />
                                                                </div>
                                                                <div className="comment-content">
                                                                    <div className="reviews">
                                                                        <p className="meta">
                                                                            <strong>Frank Smith </strong>(verified owner) – November 8, 2022
                                                                        </p>
                                                                        <div className="rating">
                                                                            <i className="text-warning fas fa-star"></i>
                                                                            <i className="text-warning fas fa-star"></i>
                                                                            <i className="text-warning fas fa-star"></i>
                                                                            <i className="text-warning fas fa-star-half-alt"></i>
                                                                            <i className="far fa-star text-warning"></i>
                                                                        </div>
                                                                    </div>
                                                                    <p>There are basically six key areas to higher achievement. Some people will tell you there are four while others may tell you there are eight. One thing for certain though, is that irrespective of the number of steps the experts talk about, they all originate from the same roots.</p>
                                                                </div>
                                                            </div>
                                                            <div className="commentlist">
                                                                <div className="comment-author">
                                                                    <img className="avatar avatar-lg rounded-circle" src="images/avatar/03.jpg" alt="" />
                                                                </div>
                                                                <div className="comment-content">
                                                                    <div className="reviews">
                                                                        <p className="meta">
                                                                            <strong>Joanna williams </strong>(verified owner) – December 8, 2022
                                                                        </p>
                                                                        <div className="rating">
                                                                            <i className="text-warning fas fa-star"></i>
                                                                            <i className="text-warning fas fa-star"></i>
                                                                            <i className="text-warning fas fa-star"></i>
                                                                            <i className="text-warning fas fa-star-half-alt"></i>
                                                                            <i className="far fa-star text-warning"></i>
                                                                        </div>
                                                                    </div>
                                                                    <p>Success isn’t really that difficult. There is a significant portion of the population here in North America, that actually want and need success to be hard! Why? So they then have a built-in excuse when things don’t go their way! Pretty sad situation, to say the least.</p>
                                                                </div>
                                                            </div>
                                                            <div className="commentlist">
                                                                <div className="comment-author">
                                                                    <img className="avatar avatar-lg rounded-circle" src="images/avatar/04.jpg" alt="" />
                                                                </div>
                                                                <div className="comment-content">
                                                                    <div className="reviews">
                                                                        <p className="meta">
                                                                            <strong>Felica Queen </strong>(verified owner) – December 8, 2022
                                                                        </p>
                                                                        <div className="rating">
                                                                            <i className="text-warning fas fa-star"></i>
                                                                            <i className="text-warning fas fa-star"></i>
                                                                            <i className="text-warning fas fa-star"></i>
                                                                            <i className="text-warning fas fa-star-half-alt"></i>
                                                                            <i className="far fa-star text-warning"></i>
                                                                        </div>
                                                                    </div>
                                                                    <p>Making a decision to do something – this is the first step. We all know that nothing moves until someone makes a decision. The first action is always in making the decision to proceed. This is a fundamental step, which most people overlook.</p>
                                                                </div>
                                                            </div> */}
                              <div className="mt-4 ">
                                <h5 className="fw-600">Add a review</h5>
                                <p>Your email address will not be published. Required fields are marked *</p>
                              </div>
                              <form className="row mt-4 align-items-center">
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
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="nav-custom" role="tabpanel" aria-labelledby="nav-custom-tab">
                          <div className="row">
                            <div className="col-12">
                              <p>
                                <strong>The best way is to develop and follow a plan.</strong> Start with your goals in mind and then work backwards
                                to develop the plan. What steps are required to get you to the goals? Make the plan as detailed as possible. Try to
                                visualize and then plan for, every possible setback. Commit the plan to paper and then keep it with you at all times.
                                Review it regularly and ensure that every step takes you closer to your Vision and Goals. If the plan doesn’t support
                                the vision then change it!
                              </p>
                              <div className="mb-4"></div>
                              <h5 className="mb-3 fw-600">Why do we use it?</h5>
                              <p>
                                It is truly amazing the damage that we, as parents, can inflict on our children. So why do we do it? For the most
                                part, we don’t do it intentionally or with malice. In the majority of cases, the cause is a well-meaning but unskilled
                                or un-thinking parent, who says the wrong thing at the wrong time, and the message sticks – as simple as that!
                              </p>
                              <p className="mb-0">
                                Commitment is something that comes from understanding that everything has its price and then having the willingness to
                                pay that price. This is important because nobody wants to put significant effort into something, only to find out
                                after the fact that the price was too high.
                              </p>
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
      {relatedProductData?.length > 0 ? (
        <section className="space-pb">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="title mb-4">
                  <h4 className="fw-600">Related products</h4>
                </div>
                <OwlCarousel className="owl-theme" items={relatedProductData.length} nav={true} dots={false} loop={true} margin={10}>
                  {relatedProductData.map((value: any, key: number) => (
                    <div className="item" key={key}>
                      <div className="product">
                        <div className="product-label">
                          <span className="onsale">17%</span>
                        </div>
                        <div className="product-image">
                          <div className="product-thumb-inner">
                            <a href="#">
                              <img className="img-fluid" src={Product1} alt="image" />
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
                                <a href="shop-single.html">{value.productName}</a>
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
                              <span className="me-2">$81,000.00</span>${value.price?.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>

                {/* <div className="item">
                                    <div className="product">
                                        <div className="product-label">
                                            <span className="onsale">17%</span>
                                        </div>
                                        <div className="product-image">
                                            <div className="product-thumb-inner">
                                                <a href="#">
                                                    <img className="img-fluid" src={Product1} alt="image" />
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
                                <div className="item">
                                    <div className="product">
                                        <div className="product-label">
                                            <span className="onsale">17%</span>
                                        </div>
                                        <div className="product-image">
                                            <div className="product-thumb-inner">
                                                <a href="#">
                                                    <img className="img-fluid" src={Product2} alt="image" />
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
                                <div className="item">
                                    <div className="product">
                                        <div className="product-label">
                                            <span className="onsale">17%</span>
                                        </div>
                                        <div className="product-image">
                                            <div className="product-thumb-inner">
                                                <a href="#">
                                                    <img className="img-fluid" src={Product1} alt="image" />
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
                                <div className="item">
                                    <div className="product">
                                        <div className="product-label">
                                            <span className="onsale">17%</span>
                                        </div>
                                        <div className="product-image">
                                            <div className="product-thumb-inner">
                                                <a href="#">
                                                    <img className="img-fluid" src={Product2} alt="image" />
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
                                <div className="item">
                                    <div className="product">
                                        <div className="product-label">
                                            <span className="onsale">17%</span>
                                        </div>
                                        <div className="product-image">
                                            <div className="product-thumb-inner">
                                                <a href="#">
                                                    <img className="img-fluid" src={Product1} alt="image" />
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
                {/* <div className="owl-carousel" data-nav-dots="false" data-nav-arrow="false" data-items="4" data-lg-items="3" data-md-items="2" data-sm-items="1" data-xs-items="1" data-xx-items="1" data-autoplay="false">
                                <div className="item">
                                    <div className="product">
                                        <div className="product-label">
                                            <span className="onsale">17%</span>
                                        </div>
                                        <div className="product-image">
                                            <div className="product-thumb-inner">
                                                <a href="#">
                                                    <img className="img-fluid" src={Product1} alt="image" />
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
                                <div className="item">
                                    <div className="product">
                                        <div className="product-label">
                                            <span className="onsale">17%</span>
                                        </div>
                                        <div className="product-image">
                                            <div className="product-thumb-inner">
                                                <a href="#">
                                                    <img className="img-fluid" src={Product2} alt="image" />
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
                                <div className="item">
                                    <div className="product">
                                        <div className="product-label">
                                            <span className="onsale">17%</span>
                                        </div>
                                        <div className="product-image">
                                            <div className="product-thumb-inner">
                                                <a href="#">
                                                    <img className="img-fluid" src={Product1} alt="image" />
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
                                <div className="item">
                                    <div className="product">
                                        <div className="product-label">
                                            <span className="onsale">17%</span>
                                        </div>
                                        <div className="product-image">
                                            <div className="product-thumb-inner">
                                                <a href="#">
                                                    <img className="img-fluid" src={Product2} alt="image" />
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
                                <div className="item">
                                    <div className="product">
                                        <div className="product-label">
                                            <span className="onsale">17%</span>
                                        </div>
                                        <div className="product-image">
                                            <div className="product-thumb-inner">
                                                <a href="#">
                                                    <img className="img-fluid" src={Product1} alt="image" />
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
                            </div> */}
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
