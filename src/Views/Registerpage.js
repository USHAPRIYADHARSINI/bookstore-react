import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Registerpage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email);
    // console.log(username);
    // console.log(password);
    // console.log(password2);
    registerUser(email, username, password);
  //   const data = JSON.stringify({
  //     email, username, password, password2
  // })
  // console.log(data);
  };
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit}>
        <h3>
          Sign Up
        </h3>
        <div className="home">
        <p className="home-hint" style={{alignSelf:"flex-start"}}>* fields are required</p>
          <input
            type="email"
            className="form-control"
            placeholder="Email Address*"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Username*"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="pass">
          <input
            type="password"
            className="form-control"
            placeholder="Password*"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="home-hint">The password should contain atleast one Capital letter, one small letter, one number, one symbol and should be minimum 8 characters</p>
          </div>
          {/* <input
            type="password"
            id="form2Example27"
            className="form-control"
            placeholder="Confirm Password*"
            onChange={(e) => setPassword2(e.target.value)}
            required
          /> */}
          <button className="btn btn-dark btn-lg btn-block" type="submit">
            Register
          </button>
        <div className="mb-5 pb-lg-2">
          Already have an account? <span onClick={() => navigate("/login")} style={{color:"blue", cursor:'pointer'}}>click here</span> for Login Now
        </div>
        </div>
      </form>
    </div>
  );
}

export default Registerpage;
