
import { getData } from "./globalFunction";

export const ImagesUrl = 'http://localhost:6000/public/images'
export const ServerUrl = 'http://localhost:6000'
export const API_KEY = '';

export const MODE :any = getData('THEME')


export const PHARMACY_CODE = 'pharm_001'
export const STAFF_CODE = 'staff_002'
export const CURRENCY = '₦'


const Token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9wZXllbWlhZGVtb24iLCJpYXQiOjE2OTM2ODY0NjUsImV4cCI6MTY5Mzc1ODQ2NX0.AwNcBBgqGKX9yN-2IG2hBNxZu7BB9sr3bTCVjde1y9w';

export const config = {
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