import { createContext, useContext, useState, useEffect } from "react";


const userContext = createContext();


export const useUser = () => {
  return useContext(userContext);
}

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <userContext.Provider value={{user, loginUser, logoutUser}}>
            {children}
        </userContext.Provider>
    )
}


