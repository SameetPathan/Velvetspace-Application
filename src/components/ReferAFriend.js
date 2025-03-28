import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';
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
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow">
              <Card.Header className="text-center">
                <h2>Refer A Friend</h2>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Your Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                    />
                  </Form.Group>
                  
                  {referralId && (
                    <div className="referral-id-box mb-4">
                      <h5>Your Referral ID:</h5>
                      <div className="referral-id">{referralId}</div>
                    </div>
                  )}
                  
                  <Button 
                    variant="success" 
                    className="w-100 d-flex align-items-center justify-content-center py-3"
                    onClick={shareToWhatsapp}
                    disabled={!name || !phone}
                  >
                    <FaWhatsapp className="me-2" size={20} />
                    Share to WhatsApp
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ReferAFriend;

 