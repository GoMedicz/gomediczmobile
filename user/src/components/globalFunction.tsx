
import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeData = async (key:string, item:any) => {

    try {
      await AsyncStorage.setItem(key, item)


    } catch (e) {
      // saving error
    }
  }

export const getDays=(date:string)=>{
  let day;
  switch (new Date(date).getDay()){
      case 0:
          day ="Sun";
          break;
      case 1:
          day ="Mon";
          break;
      case 2:
          day ="Tue";
         break;
      case 3:
          day ="Wed";
              break;
      case 4:
          day ="Thur";
              break;
      case 5:
          day ="Fri";
          break;
      case 6:
          day ="Sat"
          break;
      default:
          day="Sun"
  }
      return day
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


export const generateRandom=(t:number)=>{
  t||(t=16);
  for(var e="",a=0;a<t;a++){
    var n=Math.floor(Math.random()*"1234567890".length);
    e+="1234567890".substring(n,n+1)
    }
   
    return e
}


export const FormatNumber = (num:Number)=>{
    let newNumber = Number(num)
    return  newNumber.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}



export const getBritishDate=(dateString:any)=>{
  var months = ['Jan', 'Feb', 'Mar', 
  'Apr', 'May', 'Jun', 'Jul', 
  'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var splitDate = dateString.split('-');
var month = Number(splitDate[1])-1; //Javascript months are 0-11
//var surfix = getRank(splitDate[2]).toLowerCase()

let newDate = parseInt(splitDate[2])+ ' '+ months[month]+ ' '+splitDate[0]

return newDate
}


export const getTime =(value:any)=>{
  var timeString = String(value)
 var hourEnd = timeString.indexOf(":");
 var H:any = timeString.substr(0,2);
 var h:any = H % 12 || 12;
 var ampm =  (H<12 || H===24)?"am":"pm";
  if (h < 10) h = "0" + h
 var result = h + timeString.substr(hourEnd, 3)+" "+ampm


return result;
}



export const abbreviate=(n:number,d:number)=>{
  var  x=(''+n).length,
    p=Math.pow,
    d=p(10,d)
    x-=x%3
return Math.round(n*d/p(10,x))/d+" kMGTPE"[x/3]

//abbreviate(item.view_count, 0)
}




export const getAge =(dob:string)=>{
  if(dob!=='0000-00-00' && dob!==''){
  var dbirth = new Date(dob)
  var ageDiff = Date.now() - dbirth.getTime()
  var ageDate = new Date(ageDiff)
  return Math.abs(ageDate.getUTCFullYear()-1970)
}else{
  return '0'
}
}