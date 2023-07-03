import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const { user, logoutUser, authTokens } = useContext(AuthContext);
  // const token = localStorage.getItem("Authorization");

  // if (token) {
  //   const decoded = jwt_decode(token);
  //   var user_id = decoded.user_id;
  //   var username = decoded.username;
  // }

  return (
    <div>
      <nav className="navbarcontainer">
      <div className="page">Bookstore</div>
            <div className="navbar-nav">
              <div className="nav-item" onClick={() => navigate("/")}>
                Home
              </div>
              {authTokens === null && (
                <>
                  <div className="nav-item" onClick={() => navigate("/login")}>
                    Login
                  </div>
                  <div
                    className="nav-item"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </div>
                </>
              )}
              {authTokens !== null && (
                <>
                <div>
                  {user.username}
                </div>
                  <div
                    className="nav-item"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </div>
                  <div className="nav-item" onClick={logoutUser}>
                    Logout
                  </div>
                </>
              )}
            </div>
      </nav>
    </div>
  );
}

export default Navbar;
