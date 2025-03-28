import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { 
  FaRegStar, FaStar, FaCheck, FaArrowRight,
  FaCouch, FaRuler, FaPalette, FaRegHandshake
} from 'react-icons/fa';
import './Offerings.css';

function Offerings() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const staggerItems = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Features for each package
  const cozyFeatures = [
    "Personalized design consultation with award-winning designers",
    "Premium quality materials and finishes",
    "End-to-end project management",
    "White glove installation service",
    "5-year warranty on all installations",
    "Post-installation support"
  ];
  
  const eliteFeatures = [
    "Budget-friendly modular solutions",
    "Wide range of colors and designs",
    "Custom kitchens and wardrobes",
    "Professional installation team",
    "3-year warranty on installations",
    "Flexible payment options"
  ];

  return (
    <div className="offerings-page">
      {/* Hero Section */}
      <section className="offerings-hero">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="hero-title">
                  Our <span className="gradient-text">Offerings</span>
                </h1>
                <p className="hero-subtitle">
                  A trouble-free Home Interior Journey tailored to your needs and budget
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
        <div className="shape-divider">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>
      
      {/* One-stop shop section */}
      <section className="one-stop-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={10}>
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="one-stop-content"
              >
                <div className="section-title-wrapper">
                  <h2 className="section-title">One-stop shop for all effects home innards</h2>
                  <div className="separator"></div>
                </div>
                <p className="section-subtitle">
                  Whether it's a magazine-like dream kitchen or your entire home, enjoy end-to-end results from design to installation.
                </p>
              </motion.div>
            </Col>
          </Row>
          
          <Row className="mt-5">
            <motion.div
              className="features-container"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Row>
                <Col lg={3} md={6} className="mb-4">
                  <motion.div 
                    className="feature-item"
                    variants={staggerItems}
                  >
                    <div className="feature-icon-wrapper">
                      <FaCouch className="feature-icon" />
                    </div>
                    <h3>Premium Designs</h3>
                    <p>Curated selection of modern and classic interior design options</p>
                  </motion.div>
                </Col>
                
                <Col lg={3} md={6} className="mb-4">
                  <motion.div 
                    className="feature-item"
                    variants={staggerItems}
                  >
                    <div className="feature-icon-wrapper">
                      <FaRuler className="feature-icon" />
                    </div>
                    <h3>Custom Solutions</h3>
                    <p>Tailor-made solutions designed to fit your space perfectly</p>
                  </motion.div>
                </Col>
                
                <Col lg={3} md={6} className="mb-4">
                  <motion.div 
                    className="feature-item"
                    variants={staggerItems}
                  >
                    <div className="feature-icon-wrapper">
                      <FaPalette className="feature-icon" />
                    </div>
                    <h3>Quality Materials</h3>
                    <p>Superior quality materials that ensure longevity and beauty</p>
                  </motion.div>
                </Col>
                
                <Col lg={3} md={6} className="mb-4">
                  <motion.div 
                    className="feature-item"
                    variants={staggerItems}
                  >
                    <div className="feature-icon-wrapper">
                      <FaRegHandshake className="feature-icon" />
                    </div>
                    <h3>Expert Installation</h3>
                    <p>Professional installation team that ensures perfect execution</p>
                  </motion.div>
                </Col>
              </Row>
            </motion.div>
          </Row>
        </Container>
      </section>
      
      {/* Packages Section */}
      <section className="packages-section">
        <div className="diagonal-bg"></div>
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="section-title">Choose Your Perfect Package</h2>
                <div className="separator"></div>
                <p className="section-subtitle">
                  Select the package that best suits your needs and budget
                </p>
              </motion.div>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            <Col lg={5} md={6} className="mb-4">
              <motion.div
                className="package-card elite-card"
                variants={staggerItems}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="package-header">
                  <h3>Elite</h3>
                  <div className="package-stars">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStar />
                    <FaRegStar />
                  </div>
                </div>
                
                <div className="package-description">
                  <p>High quality, budget-friendly modular solutions like kitchens, wardrobes, and more in your favourite colours, and designs.</p>
                </div>

              
              </motion.div>
            </Col>
            
            <Col lg={5} md={6} className="mb-4">
              <motion.div
                className="package-card cozy-card"
                variants={staggerItems}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="package-header">
                  <div className="recommended-badge">Most Popular</div>
                  <h3>Cozy</h3>
                  <div className="package-stars">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
                
                <div className="package-description">
                  <p>Get the complete home interior experience with award-winning designers, service partners, and the best brands.</p>
                </div>
                
               
                
 
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <motion.div 
            className="cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Row className="align-items-center">
              <Col lg={8} md={7}>
                <h2 className="cta-title">Ready to Transform Your Space?</h2>
                <p className="cta-text">Get a personalized quote for your dream interior project today.</p>
              </Col>
            
            </Row>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

export default Offerings;