
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATITEMS, DATES, LANGUAGELIST, TIMES } from '../../components/data';
import { CURRENCY, ImagesUrl, ServerUrl, config, configJSON, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import { FormatNumber, getData, getMonthYear, getNumWorkDays, getTime, storeData, timeAddMinutes } from '../../components/globalFunction';
import axios from 'axios';
import Loader from '../../components/loader';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );


      
type RootStackParamList = {
  ConfirmBooking: undefined;
  Payment:{
    order_code:string;
    screen:string;
    amount:number;
    reference:string;
  }; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmBooking'>;
 const ConfirmBooking =({ route, navigation }:Props)=> {


let date = new Date()
var today = date.toISOString().slice(0,10)
var weekend:any =new Date(date.setDate(date.getDate()+6)).toISOString().slice(0,10)


const [modalType, setModalType] = useState('load')
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [dateList, setDateList]= useState([] as any)
  const [timeList, setTimeList]= useState([] as any)
  const [errors, setErrors] = useState({
    title:'',
    date:'',
    time:'',
    errorMessage:''
  });
  const [cart, setCart]= useState({
 
    data:[] as any,
    subtotal:0,
    charge:0,
    total:0,
  })


const handleBack =()=>{
  navigation.goBack();
}








const handleSubmit =async()=>{
       
  let error = {...errors}; 
let formIsValid = true;

let msg ='This field is required';

if(cart.data.length===0){
  error.title = 'There are no items in your cart';
    formIsValid = false;
} 


  const date = dateList.filter((item:any)=>item.status===true)[0]
  const time = timeList.filter((item:any)=>item.status===true)[0]


  if(!date){
    error.date = msg;
      formIsValid = false;
  } 

  if(!time){
    error.time = msg;
      formIsValid = false;
  } 


if(!formIsValid){
  setErrors(error) 
  }

if(formIsValid) {
 
    let order_code = Math.random().toString(36).substring(2, 9);


      const user_code = await getData('code');
      const wallet = await getData('wallet');

 
      const fd = {
        items:cart.data,
        subtotal:cart.subtotal,
        total:cart.total,
        charge:cart.charge,
        time_book:time.startTime,
        date_book:date.date,
        user_code:user_code,
        order_code:order_code,
        wallet:wallet,
        address:'',
        total_item:1,
        status:'Pending'

      } 

      storeData('LabTest', JSON.stringify(fd, null, 2));
storeData('LabItems', JSON.stringify(cart.data, null, 2));


    navigation.navigate('Payment',{
        reference:order_code,
        order_code:order_code,
        screen:'LabTest',
        amount:cart.total
      }); 


/* 

setLoading(true)
  let url = ServerUrl+'/api/lab/test/booking';
     axios.post(url, fd, config)
     .then(response =>{

      console.log(response.data)
       if(response.data.type === 'success'){
        
        storeData('order_code', order_code);
        storeData('cart', '[]');

        setModalType('Success')
        setErrors({...errors, errorMessage: 'Successfully Booked'})
        //handlePayment(order_code)

      } else{
        setModalType('Failed')
            setErrors({...errors, errorMessage: response.data.message})
                 }   
             })
             .catch((error)=>{
              setModalType('Failed')
            setErrors({...errors, errorMessage: error.message})

             }).finally(()=>{
             // handleReset()
            
             })   */
            }
}



const  FetchContent = async()=>{
  
  try{
    let data:any  = await getData('Test');
    let cat = JSON.parse(data)

    const subtotal = cat.reduce((acc:number, item:any)=>acc+parseFloat(item.fees), 0)
let charge = 100

    setCart({...cart, 
      data:cat, 
      subtotal:subtotal, 
      charge:charge,
      total:subtotal+charge
    })

    getTimeInterval('07:00:00', '18:30:00', 30)
    setDateList(getNumWorkDays(today, weekend))

}catch(e){
  console.log('error:',e)
}
}

const getTimeInterval =(startTime:any, endTime:any, minuteToAdd:any)=>{
  var futureDate = timeAddMinutes(startTime, minuteToAdd);
  let timeList =[];
  var maxSlot =24; //maximum slot per day in 30 minutes interval
  
  for(var i=0; i<=maxSlot; i++){
      if(String(futureDate)<= endTime){
          timeList.push({
            startTime:startTime, 
            label:getTime(startTime),
            status:false
          })
          startTime = futureDate;
          futureDate = timeAddMinutes(startTime, minuteToAdd);
      }
  }
  setTimeList(timeList)
}

const handleChooseDate =(date:string)=>{  
  const currentContent = dateList.map((item:any)=>{
                 
      if(item.date ===date){
          return {...item, status:true}
      }else{
        return {...item, status:false}
      }
        })

 setDateList(currentContent) 
 setErrors({...errors, date:''}) 
     }

const handleReset =()=>{

  const currentContent = timeList.map((item:any)=>{
    return {...item, status:false}
      })
      const currentDate = dateList.map((item:any)=>{
        return {...item, status:false}
          })

          //setUser({...user, code:'a'+Math.random().toString(36).substring(2, 9)})
            
            
 setDateList(currentDate) 
setTimeList(currentContent) 

}


const handleChooseTime =(startTime:string)=>{  
  const currentContent = timeList.map((item:any)=>{
                 
      if(item.startTime ===startTime){
          return {...item, status:true}
      }else{
        return {...item, status:false}
      }
        })

 setTimeList(currentContent) 
    
  setErrors({...errors, time:''})  
     }

    
     

const CardDate =({item}:{item:any})=>{
  return <Pressable style={[styles.box, item.status===true?styles.active:[]]} onPress={()=>handleChooseDate(item.date)}>
<Text style={[styles.infoText, {fontSize:10}]}>{item.title}</Text>
<Text style={[styles.date, item.status===true?{color:colors.white}:[]]}>{item.day}</Text>
    </Pressable>
  }
  

  const CardTime =({item}:{item:any})=>{
    return <Pressable style={[styles.timeBox, item.status===true?styles.active:[] ]} onPress={()=>handleChooseTime(item.startTime)}>
  <Text style={[styles.time, item.status===true?{color:colors.white}:[]]}>{item.label}</Text>
      </Pressable>
    }


useEffect(()=>{
  FetchContent()
}, [route])

const Footer =()=>{

  return <>
  
  
<View style={styles.card}>
<Text style={styles.infoText}>Default House Address</Text>
<View style={styles.address}>
<MaterialIcon name="home" size={18} color={colors.icon}  />

<View style={{marginLeft:10, width:width-50}}>
  <Text style={styles.label}>Home</Text>

  <Text style={{fontSize:10, marginTop:10, opacity:0.6,marginRight:10}}>14134, Silver Green Street, 2nd Avenue, Hamiltone, New York, USA</Text>
 
</View>
</View>
</View>



    


<View style={{backgroundColor:colors.white, marginTop:10}}>

<View style={[styles.row, {marginTop:25, paddingBottom:0}]}>
<Text style={styles.infoText}>Select Date</Text>

<Text style={[styles.label]}>{getMonthYear()}</Text>
</View>

<View style={[styles.row]}>
<FlatList 
data={dateList}
horizontal
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardDate key={item.date} item={item} />}

/>

</View><Text style={[styles.infoText, {color:colors.red, marginLeft:10} ]}>{errors.date}</Text>

<View style={[styles.row, {marginTop:20}]}>
<Text style={styles.infoText}>Select Time</Text>

</View>



<View style={[styles.row, {paddingTop:0}]}>
<FlatList 
data={timeList}
horizontal
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardTime key={item.startTime} item={item} />}

/>

</View><Text style={[styles.infoText, {color:colors.red, marginLeft:10} ]}>{errors.time}</Text>


</View>

  </>
}
const Cart = ({item}:{item:any})=>{
  return <Pressable style={[styles.card]} >
 
  <Text style={styles.label}>{item.title}</Text> 
  
  <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
  <Text style={[styles.infoText, {marginTop:10}]}>{item.lab_name}</Text>
  <Text style={[styles.label, {fontWeight:'700'}]}>{CURRENCY+FormatNumber(item.fees)}</Text>
  </View>
  
   </Pressable>
}
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:'#F4F8FB'}]}>
    
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={18} onPress={handleBack} color={colors.dark}  /> 
    <Text style={styles.label}>Confirm Booking</Text>
    <View />
    </View>

<View style={{height:height-200}}>
    <FlatList 
data={cart.data}
numColumns={1}
snapToInterval={width-20}
showsVerticalScrollIndicator={false}
snapToAlignment='center'
decelerationRate="fast"
ListFooterComponent={<Footer />}
renderItem={({item})=> <Cart  key={item.code} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />


}
/>
</View>


<Loader isModalVisible={loading} 
    type={modalType}

    message={errors.errorMessage} 
    action={()=>setLoading(false)}
     />

<View style={styles.container}>


<View style={styles.row}>
  <Text style={styles.label}>Sub total</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(cart.subtotal)}</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Service Charge</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(cart.charge)}</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Amount to Pay</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(cart.total)}</Text>
</View>

<TouchableOpacity onPress={handleSubmit} activeOpacity={0.9} style={[globalStyles.button, {width:width, marginHorizontal:0, borderRadius:0, marginTop:10, } ]}>
  <Text style={globalStyles.buttonText}>Continue to Pay</Text> 
</TouchableOpacity>

</View>
    </View>
  )
}


export default ConfirmBooking

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:colors.white,
    height:60
  },
  label:{
    fontWeight:'600',
    fontSize:12,
  },
  infoWrapper:{
    width:width,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:50
  },
  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },
card:{
  display:'flex',
  justifyContent:'space-between',
  padding:10,
  backgroundColor:colors.white,
  marginTop:5
},
cardImage:{
height:40,
width:40,
resizeMode:'cover',
},
addPlus:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  marginTop:20
},
container:{
position:'absolute',
bottom:0,
backgroundColor:colors.white,
paddingTop:5,
},
btnOk:{
  height:45,
  width:45,
  display:'flex',
  justifyContent:'center',
  backgroundColor:colors.primary,
  alignItems:'center',
  borderTopEndRadius:5,
  borderBottomEndRadius:5

},
textWrapper:{

  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  marginHorizontal:10,
  borderRadius:5,
  height:45,
  marginVertical:10,
  backgroundColor:'#F5F5F50'

},
textInput:{
  fontSize:12,
  color:colors.dark,
  marginLeft:10,
  width:width-150

},
row:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  marginHorizontal:10,
  marginVertical:5
},
modal:{
 width:width-120,
 height:undefined
},
active:{
  backgroundColor:colors.primary,
  color:colors.white
},
modalContent:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
},
modalImage:{
  height:120,
  width:150,
  resizeMode:'contain',
  },
  address:{
    backgroundColor:colors.white,
    display:'flex',
    flexDirection:'row',
    paddingVertical:10
  },
  time:{
    fontWeight:'600',
    fontSize:14,
    marginTop:3
  },

  date:{
    fontWeight:'600',
    fontSize:18,
    marginTop:3
  },
  box:{
  height:45,
  width:45,
  borderRadius:5,
  backgroundColor:colors.lightSkye,
  display:'flex',
  alignItems:'center',
  justifyContent:'space-between',
  paddingVertical:5,
  marginRight:10
  },
  
  timeBox:{
    height:45,
    borderRadius:5,
    backgroundColor:colors.lightSkye,
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical:10,
    paddingHorizontal:22,
    marginRight:10
  },
  
})