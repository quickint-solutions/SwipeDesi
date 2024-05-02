import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getBanners } from '../../../apiV2/banners';

const buttonStyle = {
  borderRadius: '12px',
  background: 'white',
  boxShadow: '0px 2px 16px 0px rgba(0, 0, 0, 0.12)',
  margin: '10px',
  padding: '8px 15px',
};

const Home: React.FC = () => {
  const { data: banners, isLoading: bannersLoading } = useQuery('getBanners', getBanners);
  // get first 2 banners
  const bannersList = banners?.result?.slice(0, 2) || [];

  // get other Banners
  const otherBanners = banners?.result?.slice(2) || [];

  return (
    <>
      <div className="topbar d-none d-md-block">
        <div className="container">
          <div className="topbar-inner">
            <div className="row">
              <div className="col-12">
                <div className="d-lg-flex align-items-center text-center">
                  <div className="topbar-left mb-2 mb-lg-0">
                    <div className="dropdown right-menu d-inline-flex pe-3 topbar-divider">
                      <a
                        className="dropdown-toggle"
                        href="#"
                        id="dropdownMenuButton2"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {/* <img className="img-fluid" src="images/en.png" alt=""> English<i className="fas fa-chevron-down fa-xs"></i> */}
                      </a>
                      <div className="dropdown-menu mt-0" aria-labelledby="dropdownMenuButton2">
                        {/* <a className="dropdown-item" href="#"><img className="img-fluid country-flag" src="images/country-flags/02.jpg" alt="">English</a>
                        <a className="dropdown-item" href="#"><img className="img-fluid country-flag" src="images/country-flags/09.jpg" alt="">Francais</a>
                        <a className="dropdown-item" href="#"><img className="img-fluid country-flag" src="images/country-flags/11.jpg" alt="">Deutsch</a>
                        <a className="dropdown-item" href="#"><img className="img-fluid country-flag" src="images/country-flags/12.jpg" alt="">Italiano</a> */}
                      </div>
                    </div>
                    <ul className="list-unstyled ps-2">
                      <li>
                        <a href="#">Gift cards</a>
                      </li>
                      <li>
                        <a href="#">Showrooms</a>
                      </li>
                      <li>
                        <a href="#">About Us</a>
                      </li>
                    </ul>
                  </div>
                  <div className="topbar-right ms-auto justify-content-center align-items-center">
                    <div className="topbar-call d-inline-flex topbar-divider pe-3">
                      <a href="tel:+1 (403) 801-6969">
                        <i className="bi bi-telephone me-2"></i>+1 (403) 801-69695
                      </a>
                    </div>
                    <div className="info-box-icon ps-3">
                      <a href="#" className="d-flex align-items-center">
                        {/* <img src="images/topbar-avtar-icon.png" alt="image"> */}
                        <span className="ps-2">Contact with an expert</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
