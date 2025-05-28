'use client'
const { createContext, useState, useEffect } = require("react");
import { useRouter } from "next/navigation"
export const AuthContext = createContext();

// const router = useRouter();

const AuthProvider = ({children}) =>{

    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState({
        token: typeof window !== "undefined" ? sessionStorage.getItem("token") : false,
        user: typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("user")) : false,
      })

    const login = (userData,token)=>{
        setAuth({ token, user: userData });
        // console.log(user);
        // console.log(token);
        
        sessionStorage.setItem("user",JSON.stringify(userData));
        sessionStorage.setItem("token",token);
    };
    
    const logout = () => {
        setAuth({ token: "", user: "" });
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        // router.push('/login');
    };
    
    useEffect(()=>{
        const getUserData = JSON.parse( sessionStorage.getItem("userData"));
        const getUserToken = sessionStorage.getItem("token");
        
        if (getUserData && getUserToken) {
            setAuth({token:getUserToken,user:getUserData});
        }
        setLoading(false);

    },[]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return(
        <AuthContext.Provider value={{auth,login,logout}} >
            {children}
        </AuthContext.Provider>
    )
};


export default AuthProvider;