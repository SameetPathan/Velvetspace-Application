import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaWhatsapp, FaUserFriends, FaMobileAlt, FaIdCard } from 'react-icons/fa';
import './ReferAFriend.css';

function ReferAFriend() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [referralId, setReferralId] = useState('');
  
  // Generate referral ID whenever name or phone changes
  useEffect(() => {
    if (name && phone) {
      // Generate referral ID based on name and phone
      // Take first 3 chars of name + last 4 digits of phone
      const namePrefix = name.replace(/\s+/g, '').substring(0, 3).toUpperCase();
      const phoneDigits = phone.replace(/\D/g, '').slice(-4);
      const newReferralId = `VLV-${namePrefix}${phoneDigits}`;
      setReferralId(newReferralId);
    }
  }, [name, phone]);
  
  // Share to WhatsApp
  const shareToWhatsapp = () => {
    if (!name || !phone || !referralId) {
      alert('Please fill in all fields first');
      return;
    }
    
    const message = encodeURIComponent(
      `Hi! I'm ${name} and I'm sharing my VelvetSpace referral code: ${referralId}. Use this to get special offers!\n\nContact VelvetSpace at:\nEmail: admin@velvetspace.in\nPhone: +91 88675-72229\nPhone: +91 88675-32229`
    );
    
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };
  
  // Handle phone input to ensure proper format
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    // Limit to 10 digits
    setPhone(value.substring(0, 10));
  };

  return (
    <div className="referral-page">
      {/* Hero Section */}
      <section className="referral-hero">
        <div className="overlay"></div>
        <Container className="position-relative z-index-1">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="hero-title">
                Share the <span className="gradient-text">Love</span>
              </h1>
              <p className="hero-subtitle">
                Refer your friends to VelvetSpace and help them transform their homes while you both enjoy special benefits
              </p>
            </Col>
          </Row>
        </Container>
        <div className="shape-divider">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* Referral Form Section */}
      <section className="referral-form-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="referral-card">
                <div className="referral-card-header">
                  <div className="referral-icon">
                    <FaUserFriends />
                  </div>
                  <h2>Generate Your Referral Code</h2>
                </div>
                <div className="referral-card-body">
                  <Form>
                    <Form.Group className="form-group">
                      <div className="input-with-icon">
                        <FaUserFriends className="input-icon" />
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="custom-input"
                        />
                      </div>
                    </Form.Group>
                    
                    <Form.Group className="form-group">
                      <div className="input-with-icon">
                        <FaMobileAlt className="input-icon" />
                        <Form.Control
                          type="tel"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={handlePhoneChange}
                          required
                          className="custom-input"
                        />
                      </div>
                    </Form.Group>
                    
                    {referralId && (
                      <div className="referral-id-container">
                        <div className="referral-id-label">
                          <FaIdCard className="referral-id-icon" />
                          <h5>Your Referral Code:</h5>
                        </div>
                        <div className="referral-id">{referralId}</div>
                      </div>
                    )}
                    
                    <Button 
                      className="whatsapp-button"
                      onClick={shareToWhatsapp}
                      disabled={!name || !phone}
                    >
                      <FaWhatsapp className="whatsapp-icon" />
                      Share via WhatsApp
                    </Button>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="section-title">Referral Benefits</h2>
              <div className="separator"></div>
              <p className="section-subtitle">
                Share VelvetSpace with your friends and family, and enjoy these amazing benefits
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={4}>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <FaUserFriends />
                </div>
                <h3>For You</h3>
                <p>Get exclusive discounts on your next purchase when your friends sign up using your code</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <FaIdCard />
                </div>
                <h3>For Your Friend</h3>
                <p>Your friends get special first-time user benefits when they use your referral code</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <FaWhatsapp />
                </div>
                <h3>Easy Sharing</h3>
                <p>Easily share your referral code through WhatsApp with just one click</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default ReferAFriend;