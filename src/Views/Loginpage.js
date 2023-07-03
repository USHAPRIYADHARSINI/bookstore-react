import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Login.css";

function Loginpage() {
  const navigate = useNavigate();
  
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    email.length > 0 && loginUser(email, password);

    console.log(email);
    console.log(password);
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit}>
        <h3>Sign in to your account</h3>
        <p>Sample account to use -  email : admin@gmail.com & password : 12345678</p>
        <div className="home">
          <div className="input">
            <input
              type="email"
              id="form2Example17"
              className="form-control"
              name="email"
            />
            <label className="form-label" htmlFor="form2Example17">
              Email address
            </label>
          </div>
          <div className="input">
            <input
              type="password"
              id="form2Example27"
              className="form-control"
              name="password"
            />
            <label className="form-label" htmlFor="form2Example27">
              Password
            </label>
          </div>
          <div className="pt-1 mb-4">
            <button className="btn btn-dark btn-lg btn-block" type="submit">
              Login
            </button>
          </div>
          {/* <div className="small text-muted">Forgot password?</div> */}
          <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "blue", cursor: "pointer" }}
            >
              click here
            </span>{" "}
            for login
          </p>
        </div>
      </form>
    </div>
  );
}

export default Loginpage;
