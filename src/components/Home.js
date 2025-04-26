import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { 
  FaCouch, FaBed, FaUtensils, FaBoxOpen, FaTag, FaTruckMoving, 
  FaShieldAlt, FaVrCardboard, FaCertificate, FaHeadset, FaMoneyBillWave,
  FaArrowRight, FaRegLightbulb, FaPalette, FaRulerCombined, FaHome
} from 'react-icons/fa';
import './Home.css';

// Import background images directly

const Home = () => {
  // State for background image rotation in hero section
  const [bgIndex, setBgIndex] = useState(0);
  const bgImages = ["bg1.jpg", "bg1.jpg", "bg1.jpg"];
  
  // Change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

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

  // Services data with enhanced icons
  const services = [
    { title: 'Living/Dining Room', icon: <FaCouch />, description: 'Create elegant living spaces that combine comfort and style for the perfect gathering place.' },
    { title: 'Bedroom', icon: <FaBed />, description: 'Transform your bedroom into a peaceful sanctuary with our custom design solutions.' },
    { title: 'Kitchen', icon: <FaUtensils />, description: 'Design functional and beautiful kitchens with premium materials and smart layouts.' },
    { title: 'Innovative Storage', icon: <FaBoxOpen />, description: 'Maximize your space with our creative storage solutions that blend seamlessly with your decor.' },
  ];

  // Benefits data
  const benefits = [
    { number: '01', title: 'Best Price Guarantee', icon: <FaTag />, animation: 'bounce' },
    { number: '02', title: '30 Days Move in Guarantee', icon: <FaTruckMoving />, animation: 'leftRight' },
    { number: '03', title: '12 Years Warranty', icon: <FaShieldAlt />, animation: 'pulse' },
    { number: '04', title: 'Virtual Reality Visualization', icon: <FaVrCardboard />, animation: 'rotate' },
    { number: '05', title: 'Quality Assurance Certification', icon: <FaCertificate />, animation: 'spin' },
    { number: '06', title: 'After Sale Support', icon: <FaHeadset />, animation: 'pulse' },
    { number: '07', title: 'No Hidden Cost', icon: <FaMoneyBillWave />, animation: 'bounce' },
  ];

  // Design process steps
  const designSteps = [
    { icon: <FaRegLightbulb />, title: 'Consultation', description: 'We start with understanding your vision, needs, and budget' },
    { icon: <FaPalette />, title: 'Design', description: 'Our experts create custom designs that reflect your personality' },
    { icon: <FaRulerCombined />, title: 'Planning', description: 'Detailed planning ensures everything fits perfectly in your space' },
    { icon: <FaHome />, title: 'Execution', description: 'Professional installation with attention to every detail' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section with Background Image Rotation */}
      <section 
        className="hero-section" 
        style={{ backgroundImage: `url(${bgImages[bgIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="hero-badge"
          >
            Premium Interior Design
          </motion.div>
          <h1 className="hero-title">
            A home so good, <br/>
            <span className="gradient-text">you'll love the way you Live.</span>
          </h1>
          <p className="hero-subtitle-home">Smart and efficient home interiors with superior quality materials</p>
          <div className="hero-buttons">
            <Button href="/our-homes" className="hero-button primary-button">
              Explore Our Designs
              <FaArrowRight className="btn-icon" />
            </Button>
            <Button href="tel:+918867572229" className="hero-button secondary-button">
              Contact Us
            </Button>
          </div>
          
          <motion.div 
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <span>Scroll Down</span>
            <div className="scroll-dot"></div>
          </motion.div>
        </motion.div>
        <div className="shape-divider">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* Design Process Section (New) */}
      <section className="design-process-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="section-title">Our Design Process</h2>
                <div className="separator"></div>
                <p className="section-subtitle">We follow a simple yet effective process to bring your dream home to life</p>
              </motion.div>
            </Col>
          </Row>
          <Row className="mt-5">
            <div className="process-timeline">
              {designSteps.map((step, index) => (
                <motion.div 
                  className="process-step"
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div className="process-icon">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {index < designSteps.length - 1 && (
                    <div className="process-connector">
                      <motion.div 
                        className="connector-dot"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      ></motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Row>
        </Container>
      </section>

      {/* Vision Section */}
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

      {/* One Stop Shop Section with Background Image */}
      <section className="one-stop-section bg-pattern">
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
                <h2 className="section-title">One Stop Shop For All Home Interior Needs</h2>
                <div className="separator"></div>
                <p className="section-text">Whether it's a magazine-worthy dream kitchen or your entire home, enjoy end-to-end results from design to installation.</p>
                <Button href="tel:+918867572229" className="action-button">
                  Learn More
                  <FaArrowRight className="ms-2" />
                </Button>
              </motion.div>
            </Col>
            <Col lg={6} md={12}>
              <div className="showcase-gallery">
                <motion.div 
                  className="gallery-image first"
                  style={{ backgroundImage: `url("bg1.jpg")` }}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="gallery-overlay">
                    <h3>Modern Living Spaces</h3>
                  </div>
                </motion.div>
                <motion.div 
                  className="gallery-image second"
                  style={{ backgroundImage: `url("bg1.jpg")` }}
                  initial={{ opacity: 0, scale: 0.9, y: -30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="gallery-overlay">
                    <h3>Designer Kitchens</h3>
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
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <div className="service-hover-content">
                    <p>{service.description}</p>
                    <Button className="service-button">View Details</Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us Section with Animated Icons */}
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
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="benefit-number">{benefit.number}</div>
                  <motion.div 
                    className={`benefit-icon ${benefit.animation}`}
                    animate={
                      benefit.animation === 'pulse' ? { scale: [1, 1.1, 1] } :
                      benefit.animation === 'bounce' ? { y: [0, -10, 0] } :
                      benefit.animation === 'leftRight' ? { x: [0, 10, 0] } :
                      benefit.animation === 'rotate' ? { rotate: [0, 10, 0] } :
                      benefit.animation === 'spin' ? { rotate: 360 } : {}
                    }
                    transition={{ 
                      repeat: Infinity, 
                      duration: benefit.animation === 'spin' ? 5 : 2,
                      ease: "easeInOut"
                    }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="benefit-title">{benefit.title}</h3>
                </motion.div>
              ))}
            </motion.div>
          </Row>
        </Container>
      </section>

      {/* CTA Section with Background Image */}
      <section className="cta-section" style={{ backgroundImage: `url("bg1.jpg")` }}>
        <div className="cta-overlay"></div>
        <Container className="position-relative">
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
              <Col lg={4} md={5} className="text-md-end text-center mt-4 mt-md-0">
                <Button href="tel:+918867572229" className="cta-button">
                  Schedule a Consultation
                  <FaArrowRight className="ms-2" />
                </Button>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Home;