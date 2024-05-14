import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getItems } from '../../../apiV2/items';
import ProductItem from '../../../components/ProductItem';
import { getCategories } from '../../../apiV2/categories';
import { AuthContext } from '../../../context/auth.context';

export default function Products() {
  const { search, categories, setCategories } = useContext(AuthContext);

  const { data: getProducts, mutate, isLoading } = useMutation(getItems);

  const { data: categoriesList } = useQuery('categories', getCategories);
  const [openDropdown, setOpenDropdown] = useState(null);

  const categoriesData = categoriesList?.result?.filter((i: any) => !i.parentCategory) || [];

  useEffect(() => {
    mutate({ categories: categories, search });
  }, [categories, search]);

  const params = new URLSearchParams(window.location.search);
  const categoryName = params.get('category');
  const category = categoriesData.find((i: any) => {
    if (i._id === categoryName) {
      return i.name;
    }
  });

  const pCategoty = category?.parentCategory ? categoriesList?.result?.find((i: any) => i._id === i.parentCategory?._id) || {} : category;

  return (
    <div>
      <section
        className="header-inner header-inner-menu bg-overlay-secondary mandir-bg"
        style={{ backgroundImage: 'url(' + pCategoty?.banner + ')' }}
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
                        <a className="text-white text-uppercase" href="/">
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item active">{category?.name || 'Products'}</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>{category?.name || 'Products'}</strong>
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
            <div className="col-xl-3 col-lg-4">
              <div className="sidebar">
                <div className="widget">
                  <div className="widget-title">
                    <h5 className="title">Search</h5>
                  </div>
                  <div className="widget-content">
                    <div className="search">
                      <i className="fas fa-search"></i>
                      <input type="text" className="form-control" placeholder="Search" />
                    </div>
                  </div>
                </div>
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
                                          <div
                                            style={{ cursor: 'pointer', marginBottom: 5 }}
                                            className="d-flex"
                                            onClick={() => setCategories(subCategory._id)}
                                          >
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
                {/* <div className="widget">
                  <div className="widget-title">
                    <h5 className="title">Filter by price</h5>
                  </div>
                  <div className="widget-content">
                    <div className="mb-3">
                      <div className="collapse show" id="price">
                        <div className="property-price-slider">
                          <input type="text" id="property-price-slider" name="example_name" value="" />
                        </div>
                      </div>
                    </div>
                    <div className="price-filter">
                      <div className="price_label">
                        Max Price: <span className="from"> Search by price limit</span>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div className="widget">
                  <div className="widget-title">
                    <h5 className="title">Color</h5>
                  </div>
                  <div className="widget-content">
                    <div className="widget-color">
                      <ul className="list-unstyled list-style list-style-underline mb-0">
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#dad810' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            Yellow
                            <span className="ms-auto">
                              <div className="count">8</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#10da21' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            Green
                            <span className="ms-auto">
                              <div className="count">16</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#1072da' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            Blue
                            <span className="ms-auto">
                              <div className="count">12</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#da10a4' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            Pink
                            <span className="ms-auto">
                              <div className="count">8</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#da1021' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            Red
                            <span className="ms-auto">
                              <div className="count">18</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#9b6c07' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            Brown
                            <span className="ms-auto">
                              <div className="count">20</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#9f9f9f' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            Grey
                            <span className="ms-auto">
                              <div className="count">12</div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" href="#">
                            <span className="filter-color" style={{ backgroundColor: '#e2e39d' }}>
                              <input value="yellow" name="filter_color" type="checkbox" />
                            </span>
                            nude
                            <span className="ms-auto">
                              <div className="count">9</div>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}

                <div className="widget">
                  <div className="widget-title">
                    <h5 className="title">Featured Product</h5>
                  </div>
                  <div className="widget-content">
                    {getProducts?.result?.slice(0, 3).map((categories: any) => {
                      return (
                        <>
                          <div className="widget-product">
                            <div className="product d-flex align-items-center mb-3">
                              <div className="product-image">
                                <div className="product-thumb-inner">
                                  <a href={'/shopSingle?productId=' + categories?._id}>
                                    <img className="img-fluid" src={categories.images[0]} alt="image" />
                                  </a>
                                </div>
                              </div>

                              <div className="product-content py-0">
                                <div className="product-info">
                                  <div className="product-title">
                                    <h3>
                                      <a href={`/shopSingle?productId=${categories?._id}`} style={{ cursor: 'pointer' }}>
                                        {categories.name || ''}
                                      </a>
                                    </h3>
                                  </div>
                                  {/* stars removed */}
                                  {/* <div className="product-star">
                                    <ul className="list-unstyled mb-1">
                                      <li>
                                        <i className="fas fa-star"></i>
                                      </li>
                                      <li>
                                        <i className="fas fa-star"></i>
                                      </li>
                                      <li>
                                        <i className="fas fa-star"></i>
                                      </li>
                                      <li>
                                        <i className="fas fa-star"></i>
                                      </li>
                                      <li>
                                        <i className="far fa-star-half-alt"></i>
                                      </li>
                                    </ul>
                                  </div> */}
                                </div>

                                <div className="product-prize">
                                  <p>
                                    <span className="me-2">${categories.price || 'N/A'}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 mt-4 mt-md-5 mt-lg-0">
              {/* <h5 className="widget-title">Product filters</h5>
              <div className="blog-sidebar-post-divider"></div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <input
                    type="search"
                    onChange={e => {
                      setSearch(e.target.value);
                    }}
                    id="shop-filter-search"
                    className="search-field mb-3"
                    placeholder="Search products…"
                    value={search}
                    name="s"
                  />
                </div>
                <div className="col-lg-4">
                  <div className="mb-3 select-border">
                    <select className="form-control basic-select">
                      <option value="1">Accessories</option>
                      <option value="3">Belts</option>
                      <option value="4">Chair</option>
                      <option value="2">Stick</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3 select-border">
                    <select className="form-control basic-select">
                      <option value="1">Any rating</option>
                      <option value="2">5 Star</option>
                      <option value="3">4 Star</option>
                      <option value="4">3 Star</option>
                      <option value="5">2 Star</option>
                      <option value="6">1 Star</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3 select-border">
                    <select className="form-control basic-select">
                      <option value="1">Any color</option>
                      <option value="1">Black, brown</option>
                      <option value="2">Blue</option>
                      <option value="3">Dark grey</option>
                      <option value="4">Green</option>
                      <option value="5">Pink</option>
                      <option value="6">Red</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3 select-border">
                    <select className="form-control basic-select">
                      <option value="1">Any size</option>
                      <option value="2">L</option>
                      <option value="2">M</option>
                      <option value="3">S</option>
                      <option value="4">XS</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row my-2 align-items-center">
                <div className="col-lg-8">
                  <p>Showing all {getProducts?.count || 0} results</p>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3 select-border">
                    <select className="form-control basic-select">
                      <option value="1">Default sorting</option>
                      <option value="2">Sort by popularity</option>
                      <option value="3">Sort by average rating</option>
                      <option value="4">Sort by latest</option>
                    </select>
                  </div>
                </div>
              </div> */}

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {isLoading && <h3>Loading...</h3>}
                {getProducts?.result?.length === 0 && <h3>No products found</h3>}
              </div>

              <div className="row">
                {getProducts?.result.map((product: any) => {
                  return <ProductItem key={product._id} product={product} large />;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
