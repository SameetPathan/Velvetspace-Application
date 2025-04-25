import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import { getAuth, signOut } from 'firebase/auth';
import { 
  FaHome, FaBuilding, FaHandshake, FaAward, FaCity, 
  FaBriefcase, FaUserFriends, FaSignInAlt, FaUserCircle, FaSignOutAlt
} from 'react-icons/fa';
import AuthForm from './AuthForm';
import './NavigationBar.css';

const NavigationBar = ({ 
  currentUser, 
  openAuthModal, 
  showAuthModal, 
  setShowAuthModal,
  authMode,
  setAuthMode,
  handleAuthSuccess,
  handleAuthError
}) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const auth = getAuth();

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleAuthSuccess('Logged out successfully');
      setExpanded(false); // Close mobile menu after logout
    } catch (error) {
      handleAuthError(error);
    }
  };

  // Toggle between sign in and sign up forms
  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  // Handle mobile menu toggle
  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  // Close mobile menu when a link is clicked
  const closeNavMenu = () => {
    if (expanded) {
      setExpanded(false);
    }
  };

  return (
    <>
      <Navbar 
        expand="lg" 
        fixed="top"
        expanded={expanded}
        onToggle={toggleNavbar}
        className={`navbar-custom ${scrolled ? 'scrolled' : ''} ${location.pathname === '/' ? 'navbar-transparent' : 'navbar-solid'}`}
      >
        <div className="navbar-inner">
          <Navbar.Brand as={Link} to="/" className="brand" onClick={closeNavMenu}>
            <div className="logo-placeholder">VS</div>
            <span className="brand-text">VelvetSpace</span>
          </Navbar.Brand>
          
          <Navbar.Toggle 
            aria-controls="responsive-navbar-nav" 
            className="navbar-toggler-custom"
          />
          
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="main-nav">
              <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeNavMenu}>
                <FaHome className="nav-icon" /> Home
              </Nav.Link>
              
              <Nav.Link as={Link} to="/spaces" className={location.pathname === '/spaces' ? 'active' : ''} onClick={closeNavMenu}>
                <FaBuilding className="nav-icon" /> Spaces
              </Nav.Link>
              
              <Nav.Link as={Link} to="/how-it-works" className={location.pathname === '/how-it-works' ? 'active' : ''} onClick={closeNavMenu}>
                <FaHandshake className="nav-icon" /> How It Works
              </Nav.Link>
              
              <Nav.Link as={Link} to="/offerings" className={location.pathname === '/offerings' ? 'active' : ''} onClick={closeNavMenu}>
                <FaAward className="nav-icon" /> Offerings
              </Nav.Link>
              
              <Nav.Link as={Link} to="/cities" className={location.pathname === '/cities' ? 'active' : ''} onClick={closeNavMenu}>
                <FaCity className="nav-icon" /> Cities
              </Nav.Link>
              
              <Nav.Link as={Link} to="/our-homes" className={location.pathname === '/our-homes' ? 'active' : ''} onClick={closeNavMenu}>
                <FaHome className="nav-icon" /> Our Homes
              </Nav.Link>
              
              <div className="nav-divider"></div>
              
              <Nav.Link as={Link} to="/career" className={location.pathname === '/career' ? 'active' : ''} onClick={closeNavMenu}>
                <FaBriefcase className="nav-icon" /> Career
              </Nav.Link>
              
              <Nav.Link as={Link} to="/refer-a-friend" className={location.pathname === '/refer-a-friend' ? 'active' : ''} onClick={closeNavMenu}>
                <FaUserFriends className="nav-icon" /> Refer A Friend
              </Nav.Link>
              
              {currentUser ? (
                <div className="user-nav-section">
                  <Nav.Link as={Link} to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''} onClick={closeNavMenu}>
                    <FaUserCircle className="nav-icon" /> My Account
                  </Nav.Link>
                  <Button variant="outline-light" className="auth-button" onClick={() => {
                    handleLogout();
                    closeNavMenu();
                  }}>
                    <FaSignOutAlt className="nav-icon" /> Logout
                  </Button>
                </div>
              ) : (
                <div className="auth-buttons">
                  <Button 
                    variant="outline-light" 
                    className="signin-button" 
                    onClick={() => {
                      openAuthModal('signin');
                      closeNavMenu();
                    }}
                  >
                    <FaSignInAlt className="nav-icon" /> Sign In
                  </Button>
                  <Button 
                    variant="primary" 
                    className="signup-button" 
                    onClick={() => {
                      openAuthModal('signup');
                      closeNavMenu();
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {/* Auth Modal */}
      <Modal 
        show={showAuthModal} 
        onHide={() => setShowAuthModal(false)}
        centered
        className="auth-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{authMode === 'signin' ? 'Sign In' : 'Create Account'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AuthForm 
            mode={authMode} 
            onSuccess={handleAuthSuccess}
            onError={handleAuthError}
          />
          <div className="auth-toggle">
            {authMode === 'signin' ? (
              <p>Don't have an account? <Button variant="link" onClick={toggleAuthMode}>Sign Up</Button></p>
            ) : (
              <p>Already have an account? <Button variant="link" onClick={toggleAuthMode}>Sign In</Button></p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavigationBar;