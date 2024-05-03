import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getItems } from '../../../apiV2/items';
import ProductItem from '../../../components/ProductItem';
import { getCategories } from '../../../apiV2/categories';
import { useNavigate } from 'react-router-dom';

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
      <section className="header-inner header-inner-menu bg-overlay-secondary" style={{ backgroundImage: 'url("images/bg/01.png")' }}>
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
                <p>
                  Without clarity, you send a very garbled message out to the Universe. We know that the Law of Attraction says that we will attract
                  what we focus on, so if we don’t have clarity, we will attract confusion.
                </p>
                <p>
                  The best way is to develop and follow a plan. Start with your goals in mind and then work backwards to develop the plan. What steps
                  are required to get you to the goals? Make the plan as detailed as possible. Try to visualize and then plan for,{' '}
                </p>
                <p>
                  every possible setback. Commit the plan to paper and then keep it with you at all times. Review it regularly and ensure that every
                  step takes you closer to your Vision and Goals. If the plan doesn’t support the vision then change it!
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">Personal Information</h4>
                <ul className="list list-unstyled mb-3">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> The truth about success
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> If success is a process with a number of defined steps,{' '}
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Then it is just like any other process.
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> The first action is always in making the decision to proceed.{' '}
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> This is a fundamental step, which most people overlook.
                  </li>
                </ul>
                <p>
                  We also know those epic stories, those modern-day legends surrounding the early failures of such supremely successful folks as
                  Michael Jordan and Bill Gates. We can look a bit further back in time to Albert Einstein or even further back to Abraham Lincoln.
                  What made each of these people so successful? Motivation.
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">Use of User Information.</h4>
                <p>
                  The first thing to remember about success is that it is a process – nothing more, nothing less. There is really no magic to it and
                  it’s not reserved only for a select few people. As such, success really has nothing to do with luck, coincidence or fate. It really
                  comes down to understanding the steps in the process and then executing on those steps.
                </p>
              </div>
              <div>
                <h4 className="mb-3 fw-600">Disclosure of User Information.</h4>
                <p>
                  There are basically six key areas to higher achievement. Some people will tell you there are four while others may tell you there
                  are eight. One thing for certain though, is that irrespective of the number of steps the experts talk about, they all originate from
                  the same roots.<a href="#"> support@example.com</a>{' '}
                </p>
                <ul className="list list-unstyled mb-3">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> You are going on a cruise, but when the ship sets sail,{' '}
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> The sad thing is the majority of people have no clue about what they truly want.{' '}
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Once you have a clear understanding of what you want,
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Focus is having the unwavering attention to complete what you set out to do.
                  </li>
                </ul>
                <p className="mb-0">
                  Making a decision to do something – this is the first step. We all know that nothing moves until someone makes a decision. The first
                  action is always in making the decision to proceed. This is a fundamental step, which most people overlook.
                  <a href="#"> support@example.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
