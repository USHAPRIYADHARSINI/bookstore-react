import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const cartContext = React.createContext()

export function useCart(){
    return useContext(cartContext)
}

export function CartProvider({children}){
    const [cart, setCart] = useState([])

    const { authTokens, user } = useContext(AuthContext);

useEffect(()=>{
  console.log(authTokens)
  if(authTokens){
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/cart/${user.userId}`,{
      method: "GET",
      headers:  {Authorization: `Bearer ${(authTokens)}` }
    })
    .then((data) => data.json())
    .then((data) => {
      if (data) {
        setCart(cart);
      }
    })
  }
    
},[cart, setCart])    

    return(
        <cartContext.Provider value={[cart,setCart]}>
            {children}
        </cartContext.Provider>
    )
}
