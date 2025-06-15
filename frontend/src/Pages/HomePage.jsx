import React from 'react';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import axiosInstance from '../lib/axiosInstance';

const HomePage = () => {
  const handleLogin = async (providerType) => {
    const provider =
      providerType === 'google'
        ? new GoogleAuthProvider()
        : new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      console.log("User:", user);
      console.log("Firebase Token:", token);

    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const testProtectedRoute = async () => {
    try {
      const response = await axiosInstance.get('/protected');
      console.log('Protected response:', response.data);
      alert(JSON.stringify(response.data));
    } catch (error) {
      console.error('Protected request failed:', error);
      alert(error.response?.data?.message || 'Request failed');
    }
  };

  return (
    <div>
      <h1>Welcome to Bluff Grid</h1>
      <button onClick={() => handleLogin('google')}>Login with Google</button>
      <button onClick={() => handleLogin('facebook')}>Login with Facebook</button>
      <br /><br />
      <button onClick={testProtectedRoute}>Test Protected Route</button>
    </div>
  );
};

export default HomePage;
