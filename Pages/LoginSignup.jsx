import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import Requests from '../ApiRequest/ApiList';
import { toast } from 'react-toastify';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] = useState(false);

  const onSubmitHandler = async (e) => {
    setIsButtonDisabled(true);
    isLogin ? loginHandler(e) : signUpHandler(e);
  }

  const loginHandler = async (e) => {
    toast("Button clicked");
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await Requests.login(data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const signUpHandler = async (e) => {
    e.preventDefault();
    const data = { name, email, password, otp };
    try {
      const response = await Requests.signup(data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const sendOtp = async () => {
    setIsVerifyButtonDisabled(true);
    const payload = {
      email
    };

    try {
      const responseOtp = await Requests.sendotp(payload);
      console.log(responseOtp);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{isLogin ? 'Log In' : 'Sign Up'}</h1>
        <div className="loginsignup-fields">
          {!isLogin && <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Your Name' />}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' />
          {!isLogin && <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Enter OTP' />}
          {!isLogin && <button onClick={sendOtp} disabled={isVerifyButtonDisabled}>Verify Email</button>}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        </div>
        <button
          onClick={onSubmitHandler}
          disabled={isButtonDisabled}
          className={isButtonDisabled ? 'disabled' : ''}
        >
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
        <p className='loginsignup-login'>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={toggleMode}>{isLogin ? 'Sign up here' : 'Log in here'}</span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;