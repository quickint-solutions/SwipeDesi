import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getItems } from '../../../apiV2/items';
import ProductItem from '../../../components/ProductItem';
import { getCategories } from '../../../apiV2/categories';
import { useNavigate } from 'react-router-dom';
import img from '../../../images/bg/mandir-banner.jpg';
import { AuthContext } from '../../../context/auth.context';

export default function Testimonials() {
  const { search, categories, setCategories } = useContext(AuthContext);

  const { data: getProducts, mutate, isLoading } = useMutation(getItems);

  const { data: categoriesList } = useQuery('categories', getCategories);

  const categoriesData = categoriesList?.result?.filter((i: any) => !i.parentCategory) || [];

  return (
    <div>
      <section className="header-inner header-inner-menu bg-overlay-secondary mandir-bg">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 position-relative">
              <div className="header-inner-title">
                <div className="section-title">
                  <div className="sub-title">
                    <span></span>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a className="text-white text-uppercase" href="/">
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item active">Products</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>Products</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-inner-shape" style={{ backgroundImage: "url('images/bg/02.png')" }}></div>
      </section>
      <section className="space-ptb">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="testimonial border p-4">
                <div className="testimonial-content">
                  <p className="mb-0" style={{ fontSize: '18px', lineHeight: '30px' }}>
                    <i>
                      It had an amazing experience with you!!! Your products are just awesome and fantastic...Keep up with the same flow... I am just
                      glad that I bought from you guys!!! You are really doing a great job... And your service is just amazing👍👍
                    </i>
                  </p>
                </div>
                <div className="testimonial-author info-right mt-2">
                  <div className="testimonial-avatar avatar">
                    <img className="img-fluid" src="images/avatar/02.jpg" alt="" />
                  </div>
                  <div className="testimonial-name d-flex align-items-center">
                    <h6 className="author-tittle">Pooja Liladhar Bagul</h6>
                    <span className="">Product Designer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="testimonial border p-4">
                <div className="testimonial-content">
                  <p className="mb-0" style={{ fontSize: '18px', lineHeight: '30px' }}>
                    <i>
                      Professionalism, Quality, Responsiveness, Value Perfect quality of all the goods, I have lather bags, wallet, and I am SO happy
                      about their finishing, color style. Experience of the best service 👌, SO happy to have DHKND in CANADA 🇨🇦. Specially in
                      CALGARY. Thank you very much DHKND.
                    </i>
                  </p>
                </div>
                <div className="testimonial-author info-right mt-2">
                  <div className="testimonial-avatar avatar">
                    <img className="img-fluid" src="images/avatar/02.jpg" alt="" />
                  </div>
                  <div className="testimonial-name d-flex align-items-center">
                    <h6 className="author-tittle">Nikul panchal</h6>
                    <span className="">Product Designer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="testimonial border p-4">
                <div className="testimonial-content">
                  <p className="mb-0" style={{ fontSize: '18px', lineHeight: '30px' }}>
                    <i>
                      I ordered panchdhatu mandir from DHKND. Talking about : Size and quality : 5/5 Finishing : 5/5 Design : 5/5 Price : very fair
                      They have fitted light inside the mandir which make it so beautiful. Everytime when I contact the people , they are super humble
                      to answer all my questions Highly recommended especially when you are looking for ethnic products from back home Good to have
                      you in Canada
                    </i>
                  </p>
                </div>
                <div className="testimonial-author info-right mt-2">
                  <div className="testimonial-avatar avatar">
                    <img className="img-fluid" src="images/avatar/02.jpg" alt="" />
                  </div>
                  <div className="testimonial-name d-flex align-items-center">
                    <h6 className="author-tittle">Jinal Desai</h6>
                    <span className="">Product Designer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="testimonial border p-4">
                <div className="testimonial-content">
                  <p className="mb-0" style={{ fontSize: '18px', lineHeight: '30px' }}>
                    <i>
                      Professionalism, Quality, Responsiveness, Value Great Professionals to deal with! Our item was shipped as it was promised and
                      appreciate the team for delivering the highest quality of the product! Highly recommended for doing business!
                    </i>
                  </p>
                </div>
                <div className="testimonial-author info-right mt-2">
                  <div className="testimonial-avatar avatar">
                    <img className="img-fluid" src="images/avatar/02.jpg" alt="" />
                  </div>
                  <div className="testimonial-name d-flex align-items-center">
                    <h6 className="author-tittle">Pankaj Singh</h6>
                    <span className="">Product Designer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="testimonial border p-4">
                <div className="testimonial-content">
                  <p className="mb-0" style={{ fontSize: '18px', lineHeight: '30px' }}>
                    <i>Professionalism, Quality, Responsiveness, Value I have received best service from them. Amazing superb</i>
                  </p>
                </div>
                <div className="testimonial-author info-right mt-2">
                  <div className="testimonial-avatar avatar">
                    <img className="img-fluid" src="images/avatar/02.jpg" alt="" />
                  </div>
                  <div className="testimonial-name d-flex align-items-center">
                    <h6 className="author-tittle">Sumit Sidhu</h6>
                    <span className="">Product Designer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="testimonial border p-4">
                <div className="testimonial-content">
                  <p className="mb-0" style={{ fontSize: '18px', lineHeight: '30px' }}>
                    <i>Great products best quality. When contacted they are super helpful. I would highly recommend Dhknd.</i>
                  </p>
                </div>
                <div className="testimonial-author info-right mt-2">
                  <div className="testimonial-avatar avatar">
                    <img className="img-fluid" src="images/avatar/02.jpg" alt="" />
                  </div>
                  <div className="testimonial-name d-flex align-items-center">
                    <h6 className="author-tittle">Vidhi Raol</h6>
                    <span className="">Product Designer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="testimonial border p-4">
                <div className="testimonial-content">
                  <p className="mb-0" style={{ fontSize: '18px', lineHeight: '30px' }}>
                    <i>Quality was great! easy to assemble and I love it.</i>
                  </p>
                </div>
                <div className="testimonial-author info-right mt-2">
                  <div className="testimonial-avatar avatar">
                    <img className="img-fluid" src="images/avatar/02.jpg" alt="" />
                  </div>
                  <div className="testimonial-name d-flex align-items-center">
                    <h6 className="author-tittle">Laxmi Dasari</h6>
                    <span className="">Product Designer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="testimonial border p-4">
                <div className="testimonial-content">
                  <p className="mb-0" style={{ fontSize: '18px', lineHeight: '30px' }}>
                    <i>
                      We had the best experience in ordering a custom Sai baba frame, Mandir, Sankheda swing and Bajot. Himaben is super responsive
                      and were very accommodating with our order. Would definitely recommend!
                    </i>
                  </p>
                </div>
                <div className="testimonial-author info-right mt-2">
                  <div className="testimonial-avatar avatar">
                    <img className="img-fluid" src="images/avatar/02.jpg" alt="" />
                  </div>
                  <div className="testimonial-name d-flex align-items-center">
                    <h6 className="author-tittle">Khushi Upadhyay</h6>
                    <span className="">Product Designer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="testimonial border p-4">
                <div className="testimonial-content">
                  <p className="mb-0" style={{ fontSize: '18px', lineHeight: '30px' }}>
                    <i>Our temple is awesome, we liked service as well. Thanks Hema!</i>
                  </p>
                </div>
                <div className="testimonial-author info-right mt-2">
                  <div className="testimonial-avatar avatar">
                    <img className="img-fluid" src="images/avatar/02.jpg" alt="" />
                  </div>
                  <div className="testimonial-name d-flex align-items-center">
                    <h6 className="author-tittle">Tanvi Gurav</h6>
                    <span className="">Product Designer</span>
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
