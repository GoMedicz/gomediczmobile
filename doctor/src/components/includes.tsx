
import { getData } from "./globalFunction";

//export const ImagesUrl = 'http://52.51.77.187:5190/images'

export const ImagesUrl = 'http://localhost:6000/public/images'
//export const ServerUrl = 'http://localhost:6000'
export const ServerUrl = 'http://52.51.77.187:5190';
export const API_KEY = '';

export const MODE :any = getData('THEME')


export const PHARMACY_CODE = getData('code');
export const STAFF_CODE = 'staff_002'
export const CURRENCY = '₦'

const Token = ''

export const config ={ headers: {
    'content-type': 'application/json', 
    'Authorization': `Bearer ${Token}`
}

}


export const configToken =async()=>{

    const Token =await getData('jwt');
    return { headers: {
        
        'content-type': 'multipart/form-data', 
        'Authorization': `Bearer ${Token}`
    }
}

}

export const configJSON =async()=>{

    const Token =await getData('jwt');
    return { headers: {
        
        'content-type': 'application/json', 
        'Authorization': `Bearer ${Token}`
    }
}

}


export const configs = {
    headers: {
        'content-type': 'multipart/form-data', 
        'Authorization': `Bearer ${Token}`
    }
}

export const configFile = {
    headers: {
        'content-type': 'multipart/form-data', 
        'Authorization': `Bearer ${Token}`
    }
}