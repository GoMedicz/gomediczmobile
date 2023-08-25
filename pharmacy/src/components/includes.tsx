export const ImagesUrl = 'http://localhost:6000/public/images'
export const ServerUrl = 'http://localhost:6000'
//import AsyncStorage from '@react-native-async-storage/async-storage';
export const API_KEY = '';

export const MODE :string = 'Light'
export const PHARMACY_CODE = 'pharm_002'
export const STAFF_CODE = 'staff_002'


const Token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9wZXllbWlhZGVtb24iLCJpYXQiOjE2OTI4NTAwNTYsImV4cCI6MTY5MjkyMjA1Nn0.RgSDvwf4BjLqFLlXhM6wcu4vlsx3SGJ0XKyO3vHle1g';

export const config = {
    headers: {
        'content-type': 'multipart/form-data', 'Authorization': `Bearer ${Token}`
    }
}