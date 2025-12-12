import { createContext, useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------- REGISTER ----------------
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ---------------- LOGIN ----------------
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ---------------- GOOGLE LOGIN (FIXED) ----------------
  const googleLogin = async () => {
    setLoading(true);

    const result = await signInWithPopup(auth, googleProvider);
    const loggedUser = result.user;

    // Google এর data context এ সেট
    setUser({
      uid: loggedUser.uid,
      email: loggedUser.email,
      displayName: loggedUser.displayName,
      photoURL: loggedUser.photoURL,
    });

    return loggedUser;
  };

  // ---------------- UPDATE PROFILE ----------------
  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) return;

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });

    // Context এ fresh user set, নাহলে UI তে দেখায় না
    setUser({
      ...auth.currentUser,
      displayName: name,
      photoURL: photoURL,
    });
  };

  // ---------------- LOGOUT ----------------
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem('access-token');
    return signOut(auth);
  };

  // ---------------- OBSERVE USER STATE + JWT ----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await fetch('http://localhost:3000/jwt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: currentUser.email }),
          });

          const data = await res.json();

          if (data.token) {
            localStorage.setItem('access-token', data.token);
          } else {
            localStorage.removeItem('access-token');
          }
        } catch (error) {
          console.error('JWT fetch error:', error);
          localStorage.removeItem('access-token');
        }
      } else {
        localStorage.removeItem('access-token');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ---------------- PROVIDER ----------------
  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    googleLogin,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
