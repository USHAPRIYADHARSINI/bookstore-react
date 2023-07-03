import {createContext, useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
const swal = require('sweetalert2')

const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("Authorization")
            ? JSON.parse(localStorage.getItem("Authorization"))
            : null
    );
    
    const [user, setUser] = useState(() => 
        localStorage.getItem("Authorization")
            ? jwt_decode(localStorage.getItem("Authorization"))
            : null
    );

    const [loading, setLoading] = useState(true);
    // const [logindata, setlogindata]= useState(null)

    const navigate = useNavigate();

    const loginUser = async (email, password) => {
        const data = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/login`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        // const data = await response.json()
        // console.log(data);
        // .then((data)=>data.json())
        const logindata = await data.json()
        // .then((data)=> setlogindata(data))

        if(logindata !== null){
            console.log("Authorization",JSON.stringify(logindata.token))
            setAuthTokens(logindata.token)
            setUser(jwt_decode(logindata.token))
            localStorage.setItem("Authorization",JSON.stringify(logindata.token))
            console.log("Logged In");
            console.log(logindata.token)
            navigate("/dashboard")
            swal.fire({
                title: "Login Successful",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })

        } else {    
            console.log("there was a server issue");
            swal.fire({
                title: "Username or passowrd does not exists",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const registerUser = async (email, username, password) => {
        console.log(process.env.REACT_APP_SERVER_URL)
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, username, password
            })
        })
        if(response.status === 200){
            navigate("/login")
            swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("Authorization")
        navigate("/login")
        swal.fire({
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }

    // const cartadd = async(modifycart, user_id )=>{
    //     if(modifycart){
    //         console.log(modifycart)
    //         console.log(LOCAL_URL)
    //         await fetch(`${LOCAL_URL}/users/addtocart/${user_id}`, {
    //           method: "POST",
    //           body: JSON.stringify(modifycart),
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         })
    //         .then((data) => data.json())
    //         .then((data) => {
    //           if (data) {
    //             alert(data.msg);
    //             handleClose();
    //             navigate("/");
    //           }
    //         })
    //       }
    // }

    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens))
            console.log(authTokens)
        }
        
        console.log(authTokens, "no token")
        setLoading(false)
    }, [setAuthTokens,authTokens, loading, setUser])


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}