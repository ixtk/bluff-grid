import { useContext } from "react";
import { AuthContext } from "../lib/AuthContext";
import { auth, googleProvider, facebookProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import axiosInstance from "../lib/axiosInstance";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  const handleLogin = async (providerType) => {
    const provider =
      providerType === "google" ? googleProvider : facebookProvider;

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const token = await firebaseUser.getIdToken();
      localStorage.setItem("token", token);

      await axiosInstance.post("/users", {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        username: firebaseUser.displayName,
        photoUrl: firebaseUser.photoURL
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const testProtectedRoute = async () => {
    try {
      const response = await axiosInstance.get("/protected");
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Unauthorized");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Welcome to Bluff Grid</h1>

      {!user && (
        <>
          <button onClick={() => handleLogin("google")}>
            Login with Google
          </button>
          <button onClick={() => handleLogin("facebook")}>
            Login with Facebook
          </button>
        </>
      )}

      {user && <p>Hello, {user.username}</p>}

      <button onClick={testProtectedRoute}>Test Protected Route</button>
    </div>
  );
};

export default HomePage;
