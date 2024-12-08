import React, { useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const ResetPassword = () => {
  const { id,_id } = useParams();
  const {resetPassword,loading} = useContext(AuthContext) 
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error('New Password and Confirm Password must match.');
    }
    resetPassword(formData,id,_id)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className='inline-flex items-center gap-2 mb-6 w-full justify-center'>
        <p className='prata-regular text-3xl'>Reset Password</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your current password"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your new password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Confirm your new password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-black text-white font-semibold px-6 py-2 rounded-md hover:bg-slate-700 w-full mt-4"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
