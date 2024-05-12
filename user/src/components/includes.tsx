
import { getData } from "./globalFunction";

export const ImagesUrl = 'https://new.settleafrica.com/public/images'
export const ServerUrl = 'https://new.settleafrica.com'
export const API_KEY = '';

export const MODE :any = 'Light';// getData('THEME')


export const PHARMACY_CODE = getData('code');
export const STAFF_CODE = getData('code');
export const CURRENCY = '₦'

const Token = ''

export const paystack = 'pk_test_afa984a5048e41475293179ee8a11dfd893d4f4f'
export const fluterwave = 'FLWPUBK-bd0b293af3bda1b60ff75fd7836c5a46-X'

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