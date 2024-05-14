import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getItems } from '../../../apiV2/items';
import ProductItem from '../../../components/ProductItem';
import { getCategories } from '../../../apiV2/categories';
import { useNavigate } from 'react-router-dom';
import img from '../../../images/bg/mandir-banner.jpg';

export default function PrivacyPolicy() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  const [categoryValue, setCategoryValue] = useState(category);

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
                        <a className="text-white text-uppercase" href="/">
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item active">Shipping rates and policies</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>Shipping rates and policies</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-inner-shape" style={{ backgroundImage: 'url("images/bg/02.png")' }}></div>
      </section>
      <section className="space-ptb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="mb-4">
                <p>Last updated: March 02, 2021</p>
                <p>dhknd (“us”, “we”, or “our”) operates the dhknd website (the “Service”).</p>
                <p>
                  This page informs you of our policies regarding the collection, use and disclosure of Personal Information when you use our Service.
                </p>
                <p>We will not use or share your information with anyone except as described in this Privacy Policy.</p>
                <p>
                  We use your Personal Information for providing and improving the Service. By using the Service, you agree to the collection and use
                  of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy
                  have the same meanings as in our Terms and Conditions, accessible at https://dhknd.ca
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">Information Collection And Use</h4>
                <p>
                  While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact
                  or identify you. Personally identifiable information (“Personal Information”) may include, but is not limited to:
                  <br />
                  Name
                  <br />
                  Email address
                  <br />
                  Telephone number
                  <br />
                  Address
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">Log Data</h4>
                <p>
                  We collect information that your browser sends whenever you visit our Service (“Log Data”). This Log Data may include information
                  such as your computer’s Internet Protocol (“IP”) address, browser type, browser version, the pages of our Service that you visit,
                  the time and date of your visit, the time spent on those pages and other statistics.
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">Cookies</h4>
                <p>
                  Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from
                  a web site and stored on your computer’s hard drive.
                </p>
                <p>
                  We use “cookies” to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                  sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">Service Providers</h4>
                <p>
                  We may employ third party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform
                  Service-related services or to assist us in analyzing how our Service is used.
                </p>
                <p>
                  These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to
                  disclose or use it for any other purpose.
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">Security</h4>
                <p>
                  The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or
                  method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal
                  Information, we cannot guarantee its absolute security.
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">Links To Other Sites</h4>
                <p>
                  Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed
                  to that third party’s site. We strongly advise you to review the Privacy Policy of every site you visit.
                </p>
                <p>
                  We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites or
                  services.
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">Children’s Privacy</h4>
                <p>Our Service does not address anyone under the age of 18 (“Children”).</p>
                <p>
                  We do not knowingly collect personally identifiable information from children under 18. If you are a parent or guardian and you are
                  aware that your child has provided us with Personal Information, please contact us. If we discover that a child under 18 has
                  provided us with Personal Information, we will delete such information from our servers immediately.
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">Changes To This Privacy Policy</h4>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this
                  page.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they
                  are posted on this page.
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 fw-600">Contact Us</h4>
                <p>If you have any questions about this Privacy Policy, please contact us.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
