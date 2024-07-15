import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingScreen from "../../components/LoadingScreeen";
import { verifyEmail } from "../../service/authService";

const Verify = () => {
    const location = useLocation();    
    const navigate = useNavigate();

    useEffect(() => {
        const paramStr = location.search.substr(1, location.search.length);
        const vToken_param = paramStr.split('&')[0].split('=')[1];
        const email_param = paramStr.split('&')[1].split('=')[1];
        email_verify(vToken_param, email_param)
    },[location.search])

    const email_verify = async(vToken: string, email: string) => {
        const data = {
            vToken: vToken,
            email: email
        }
        try {
            await verifyEmail(data);
            toast.success("Email verified successfully");                           
        } catch (error) {
            toast.error("Verification failed, try again.");                        
        }        
        return navigate('/dashboard/marketplace/product-store');
    }

    return (
        <>
            <LoadingScreen isDashboard={true} />
        </>
        )
}

export default Verify;