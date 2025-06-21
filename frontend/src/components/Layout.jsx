import { useContext } from "react";
import { auth, googleProvider, facebookProvider } from "../lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { AuthContext } from "../lib/AuthContext";

export default function Layout({ children }) {
  const { user, setUser } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    googleProvider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  const handleFacebookLogin = async () => {
    facebookProvider.setCustomParameters({
      auth_type: "reauthenticate",
    });
    try {
      await signInWithPopup(auth, facebookProvider);
    } catch (err) {
      console.error("Facebook login failed", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  console.log("User object:", user);
  return (
    <div>
      <header style={{ display: "flex", gap: "1rem", padding: "1rem", alignItems: "center" }}>
        {!user && (
          <>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            <button onClick={handleFacebookLogin}>Login with Facebook</button>
          </>
        )}

        {user && (
          <>
            <img
              src={user.photoUrl}
              alt="Profile"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <span>{user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </header>

      <main>{children}</main>
    </div>
  );
}
