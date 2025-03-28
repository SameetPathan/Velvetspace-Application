import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, push, set, remove } from 'firebase/database';
import { motion } from 'framer-motion';
import { 
  FaBriefcase, FaMapMarkerAlt, FaRupeeSign, FaClock, 
  FaPlus, FaEnvelope, FaPhoneAlt, FaTrashAlt
} from 'react-icons/fa';
import './Career.css';

function Career() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  
  // Form states
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const auth = getAuth();
  const database = getDatabase();
  
  // Admin email
  const adminEmail = 'sameetpathanrs@gmail.com';
  
  // Check if current user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.email === adminEmail) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    
    const unsubscribe = auth.onAuthStateChanged(checkAdminStatus);
    return () => unsubscribe();
  }, [auth]);
  
  // Fetch jobs from Realtime Database
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      
      try {
        const jobsRef = ref(database, 'jobs');
        
        onValue(jobsRef, (snapshot) => {
          const jobsData = [];
          
          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
              const jobData = childSnapshot.val();
              jobsData.push({
                id: childSnapshot.key,
                ...jobData
              });
            });
            
            // Sort by timestamp (newest first)
            jobsData.sort((a, b) => b.timestamp - a.timestamp);
          }
          
          setJobs(jobsData);
          setLoading(false);
        }, (error) => {
          console.error('Error fetching jobs:', error);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error setting up database listener:', error);
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [database]);
  
  // Handle job submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      setError('Please enter a job title');
      return;
    }
    
    if (!location.trim()) {
      setError('Please enter a job location');
      return;
    }
    
    if (!description.trim()) {
      setError('Please enter a job description');
      return;
    }
    
    if (!requirements.trim()) {
      setError('Please enter job requirements');
      return;
    }
    
    if (!contactEmail.trim()) {
      setError('Please enter a contact email');
      return;
    }
    
    if (!contactPhone.trim()) {
      setError('Please enter a contact phone number');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Create job object
      const timestamp = new Date().getTime();
      const jobData = {
        title,
        location,
        salary: salary || 'Negotiable',
        jobType,
        description,
        requirements,
        contactEmail,
        contactPhone,
        timestamp
      };
      
      // Add to Realtime Database
      const newJobRef = push(ref(database, 'jobs'));
      await set(newJobRef, jobData);
      
      // Reset form and close modal
      resetForm();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error:', error);
      setError('Error posting job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset form fields
  const resetForm = () => {
    setTitle('');
    setLocation('');
    setSalary('');
    setJobType('Full-time');
    setDescription('');
    setRequirements('');
    setContactEmail('');
    setContactPhone('');
  };
  
  // Confirm delete
  const confirmDelete = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };
  
  // Handle job deletion
  const handleDelete = async () => {
    if (!jobToDelete || !isAdmin) return;
    
    try {
      // Delete from Realtime Database
      const jobRef = ref(database, `jobs/${jobToDelete.id}`);
      await remove(jobRef);
      
      setShowDeleteModal(false);
      setJobToDelete(null);
    } catch (error) {
      console.error('Error deleting job:', error);
      setError('Error deleting job. Please try again.');
    }
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
    <div className="career-page">
      {/* Hero Section */}
      <section className="career-hero">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="hero-title">
                  Join Our <span className="gradient-text">Team</span>
                </h1>
                <p className="hero-subtitle">
                  Discover exciting career opportunities at VelvetSpace and be part of our mission to transform homes
                </p>
                {isAdmin && (
                  <Button 
                    className="add-job-btn"
                    onClick={() => setShowAddModal(true)}
                  >
                    <FaPlus className="me-2" /> Post New Job
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
      
      {/* Jobs Section */}
      <section className="jobs-section">
        <Container>
          {loading ? (
            <div className="text-center p-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading job opportunities...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center p-5">
              <h3>No job openings available</h3>
              <p>Check back later for new opportunities!</p>
              {isAdmin && (
                <Button 
                  className="add-job-btn mt-3"
                  onClick={() => setShowAddModal(true)}
                >
                  <FaPlus className="me-2" /> Post New Job
                </Button>
              )}
            </div>
          ) : (
            <motion.div
              className="jobs-container"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {jobs.map((job) => (
                <motion.div 
                  className="job-card-wrapper" 
                  key={job.id}
                  variants={itemVariants}
                >
                  <Card className="job-card">
                    {isAdmin && (
                      <Button 
                        variant="danger" 
                        size="sm"
                        className="delete-button_r"
                        onClick={() => confirmDelete(job)}
                      >
                        <FaTrashAlt />
                      </Button>
                    )}
                    <Card.Body>
                      <div className="job-header">
                        <FaBriefcase className="job-icon" />
                        <div>
                          <Card.Title>{job.title}</Card.Title>
                          <div className="job-meta">
                            <span className="job-location">
                              <FaMapMarkerAlt /> {job.location}
                            </span>
                            <span className="job-salary">
                              <FaRupeeSign /> {job.salary}
                            </span>
                            <span className="job-type">
                              <FaClock /> {job.jobType}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="job-section">
                        <h5>Description</h5>
                        <Card.Text>
                          {job.description}
                        </Card.Text>
                      </div>
                      
                      <div className="job-section">
                        <h5>Requirements</h5>
                        <Card.Text>
                          {job.requirements}
                        </Card.Text>
                      </div>
                      
                      <div className="contact-section">
                        <h5>Contact Information</h5>
                        <div className="contact-buttons">
                          <Button 
                            className="email-button"
                            href={`mailto:${job.contactEmail}`}
                          >
                            <FaEnvelope className="me-2" /> Email
                          </Button>
                          <Button 
                            className="call-button"
                            href={`tel:${job.contactPhone}`}
                          >
                            <FaPhoneAlt className="me-2" /> Call
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {!loading && jobs.length > 0 && isAdmin && (
            <div className="text-center mt-5">
              <Button 
                className="add-job-btn"
                onClick={() => setShowAddModal(true)}
              >
                <FaPlus className="me-2" /> Post New Job
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
                <h2 className="section-title">Not Finding the Right Role?</h2>
                <div className="separator"></div>
                <p className="section-subtitle">
                  Send us your resume and we'll keep you in mind for future opportunities.
                </p>
                <Button 
                  className="cta-button"
                  href={`mailto:admin@velvetspace.in`}
                >
                  <FaEnvelope className="me-2" /> Send Your Resume
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Add Job Modal */}
      <Modal 
        show={showAddModal} 
        onHide={() => setShowAddModal(false)}
        centered
        className="job-modal"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Post New Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Job Title*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Interior Designer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isSubmitting}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Bangalore"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={isSubmitting}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Salary (optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. 30,000 - 50,000"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    disabled={isSubmitting}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Job Type</Form.Label>
                  <Form.Select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    disabled={isSubmitting}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                    <option>Freelance</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Job Description*</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter detailed job description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSubmitting}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Requirements*</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter job requirements, skills, qualifications, etc."
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                disabled={isSubmitting}
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Email*</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="e.g. careers@velvetspace.in"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Phone*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. +91 88675-72229"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    disabled={isSubmitting}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Button
              variant="primary"
              type="submit"
              className="w-100 submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Posting...</span>
                </>
              ) : (
                'Post Job'
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
          {jobToDelete && (
            <>
              <p>Are you sure you want to delete this job listing?</p>
              <p>
                <strong>Title:</strong> {jobToDelete.title}
              </p>
              <p>
                <strong>Location:</strong> {jobToDelete.location}
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

export default Career;