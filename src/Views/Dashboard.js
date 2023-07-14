import { useState, useEffect, useContext } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom"; 
import { useCart } from "../context/CartContext";
import AuthContext from "../context/AuthContext";

function Dashboard() {
  
  const { authTokens, user } = useContext(AuthContext);
  const [cart , setCart] = useCart();
  const [res, setRes] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    console.log(authTokens)
    if(authTokens){
      fetch(`${process.env.REACT_APP_SERVER_URL}/books`, {
        method: "GET",
        headers:  {Authorization:`Bearer ${authTokens}`}
    })
      .then((data)=>data.json())
      .then((data)=>setRes(data))
    }
  }, []);

  var content = null;

  const addToCart = async (e, book) => {
    e.preventDefault();
    console.log(book)

    const modifycart = [...cart,book]
    console.log(modifycart, cart)

    if(modifycart.length > 0 ){
      console.log(JSON.stringify(modifycart), user)
      // console.log(process.env.REACT_APP_SERVER_URL)
      await fetch(`${process.env.REACT_APP_SERVER_URL}/users/cart/additemstocart/${user.userId}`, {
        method: "PUT",
        body: JSON.stringify(modifycart),
        headers:  { Authorization: `Bearer ${authTokens}` ,
                    "Content-Type":"application/json"
      },
      })
      .then((data) => data.json())
      .then((data) => {
        if (data.msg === "success") {
          setCart(data.data);
          console.log(data.data);
        }
      })
    }
  };

  if (res.length > 0) {
    // console.log(res)
    content = res.map((book, index) => (
      <div className="card" key={index}>
        <img src={book.image} className="img" />
        <div className="cont">
          <div className="title">{book.title}</div>
          <div className="price">₹{book.price.split("$")[1]}</div>
          <div className="sub">{book.subtitle}</div>
          <div className="home-hint">{book.url}</div>
          <button onClick={(e) => addToCart(e, book)}>Add to cart</button>
        </div>
      </div>
    ));
  }

  return (
    <div className="books-cont">
      <div className="heading">
        <h2>Select Books from here</h2>
        <div className="cart">
          <button onClick={() => navigate("/mycart")}>Cart</button>
          <div className="countc">{cart ? cart.length : null}</div>
        </div>
      </div>
      <div className="books">{content}</div>;
    </div>
  );
}

export default Dashboard;
