import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { 
  FaCouch, FaBed, FaUtensils, FaBoxOpen, FaTag, FaTruckMoving, 
  FaShieldAlt, FaVrCardboard, FaCertificate, FaHeadset, FaMoneyBillWave
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Add smooth scroll behavior
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Services data
  const services = [
    { title: 'Living/Dining Room', icon: <FaCouch /> },
    { title: 'Bedroom', icon: <FaBed /> },
    { title: 'Kitchen', icon: <FaUtensils /> },
    { title: 'Innovative Storage', icon: <FaBoxOpen /> },
  ];

  // Benefits data
  const benefits = [
    { number: '01', title: 'Best Price Guarantee', icon: <FaTag /> },
    { number: '02', title: '30 Days Move in Guarantee', icon: <FaTruckMoving /> },
    { number: '03', title: '12 Years Warranty', icon: <FaShieldAlt /> },
    { number: '04', title: 'We Are Virtual Reality Visualization', icon: <FaVrCardboard /> },
    { number: '05', title: 'Quality Assurance Certification', icon: <FaCertificate /> },
    { number: '06', title: 'After Sell Support', icon: <FaHeadset /> },
    { number: '07', title: 'No Hidden Cost', icon: <FaMoneyBillWave /> },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            A home so good, <br/>
            <span className="gradient-text">you'll love the way you Live.</span>
          </h1>
          <p className="hero-subtitle">Smart and efficient home interiors with superior quality materials</p>
          <div className="hero-buttons">
            <Button className="hero-button primary-button">
              Explore Our Designs
            </Button>
            <Button className="hero-button secondary-button">
              Contact Us
            </Button>
          </div>
        </motion.div>
        <div className="shape-divider">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="vision-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="section-title">Let's shape the future of home interiors, together</h2>
                <div className="separator"></div>
                <p className="section-subtitle">Transform your living space into a stylish and functional haven that reflects your unique personality.</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* One Stop Shop Section */}
      <section className="one-stop-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="one-stop-content"
              >
                <h2 className="section-title">One Stop Shop For All Effects Home Innards</h2>
                <div className="separator"></div>
                <p className="section-text">Whether it's a magazine-such like dream kitchen or your entire home, enjoy end-to-end results from design to installation.</p>
                <Button className="action-button">Learn More</Button>
              </motion.div>
            </Col>
            <Col lg={6} md={12}>
              <div className="image-grid">
                <motion.div 
                  className="image-placeholder first"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="placeholder-content">
                    <span>Modern Living Spaces</span>
                  </div>
                </motion.div>
                <motion.div 
                  className="image-placeholder second"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="placeholder-content">
                    <span>Designer Kitchens</span>
                  </div>
                </motion.div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="section-title">Our Services</h2>
                <div className="separator"></div>
                <p className="section-subtitle">Discover the comprehensive range of interior design services we offer to make your dream home a reality.</p>
              </motion.div>
            </Col>
          </Row>
          <Row className="mt-5">
            <motion.div
              className="services-container"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services.map((service, index) => (
                <motion.div 
                  className="service-card"
                  key={index}
                  variants={itemVariants}
                >
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <div className="service-hover-content">
                    <p>Premium design solutions tailored to your needs and preferences.</p>
                    <Button className="service-button">View Details</Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us-section">
        <div className="diagonal-bg"></div>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="section-title">Why Choose Us</h2>
                <div className="separator"></div>
                <p className="section-subtitle">We stand out from the competition with our commitment to quality, service, and customer satisfaction.</p>
              </motion.div>
            </Col>
          </Row>
          <Row className="mt-5">
            <motion.div 
              className="benefits-container"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  className="benefit-card"
                  key={index}
                  variants={itemVariants}
                >
                  <div className="benefit-number">{benefit.number}</div>
                  <div className="benefit-icon">
                    {benefit.icon}
                  </div>
                  <h3 className="benefit-title">{benefit.title}</h3>
                </motion.div>
              ))}
            </motion.div>
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
                <h2 className="cta-title">Ready to Transform Your Living Space?</h2>
                <p className="cta-text">Get in touch with our design experts today and start your journey to a beautiful home.</p>
              </Col>
              <Col lg={4} md={5} className="text-md-end">
                <Button className="cta-button">Get a Free Consultation</Button>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Home;