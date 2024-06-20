import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getItems } from '../../../apiV2/items';
import ProductItem from '../../../components/ProductItem';
import { getCategories, getCategoriesById } from '../../../apiV2/categories';
import { AuthContext } from '../../../context/auth.context';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import $ from 'jquery';

export default function Products() {
  const { search, categories, setCategories } = useContext(AuthContext);

  const [page, setPage] = useState(1);

  const [openDropdown, setOpenDropdown] = useState(null);

  const [minPrice, setMinPrice] = useState('');

  const [maxPrice, setMaxPrice] = useState('');

  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [value, setValue] = useState([0, 1000]);

  const pageSize = 12;

  //!API'S call

  const { data: getProducts, mutate, isLoading } = useMutation(getItems);

  const { data: categoriesList } = useQuery('categories', getCategories);

  const categoriesData = categoriesList?.result?.filter((i: any) => !i.parentCategory) || [];

  const minPriceHandleChange = (e: any) => {
    setMinPrice(e.target.value);
  };
  const maxPriceHandleChange = (e: any) => {
    setMaxPrice(e.target.value);
  };

  const params = new URLSearchParams(window.location.search);

  const categoryId = params.get('category');

  const { data: subCategoriesData } = useQuery(
    ['getCategoriesById', categoryId],
    async () => {
      if (categoryId) {
        return await getCategoriesById(categoryId);
      }
    },
    {
      enabled: !!categoryId,
    },
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    $('html, body').animate({ scrollTop: 0 }, 'fast');
  };

  const handleColorChange = (color: string) => {
    setSelectedColors(prevColors => {
      if (prevColors.includes(color)) {
        return prevColors.filter(c => c !== color);
      } else {
        return [...prevColors, color];
      }
    });
  };

  const rangeSelector = (event: any, newValue: any) => {
    setValue(newValue as number[]);
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  useEffect(() => {
    if (selectedColors.length > 0) {
    }
  }, [selectedColors]);

  useEffect(() => {
    mutate({ categories, search, pageSize, page, minPrice, maxPrice, selectedColors });
  }, [categories, search, page, minPrice, maxPrice, selectedColors]);

  useEffect(() => {
    setCategories(categoryId || '');
  }, [categoryId, setCategories]);

  return (
    <div>
      <section
        className="header-inner header-inner-menu bg-overlay-secondary mandir-bg"
        style={{ backgroundImage: `url(${subCategoriesData?.banner || subCategoriesData?.parentCategory?.banner || 'No Background image'})` }}
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
                      <li className="breadcrumb-item active">{subCategoriesData?.parentCategory?.name || 'Products'}</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>{subCategoriesData?.name || 'Products'}</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-ptb">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <div className="sidebar">
                <div className="widget">
                  <div className="widget-title">
                    <h5 className="title">Categories</h5>
                  </div>
                  <div className="widget-content">
                    <div className="widget-categories">
                      <ul className="list-unstyled list-style list-style-underline mb-10">
                        {categoriesData.map((category: any) => {
                          const subCategories = categoriesList?.result?.filter((i: any) => i.parentCategory?._id === category._id) || [];
                          const totalItems = subCategories.length
                            ? subCategories.reduce((acc: number, curr: any) => acc + curr.itemCount, 0) + category.itemCount
                            : category.itemCount;

                          return (
                            <li key={category._id}>
                              <div
                                style={{ cursor: 'pointer', marginBottom: 5 }}
                                className="d-flex"
                                onClick={() => (totalItems ? setOpenDropdown(openDropdown === category._id ? null : category._id) : null)}
                              >
                                {category?.name}
                                <span className="ms-auto">
                                  <div>
                                    {totalItems} {openDropdown === category?._id ? '▼' : '▶'}
                                  </div>
                                </span>
                              </div>
                              {openDropdown === category?._id && subCategories.length > 0 && (
                                <div className="widget-content" style={{ paddingLeft: 20 }}>
                                  <div className="widget-categories">
                                    <ul className="list-unstyled list-style list-style-underline mb-0">
                                      {subCategories.map((subCategory: any) => {
                                        return (
                                          <li key={subCategory._id}>
                                            <div
                                              style={{ cursor: 'pointer', marginBottom: 5 }}
                                              className="d-flex"
                                              onClick={() => {
                                                setCategories(subCategory._id);
                                                setPage(1);
                                                const params = new URLSearchParams(window.location.search);
                                                params.set('category', subCategory._id);
                                                window.history.pushState({}, '', `${window.location.pathname}?${params}`);
                                              }}
                                            >
                                              {subCategory?.name || ''}
                                              <span className="ms-auto">
                                                <div className="count">{subCategory?.itemCount}</div>
                                              </span>
                                            </div>
                                          </li>
                                        );
                                      })}
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

                  <div className="widget">
                    <div className="widget-title">
                      <h5 className="title">Filter by price</h5>
                    </div>
                    <div style={{ margin: 'auto', display: 'block', width: 'fit-content' }}>
                      {/* <div className="widget-content">
                        <div className="mb-3">
                          <div className="collapse show" id="price">
                            <div className="property-price-slider">
                              <input
                                type="text"
                                style={{ marginBottom: 10 }}
                                placeholder="minimum price"
                                value={minPrice}
                                onChange={minPriceHandleChange}
                              />
                              <input type="text" placeholder="maximum price" value={maxPrice} onChange={maxPriceHandleChange} />
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <Slider value={value} onChange={rangeSelector} valueLabelDisplay="auto" min={0} max={10000} style={{ color: '#F3601E' }} />
                      Price filter between {value[0]} - and {value[1]}
                    </div>
                  </div>
                  <div className="widget-content">
                    <div className="widget-title">
                      <h5 className="title">Filter by Colour</h5>
                    </div>
                    <div className="widget-color">
                      <ul className="list-unstyled list-style list-style-underline mb-0">
                        <li>
                          <a className="d-flex" onClick={() => handleColorChange('yellow')}>
                            <span className="filter-color" style={{ backgroundColor: '#dad810' }}>
                              <input value="yellow" name="filter_color" type="checkbox" checked={selectedColors.includes('yellow')} readOnly />
                            </span>
                            Yellow
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" onClick={() => handleColorChange('green')}>
                            <span className="filter-color" style={{ backgroundColor: '#10da21' }}>
                              <input value="green" name="filter_color" type="checkbox" checked={selectedColors.includes('green')} readOnly />
                            </span>
                            Green
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" onClick={() => handleColorChange('blue')}>
                            <span className="filter-color" style={{ backgroundColor: '#1072da' }}>
                              <input value="blue" name="filter_color" type="checkbox" checked={selectedColors.includes('blue')} readOnly />
                            </span>
                            Blue
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" onClick={() => handleColorChange('pink')}>
                            <span className="filter-color" style={{ backgroundColor: '#da10a4' }}>
                              <input value="pink" name="filter_color" type="checkbox" checked={selectedColors.includes('pink')} readOnly />
                            </span>
                            Pink
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" onClick={() => handleColorChange('red')}>
                            <span className="filter-color" style={{ backgroundColor: '#da1021' }}>
                              <input value="red" name="filter_color" type="checkbox" checked={selectedColors.includes('red')} readOnly />
                            </span>
                            Red
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" onClick={() => handleColorChange('brown')}>
                            <span className="filter-color" style={{ backgroundColor: '#9b6c07' }}>
                              <input value="brown" name="filter_color" type="checkbox" checked={selectedColors.includes('brown')} readOnly />
                            </span>
                            Brown
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" onClick={() => handleColorChange('grey')}>
                            <span className="filter-color" style={{ backgroundColor: '#9f9f9f' }}>
                              <input value="grey" name="filter_color" type="checkbox" checked={selectedColors.includes('grey')} readOnly />
                            </span>
                            Grey
                          </a>
                        </li>
                        <li>
                          <a className="d-flex" onClick={() => handleColorChange('nude')}>
                            <span className="filter-color" style={{ backgroundColor: '#e2e39d' }}>
                              <input value="nude" name="filter_color" type="checkbox" checked={selectedColors.includes('nude')} readOnly />
                            </span>
                            Nude
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="widget">
                  <div className="widget-title">
                    <h5 className="title">Featured Product</h5>
                  </div>
                  <div className="widget-content">
                    {getProducts?.result?.slice(0, 3).map((categories: any) => (
                      <div className="widget-product" key={categories._id}>
                        <div className="product d-flex align-items-center mb-3">
                          <div className="product-image">
                            <div className="product-thumb-inner">
                              <a href={`/shopSingle?productId=${categories?._id}`}>
                                <img className="img-fluid" src={categories?.images[0]} alt="image" />
                              </a>
                            </div>
                          </div>

                          <div className="product-content py-0">
                            <div className="product-info">
                              <div className="product-title">
                                <h3>
                                  <a href={`/shopSingle?productId=${categories?._id}`} style={{ cursor: 'pointer' }}>
                                    {categories?.name || ''}
                                  </a>
                                </h3>
                              </div>
                            </div>
                            <div className="product-prize">
                              <p>
                                <span className="me-2">${categories?.price || 'N/A'}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 mt-4 mt-md-5 mt-lg-0">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {isLoading && <h3>Loading...</h3>}
                {!isLoading && getProducts?.result?.length === 0 && <h3>No products found</h3>}
              </div>

              <div className="row">{getProducts?.result.map((product: any) => <ProductItem key={product._id} product={product} large />)}</div>
              <div className="row">
                <div className="col-12 text-center mt-4 mt-sm-5">
                  <nav>
                    <ul className="pagination justify-content-center mb-0">
                      <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <a
                          className="page-link"
                          onClick={() => page > 1 && handlePageChange(page - 1)}
                          aria-label="Previous"
                          style={{ cursor: page > 1 ? 'pointer' : 'not-allowed' }}
                        >
                          <span aria-hidden="true">«</span>
                          <span className="sr-only">Previous</span>
                        </a>
                      </li>
                      <li className="page-item active">
                        <span className="page-link">
                          {page}
                          <span className="sr-only">(current)</span>
                        </span>
                      </li>
                      <li className={`page-item ${getProducts?.result?.length < pageSize ? 'disabled' : ''}`}>
                        <a
                          className="page-link"
                          onClick={() => getProducts?.result?.length >= pageSize && handlePageChange(page + 1)}
                          aria-label="Next"
                          style={{ cursor: getProducts?.result?.length >= pageSize ? 'pointer' : 'not-allowed' }}
                        >
                          <span aria-hidden="true">»</span>
                          <span className="sr-only">Next</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
