import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { 
  getDatabase, ref as dbRef, onValue, push, set, remove 
} from 'firebase/database';
import { 
  getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject 
} from 'firebase/storage';
import { motion } from 'framer-motion';
import { 
  FaStar, FaRegStar, FaCamera, FaTrashAlt, FaUser, FaQuoteLeft, FaPlus
} from 'react-icons/fa';
import './OurHomes.css';

function OurHomes() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  
  // Form states
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  
  const auth = getAuth();
  const database = getDatabase();
  const storage = getStorage();
  
  // Check current user and admin status
  useEffect(() => {
    const checkUserStatus = () => {
      const user = auth.currentUser;
      setCurrentUser(user);
      
      if (user && user.email === 'sameetpathanrs@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    
    const unsubscribe = auth.onAuthStateChanged(checkUserStatus);
    return () => unsubscribe();
  }, [auth]);
  
  // Fetch reviews from Realtime Database
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      
      try {
        const reviewsRef = dbRef(database, 'reviews');
        
        onValue(reviewsRef, (snapshot) => {
          const reviewsData = [];
          
          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
              const reviewData = childSnapshot.val();
              reviewsData.push({
                id: childSnapshot.key,
                ...reviewData
              });
            });
            
            // Sort by timestamp (newest first)
            reviewsData.sort((a, b) => b.timestamp - a.timestamp);
          }
          
          setReviews(reviewsData);
          setLoading(false);
        }, (error) => {
          console.error('Error fetching reviews:', error);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error setting up database listener:', error);
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [database]);
  
  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please select a valid image file (JPEG, PNG, WEBP)');
        setFile(null);
        return;
      }
      
      if (selectedFile.size > maxSize) {
        setError('Image size should be less than 5MB');
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setError('');
    }
  };
  
  // Handle review submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('Please sign in to submit a review');
      return;
    }
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!comment.trim()) {
      setError('Please enter your review');
      return;
    }
    
    if (!file) {
      setError('Please upload an image of your home');
      return;
    }
    
    setIsUploading(true);
    setError('');
    
    try {
      // Create unique filename
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}_${file.name}`;
      const imageRef = storageRef(storage, `reviews/${fileName}`);
      
      // Upload image
      const uploadTask = uploadBytesResumable(imageRef, file);
      
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Upload error:', error);
          setError('Error uploading image. Please try again.');
          setIsUploading(false);
        },
        async () => {
          // Get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Create new review object
          const reviewData = {
            name,
            rating,
            comment,
            imageUrl: downloadURL,
            storagePath: `reviews/${fileName}`,
            userId: currentUser.uid,
            userEmail: currentUser.email,
            timestamp
          };
          
          // Add to Realtime Database
          const newReviewRef = push(dbRef(database, 'reviews'));
          await set(newReviewRef, reviewData);
          
          // Reset form and close modal
          setName('');
          setRating(5);
          setComment('');
          setFile(null);
          setUploadProgress(0);
          setIsUploading(false);
          setShowAddModal(false);
        }
      );
    } catch (error) {
      console.error('Error:', error);
      setError('Error submitting review. Please try again.');
      setIsUploading(false);
    }
  };
  
  // Confirm delete
  const confirmDelete = (review) => {
    setReviewToDelete(review);
    setShowDeleteModal(true);
  };
  
  // Handle review deletion
  const handleDelete = async () => {
    if (!reviewToDelete || !isAdmin) return;
    
    try {
      // Delete from Realtime Database
      const reviewRef = dbRef(database, `reviews/${reviewToDelete.id}`);
      await remove(reviewRef);
      
      // Delete image from Storage
      if (reviewToDelete.storagePath) {
        const imageRef = storageRef(storage, reviewToDelete.storagePath);
        await deleteObject(imageRef);
      }
      
      setShowDeleteModal(false);
      setReviewToDelete(null);
    } catch (error) {
      console.error('Error deleting review:', error);
      setError('Error deleting review. Please try again.');
    }
  };
  
  // Render star rating
  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= count) {
        stars.push(<FaStar key={i} className="star-icon filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-icon" />);
      }
    }
    return stars;
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
        stiffness: 100
      }
    }
  };

  return (
    <div className="our-homes-page">
      {/* Hero Section */}
      <section className="homes-hero">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="hero-title">
                  Our <span className="gradient-text">Homes</span>
                </h1>
                <p className="hero-subtitle">
                  What We Have Created - Let's Hear From Our Customers
                </p>
                {currentUser && (
                  <Button 
                    className="add-review-btn"
                    onClick={() => setShowAddModal(true)}
                  >
                    <FaPlus className="me-2" /> Share Your Home Story
                  </Button>
                )}
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
      
      {/* Reviews Section */}
      <section className="reviews-section">
        <Container>
          {loading ? (
            <div className="text-center p-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading customer stories...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center p-5">
              <h3>No reviews yet</h3>
              <p>Be the first to share your experience!</p>
              {currentUser ? (
                <Button 
                  className="add-review-btn mt-3"
                  onClick={() => setShowAddModal(true)}
                >
                  <FaPlus className="me-2" /> Share Your Home Story
                </Button>
              ) : (
                <p className="mt-3">Please sign in to share your review</p>
              )}
            </div>
          ) : (
            <motion.div
              className="reviews-container"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {reviews.map((review) => (
                <motion.div 
                  className="review-card-wrapper" 
                  key={review.id}
                  variants={itemVariants}
                >
                  <Card className="review-card">
                    <div className="review-image-container">
                      <img 
                        src={review.imageUrl} 
                        alt={`Home of ${review.name}`} 
                        className="review-image"
                      />
                      {isAdmin && (
                        <Button 
                          variant="danger" 
                          size="sm"
                          className="delete-button"
                          onClick={() => confirmDelete(review)}
                        >
                          <FaTrashAlt />
                        </Button>
                      )}
                    </div>
                    <Card.Body>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                      <div className="review-content">
                        <FaQuoteLeft className="quote-icon" />
                        <Card.Text>{review.comment}</Card.Text>
                      </div>
                      <div className="reviewer-info">
                        <FaUser className="user-icon" />
                        <span className="reviewer-name">{review.name}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {!loading && reviews.length > 0 && currentUser && (
            <div className="text-center mt-5">
              <Button 
                className="add-review-btn"
                onClick={() => setShowAddModal(true)}
              >
                <FaPlus className="me-2" /> Share Your Home Story
              </Button>
            </div>
          )}
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="section-title">Ready to Transform Your Space?</h2>
                <div className="separator"></div>
                <p className="section-subtitle">
                  Join our happy customers with a home interior design that perfectly matches your style.
                </p>
                <Button className="cta-button">
                  Start Your Home Journey
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Add Review Modal */}
      <Modal 
        show={showAddModal} 
        onHide={() => setShowAddModal(false)}
        centered
        className="review-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Share Your Home Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isUploading}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <div className="rating-selector">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    onClick={() => !isUploading && setRating(star)}
                    className={star <= rating ? 'star selected' : 'star'}
                  >
                    {star <= rating ? <FaStar /> : <FaRegStar />}
                  </span>
                ))}
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Share your experience with VelvetSpace"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isUploading}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Upload Image of Your Home</Form.Label>
              <div className="upload-area">
                <input
                  type="file"
                  id="home-image"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="file-input"
                />
                <label htmlFor="home-image" className="file-label">
                  <FaCamera className="me-2" />
                  {file ? file.name : 'Choose Image'}
                </label>
              </div>
              {file && (
                <div className="image-preview-container">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="image-preview"
                  />
                </div>
              )}
            </Form.Group>
            
            {isUploading && (
              <div className="mb-3">
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{ width: `${uploadProgress}%` }}
                    aria-valuenow={uploadProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {uploadProgress}%
                  </div>
                </div>
              </div>
            )}
            
            <Button
              variant="primary"
              type="submit"
              className="w-100 submit-button"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Uploading...</span>
                </>
              ) : (
                'Submit Review'
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        className="delete-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reviewToDelete && (
            <>
              <p>Are you sure you want to delete this review?</p>
              <div className="text-center mb-3">
                <img
                  src={reviewToDelete.imageUrl}
                  alt="Review"
                  className="delete-preview-image"
                />
              </div>
              <p>
                <strong>From:</strong> {reviewToDelete.name}
              </p>
              <p className="text-danger">This action cannot be undone.</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OurHomes;