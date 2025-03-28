import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { FaGoogle, FaFacebook, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import './AuthForm.css';

const AuthForm = ({ mode, onSuccess, onError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (resetPasswordMode) {
        await sendPasswordResetEmail(auth, email);
        onSuccess('Password reset email sent! Check your inbox.');
        setResetPasswordMode(false);
        return;
      }

      if (mode === 'signup') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        if (password.length < 6) {
          throw new Error('Password should be at least 6 characters');
        }
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update profile with display name if provided
        if (displayName) {
          await updateProfile(userCredential.user, {
            displayName: displayName
          });
        }
        
        onSuccess('Account created successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        onSuccess('Signed in successfully!');
      }
    } catch (error) {
      setError(friendlyAuthError(error.message));
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  // Convert Firebase error messages to user-friendly messages
  const friendlyAuthError = (errorMessage) => {
    if (errorMessage.includes('auth/email-already-in-use')) {
      return 'This email is already registered. Please sign in instead.';
    } else if (errorMessage.includes('auth/wrong-password') || errorMessage.includes('auth/user-not-found')) {
      return 'Invalid email or password. Please try again.';
    } else if (errorMessage.includes('auth/weak-password')) {
      return 'Password is too weak. Please use a stronger password.';
    } else if (errorMessage.includes('auth/invalid-email')) {
      return 'Invalid email format. Please check and try again.';
    } else if (errorMessage.includes('Passwords do not match')) {
      return 'Passwords do not match. Please try again.';
    }
    return errorMessage;
  };

  const toggleResetPassword = () => {
    setResetPasswordMode(!resetPasswordMode);
    setError('');
  };

  return (
    <div className="auth-form-container">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        {resetPasswordMode ? (
          <>
            <h4 className="form-section-title">Reset Your Password</h4>
            <p className="form-description">Enter your email to receive a password reset link</p>
            
            <Form.Group className="mb-3 form-group">
              <div className="input-icon-wrapper">
                <FaEnvelope className="input-icon" />
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="icon-input"
                />
              </div>
            </Form.Group>
            
            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
                className="auth-submit-button"
              >
                {loading ? (
                  <><Spinner animation="border" size="sm" /> Sending Reset Link...</>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
              
              <Button 
                variant="link" 
                onClick={toggleResetPassword}
                className="auth-toggle-button"
              >
                Back to Sign In
              </Button>
            </div>
          </>
        ) : (
          <>
            {mode === 'signup' && (
              <>
                <h4 className="form-section-title">Create Your Account</h4>
                <p className="form-description">Join our co-living community today</p>
                
                <Form.Group className="mb-3 form-group">
                  <div className="input-icon-wrapper">
                   
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="icon-input"
                    />
                  </div>
                </Form.Group>
              </>
            )}
            
            {mode === 'signin' && (
              <>
                <h4 className="form-section-title">Welcome Back</h4>
                <p className="form-description">Sign in to continue to your account</p>
              </>
            )}
            
            <Form.Group className="mb-3 form-group">
              <div className="input-icon-wrapper">
                
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="icon-input"
                />
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3 form-group">
              <div className="input-icon-wrapper">
               
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="icon-input"
                />
              </div>
            </Form.Group>
            
            {mode === 'signup' && (
              <Form.Group className="mb-3 form-group">
                <div className="input-icon-wrapper">
                 
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="icon-input"
                  />
                </div>
              </Form.Group>
            )}
            
            {mode === 'signin' && (
              <div className="forgot-password-link">
                <Button 
                  variant="link" 
                  onClick={toggleResetPassword}
                  className="forgot-password-button"
                >
                  Forgot Password?
                </Button>
              </div>
            )}
            
            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
                className="auth-submit-button"
              >
                {loading ? (
                  <><Spinner animation="border" size="sm" /> {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}</>
                ) : (
                  mode === 'signin' ? 'Sign In' : 'Create Account'
                )}
              </Button>
              
    

            </div>
          </>
        )}
      </Form>
    </div>
  );
};

export default AuthForm;