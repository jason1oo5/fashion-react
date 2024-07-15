import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IUserContext, UserContextType } from "../config/interface";
import PublicRoutes from "../routes/publicRoutes";
import { isAuthenticated } from "../service/authService";

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState<IUserContext>({email: '', token: '', name: '', role: 0, avatar: ''});  
    const location = useLocation();
        
    useEffect(() => {
        const checkLoggedIn = async() => {
            let c_user = await isAuthenticated();
            if(!c_user) {
                localStorage.removeItem('user');
                c_user = {email: '', token: '', name: '', role: 0, avatar: ''};
            }            
            setUser(c_user);
        }

        checkLoggedIn();
    }, [location])

    const updateContextUser = (newUser: IUserContext) => {
        setUser(newUser);
    }

    return (
        <UserContext.Provider value={{user, updateContextUser}}>
            { user?.token ? children : <PublicRoutes /> }
        </UserContext.Provider>
    )
}

export default UserContext;