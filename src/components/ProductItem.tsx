import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/cart.context';
import { useMutation } from 'react-query';
import { addWishList } from '../apiV2/wishlist';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import QuickView from './Quickview';
import $ from 'jquery';

export default function ProductItem({ product, large }: { product: any; large?: boolean }) {
  const { addItem, isItemInCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addItem(product);
    // alert('Product added to cart');
  };

  const { user } = useContext(AuthContext);
  const isProductInCart = isItemInCart(product);
  const navigate = useNavigate();

  const wishListData = {
    productId: product?._id,
    userId: user?._id,
  };

  const { mutate: addProductToWishList } = useMutation(addWishList, {
    onSuccess: () => {
      alert(`Product: ${product?.name || ''} added to wishlist`);
    },
    onError: () => {
      alert(`Error adding Product: ${product.name || ''} to wishlist`);
    },
  });
  const [showModal, setShowModal] = useState(false);

  const handleQuickViewClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    $(`#product-${product?._id}`).hover(
      function () {
        $(`#product-img-${product?._id}`).attr('src', product?.images?.[1] || product?.images?.[0]);
      },
      function () {},
    );
    $(`#product-img-${product?._id}`).attr('src', product?.images?.[0]);
  });

  return (
    <div className={`col-xl-${large ? '4' : '3'} col-md-6`} style={{ cursor: 'pointer' }} id={`product-${product?._id}`}>
      <div className="product">
        {product.discount && (
          <div className="product-label">
            <span className="onsale">{product.discount || 0}%</span>
          </div>
        )}

        <div className="product-image">
          <div className="product-thumb-inner">
            <a href={`/shopSingle?productId=${product?._id}`}>
              <img className="img-fluid" id={`product-img-${product?._id}`} src={product.images[0]} alt="image" />
            </a>
          </div>
          <div className="custom-icon">
            <ul className="list-unstyled">
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist" onClick={() => addProductToWishList(wishListData)}>
                  <i className="far fa-heart"></i>
                </a>
                <a data-bs-toggle="tooltip" data-bs-placement="left" title="Quick View" onClick={handleQuickViewClick}>
                  <i className="fa-regular fa-eye"></i>
                </a>
                {showModal && <QuickView product={product} onClose={handleModalClose} />}
              </li>
              <li>
                {/* <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to cart">
                  <i className="fas fa-shopping-cart"></i>
                </a> */}
              </li>
              {/* <li>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare">
                  <i className="fa-solid fa-code-compare"></i>
                </a>
              </li> */}
            </ul>
          </div>
          <div className="product-btn">
            <button
              onClick={() => {
                handleAddToCart();
              }}
              style={{ cursor: 'pointer', width: '100%' }}
              className="btn btn-light d-block"
            >
              {isProductInCart ? 'In Cart' : 'Add To Cart'}
              <i className="fas fa-arrow-right-long ps-3"></i>
            </button>
          </div>
        </div>
        <div className="product-content">
          <div className="product-info">
            <div className="product-title">
              <h3>
                <a onClick={() => navigate(`/shopSingle?productId=${product?._id}`)}>{product.name || `no product name`}</a>
              </h3>
            </div>
          </div>

          <div className="product-price">
            <p>
              <span className="me-2">
                <del>${product.oldPrice}</del>
              </span>
              <span className="text-primary">${product.price || 'No price'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
