import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login'); // Login, Sign Up, or Forgot Password
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const {register, login, forgotPassword } = useContext(AuthContext);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (currentState === 'Sign Up') {
      if (formData.password !== formData.confirmPassword) {
        return toast.error('Passwords do not match');
      }
      register(formData);
    } else if (currentState === 'Login') {
      login(formData);
    }
  };

  // Handle forgot password submission
  const onForgotPasswordHandler = async (event) => {
    event.preventDefault();
    forgotPassword(formData)
  };

  return (
    <form
      onSubmit={currentState === 'Forgot Password' ? onForgotPasswordHandler : onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 h-[26rem] m-auto gap-4 text-gray-800 pt-20'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {/* Conditional Inputs */}
      {currentState === 'Sign Up' && (
        <input
          name='userName'
          value={formData.name}
          onChange={handleChange}
          type='text'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          required
        />
      )}

      <input
        name='email'
        value={formData.email}
        onChange={handleChange}
        type='email'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />

      {currentState !== 'Forgot Password' && (
        <>
          <input
            name='password'
            value={formData.password}
            onChange={handleChange}
            type='password'
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Password'
            required
          />
          {currentState === 'Sign Up' && (
            <input
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              type='password'
              className='w-full px-3 py-2 border border-gray-800'
              placeholder='Confirm Password'
              required
            />
          )}
        </>
      )}

      {/* Links */}
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {currentState !== 'Forgot Password' && (
          <p onClick={() => setCurrentState('Forgot Password')} className='cursor-pointer'>
            Forgot Your Password?
          </p>
        )}
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>
            Create Account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>
            Back to Login
          </p>
        )}
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4' type='submit'>
        {currentState === 'Login'
          ? 'Sign In'
          : currentState === 'Sign Up'
          ? 'Sign Up'
          : 'Reset Password'}
      </button>
    </form>
  );
};

export default Login;
