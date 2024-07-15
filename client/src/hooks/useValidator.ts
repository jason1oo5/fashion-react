import { toast } from "react-toastify";

export const useValidator = (item: any) => {    

    let validState = true;
    const validateData: any = {
        input: item.input,
        type: item.type,
        inputReg: item.inputReg
    }    

    switch (validateData.type) {
        case 'email':
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            validState = reg.test(validateData.input);
            break;
        case 'password':
            validState = validateData.input.length >= validateData.inputReg.min;
            break;        
        default:
            validState = validateData.input.length >= validateData.inputReg.min;
    }
    if(!validState) {
        toast.error(`Please make sure you input valid ${validateData.type}`);
        return false;
    }
    return true;
}