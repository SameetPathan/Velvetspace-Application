import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <div className="header-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} md={8} className="header-content">
            <div className="brand-name">VelvetSpace</div>
            <h1 className="header-title">
              Discover <span className="gradient-text">Premium</span> Co-Living Spaces
            </h1>
            <p className="header-subtitle">
              Experience modern, flexible living with like-minded individuals in beautifully designed spaces
            </p>
            <div className="header-buttons">
              <Button as={Link} to="/spaces" className="explore-button">
                Explore Spaces <FaArrowRight />
              </Button>
              <Button as={Link} to="/how-it-works" variant="outline-primary" className="learn-button">
                How It Works
              </Button>
            </div>
          </Col>
          <Col lg={6} md={4} className="header-image-col">
            <div className="header-image">
              <div className="image-placeholder">
                <div className="image-text">Modern Living Experience</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;