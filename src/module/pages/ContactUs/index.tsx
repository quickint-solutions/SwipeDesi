import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getItems } from '../../../apiV2/items';
import ProductItem from '../../../components/ProductItem';
import { getCategories } from '../../../apiV2/categories';
import { useNavigate } from 'react-router-dom';

export default function ContactUs() {
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
                      <li className="breadcrumb-item active">Contact US</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>Contact US</strong>
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
          <div className="row justify-content-start g-0">
            <div className="col-md-12 col-lg-8 h-100">
              <div className="contact-form py-lg-5 px-lg-5  py-md-5 px-md-5 px-4 py-4 box-shadow border-radius">
                <div className="section-title section-title-style-1">
                  <span className="sub-title left-divider">Contact Us</span>
                  <h2 className="title">
                    Let’s Get <strong>In Touch!</strong>
                  </h2>
                </div>
                <form>
                  <div className="row align-items-center">
                    <div className="mb-3 col-md-6">
                      <input type="text" className="form-control" id="first-name" placeholder="First Name" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <input type="text" className="form-control" id="phone" placeholder="Phone Number" />
                    </div>
                    <div className="mb-3 col-md-12">
                      <input type="email" className="form-control" id="email" placeholder="Email" />
                    </div>
                    <div className="col-lg-12">
                      <textarea className="form-control" rows={5} placeholder="Message"></textarea>
                    </div>
                  </div>
                  <div className="d-flex mt-4">
                    <a href="" className="btn btn-primary d-inline">
                      Send your Message
                    </a>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="bg-primary message-info h-100 box-shadow  border-radius">
                <h3 className="title text-white mb-4">
                  Contact <strong>Information</strong>
                </h3>
                <p className="text-white">
                  It would be great to hear from you! If you got any questions, please do not hesitate to send us a message. We are looking forward to
                  hearing from you! We reply within 24 hours!
                </p>
                <div className="social-info mt-4">
                  <div className="contact-info">
                    <ul className="list-unstyled mb-0">
                      <li className="d-flex align-items-center">
                        <i className="bi bi-pin-map"></i>
                        <span className="text-white">2101-111 Tarawood lane NE, Calgary, T3J5C2, Alberta, Canada</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="bi bi-telephone"></i>
                        <span className="text-white">+1 (403) 801-6969, +1 (587) 969-7008</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="bi bi-envelope"></i>
                        <span className="text-white">dhknd.inc@gmail.com</span>
                      </li>
                    </ul>
                  </div>
                  <div className="social-icon">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
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
