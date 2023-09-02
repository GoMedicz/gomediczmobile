
import { getData } from "./globalFunction";

export const ImagesUrl = 'http://localhost:6000/public/images'
export const ServerUrl = 'http://localhost:6000'
export const API_KEY = '';

export const MODE :any = getData('THEME')


export const PHARMACY_CODE = 'pharm_001'
export const STAFF_CODE = 'staff_002'
export const CURRENCY = '₦'


const Token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9wZXllbWlhZGVtb24iLCJpYXQiOjE2OTM1ODgyNjAsImV4cCI6MTY5MzY2MDI2MH0.M7JZW4XYh7gsLLiprOLc2y5c2TEZ2Yf1oc2EKClvQVE';

export const config = {
    headers: {
        'content-type': 'multipart/form-data', 
        'Authorization': `Bearer ${Token}`
    }
}