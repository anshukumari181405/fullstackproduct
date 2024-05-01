
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../CSS/login.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false); 
  
    try {
      const response = await axios.post('https://fullstackproduct.onrender.com/users/register', {
        Username: firstName + ' ' + lastName,
        Email: email,
        Pass: password,
      });
  
      if (response.status === 200) {
        setShowAlert(true); 
        setAlertMessage('Registration Successful! Redirecting to login...');
        
        
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      setShowAlert(true); 
      setAlertMessage('Registration failed. Please try again.');
    }
  };
  

  return (
    <div className="container mt-5 shadow p-3 mb-5 bg-body rounded">
    <div className="row justify-content-center">
        <div className="col-md-6">
          {showAlert && (
            <div className={`alert ${alertMessage.includes('Successful') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
              {alertMessage}
              <button type="button" className="btn-close" onClick={() => setShowAlert(false)} aria-label="Close"></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h3 className="mb-4">Sign Up</h3>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
            <p className="forgot-password text-right mt-3">
              Already registered? <a href="/login">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
