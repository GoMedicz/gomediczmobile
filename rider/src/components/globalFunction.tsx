
import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeData = async (key:string, item:string) => {

    try {
      await AsyncStorage.setItem(key, item)


    } catch (e) {
      // saving error
    }
  }



  export const getData = async (key:string) => {
    try {
      const value = await AsyncStorage.getItem(key)
     
      if(value !== null) {
       return value
      }else{
        return ''
      }
    } catch(e) {
      // error reading value
    }
  }


export const  removeData = async(key:string)=> {
  try {
      await AsyncStorage.removeItem(key);
      return true;
  }
  catch(exception) {
      return false;
  }
}