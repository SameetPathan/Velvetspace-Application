import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { 
  FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaChevronRight, 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPinterestP
} from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-wave-top">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
      
      <div className="footer-main">
        <Container>
          <Row>
            <Col lg={4} md={6} className="mb-5 mb-lg-0">
              <div className="footer-info">
                <div className="footer-logo">
                  <div className="logo-placeholder">VS</div>
                  <span className="brand-text">VelvetSpace</span>
                </div>
                
                <ul className="footer-contact">
                  <li>
                    <FaMapMarkerAlt className="contact-icon" />
                    <div>
                      <strong>Head Office:</strong>
                      <p>448 HBR Layout 4TH Block, Service Road, Bangalore - 560043, India</p>
                    </div>
                  </li>
                  <li>
                    <FaMapMarkerAlt className="contact-icon" />
                    <div>
                      <strong>Other Office:</strong>
                      <p>Punya Pravah Near Wins Hospital, Kolhapur, India</p>
                    </div>
                  </li>
                  <li>
                    <FaMapMarkerAlt className="contact-icon" />
                    <div>
                      <strong>Other Office:</strong>
                      <p>Ellora Residency Dehu Road, Pune, India</p>
                    </div>
                  </li>
                  <li>
                    <FaEnvelope className="contact-icon" />
                    <div>
                      <p>admin@velvetspace.in</p>
                    </div>
                  </li>
                </ul>
                
                <div className="customer-care">
                  <h5>Customer Care</h5>
                  <div className="phone-numbers">
                    <div className="phone-item">
                      <FaPhoneAlt className="phone-icon" />
                      <a href="tel:+918867572229">+91 88675-72229</a>
                    </div>
                    <div className="phone-item">
                      <FaPhoneAlt className="phone-icon" />
                      <a href="tel:+918867532229">+91 88675-32229</a>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col lg={2} md={6} className="mb-5 mb-lg-0">
              <div className="footer-links">
              
               
             
           
              </div>
            </Col>
            
            <Col lg={2} md={6} className="mb-5 mb-lg-0">
              <div className="footer-links">
                <h5>Our Services</h5>
                <ul className="links-list">
                  <li>
                    <FaChevronRight className="link-icon" />
                    <Link to="/services/living-dining">Living/Dining Room</Link>
                  </li>
                  <li>
                    <FaChevronRight className="link-icon" />
                    <Link to="/services/bedroom">Bedroom</Link>
                  </li>
                  <li>
                    <FaChevronRight className="link-icon" />
                    <Link to="/services/kitchen">Kitchen</Link>
                  </li>
                  <li>
                    <FaChevronRight className="link-icon" />
                    <Link to="/services/storage">Innovative Storage</Link>
                  </li>
                </ul>
              </div>
            </Col>
            
            <Col lg={4} md={6}>
              <div className="footer-about">
                <h5>About</h5>
                <p>
                  At Velvetspace, we believe that interior design is more than great functionality and beautiful aesthetics. 
                  We aim to make your home interiors a reflection of your personality.
                </p>
               
                

              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      <div className="footer-bottom">
        <Container>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} <span>VelvetSpace</span>. All Rights Reserved.</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;