import React, { useState } from 'react';
import { 
  Card, Form, Button, Spinner, Row, Col, Modal, Alert
} from 'react-bootstrap';
import { 
  getDatabase, ref as dbRef, push, set, remove
} from 'firebase/database';
import { 
  getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject 
} from 'firebase/storage';
import { FaUpload, FaTrash } from 'react-icons/fa';
import './AdminPanel.css';

const AdminPanel = ({ categories, onImagesUpdate, images, activeCategory }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(activeCategory);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  
  const database = getDatabase();
  const storage = getStorage();
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    // Validate file
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
  
  const handleUpload = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    
    if (!category) {
      setError('Please select a category');
      return;
    }
    
    if (!file) {
      setError('Please select an image to upload');
      return;
    }
    
    setIsUploading(true);
    setError('');
    
    try {
      // Create unique file name
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}_${file.name}`;
      const imgStorageRef = storageRef(storage, `spaces/${category}/${fileName}`);
      
      // Upload file with progress tracking
      const uploadTask = uploadBytesResumable(imgStorageRef, file);
      
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
          
          // Create a new entry in the Realtime Database
          const spacesRef = dbRef(database, 'spaces');
          const newImageRef = push(spacesRef);
          
          const imageData = {
            id: newImageRef.key,
            title,
            description,
            category,
            imageUrl: downloadURL,
            storagePath: `spaces/${category}/${fileName}`,
            createdAt: timestamp
          };
          
          // Save to Firebase Realtime Database
          await set(newImageRef, imageData);
          
          // Update the state with the new image
          const newImage = {
            ...imageData,
            id: newImageRef.key
          };
          
          // Update parent component
          if (images && images[category]) {
            const updatedImages = [...images[category], newImage];
            onImagesUpdate(updatedImages, category);
          }
          
          // Reset form
          setTitle('');
          setDescription('');
          setFile(null);
          setUploadProgress(0);
          setIsUploading(false);
        }
      );
    } catch (error) {
      console.error('Error:', error);
      setError('Error uploading image. Please try again.');
      setIsUploading(false);
    }
  };
  
  const confirmDelete = (image) => {
    setImageToDelete(image);
    setShowDeleteModal(true);
  };
  
  const handleDelete = async () => {
    if (!imageToDelete) return;
    
    try {
      // Delete from Realtime Database
      const imageDbRef = dbRef(database, `spaces/${imageToDelete.id}`);
      await remove(imageDbRef);
      
      // Delete from Storage
      if (imageToDelete.storagePath) {
        const imgStorageRef = storageRef(storage, imageToDelete.storagePath);
        await deleteObject(imgStorageRef);
      }
      
      // Update state
      if (images && images[imageToDelete.category]) {
        const updatedImages = images[imageToDelete.category].filter(
          (img) => img.id !== imageToDelete.id
        );
        onImagesUpdate(updatedImages, imageToDelete.category);
      }
      
      setShowDeleteModal(false);
      setImageToDelete(null);
    } catch (error) {
      console.error('Error deleting image:', error);
      setError('Error deleting image. Please try again.');
    }
  };
  
  return (
    <div className="admin-panel">
      <Card className="admin-card">
        <Card.Header className="admin-card-header">
          <h3>Admin Panel - Manage Spaces</h3>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleUpload}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isUploading}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={isUploading}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Description (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter a brief description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isUploading}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <div className="custom-file-upload">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="file-input"
                />
                <label htmlFor="image-upload" className="file-label">
                  <FaUpload /> {file ? file.name : 'Select Image'}
                </label>
              </div>
              {file && (
                <div className="selected-file-preview">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="image-preview"
                  />
                </div>
              )}
            </Form.Group>
            
            {isUploading && (
              <div className="upload-progress mb-3">
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
              variant="gradient"
              type="submit"
              className="upload-button"
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
                'Upload Image'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      
      {/* Image Management */}
      <Card className="admin-card mt-4">
        <Card.Header className="admin-card-header">
          <h3>Current Images - {categories.find(cat => cat.id === activeCategory)?.name}</h3>
        </Card.Header>
        <Card.Body>
          {images && images[activeCategory]?.length > 0 ? (
            <div className="admin-gallery">
              {images[activeCategory].map((image) => (
                <div key={image.id} className="admin-gallery-item">
                  <div className="admin-image-container">
                    <img src={image.imageUrl} alt={image.title} />
                    <div className="admin-image-overlay">
                      <h4>{image.title}</h4>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => confirmDelete(image)}
                        className="delete-btn"
                      >
                        <FaTrash /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No images in this category yet.</p>
          )}
        </Card.Body>
      </Card>
      
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {imageToDelete && (
            <>
              <p>Are you sure you want to delete the following image?</p>
              <div className="text-center">
                <img
                  src={imageToDelete.imageUrl}
                  alt={imageToDelete.title}
                  className="delete-preview"
                />
                <p className="mt-2"><strong>{imageToDelete.title}</strong></p>
              </div>
              <p className="text-danger mt-2">
                This action cannot be undone.
              </p>
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
};

export default AdminPanel;