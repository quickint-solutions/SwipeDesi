import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import img from '../../../images/bg/mandir-banner.jpg';
import { fetchBlogs } from '../../../apiV2/blogs';
import { AuthContext } from '../../../context/auth.context';
import { getCategories } from '../../../apiV2/categories';

export default function Blogs() {
  //blogs mapping
  const { data: blogsList } = useQuery('Blogs', fetchBlogs);
  const blogsData = blogsList?.result || [];

  const { search, categories, setCategories } = useContext(AuthContext);

  const { data: categoriesList } = useQuery('categories', getCategories);
  const [openDropdown, setOpenDropdown] = useState(null);

  const categoriesData = categoriesList?.result?.filter((i: any) => !i.parentCategory) || [];

  const params = new URLSearchParams(window.location.search);
  const categoryName = params.get('category');
  const category = categoriesData.find((i: any) => {
    if (i._id === categoryName) {
      return i.name;
    }
  });
  useEffect(() => {
    setCategories(categoryName as string);
  }, [categoryName]);

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
                      <li className="breadcrumb-item active">Blogs</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>Blogs</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-inner-shape"></div>
      </section>
      <section className="space-ptb">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <div className="row">
                <div className="col-md-6 col-12 mb-4">
                  {blogsData?.map((blog: any) => {
                    return (
                      <div className="blog-post" key={blog?._id}>
                        <div className="blog-img">
                          <img className="img-fluid" src={blog?.image} alt="#" />
                        </div>
                        <div className="blog-info">
                          <span>February 4, 2022</span>
                          <h4 className="blog-tittle">
                            <a>{blog?.title || 'No title given'}</a>
                          </h4>
                          <a className="blog-link" href={`/blog-single?id=${blog._id}`} style={{ cursor: 'pointer' }}>
                            Read More<i className="fa-solid fa-arrow-right-long ps-2"></i>
                          </a>
                        </div>
                      </div>
                    );
                  })}
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
      </section>
    </div>
  );
}
