import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getBlogsById } from '../../../apiV2/blogs';
import { AuthContext } from '../../../context/auth.context';
import { getCategories } from '../../../apiV2/categories';

export default function BlogSingle() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const { setCategories } = useContext(AuthContext);

  const { data: categoriesList } = useQuery('categories', getCategories);

  const categoriesData = categoriesList?.result?.filter((i: any) => !i.parentCategory) || [];

  const params = new URLSearchParams(window.location.search);

  const categoryName = params.get('category');

  const blogId = params.get('id');

  const { data: blogData } = useQuery('blog-single', () => getBlogsById(blogId as string));

  useEffect(() => {
    setCategories(categoryName as string);
  }, [categoryName]);

  return (
    <div>
      <section
        className="header-inner header-inner-menu bg-overlay-secondary"
        style={{ backgroundImage: `url(${blogData?.image})`, maxHeight: '300px' }}
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
                        <a className="text-white text-uppercase" href="index.html">
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item active">Blog Single</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>{blogData?.title || 'No title'}</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="header-inner-shape" style={{ backgroundImage: `url(${blogData?.image})` }}></div> */}
      <section className="space-ptb">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <div className="blog-detail">
                <div className="blog-post">
                  <div className="blog-img">
                    <img className="img-fluid" src={blogData?.image} alt="#" />
                  </div>
                  <div className="blog-info">
                    <div className="blog-meta d-flex flex-wrap align-items-center pb-2">
                      <div className="time-card me-3 d-flex align-items-center">
                        <a>
                          <i className="fa-regular fa-clock me-1 text-primary"></i>
                          <span>Feb 4, 2022 By</span>
                        </a>
                      </div>
                      <div className="user d-flex align-items-center me-3">
                        <a>
                          <i className="fa-regular fa-user me-1 text-primary"></i>
                          <span>Dhknd</span>
                        </a>
                      </div>
                    </div>
                    <h4 className="blog-tittle">
                      <a>{blogData?.title || 'No title'}</a>
                    </h4>
                    <p className="mt-3">{blogData?.descriptions || 'No description'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 mt-4 mt-md-5 mt-lg-0">
              <div className="sidebar">
                <div className="widget">
                  <div className="widget-title">
                    <h5 className="title">Categories</h5>
                  </div>
                  <div className="widget-content">
                    <div className="widget-content">
                      <div className="widget-categories">
                        <ul className="list-unstyled list-style list-style-underline mb-0">
                          {categoriesData.map((category: any) => {
                            const subCategories = categoriesList?.result?.filter((i: any) => i.parentCategory?._id === category._id) || [];
                            const totalItems = subCategories?.length
                              ? subCategories.reduce((acc: any, curr: any) => acc + curr.itemCount, 0) + category.itemCount
                              : category.itemCount;

                            return (
                              <li key={category._id}>
                                <div
                                  style={{ cursor: 'pointer', marginBottom: 5 }}
                                  className="d-flex"
                                  onClick={() => (totalItems ? setOpenDropdown(openDropdown === category._id ? null : category._id) : null)}
                                >
                                  {category.name}
                                  <span className="ms-auto">
                                    <div>
                                      {totalItems} {openDropdown === category._id ? '▼' : '▶'}
                                    </div>
                                  </span>
                                </div>
                                {openDropdown === category._id && subCategories.length > 0 && (
                                  <div className="widget-content" style={{ paddingLeft: 20 }}>
                                    <div className="widget-categories">
                                      <ul className="list-unstyled list-style list-style-underline mb-0">
                                        {subCategories.map((subCategory: any) => (
                                          <li key={subCategory._id}>
                                            <div style={{ cursor: 'pointer', marginBottom: 5 }} className="d-flex">
                                              {subCategory.name}
                                              <span className="ms-auto">
                                                <div className="count">{subCategory.itemCount}</div>
                                              </span>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
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
