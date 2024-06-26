import React, { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BgImg from '../../../images/new-bg/Wishlist.jpg';
import Product1 from '../../../images/product/01.jpg';
import { getUserDetail } from '../../../helpers/common';
import { useMutation, useQuery } from 'react-query';
import { getWishList, removeWishList } from '../../../apiV2/wishlist';
import { CartContext } from '../../../context/cart.context';

const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const userDetail = getUserDetail();
  const [searchParams] = useSearchParams();
  const { addItem } = useContext(CartContext);

  const addItemToCart = async (data: any) => {
    addItem(data.item);
  };

  const { data: fetchWishlist, refetch } = useQuery('wishlistData', getWishList);

  const { mutate: removeItemFromWishlist } = useMutation(removeWishList, {
    onSuccess: () => {
      refetch();
      alert('Product removed from wishlist');
    },
    onError: () => {
      alert('Error removing product from wishlist');
    },
  });

  const filteredWishlist = fetchWishlist?.result?.filter((item: any) => item.userId === userDetail.id) || [];

  return (
    <>
      <section className="header-inner header-inner-menu bg-overlay-secondary" style={{ backgroundImage: 'url(' + BgImg + ')' }}>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 position-relative">
              <div className="header-inner-title">
                <div className="section-title">
                  <div className="sub-title">
                    <span></span>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a className="text-white text-uppercase" href="javascript:void(0)" onClick={() => navigate('/')}>
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item active">wishlist</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>wishlist</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-ptb bg-holder">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cart-table">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="product-remove">&nbsp;</th>
                        <th className="product-thumbnail">&nbsp;</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Stock Status</th>
                        <th className="product-subtotal">&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredWishlist.length > 0 ? (
                        filteredWishlist.map((value: any, key: number) => (
                          <tr key={key}>
                            <td className="product-remove">
                              <a href="javascript:void(0)" onClick={() => removeItemFromWishlist(value._id)}>
                                <i className="fa-solid fa-xmark"></i>
                              </a>
                            </td>
                            <td className="product-thumbnail">
                              <a href="#">
                                <img src={Product1} alt="" />
                              </a>
                            </td>
                            <td className="product-name">
                              <a href="#">{value?.item?.name || 'No name'}</a>
                            </td>
                            <td className="product-price">
                              <span className="amount">${value?.item?.price || 'No price for now'}</span>
                            </td>
                            <td className="product-stock">
                              {value?.item?.stock ? <span>{value?.item?.stock}</span> : <span style={{ color: 'red' }}>{`out of stock`}</span>}
                            </td>
                            <td className="product-subtotal">
                              <a className="btn btn-primary min-w-auto" href="javascript:void(0)" onClick={() => addItemToCart(value)}>
                                {' '}
                                Add to Cart
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center">
                            No items in wishlist
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
