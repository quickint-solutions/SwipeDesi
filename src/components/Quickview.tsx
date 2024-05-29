import React from 'react';
import shopSingleHttpRequest from '../api/shopSingleHttpRequest';
import { getUserDetail } from '../helpers/common';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getItemsById } from '../apiV2/items';

const QuickView = ({ product, onClose }: { product: any; onClose: () => void }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: itemDetails, isLoading } = useQuery('itemDetails', async () => {
    let productId = searchParams.get('productId');
    if (productId) {
      return await getItemsById(productId);
    }
  });
  const userDetail = getUserDetail();

  const addToWishlist = async () => {
    if (userDetail) {
      let wishlistData = await shopSingleHttpRequest.addToWishlist(userDetail?.userID, itemDetails?._id, 'add');
      if (wishlistData[0]?.Status) {
        navigate(`/wishlist?productId=${itemDetails?._id}`);
      } else {
        alert(wishlistData[0].Message);
      }
    } else {
      (window as any).$('#formLoginRegister').modal('show');
    }
  };

  console.log('product -> ', product);

  const buttonStyle = {
    backgroundColor: '#ff6600',
    color: '#ffffff',
    border: 'none',
    padding: '30px 30px',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'center' as 'center',
    display: 'inline-block',
    borderRadius: '0px',
    transition: 'background-color 0.3s ease',
    width: '200px',
    height: '60px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#e65c00',
    color: '#ffffff',
  };

  return (
    <div className="modal fade show" id="quickView" aria-labelledby="quickViewLabel" aria-hidden="true" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header border-0">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body quickview-modal">
            <div className="row">
              <div className="col-lg-6">
                <img className="img-fluid" src={product.images[0]} alt="Product" />
              </div>
              <div className="col-lg-6 mt-4 mt-lg-0">
                <div className="product-detail">
                  <h4 className="fw-600">{product.name}</h4>
                  <div className="product-price-rating">
                    <div className="product-price mb-3">
                      <h4>
                        {product.oldPrice && <del>${Number(product.oldPrice).toFixed(2)}</del>}
                        <span>${Number(product.price).toFixed(2)}</span>
                      </h4>
                    </div>
                  </div>
                  <p className="Poppins-fonts" dangerouslySetInnerHTML={{ __html: product?.descriptions || 'No description' }}></p>
                  <div className="justify-content-start d-flex add-to-cart-input">
                    <div className="input-group">
                      <input type="number" name="quant[1]" className="form-control input-number mt-2 mt-sm-0" defaultValue="1" min="1" max="10" />
                    </div>
                    <a
                      className="btn btn-primary mt-2 mt-sm-0 d-flex align-items-center justify-content-center"
                      onClick={addToWishlist}
                      style={buttonStyle}
                      onMouseOver={e => {
                        e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
                      }}
                    >
                      <span>Add To Wishlist</span>
                    </a>
                  </div>
                  <hr className="hr-dark" />
                  <div>
                    <span>SKU: 9624 </span>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Category:
                      <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>{product?.categories?.name || 'No item category'}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
