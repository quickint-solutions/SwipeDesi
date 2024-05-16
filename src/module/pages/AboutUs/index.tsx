import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getItems } from '../../../apiV2/items';
import ProductItem from '../../../components/ProductItem';
import { getCategories } from '../../../apiV2/categories';
import { useNavigate } from 'react-router-dom';
import img from '../../../images/bg/mandir-banner.jpg';
import AboutImg from '../../../images/bg/about-img.jpg';
import team from '../../../images/team/01.jpg';
import gallery from '../../../images/gallery/01.jpg';
import gallery1 from '../../../images/gallery/02.jpg';
import gallery2 from '../../../images/gallery/03.jpg';
import team1 from '../../../images/team/Hima-dalwadi.png';
import team2 from '../../../images/team/Kavya-Dalwadi.jpg';
import store1 from '../../../images/storeI28/store1.jpg';
import store2 from '../../../images/storeI28/store2.jpg';
import store3 from '../../../images/storeI28/store3.jpg';
import store4 from '../../../images/storeI28/store4.jpg';
import store5 from '../../../images/storeI28/store5.jpg';
import store6 from '../../../images/storeI28/store6.jpg';
import store7 from '../../../images/storeI28/store7.jpg';
import store9 from '../../../images/storeI28/store9.jpg';
import store8 from '../../../images/storeI28/store8.jpg';
export default function AboutUs() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  const [categoryValue, setCategoryValue] = useState(category);

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
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a className="text-white text-uppercase" href="index.html">
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item active">About Us</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>About Us</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-inner-shape" style={{ backgroundImage: 'url(images/bg/02.png)' }}></div>
      </section>
      <section className="space-ptb about-us-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="about-img mb-5 mb-lg-0">
                <img className="img-fluid" src={AboutImg} alt="" />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="about-section-content">
                <div className="section-title section-title-style-1">
                  <span className="sub-title left-divider">About DHKND</span>
                  <h2 className="title">DHKND Management Inc Since 2020.</h2>
                </div>
                <p className="founder-text">
                  Mr. Daxesh Dalwadi, the founder of Dhknd Management Inc, founded the e-commerce agency in 2020. Dhknd’s mission is to keep
                  individuals connected to their roots while remaining happy and content in their current life. So, after conducting a thorough market
                  analysis, we discovered that immigrants face numerous challenges when they are new to Canada and still emotionally loyal to their
                  home country; they find it difficult to blend into this foreign culture.
                </p>
                <p className="founder-text">
                  Some homeland products are sold at a relatively high rate and with little diversity in the local market. So, to tackle this problem,
                  we import things from all over the world and sell them in Canada; this not only makes people feel different, but it also gives them
                  a sense of belonging.
                </p>
                <div className="bussiness-location">
                  <div className="feature-info-icon">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <h6 className="mb-0">Operating business both from India and Canada.</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="space-pb">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title section-title-style-1">
                <h2 className="title">How are we different?</h2>
                <div className="description">
                  <p className="founder-text">
                    <i>
                      Dhknd is on set for a never-ending journey to honor the unique, fascinating beauty of one’s country, and its idiosyncratic
                      cultures and traditions. We are standing here with the commitment to serve the subtleness, and the beauty of your home country
                      by bringing you back your lost childhood and joining those broken bonds with your country.
                    </i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-video position-relative bg-overlay-primary-9 space-pt bg-holder" style={{ backgroundImage: 'url(images/bg/03.jpg)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-12">
              <div className="embed-responsive embed-responsive-16by9 position-relative d-flex justify-content-center">
                <iframe
                  className="embed-responsive-item"
                  src="https://www.youtube.com/embed/UWNBHpsjMKQ?si=F3Kwnw3uh5anVrFB"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="space-ptb our-team-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title section-title-style-1">
                <span className="sub-title left-divider">Our Team</span>
                <h2 className="title">Our Outstanding Team</h2>
              </div>
            </div>
          </div>
          <div className="team position-relative">
            <div className="row g-0 align-items-center">
              <div className="col-md-10 col-sm-12 team-info-wrapper order-2 order-md-1">
                <div className="team-detail team-detail-img-right">
                  <h4 className="team-title mb-2">
                    <a href="team-detail.html">Daxesh Dalwadi</a>
                  </h4>
                  <span className="team-label">Founder</span>
                  <div className="team-social">
                    <ul className="list-unstyled d-flex mb-0">
                      <li>
                        <a target="_blank" href="https://www.facebook.com/daxesh.dalwadi.946">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://www.linkedin.com/in/daxesh-dalwadi-aa603a1aa/?originalSubdomain=ca">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://twitter.com/i/flow/login?redirect_after_login=%2Fdaxdalwadi13">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>

                      <li>
                        <a href="#">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <p className="mb-0" style={{ color: 'black' }}>
                    I started dhknd with a dream to accomplish the impossible. And that impossible is to have a smile on the face of every customer we
                    serve. Dhknd is not only known for its incredible range of products but is also a destination where people love and find it better
                    in such a competitive niche. Our motto is to keep people connected to where they belong and still stay happy and satisfied with
                    where they currently live. My company’s goal is to fulfil every requirement of the customer in whichever way possible.
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 team-img-wrapper right-0 order-1 order-md-2">
                <div className="team-image position-relative d-flex justify-content-center">
                  <img className="img-fluid" src={team} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="team position-relative">
            <div className="row g-0 align-items-center">
              <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 team-img-wrapper left-0 order-1 order-md-2">
                <div className="team-image position-relative d-flex justify-content-center">
                  <img className="img-fluid" src={team1} alt="" style={{ height: '390px', width: 'auto' }} />
                </div>
              </div>
              <div className="offset-md-2 col-md-10 col-sm-12 team-info-wrapper order-2 order-md-1">
                <div className="team-detail team-detail-img-left">
                  <h4 className="team-title mb-2">
                    <a href="team-detail.html">Heema Dalwadi</a>
                  </h4>
                  <span className="team-label">Co - Founder</span>
                  <div className="team-social">
                    <ul className="list-unstyled d-flex mb-0">
                      <li>
                        <a target="_blank" href="https://www.facebook.com/hima.dalwadi">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <p className="mb-0" style={{ color: 'black' }}>
                    For the past two years, I’ve worked for this organisation with the goal of connecting individuals to their needs through
                    understanding them. I understand how a buyer’s mind works, and it is my job to solve their mental puzzles. Dhknd is a place where
                    you may work while having a good time. We’re all giving it our all to drive our company to new heights.
                  </p>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 team-img-wrapper right-0 order-1 order-md-2">
                  <div className="team-image position-relative d-flex justify-content-center"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="team position-relative">
            <div className="row g-0 align-items-center">
              <div className="col-md-10 col-sm-12 team-info-wrapper order-2 order-md-1">
                <div className="team-detail team-detail-img-right">
                  <h4 className="team-title mb-2">
                    <a href="team-detail.html">Kavya Dalwadi</a>
                  </h4>
                  <span className="team-label">Assistant Director</span>
                  <div className="team-social">
                    <ul className="list-unstyled d-flex mb-0">
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <p className="mb-0" style={{ color: 'black' }}>
                    I am a young entrepreneur in dhknd. I’m in charge of our company’s social media and marketing. Dhknd is a place where you can
                    interact with every human emotion; we have pleasant memories to remember and terrible times to grow from. We may argue that this
                    is a location where one can learn to cope with all of life’s emotions. Dhknd has taught me a lot of things that I will never
                    forget. Dhknd is more than a business; it’s a family. Every day, our lives revolve around this company, and we didn’t realise how
                    far we’d come, from small home-based displayed shopping to e-commerce, from learning how to post to handling all branding, We’ve
                    seen this company develop from little to large, and we want to see it continue to expand.
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 team-img-wrapper right-0 order-1 order-md-2">
                <div className="team-image position-relative d-flex justify-content-center">
                  <img className="img-fluid" src={team2} alt="" style={{ height: '400px', width: 'auto', objectFit: 'contain' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="space-pb">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-6">
              <div className="section-title text-center">
                <span className="sub-title">Our Gallery</span>
                <h2 className="title text-uppercase">VISIT OUR STORE I28</h2>
                <div className="description"></div>
              </div>
            </div>
          </div>
          <div className="popup-gallery">
            <div className="row g-2">
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={gallery} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={gallery1} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={gallery2} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={gallery} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={gallery1} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={gallery2} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={gallery} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={gallery1} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="popup">
            <div className="popup-content">
              <img id="fullImage" src="" alt="" />
              <span className="close">&times;</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-pb">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-6">
              <div className="section-title text-center">
                <span className="sub-title">Our Gallery</span>
                <h2 className="title text-uppercase">VISIT OUR STORE I30</h2>
                <div className="description"></div>
              </div>
            </div>
          </div>
          <div className="popup-gallery">
            <div className="row g-2">
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={store1} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={store2} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={store3} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={store4} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={store5} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={store5} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={store6} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={store7} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={store8} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src={store9} alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon"> </a>
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
