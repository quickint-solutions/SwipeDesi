import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getItems } from '../../../apiV2/items';
import ProductItem from '../../../components/ProductItem';
import { getCategories } from '../../../apiV2/categories';
import { useNavigate } from 'react-router-dom';
import img from '../../../images/bg/mandir-banner.jpg';

export default function TermsCondition() {
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
                    <span></span>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a className="text-white text-uppercase" href="index.html">
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item active">Terms and Conditions</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>Terms and Conditions</strong>
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
            <div className="col-md-12">
              <div className="mb-4">
                <h4 className="mb-3 fw-600">Description of Service</h4>
                <p>
                  The best way is to develop and follow a plan. Start with your goals in mind and then work backwards to develop the plan. What steps
                  are required to get you to the goals? Make the plan as detailed as possible. Try to visualize and then plan for, every possible
                  setback.{' '}
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">Your Registration Obligations</h4>
                <p>
                  Along with your plans, you should consider developing an action orientation that will keep you motivated to move forward at all
                  times. This requires a little self-discipline, but is a crucial component to achievement of any kind. Before starting any new
                  activity, ask yourself if that activity will move you closer to your goals. If the answer is no, you may want to reconsider doing it
                  at that time.
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">User Account, Password, and Security</h4>
                <p>
                  Commitment is something that comes from understanding that everything has its price and then having the willingness to pay that
                  price.
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">User Conduct</h4>
                <p>
                  Benjamin Franklin, inventor, statesman, writer, publisher and economist relates in his autobiography that early in his life he
                  decided to focus on arriving at moral perfection. He made a list of 13 virtues, assigning a page to each. Under each virtue he wrote
                  a summary that gave it fuller meaning. Then he practiced each one for a certain length of time. To make these virtues a habit,{' '}
                </p>
                <ul className="list list-unstyled mb-3">
                  <li>
                    <i className="fas fa-check"></i> The truth about success{' '}
                  </li>
                  <li>
                    <i className="fas fa-check"></i> If success is a process with a number of defined steps,{' '}
                  </li>
                  <li>
                    <i className="fas fa-check"></i> Then it is just like any other process.{' '}
                  </li>
                  <li>
                    <i className="fas fa-check"></i> The first action is always in making the decision to proceed.
                  </li>
                  <li>
                    <i className="fas fa-check"></i> This is a fundamental step, which most people overlook.
                  </li>
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">International Use</h4>
                <p>
                  Acres of Diamonds… you’ve read the famous story, or at least had it related to you. A farmer hears tales of diamonds and begins
                  dreaming of vast riches. He sells his farm and hikes off over the horizon, never to be heard from again. Rumors say that years later
                  he died destitute, never having found the diamonds he spent his life seeking. Meanwhile, the man who bought that farm found a large
                  and “interesting looking” stone in a stream that ran through the property. He put the stone on his mantle where a visitor recognized
                  the large stone as a rough diamond. It turned out to be the Hope Diamond.
                </p>
              </div>
              <div className="mb-4">
                <a href="#" className="btn btn-primary mt-3">
                  Accept
                </a>
                <a href="#" className="btn btn-secondary mt-3">
                  Close
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
