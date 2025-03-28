import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Button, Spinner, Alert } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { 
  getDatabase, ref, onValue, set, remove, 
  query, orderByChild, equalTo 
} from 'firebase/database';
import { motion } from 'framer-motion';
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, 
  FaRegListAlt, FaHistory, FaHeart, FaUserFriends
} from 'react-icons/fa';
import './Dashboard.css';

function Dashboard({ user }) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const auth = getAuth();
  const database = getDatabase();
  
  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get current user
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }
        
        // Reference to the user's profile in the database
        const userProfileRef = ref(database, `users/${currentUser.uid}`);
        
        // Listen for changes to the user's profile
        onValue(userProfileRef, (snapshot) => {
          if (snapshot.exists()) {
            // User profile exists in the database
            setUserProfile({
              ...snapshot.val(),
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName || snapshot.val().name || "User"
            });
          } else {
            // Create basic profile if it doesn't exist
            const basicProfile = {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName || "User",
              createdAt: new Date().toISOString()
            };
            
            // Save basic profile to database
            set(userProfileRef, basicProfile)
              .then(() => {
                setUserProfile(basicProfile);
              })
              .catch((error) => {
                console.error("Error creating user profile:", error);
                setError("Error creating user profile");
              });
          }
          
          setLoading(false);
        }, (error) => {
          console.error("Error fetching user profile:", error);
          setError("Error fetching user profile");
          setLoading(false);
        });
      } catch (error) {
        console.error("Error in fetchUserProfile:", error);
        setError("An error occurred while loading your profile");
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [auth, database]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };
  
  // If still loading
  if (loading) {
    return (
      <div className="dashboard-loading">
        <Spinner animation="border" variant="primary" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }
  
  // If there was an error
  if (error) {
    return (
      <div className="dashboard-error">
        <Alert variant="danger">
          {error}
        </Alert>
        <Button 
          variant="primary" 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }
  
  // If user profile loaded successfully
  return (
    <div className="dashboard-page">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Row className="dashboard-header">
            <Col>
              <h1>My Dashboard</h1>
              <p className="welcome-text">
                Welcome back, {userProfile?.displayName || "User"}
              </p>
            </Col>
          </Row>
          
          <Row>
            <Col lg={4} md={5} className="mb-4">
              {/* Profile Information Card */}
              <Card className="profile-card">
                <Card.Body>
                  <div className="user-avatar">
                    {userProfile?.photoURL ? (
                      <img 
                        src={userProfile.photoURL} 
                        alt="Profile" 
                        className="avatar-img"
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        {userProfile?.displayName?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                  
                  <div className="user-info">
                    <h3>{userProfile?.displayName || "User"}</h3>
                    <div className="info-item">
                      <FaEnvelope className="info-icon" />
                      <span>{userProfile?.email || "No email available"}</span>
                    </div>
                    
                    {userProfile?.phone && (
                      <div className="info-item">
                        <FaPhone className="info-icon" />
                        <span>{userProfile.phone}</span>
                      </div>
                    )}
                    
                    {userProfile?.address && (
                      <div className="info-item">
                        <FaMapMarkerAlt className="info-icon" />
                        <span>{userProfile.address}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="profile-actions">
                    <Button className="edit-profile-btn">
                      <FaEdit className="me-2" /> Edit Profile
                    </Button>
                  </div>
                </Card.Body>
              </Card>
              
              {/* Account Statistics */}
              <Card className="stats-card mt-4">
                <Card.Body>
                  <h4>Account Statistics</h4>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="stat-value">
                        {userProfile?.projectsCount || 0}
                      </div>
                      <div className="stat-label">Projects</div>
                    </div>
                    
                    <div className="stat-item">
                      <div className="stat-value">
                        {userProfile?.quotesCount || 0}
                      </div>
                      <div className="stat-label">Quotes</div>
                    </div>
                    
                    <div className="stat-item">
                      <div className="stat-value">
                        {userProfile?.referralsCount || 0}
                      </div>
                      <div className="stat-label">Referrals</div>
                    </div>
                    
                    <div className="stat-item">
                      <div className="stat-value">
                        {userProfile?.wishlistCount || 0}
                      </div>
                      <div className="stat-label">Wishlist</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={8} md={7}>
              {/* Dashboard Tabs */}
              <Card className="dashboard-tabs-card">
                <Card.Body>
                  <Tab.Container defaultActiveKey="projects">
                    <Nav variant="tabs" className="dashboard-nav-tabs">
                      <Nav.Item>
                        <Nav.Link eventKey="projects">
                          <FaRegListAlt className="tab-icon" /> My Projects
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="activity">
                          <FaHistory className="tab-icon" /> Recent Activity
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="wishlist">
                          <FaHeart className="tab-icon" /> Wishlist
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="referrals">
                          <FaUserFriends className="tab-icon" /> My Referrals
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    
                    <Tab.Content className="dashboard-tab-content">
                      <Tab.Pane eventKey="projects">
                        <div className="tab-pane-content">
                          {userProfile?.projects && userProfile.projects.length > 0 ? (
                            <div className="projects-list">
                              Projects list will be displayed here
                            </div>
                          ) : (
                            <div className="empty-state">
                              <p>You don't have any projects yet.</p>
                              <Button variant="primary">Start New Project</Button>
                            </div>
                          )}
                        </div>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="activity">
                        <div className="tab-pane-content">
                          {userProfile?.activities && userProfile.activities.length > 0 ? (
                            <div className="activity-list">
                              Activity list will be displayed here
                            </div>
                          ) : (
                            <div className="empty-state">
                              <p>No recent activity to display.</p>
                            </div>
                          )}
                        </div>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="wishlist">
                        <div className="tab-pane-content">
                          {userProfile?.wishlist && userProfile.wishlist.length > 0 ? (
                            <div className="wishlist-items">
                              Wishlist items will be displayed here
                            </div>
                          ) : (
                            <div className="empty-state">
                              <p>Your wishlist is empty.</p>
                              <Button variant="primary">Browse Designs</Button>
                            </div>
                          )}
                        </div>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="referrals">
                        <div className="tab-pane-content">
                          {userProfile?.referrals && userProfile.referrals.length > 0 ? (
                            <div className="referrals-list">
                              Referrals list will be displayed here
                            </div>
                          ) : (
                            <div className="empty-state">
                              <p>You haven't made any referrals yet.</p>
                              <Button variant="primary">Refer a Friend</Button>
                            </div>
                          )}
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </div>
  );
}

export default Dashboard;