import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { 
  FaUserTie, FaVrCardboard, FaTools, FaHome,
  FaAngleDoubleRight, FaArrowRight
} from 'react-icons/fa';
import './HowItWorks.css';

function HowItWorks() {
  // Steps data
  const steps = [
    {
      id: 1,
      title: 'Meet Expert at Your Place/Comfort',
      description: 'Our design experts visit your space to understand your vision, requirements, and measure your space for accurate planning.',
      icon: <FaUserTie />,
      color: '#8A2387'
    },
    {
      id: 2,
      title: 'Experience 5D Visuals of Your Home',
      description: 'See your space come to life with our cutting-edge 5D visualization technology, allowing you to make real-time changes and perfect your design.',
      icon: <FaVrCardboard />,
      color: '#E94057'
    },
    {
      id: 3,
      title: 'Installation',
      description: 'Our skilled team handles the entire installation process with precision and attention to detail, ensuring your design is executed flawlessly.',
      icon: <FaTools />,
      color: '#F27121'
    },
    {
      id: 4,
      title: 'Move In',
      description: 'Step into your beautifully transformed space and start enjoying your new interior. Our team ensures everything is perfect before handover.',
      icon: <FaHome />,
      color: '#8A2387'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="how-it-works-page">
      {/* Hero Section */}
      <section className="how-it-works-hero">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="hero-title">
                  How <span className="gradient-text">It Works</span>
                </h1>
                <p className="hero-subtitle">
                  Our simple 4-step process to transform your space into your dream home
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

      {/* Process Steps */}
      <section className="process-section">
        <Container>
          <motion.div
            className="process-steps"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.div 
                  className="step-card"
                  variants={itemVariants}
                >
                  <div className="step-number" style={{background: `linear-gradient(135deg, ${step.color} 0%, ${index % 2 === 0 ? '#E94057' : '#F27121'} 100%)`}}>
                    {step.id}
                  </div>
                  <div className="step-icon" style={{color: step.color}}>
                    {step.icon}
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <div className="step-connector">
                    <FaAngleDoubleRight className="connector-icon" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="diagonal-bg"></div>
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="section-title">Why Choose Our Process</h2>
                <div className="separator"></div>
                <p className="section-subtitle">
                  Our streamlined approach ensures a hassle-free experience with results that exceed your expectations.
                </p>
              </motion.div>
            </Col>
          </Row>
          
          <Row>
            <Col lg={4} md={6} className="mb-4">
              <motion.div 
                className="benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="benefit-icon-wrapper">
                  <span className="benefit-icon-bg"></span>
                  <FaUserTie className="benefit-icon" />
                </div>
                <h3>Expert Consultation</h3>
                <p>Get personalized advice from our team of experienced interior designers who understand your needs.</p>
              </motion.div>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <motion.div 
                className="benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="benefit-icon-wrapper">
                  <span className="benefit-icon-bg"></span>
                  <FaVrCardboard className="benefit-icon" />
                </div>
                <h3>Cutting-Edge Visualization</h3>
                <p>Experience your space before the work begins with our state-of-the-art 5D visualization technology.</p>
              </motion.div>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <motion.div 
                className="benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="benefit-icon-wrapper">
                  <span className="benefit-icon-bg"></span>
                  <FaTools className="benefit-icon" />
                </div>
                <h3>Professional Installation</h3>
                <p>Our skilled craftsmen handle every detail to ensure your design is executed with precision.</p>
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
                <p className="cta-text">Begin your journey to a beautiful home with our expert team today.</p>
              </Col>
              <Col lg={4} md={5} className="text-md-end">
                <button className="cta-button">
                  <span>Get Started</span>
                  <FaArrowRight className="ms-2" />
                </button>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

export default HowItWorks;