import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
import app from "../configs/firebase.Config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import { Cookies } from "react-cookie";
import UserService from "../services/user.service";
const cookies = new Cookies();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth(app);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const signUpWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const signUpWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const updateUser = (name, profile) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: profile,
    });
  };
  const getUser = () => {
    const userInfo = cookies.get("user") || null;
    return userInfo;
  };

  const authInfo = {
    user,
    isLoading,
    createUser,
    getUser,
    login,
    logout,
    signUpWithGoogle,
    signUpWithGithub,
    signUpWithFacebook,
    updateUser,
  };

  // check user status login or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currenUser) => {
      setUser(currenUser);
      if (currenUser) {
        setUser(currenUser);
        setIsLoading(false);
        const { email } = currenUser;
        const { data } = await UserService.signJwt(email);
        console.log(data);
        if (data) {
          cookies.set("user", data);
        }
      } else {
        cookies.remove("user");
      }
      setIsLoading(false);
    });

    return () => {
      return unsubscribe;
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
