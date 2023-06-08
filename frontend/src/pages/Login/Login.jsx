import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Login/Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:7000/login/admin', {
        email,
        password
      });

      if (response.status === 200) {
        // Login successful
        // Store the token in local storage
        localStorage.setItem('token', response.data.token);
        navigate('/product');
      } else {
        // Login failed
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }
    } catch (error) {
      // Handle error
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      console.log('An error occurred during login:', error);
    }
  };

  return (
    <div className="login-pages">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="label-email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="label-password">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary">Log in</button>
          {showAlert && (
            <div className="alert alert-danger mt-3" role="alert">
              You must be an admin to log in
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
