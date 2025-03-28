import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav, Card, Spinner } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { motion } from 'framer-motion';
import './Spaces.css';
import AdminPanel from './AdminPanel';

// Category data
const categories = [
  { id: 'living-room', name: 'Living Room' },
  { id: 'wardrobes', name: 'Wardrobes and Walk In' },
  { id: 'study', name: 'Study and Home Office' },
  { id: 'kitchen', name: 'Kitchen' },
  { id: 'bedroom', name: 'Bedroom' },
  { id: 'kids-room', name: 'Kids Room' },
  { id: 'outdoor', name: 'Outdoor Living' },
];

function Spaces() {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('living-room');
  
  const auth = getAuth();
  const database = getDatabase();
  
  // Check if current user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      debugger
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.email === 'sameetpathanrs@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    
    checkAdminStatus();
  }, [auth]);
  
  // Fetch images from Realtime Database
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      
      try {
        const imagesData = {};
        
        // Initialize empty arrays for each category
        categories.forEach(category => {
          imagesData[category.id] = [];
        });
        
        // Reference to the 'spaces' node in the database
        const spacesRef = ref(database, 'spaces');
        
        // Listen for data changes
        onValue(spacesRef, (snapshot) => {
          if (snapshot.exists()) {
            // Reset the images data
            categories.forEach(category => {
              imagesData[category.id] = [];
            });
            
            // Process each image and add to the appropriate category
            snapshot.forEach((childSnapshot) => {
              const imageData = childSnapshot.val();
              
              // Ensure the image has all required data
              if (imageData && imageData.category && categories.some(cat => cat.id === imageData.category)) {
                imagesData[imageData.category].push({
                  ...imageData,
                  id: childSnapshot.key
                });
              }
            });
            
            // Sort images by createdAt timestamp (newest first)
            for (const category in imagesData) {
              imagesData[category].sort((a, b) => b.createdAt - a.createdAt);
            }
            
            setImages(imagesData);
          }
          
          setLoading(false);
        }, (error) => {
          console.error('Error fetching images:', error);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error setting up database listener:', error);
        setLoading(false);
      }
    };
    
    fetchImages();
    
    // Clean up function
    return () => {
      // No need to detach listeners manually with Realtime Database as they're automatically detached when component unmounts
    };
  }, [database]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
  
  // Update images after admin actions
  const handleImagesUpdate = (newImages, category) => {
    setImages(prevImages => ({
      ...prevImages,
      [category]: newImages
    }));
  };
  
  return (
    <div className="spaces-page">
      <section className="spaces-hero">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="hero-title">
                  Explore Our <span className="gradient-text">Stunning Spaces</span>
                </h1>
                <p className="hero-subtitle">
                  Get inspired by our beautiful collection of interior designs across various spaces
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
      
      <section className="spaces-gallery">
        <Container>
          {isAdmin && (
            <Row className="mb-5">
              <Col>
                <AdminPanel 
                  categories={categories} 
                  onImagesUpdate={handleImagesUpdate}
                  images={images}
                  activeCategory={activeTab}
                />
              </Col>
            </Row>
          )}
          
          <Row>
            <Col lg={12}>
              <Tab.Container 
                id="spaces-tabs" 
                defaultActiveKey="living-room"
                onSelect={(key) => setActiveTab(key)}
              >
                <Nav className="spaces-nav">
                  {categories.map((category) => (
                    <Nav.Item key={category.id}>
                      <Nav.Link 
                        eventKey={category.id}
                        className={activeTab === category.id ? 'active' : ''}
                      >
                        {category.name}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
                
                <Tab.Content>
                  {categories.map((category) => (
                    <Tab.Pane eventKey={category.id} key={category.id}>
                      {loading ? (
                        <div className="text-center p-5">
                          <Spinner animation="border" variant="primary" />
                          <p className="mt-3">Loading beautiful spaces...</p>
                        </div>
                      ) : images[category.id]?.length === 0 ? (
                        <div className="text-center p-5">
                          <p>No images available for this category yet.</p>
                        </div>
                      ) : (
                        <motion.div 
                          className="gallery-grid"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {images[category.id]?.map((image) => (
                            <motion.div 
                              className="gallery-item" 
                              key={image.id}
                              variants={itemVariants}
                            >
                              <Card className="gallery-card">
                                <div className="image-wrapper">
                                  <Card.Img 
                                    variant="top" 
                                    src={image.imageUrl} 
                                    alt={image.title || 'Interior design'} 
                                  />
                                  <div className="image-overlay">
                                    <h3>{image.title}</h3>
                                    {image.description && <p>{image.description}</p>}
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section className="spaces-cta">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="cta-title">Transform Your Space Today</h2>
                <p className="cta-text">
                  Ready to bring these stunning designs to your home? Our expert team is ready to help.
                </p>
                
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Spaces;