import { createContext, useState, useEffect, useContext } from "react";
import { authFB } from "../firebase";

// eto sir yung logic para sa authentication para mag sustain yung user kapag lumilipat ng page
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("USEEFFCCT");
    authFB.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        return;
      }
      setUser(user);
      setLoading(false);
    });
  }, [user]);
  console.log(loading);

  return (
    <AuthContext.Provider value={user}>
      {!loading ? children : "LOADING..."}
    </AuthContext.Provider>
  );
};
