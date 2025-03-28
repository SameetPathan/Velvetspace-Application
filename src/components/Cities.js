import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, 
  FaBuilding, FaArrowRight, FaRegClock 
} from 'react-icons/fa';
import './Cities.css';

function Cities() {
  // Cities data
  const cities = [
    {
      id: 1,
      name: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2',
      description: 'Experience our flagship design center in the heart of India\'s tech capital.',
      address: '448 HBR Layout 4TH Block, Service Road, Bangalore - 560043',
      phone: '+91 88675-72229',
      email: 'bangalore@velvetspace.in',
      hours: 'Mon-Sat: 10:00 AM - 7:00 PM',
      features: ['Design Studio', 'Experience Center', 'Material Library', 'Professional Consultations'],
      mapLink: 'https://maps.google.com/?q=448+HBR+Layout+4TH+Block+Service+Road+Bangalore'
    },
    {
      id: 2,
      name: 'Pune',
      image: 'https://images.unsplash.com/photo-1567878673942-be055fed5d30',
      description: 'Visit our modern design center in the cultural capital of Maharashtra.',
      address: 'Ellora Residency Dehu Road, Pune, Maharashtra',
      phone: '+91 88675-32229',
      email: 'pune@velvetspace.in',
      hours: 'Mon-Sat: 10:00 AM - 7:00 PM',
      features: ['Design Studio', 'Material Library', 'Professional Consultations'],
      mapLink: 'https://maps.google.com/?q=Ellora+Residency+Dehu+Road+Pune'
    },
    {
      id: 3,
      name: 'Kolhapur',
      image: 'https://images.unsplash.com/photo-1609766436792-f467753aa600',
      description: 'Explore interior design solutions at our boutique center in historic Kolhapur.',
      address: 'Punya Pravah Near Wins Hospital, Kolhapur, Maharashtra',
      phone: '+91 88675-32229',
      email: 'kolhapur@velvetspace.in',
      hours: 'Mon-Sat: 10:00 AM - 7:00 PM',
      features: ['Design Consultation', 'Material Samples', 'Professional Advisors'],
      mapLink: 'https://maps.google.com/?q=Punya+Pravah+Near+Wins+Hospital+Kolhapur'
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
    <div className="cities-page">
      {/* Hero Section */}
      <section className="cities-hero">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="hero-title">
                  Find Us In Your <span className="gradient-text">City</span>
                </h1>
                <p className="hero-subtitle">
                  Visit our design centers for personalized interior consultations and experience the VelvetSpace difference
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

      {/* Cities Section */}
      <section className="cities-section">
        <Container>
          <motion.div 
            className="cities-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {cities.map((city) => (
              <motion.div 
                className="city-card-wrapper" 
                key={city.id}
                variants={itemVariants}
              >
                <Card className="city-card">
                  <div className="city-image-container">
                    <div 
                      className="city-image" 
                      style={{ backgroundImage: `url(${city.image})` }}
                    >
                      <div className="city-overlay">
                        <h2>{city.name}</h2>
                      </div>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title>{city.name} Design Center</Card.Title>
                    <Card.Text>{city.description}</Card.Text>
                    
                    <div className="city-details">
                      <div className="detail-item">
                        <FaMapMarkerAlt className="detail-icon" />
                        <span>{city.address}</span>
                      </div>
                      <div className="detail-item">
                        <FaPhoneAlt className="detail-icon" />
                        <span>{city.phone}</span>
                      </div>
                      <div className="detail-item">
                        <FaEnvelope className="detail-icon" />
                        <span>{city.email}</span>
                      </div>
                      <div className="detail-item">
                        <FaRegClock className="detail-icon" />
                        <span>{city.hours}</span>
                      </div>
                    </div>
                    
                    <div className="city-features">
                      {city.features.map((feature, index) => (
                        <div className="feature-tag" key={index}>
                          <FaBuilding className="feature-icon" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="city-buttons">
                      <Button 
                        className="directions-button"
                        href={city.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Directions
                      </Button>
                      <Button className="appointment-button">
                        Book Appointment <FaArrowRight className="ms-2" />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="section-title">Can't Visit Us?</h2>
                <div className="separator"></div>
                <p className="section-subtitle">
                  Schedule a virtual consultation or request a home visit from our design experts
                </p>
                <Button className="contact-button">
                  Request Virtual Consultation
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Cities;