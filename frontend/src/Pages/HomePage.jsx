import { useEffect, useState } from "react";
import { auth, googleProvider, signInWithPopup } from "../lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import axiosInstance from "../lib/axiosInstance";

function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      try {
        const response = await axiosInstance.post('/users', {
          firebaseId: firebaseUser.uid,
        });
      } catch (backendError) {
        if (backendError.response && backendError.response.status === 409) {
        } else {
        }
      }

    } catch (error) {
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
    }
  };

  const fetchProtectedData = async () => {
    try {
      const response = await axiosInstance.get('/protected-data');
    } catch (error) {
    }
  };


  return (
    <div className="container">
      <h1>Home</h1>

      {user ? (
        <div className="card">
          <h2>Welcome, {user.displayName}</h2>
          <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
          <button className="btn btn-info" onClick={fetchProtectedData}>Fetch Protected Data</button>
        </div>
      ) : (
        <div className="card">
          <button className="btn btn-primary" onClick={handleGoogleLogin}>Login with Google</button>
        </div>
      )}

      <br />

      <div className="card text">
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>

        <br />

        <div>
          <label htmlFor="story">Story</label>
          <textarea rows={5} id="story"></textarea>
        </div>
      </div>

      <br />

      <span className="badge badge-danger">TRUE</span>
      <span className="badge badge-success">FALSE</span>
    </div>
  );
}

export default HomePage;