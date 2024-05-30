import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getItems } from '../../../apiV2/items';
import { getCategories } from '../../../apiV2/categories';
import { useNavigate } from 'react-router-dom';
import img from '../../../images/new-bg/FAQs.jpg';

export default function FAQ() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  const [categoryValue, setCategoryValue] = useState(category);

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
                    <span></span>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a className="text-white text-uppercase" href="index.html">
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item active">FAQs</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>FAQs</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-inner-shape" style={{ backgroundImage: 'url("images/bg/02.png")' }}></div>
      </section>
      <section className="space-ptb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="widget">
                  <div className="widget-title">
                    <h5 className="title">Search</h5>
                  </div>
                  <div className="search">
                    <i className="fas fa-search"></i>
                    <input type="text" className="form-control" placeholder="Search..." />
                  </div>
                </div>
                <div className="widget">
                  <div className="widget-title">
                    <h5 className="title">Submit Your Questions</h5>
                  </div>
                  <div className="search">
                    <input type="text" className="form-control mb-3" placeholder="Name *" required />
                    <input type="text" className="form-control mb-3" placeholder="Email *" required />
                    <input type="text" className="form-control mb-3" placeholder="Phone Number *" required />
                    <input type="text" className="form-control mb-3" placeholder="Company Name *" required />
                    <textarea className="form-control mb-3" id="exampleFormControlTextarea1" rows={5} placeholder="Message"></textarea>
                    <a href="#" className="btn btn-primary d-block">
                      Submit
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 mt-lg-0 mt-4">
              <div className="section-title">
                <h2>Frequently asked questions</h2>
              </div>
              <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      What is dhknd.inc ? <i className="fas fa-chevron-down fa-xs"></i>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate
                        you.
                      </p>
                      <ul className="ps-3 mb-0">
                        <li className="mb-2">Commitment is something that comes from understanding that!</li>
                        <li className="mb-2">Its price and then having the willingness to pay that price.</li>
                        <li className="mb-2">his is important because nobody wants to put significant.</li>
                        <li className="mb-2">Effort into something, only to find. </li>
                        <li className="mb-0">Out after the fact that the price was too high.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      What is your best selling product ? <i className="fas fa-chevron-down fa-xs"></i>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate
                        you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve
                        something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.
                      </p>
                      <ul className="ps-3 mb-0">
                        <li className="mb-2">Commitment is something that comes from understanding that!</li>
                        <li className="mb-2">Its price and then having the willingness to pay that price.</li>
                        <li className="mb-2">his is important because nobody wants to put significant.</li>
                        <li className="mb-2">Effort into something, only to find. </li>
                        <li className="mb-0">Out after the fact that the price was too high.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      Do we get guarantees on products ?<i className="fas fa-chevron-down fa-xs"></i>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate
                        you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve
                        something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.
                      </p>
                      <ul className="ps-3 mb-0">
                        <li className="mb-2">Commitment is something that comes from understanding that!</li>
                        <li className="mb-2">Its price and then having the willingness to pay that price.</li>
                        <li className="mb-2">his is important because nobody wants to put significant.</li>
                        <li className="mb-2">Effort into something, only to find. </li>
                        <li className="mb-0">Out after the fact that the price was too high.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingfour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsefour"
                      aria-expanded="false"
                      aria-controls="flush-collapsefour"
                    >
                      What type of wood is used to make the mandirs/temples ? <i className="fas fa-chevron-down fa-xs"></i>
                    </button>
                  </h2>
                  <div
                    id="flush-collapsefour"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingfour"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate
                        you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve
                        something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.
                      </p>
                      <ul className="ps-3 mb-0">
                        <li className="mb-2">Commitment is something that comes from understanding that!</li>
                        <li className="mb-2">Its price and then having the willingness to pay that price.</li>
                        <li className="mb-2">his is important because nobody wants to put significant.</li>
                        <li className="mb-2">Effort into something, only to find. </li>
                        <li className="mb-0">Out after the fact that the price was too high.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingfive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsefive"
                      aria-expanded="false"
                      aria-controls="flush-collapsefive"
                    >
                      Will there be guarantee on the sevenwood mandirs ? <i className="fas fa-chevron-down fa-xs"></i>
                    </button>
                  </h2>
                  <div
                    id="flush-collapsefive"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingfive"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate
                        you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve
                        something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.
                      </p>
                      <ul className="ps-3 mb-0">
                        <li className="mb-2">Commitment is something that comes from understanding that!</li>
                        <li className="mb-2">Its price and then having the willingness to pay that price.</li>
                        <li className="mb-2">his is important because nobody wants to put significant.</li>
                        <li className="mb-2">Effort into something, only to find. </li>
                        <li className="mb-0">Out after the fact that the price was too high.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingsix">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsesix"
                      aria-expanded="false"
                      aria-controls="flush-collapsesix"
                    >
                      Which products can I return ? <i className="fas fa-chevron-down fa-xs"></i>
                    </button>
                  </h2>
                  <div
                    id="flush-collapsesix"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingsix"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate
                        you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve
                        something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingseven">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseseven"
                      aria-expanded="false"
                      aria-controls="flush-collapseseven"
                    >
                      How can I return the product ? <i className="fas fa-chevron-down fa-xs"></i>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseseven"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingseven"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate
                        you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve
                        something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingeight">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseeight"
                      aria-expanded="false"
                      aria-controls="flush-collapseeight"
                    >
                      Within how many days customer can return the product ? <i className="fas fa-chevron-down fa-xs"></i>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseeight"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingeight"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate
                        you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve
                        something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingnine">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsenine"
                      aria-expanded="false"
                      aria-controls="flush-collapsenine"
                    >
                      How can I get the refund of the product that i returned ? <i className="fas fa-chevron-down fa-xs"></i>
                    </button>
                  </h2>
                  <div
                    id="flush-collapsenine"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingnine"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate
                        you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve
                        something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingten">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseten"
                      aria-expanded="false"
                      aria-controls="flush-collapseten"
                    >
                      Can I make payments in installments ? <i className="fas fa-chevron-down fa-xs"></i>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseten"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingten"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate
                        you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve
                        something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingeleven">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseeleven"
                      aria-expanded="false"
                      aria-controls="flush-collapseeleven"
                    >
                      Where do you manufacture handcrafted mandirs ? <i className="fas fa-chevron-down fa-xs"></i>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseeleven"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingeleven"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate
                        you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve
                        something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-0">
                  <h2 className="accordion-header" id="flush-headingtwelve">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsetwelve"
                      aria-expanded="false"
                      aria-controls="flush-collapsetwelve"
                    >
                      how can I exchange other product on return of other product? <i className="fas fa-chevron-down fa-xs"></i>
                    </button>
                  </h2>
                  <div
                    id="flush-collapsetwelve"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingtwelve"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate
                        you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve
                        something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.
                      </p>
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
