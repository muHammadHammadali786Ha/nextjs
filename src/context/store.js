'use client'
const { createContext, useState, useEffect } = require("react");

export const AuthContext = createContext();


const AuthProvider = ({children}) =>{

    const [auth, setAuth] = useState({
        token: typeof window !== "undefined" ? sessionStorage.getItem("token") : null,
        user: typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("user")) : null,
      })

    const login = (userData,token)=>{
        setAuth({ token, user: userData });
        // console.log(user);
        // console.log(token);
        
        sessionStorage.setItem("user",JSON.stringify(userData));
        sessionStorage.setItem("token",token);
    };
    
    const logout = () => {
        setAuth({ token: null, user: null });
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
    };
    
    useEffect(()=>{
        const getUserData = JSON.parse( sessionStorage.getItem("userData"));
        const getUserToken = sessionStorage.getItem("token");
        
        if (getUserData,getUserToken) {
            setAuth({token:getUserToken,user:getUserData});
        }

    },[]);

    return(
        <AuthContext.Provider value={{auth,login,logout}} >
            {children}
        </AuthContext.Provider>
    )
};


export default AuthProvider;