import { useContext } from "react"
import UserContext from "../contexts/userContext";
import AdminRoutes from "./adminRouter";
import PrivateRoutes from "./privateRoutes";
import PublicRoutes from "./publicRoutes";

export default function Routes() {
    const userContext = useContext(UserContext);

    return userContext?.user?.token ?
            <>
                {userContext.user.role==1&&
                    <AdminRoutes />
                }
                <PublicRoutes />
                <PrivateRoutes />
            </>            
            : 
            <PublicRoutes />             
}