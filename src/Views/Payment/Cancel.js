import React from 'react'
import { useNavigate } from 'react-router-dom'

function Cancel() {
    const navigate = useNavigate()
  return (
    <div>
        <h1 style={{color:"red"}}>
            Payment canceled
        </h1>
        <button onClick={()=>navigate("/mycart")}>
            Return to cart
        </button>
    </div>
  )
}

export default Cancel