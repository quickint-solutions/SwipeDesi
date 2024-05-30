import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getItems } from '../../../apiV2/items';
import ProductItem from '../../../components/ProductItem';
import { getCategories } from '../../../apiV2/categories';
import { useNavigate } from 'react-router-dom';
import img from '../../../images/bg/mandir-banner.jpg';

export default function CustomerService() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  const [categoryValue, setCategoryValue] = useState(category);
  const [blogs, setBlogs] = useState<any[]>([]);

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
                      <li className="breadcrumb-item active">Customer Services</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>Customer Services</strong>
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
          <div className="row justify-content-center">
            <div className="col-md-10 col-12">
              <div className="contact-form py-lg-5 px-lg-5  py-md-5 px-md-5 px-4 py-4 box-shadow border-radius">
                <div className="section-title section-title-style-1">
                  <span className="sub-title left-divider">Choose Your</span>
                  <h2 className="title">Tell Us About Your Project</h2>
                </div>
                <form>
                  <div className="row align-items-center">
                    <div className="mb-3 col-md-6">
                      <input type="text" className="form-control" id="name" placeholder="Name" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <input type="text" className="form-control" id="phone" placeholder="Phone Number" />
                    </div>
                    <div className="mb-3 col-md-12">
                      <input type="email" className="form-control" id="email" placeholder="Email" />
                    </div>
                    <div className="mb-3 col-md-12 select-border">
                      <select className="form-control basic-select" id="productcategory">
                        <option value="1" selected={categoryValue === '1' ? true : false}>
                          Mandir
                        </option>
                        <option value="2">Furniture</option>
                        <option value="3">Handicraft</option>
                        <option value="4">Pooja Accessories</option>
                        <option value="5">Brass idol</option>
                        <option value="6">Decorative Strings</option>
                      </select>
                    </div>
                    <div className="col-lg-12">
                      <textarea className="form-control" rows={6} placeholder="Message"></textarea>
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
          </div>
        </div>
      </section>
    </div>
  );
}
