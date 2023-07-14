import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import AuthContext from "../context/AuthContext";

function Homepage() {
  const navigate = useNavigate();

  const {user}= useContext(AuthContext);
  return (
    <>{user? navigate("/dashboard")
    : <div className="home-container">
      <h2>Home</h2>
      <p className="home-tagline"> Get the best list of books from your <strong>own profile</strong></p>
      <div className="home">
        <div className="tag"><button className="home-item" onClick={() => navigate("/login")}>
          Login
        </button>
        <p className="home-hint">Already registered user?</p>
        <p className="home-hint">Use the default login provided in the page</p>
        </div>
        <div className="tag"><button className="home-item" onClick={() => navigate("/register")}>
          Register
        </button>
        <p className="home-hint">New user?</p>
        </div>
      </div>
    </div>
}
    </>
  );
}

export default Homepage;
