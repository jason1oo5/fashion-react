import { useContext, useState } from "react";
import { UserContextType } from "../config/interface";
import UserContext from "../contexts/userContext";

export const useAuth = () => {
    const {user, updateContextUser} = useContext(UserContext) as UserContextType;    
    if(user==undefined)   {
        updateContextUser({
            email: '',
            token: '',
            name: '',
            role: 0,
            avatar: ''
        });
    }

    const contextUser = user;
    
    return { contextUser };
}