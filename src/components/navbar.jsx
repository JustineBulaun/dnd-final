import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { authFB } from "../firebase";


const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  console.log(auth);
  return (
    <div className="navbar">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          color: "white",
          textDecoration: "underline",
          textUnderlineOffset: "5px",
        }}
      >
        <img src="sun.png" className="sun" />
        <p>Declutter and Donate</p>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          {/* Dapat po admin bago mo makita yung orders */}
          {authFB.currentUser?.uid == "HKrsqsn37xPiB3o3N4svC3ahXR13" && (
            <Link to="/orders">Orders</Link>
          )}
        </li>
        {auth ? (
          <li>
            <article
              href="#"
              onClick={() => {
                signOut(authFB);
                navigate("/");
                window.location.reload();
              }}
            >
              Sign Out
            </article>
          </li>
        ) : (
          <li>
            <Link to="/auth">Sign In</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
