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
    } catch (error) {
      handleAuthError(error);
    }
  };

  // Toggle between sign in and sign up forms
  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <>
      <Navbar 
        expand="lg" 
        fixed="top"
        className={`navbar-custom ${scrolled ? 'scrolled' : ''} ${location.pathname === '/' ? 'navbar-transparent' : 'navbar-solid'}`}
      >
        <div className="navbar-inner">
          <Navbar.Brand as={Link} to="/" className="brand">
            <div className="logo-placeholder">VS</div>
            <span className="brand-text">VelvetSpace</span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="main-nav">
              <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>
                <FaHome className="nav-icon" /> Home
              </Nav.Link>
              
              <Nav.Link as={Link} to="/spaces" className={location.pathname === '/spaces' ? 'active' : ''}>
                <FaBuilding className="nav-icon" /> Spaces
              </Nav.Link>
              
              <Nav.Link as={Link} to="/how-it-works" className={location.pathname === '/how-it-works' ? 'active' : ''}>
                <FaHandshake className="nav-icon" /> How It Works
              </Nav.Link>
              
              <Nav.Link as={Link} to="/offerings" className={location.pathname === '/offerings' ? 'active' : ''}>
                <FaAward className="nav-icon" /> Offerings
              </Nav.Link>
              
              <Nav.Link as={Link} to="/cities" className={location.pathname === '/cities' ? 'active' : ''}>
                <FaCity className="nav-icon" /> Cities
              </Nav.Link>
              
              <Nav.Link as={Link} to="/our-homes" className={location.pathname === '/our-homes' ? 'active' : ''}>
                <FaHome className="nav-icon" /> Our Homes
              </Nav.Link>
              
              <div className="nav-divider"></div>
              
              <Nav.Link as={Link} to="/career" className={location.pathname === '/career' ? 'active' : ''}>
                <FaBriefcase className="nav-icon" /> Career
              </Nav.Link>
              
              <Nav.Link as={Link} to="/refer-a-friend" className={location.pathname === '/refer-a-friend' ? 'active' : ''}>
                <FaUserFriends className="nav-icon" /> Refer A Friend
              </Nav.Link>
              
              {currentUser ? (
                <div className="user-nav-section">
                  <Nav.Link as={Link} to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                    <FaUserCircle className="nav-icon" /> My Account
                  </Nav.Link>
                  <Button variant="outline-light" className="auth-button" onClick={handleLogout}>
                    <FaSignOutAlt className="nav-icon" /> Logout
                  </Button>
                </div>
              ) : (
                <div className="auth-buttons">
                  <Button 
                    variant="outline-light" 
                    className="signin-button" 
                    onClick={() => openAuthModal('signin')}
                  >
                    <FaSignInAlt className="nav-icon" /> Sign In
                  </Button>
                  <Button 
                    variant="primary" 
                    className="signup-button" 
                    onClick={() => openAuthModal('signup')}
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