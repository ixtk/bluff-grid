import { useEffect } from 'react';
import { auth, googleProvider, facebookProvider } from '../lib/firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import axiosInstance from '../lib/axiosInstance';

export default function Layout({ children }) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem('token', token);

        try {
          await axiosInstance.post('/users', {}, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (err) {
          console.error('User creation failed:', err);
        }
      } else {
        localStorage.removeItem('token');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = () => signInWithPopup(auth, googleProvider);
  const handleFacebookLogin = () => signInWithPopup(auth, facebookProvider);

  return (
    <div>
      <header style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <button onClick={handleGoogleLogin}>Login with Google</button>
        <button onClick={handleFacebookLogin}>Login with Facebook</button>
      </header>
      <main>{children}</main>
    </div>
  );
}
