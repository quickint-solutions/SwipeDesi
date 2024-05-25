import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import img from '../../../images/new-bg/Contact-Us.jpg';
import { sendLead } from '../../../apiV2/leads';

export default function ContactUs() {
  const navigate = useNavigate();
  const [lead, setLead] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const { mutate: handleLead } = useMutation(sendLead, {
    onSuccess: lead => {
      alert('Thank you for contacting us. We will get back to you soon.');
      navigate('/');
    },
    onError: () => {
      alert('Error sending lead. Please try again later.');
    },
  });

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
                      <li className="breadcrumb-item active">Contact us</li>
                    </ol>
                  </div>
                  <h2 className="title text-white">
                    <strong>Contact us</strong>
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
          <div className="row justify-content-start g-0">
            <div className="col-md-12 col-lg-8 h-100">
              <div className="contact-form py-lg-5 px-lg-5  py-md-5 px-md-5 px-4 py-4 box-shadow border-radius">
                <div className="section-title section-title-style-1">
                  <span className="sub-title left-divider">Contact Us</span>
                  <h2 className="title">
                    Let’s Get <strong>In Touch!</strong>
                  </h2>
                </div>
                <form>
                  <div className="row align-items-center">
                    <div className="mb-3 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        id="first-name"
                        placeholder="First Name"
                        onChange={e => setLead({ ...lead, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Phone Number"
                        onChange={e => setLead({ ...lead, phone: e.target.value })}
                      />
                    </div>
                    <div className="mb-3 col-md-12">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        onChange={e => setLead({ ...lead, email: e.target.value })}
                      />
                    </div>
                    <div className="col-lg-12">
                      <textarea
                        className="form-control"
                        rows={5}
                        placeholder="Message"
                        onChange={e => setLead({ ...lead, message: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                  <div className="d-flex mt-4">
                    <a className="btn btn-primary d-inline" onClick={() => handleLead(lead)}>
                      Send your Message
                    </a>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="bg-primary message-info h-100 box-shadow  border-radius">
                <h3 className="title text-white mb-4">
                  Contact <strong>Information</strong>
                </h3>
                <p className="text-white">
                  It would be great to hear from you! If you got any questions, please do not hesitate to send us a message. We are looking forward to
                  hearing from you! We reply within 24 hours!
                </p>
                <div className="social-info mt-4">
                  <div className="contact-info">
                    <ul className="list-unstyled mb-0">
                      <li className="d-flex align-items-center">
                        <i className="bi bi-pin-map"></i>
                        <span className="text-white">260300 Writing Creek Cres, Balzac, AB T4A 0X8 CANADA</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="bi bi-telephone"></i>
                        <a href="tel:+15879697008">
                          <span className="text-white">+1 (587) 969-7008</span>
                        </a>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="bi bi-telephone-plus"></i>
                        <a href="tel:+14038016969">
                          <span className="text-white">+1 (403) 801-6969</span>
                        </a>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="bi bi-envelope"></i>
                        <span className="text-white">dhknd.inc@gmail.com</span>
                      </li>
                    </ul>
                  </div>
                  {/* <div className="social-icon">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
            </div>
            <div style={{ height: '400px', width: '100%' }}>
              {/* Google Maps iframe */}
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2500.2506837149044!2d-113.9990259229972!3d51.19603233340157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537160e36b7269cb%3A0x5b09f369d21078f9!2s260300%20Writing%20Creek%20Cres%20i28%2C%20Balzac%2C%20AB%20T0M%200E0%2C%20Canada!5e0!3m2!1sen!2sin!4v1683714410738!5m2!1sen!2sin"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen={true} // Pass a boolean value instead of an empty string
                aria-hidden={false} // Pass a boolean value instead of a string
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
