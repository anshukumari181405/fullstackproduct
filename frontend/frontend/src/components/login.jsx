
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import AuthContext from '../auth/authContext';
import '../CSS/login.css';
const Login = () => {
  const navigate = useNavigate(); 
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://fullstackproduct.onrender.com/users/login', {
        Email: email,
        Pass: password,
      });

      if (response.status === 200) {
        setUser({
          token: response.data.Token,
          username: response.data.Userinfo.Username,
          email: response.data.Userinfo.Email,
        });
        localStorage.setItem('userToken', response.data.Token);
        localStorage.setItem('username', response.data.Userinfo.Username);
        localStorage.setItem('email', response.data.Userinfo.Email);
        
        
        setAlertMessage('Login successful! Redirecting...');
        setShowAlert(true);

        
        setTimeout(() => {
          navigate('/');
        }, 2000); 

      }
    } catch (error) {
      setShowAlert(true);
      setAlertMessage('Login failed. Please try again.');
    }
  };

  return (
    
    <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
          <h3 className="mb-4 text-center">Sign In</h3>
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
          <button type="submit" className="btn btn-primary w-100">Submit</button>
          {showAlert && (
            <div className={`alert ${alertMessage.includes('successful') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
              {alertMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  </div>
);
};
export default Login;
