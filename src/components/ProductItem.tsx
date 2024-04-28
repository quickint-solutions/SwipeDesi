import React, { useContext } from 'react';
import { CartContext } from '../context/cart.context';

export default function ProductItem({ product }: { product: any }) {
  const { addItem, isItemInCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addItem(product);
    // alert('Product added to cart');
  };

  const isProductInCart = isItemInCart(product);

  return (
    <div className="col-xl-4 col-md-6">
      <div className="product">
        {product.discount && (
          <div className="product-label">
            <span className="onsale">{product.discount || 0}</span>
          </div>
        )}

        <div className="product-image">
          <div className="product-thumb-inner">
            <a href="#">
              <img className="img-fluid" src={product.images[0]} alt="image" />
            </a>
          </div>
          <div className="custom-icon">
            <ul className="list-unstyled">
              <li>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="wishlist">
                  <i className="far fa-heart"></i>
                </a>
              </li>
              <li>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to cart">
                  <i className="fas fa-shopping-cart"></i>
                </a>
              </li>
              <li>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare">
                  <i className="fa-solid fa-code-compare"></i>
                </a>
              </li>
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
                <a href="shop-single.html">{product.name || `no product name`}</a>
              </h3>
            </div>
          </div>

          <div className="product-prize">
            <p>${product.price || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
