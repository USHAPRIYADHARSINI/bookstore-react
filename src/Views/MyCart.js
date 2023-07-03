import React from "react";
import { useCart } from "../context/CartContext";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";


function MyCart() {
  const [cart, setCart] = useCart();
  var content = null;
  const navigate = useNavigate();
  
  const { authTokens, user } = useContext(AuthContext);

  const removeFromCart = async(e, item) => {
    e.preventDefault();
    let cartcount = await cart
    .filter((i) => i.isbn13 == item.isbn13);
    console.log(cartcount.length)
    const removecart = cartcount.slice(1);

    let newcart = await cart
    .filter((i) => i.isbn13 !== item.isbn13);
    newcart = [...newcart, ...removecart]
    console.log(JSON.stringify(newcart))

    if(newcart){
      await fetch(`${process.env.REACT_APP_SERVER_URL}/users/cart/additemstocart/${user.userId}`, {
        method: "PUT",
        body: JSON.stringify(newcart),
        headers:  { Authorization: `Bearer ${authTokens}` },
      })
      .then((data) => data.json())
      .then((data) => {
        if (data) {
          setCart(newcart)
        }
      })
    }
  };

  if ( cart ) {
    content = cart.map((item,index) => (
      <div className="card" key={index}>
        <img src={item.image} className="img" />
        <div className="cont">
          <div className="title">{item.title}</div>
          <div className="price">{item.price}</div>
          <div className="sub">{item.subtitle}</div>
          <div className="home-hint">{item.url}</div>
          <button onClick={(e) => removeFromCart(e, item)}>
            Remove from cart
          </button>
        </div>
      </div>
    ));
  }

  return (
    <div className="mycart">
      <h3 style={{ margin: "0", marginTop: "20px" }}>MyCart</h3>
      <div className="home-tagline">Total items in your cart {cart.length}</div>
      <div className="cart-page">
        <div>{content ? content : "loading"}</div>
      </div>
      <button onClick={()=>navigate("/dashboard")}>Back to Dashboard</button>
      <button style={{ backgroundColor: "rgb(250, 53, 53)" }}>Checkout</button>
    </div>
  );
}

export default MyCart;
