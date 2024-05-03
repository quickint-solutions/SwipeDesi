import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getItems } from '../../../apiV2/items';
import ProductItem from '../../../components/ProductItem';
import { getCategories } from '../../../apiV2/categories';
import { useNavigate } from 'react-router-dom';

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
      <section className="header-inner header-inner-menu bg-overlay-secondary" style={{ backgroundImage: 'url(images/bg/01.jpg)' }}>
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
                <img className="img-fluid" src="images/about-img.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="about-section-content">
                <div className="section-title section-title-style-1">
                  <span className="sub-title left-divider">About DHKND</span>
                  <h2 className="title">DHKND Management Inc Since 2020.</h2>
                </div>
                <p>
                  Mr. Daxesh Dalwadi, the founder of Dhknd Management Inc, founded the e-commerce agency in 2020. Dhknd’s mission is to keep
                  individuals connected to their roots while remaining happy and content in their current life. So, after conducting a thorough market
                  analysis, we discovered that immigrants face numerous challenges when they are new to Canada and still emotionally loyal to their
                  home country; they find it difficult to blend into this foreign culture.
                </p>
                <p>
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
                  <p>
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
                  <p className="mb-0">
                    I started dhknd with a dream to accomplish the impossible. And that impossible is to have a smile on the face of every customer we
                    serve. Dhknd is not only known for its incredible range of products but is also a destination where people love and find it better
                    in such a competitive niche. Our motto is to keep people connected to where they belong and still stay happy and satisfied with
                    where they currently live. My company’s goal is to fulfil every requirement of the customer in whichever way possible.
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 team-img-wrapper right-0 order-1 order-md-2">
                <div className="team-image position-relative d-flex justify-content-center">
                  <img className="img-fluid" src="images/about-img.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="team position-relative">
            <div className="row g-0 align-items-center">
              <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 team-img-wrapper left-0 order-1 order-md-2">
                <div className="team-image position-relative d-flex justify-content-center">
                  <img className="img-fluid" src="images/about-img.jpg" alt="" />
                </div>
              </div>
              <div className="offset-md-2 col-md-10 col-sm-12 team-info-wrapper order-2 order-md-1">
                <div className="team-detail team-detail-img-left">
                  <h4 className="team-title mb-2">
                    <a href="team-detail.html">Daxesh Dalwadi</a>
                  </h4>
                  <span className="team-label">Founder</span>
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
                  <p className="mb-0">
                    I started dhknd with a dream to accomplish the impossible. And that impossible is to have a smile on the face of every customer we
                    serve. Dhknd is not only known for its incredible range of products but is also a destination where people love and find it better
                    in such a competitive niche. Our motto is to keep people connected to where they belong and still stay happy and satisfied with
                    where they currently live. My company’s goal is to fulfil every requirement of the customer in whichever way possible.
                  </p>
                </div>
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
                  <p className="mb-0">
                    I started dhknd with a dream to accomplish the impossible. And that impossible is to have a smile on the face of every customer we
                    serve. Dhknd is not only known for its incredible range of products but is also a destination where people love and find it better
                    in such a competitive niche. Our motto is to keep people connected to where they belong and still stay happy and satisfied with
                    where they currently live. My company’s goal is to fulfil every requirement of the customer in whichever way possible.
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 team-img-wrapper right-0 order-1 order-md-2">
                <div className="team-image position-relative d-flex justify-content-center">
                  <img className="img-fluid" src="images/about-img.jpg" alt="" />
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
                <span className="sub-title">Gallery</span>
                <h2 className="title text-uppercase">Our Villa Gallery</h2>
                <div className="description">
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum</p>
                </div>
              </div>
            </div>
          </div>
          <div className="popup-gallery">
            <div className="row g-2">
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src="images/about-img.jpg" alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon" href="images/gallery/01.jpg">
                        {' '}
                        <i className="fas fa-plus"></i>{' '}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src="images/about-img.jpg" alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon" href="images/gallery/02.jpg">
                        {' '}
                        <i className="fas fa-plus"></i>{' '}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src="images/about-img.jpg" alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon" href="images/gallery/03.jpg">
                        {' '}
                        <i className="fas fa-plus"></i>{' '}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src="images/about-img.jpg" alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon" href="images/gallery/01.jpg">
                        {' '}
                        <i className="fas fa-plus"></i>{' '}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src="images/about-img.jpg" alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon" href="images/gallery/02.jpg">
                        {' '}
                        <i className="fas fa-plus"></i>{' '}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src="images/about-img.jpg" alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon" href="images/gallery/03.jpg">
                        {' '}
                        <i className="fas fa-plus"></i>{' '}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src="images/about-img.jpg" alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon" href="images/gallery/02.jpg">
                        {' '}
                        <i className="fas fa-plus"></i>{' '}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="gallery-box">
                  <div className="gallery-images bg-white">
                    <img className="img-fluid" src="images/about-img.jpg" alt="" />
                    <div className="gallery-info">
                      <a className="gallery-img popup-icon" href="images/gallery/01.jpg">
                        {' '}
                        <i className="fas fa-plus"></i>
                      </a>
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
