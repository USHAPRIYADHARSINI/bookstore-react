import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {
    const navigate = useNavigate();
  return (
    <div>
      <h1 style={{ color: "green" }}>Payment successfull</h1>
      <button onClick={() => navigate("/dashboard")}>Return to store</button>
    </div>
  );
}

export default Success;
