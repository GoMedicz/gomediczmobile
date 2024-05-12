
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';
import { ImagesUrl, ServerUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { generateRandom, getData } from '../../components/globalFunction';

import Loader from '../../components/loader';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Verification:{
    otp:string;
  };
  Password:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Verification'>;
 const Verification =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [modalType, setModalType] = useState('load')

  const [errors, setErrors] = useState({
    otp:'',
    errorMessage:''
  });

  const [user, setUser] = useState({
    otpFocus:false,
    otp:'',
    newOtp:route.params.otp,
    errorMessage:''
  
  })

  const Ref:any = useRef(null);
  // The state for our timer
  const [timer, setTimer] = useState('00:00');

  
  const getTimeRemaining = (e:any) => {
    let dt:any = new Date()
    const total = Date.parse(e) - Date.parse(dt);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);

    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
        total, hours, minutes, seconds
    };
}

const startTimer = (e:any) => {
  let { total, hours, minutes, seconds } 
              = getTimeRemaining(e);
  if (total >= 0) {

      // update the timer
      // check if less than 10 then we need to 
      // add '0' at the beginning of the variable
      setTimer(
          (minutes > 9 ? minutes : '0' + minutes) + ':'
          + (seconds > 9 ? seconds : '0' + seconds)
      )
  }
}

const clearTimer = (e:any) => {
  // If you adjust it you should also need to
  // adjust the Endtime formula we are about
  // to code next    
  setTimer('00:60');

  // If you try to remove this line the 
  // updating of timer Variable will be
  // after 1000ms or 1sec
  if (Ref.current) clearInterval(Ref.current);
  const id = setInterval(() => {
      startTimer(e);
  }, 1000)
  Ref.current = id;
}



const getDeadTime = () => {
  let deadline = new Date();
  // This is where you need to adjust if 
  // you entend to add more time
  deadline.setSeconds(deadline.getSeconds() + 60);
  return deadline;
}

  
const handleReset = () => {
  clearTimer(getDeadTime());
}

const handleSubmit =()=>{
  let error = {
    ...errors,  
  }

  var errormessage = [];
let msg = 'This field is required';


if(timer==='00:00'){
  setLoading(true)
  setModalType('Failed')
  setErrors({...errors, errorMessage:'Timeout, please resend'})

  return
}


if(!user.otp){
  error.otp = msg;
   errormessage.push(msg);
}


if(user.otp.length<4){
  error.otp = msg;
   errormessage.push(msg);
}


if(user.otp!== user.newOtp){
  error.otp = msg;
   errormessage.push(msg);
}


        setErrors(error)
        if (errormessage.length===0) {

//navigate to password       
    navigation.navigate('Password'); 

          }
}


useEffect(() => {
  clearTimer(getDeadTime());
}, []);

  const handleChange =(name:string, text:string)=>{
    text = text.replace(/[^0-9]/g, "").substring(0, 4)
    setUser({...user, [name]:text})
    setErrors({...errors, [name]:'', errorMessage:''})
  }


const handleBack =()=>{
  navigation.goBack();
}



const handleResend =async()=>{
  let error = {
    ...errors,  
  }

  var errormessage = [];
let msg = 'This field is required';

if(timer!=='00:00'){
  error.otp = msg;
   errormessage.push(msg);
   
}

        setErrors(error)
        if (errormessage.length===0) {

//setLoading(true)
let fd:any  = await getData('register');


const data  = JSON.parse(fd);
const telephone =  data.telephone; 

let otp = generateRandom(4)

setUser({...user, newOtp:otp})

    let url = ServerUrl+'/api/vendor/otp';
  
    clearTimer(getDeadTime());
   /* axios.post(url, fd, config)
   .then(response =>{
    
     if(response.data.type === 'success'){
      //send otp here
     storeData('register', JSON.stringify(fd)) 
      setLoading(false)
         navigation.navigate('Verification', {
          otp:user.otp
         });  

               } else{
                 //unable to create account please retry
            
                 setModalType('Failed')
                 setUser({...user, errorMessage: response.data.message})
               }   
           })
           .catch((error)=>{
            setModalType('Failed')
            setUser({...user, errorMessage:error.message})
           }) */
          }
}



  return (<SafeAreaView style={[ {flex:1, backgroundColor:colors.white}]}>
    

    <View style={styles.header}>

    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={14} color={colors.dark}  /> 

    <Text style={styles.label}>Phone Verification</Text>
    <View />
    </View>


    <Loader 
    isModalVisible={loading} 
    type={modalType}
    message={errors.errorMessage} 
    action={()=>setLoading(false)}
     />


<View style={styles.infoWrapper}>
    <Text style={styles.infoText}>We've sent an OTP verification code</Text>
    <Text style={styles.infoText}>on your given number.</Text>
    </View>


    <View style={[styles.textWrapper, errors.otp?globalStyles.error:[]]}>
  <TextInput placeholder='OTP' 
  placeholderTextColor={'#959595'}
  style={styles.textInput}
  keyboardType='number-pad' 
  autoFocus={true}
  autoCorrect={false}
value={user.otp}
onChangeText={text=>handleChange('otp', text)}
  
  />
</View>




<TouchableOpacity onPress={handleSubmit} activeOpacity={0.9} style={globalStyles.button}>
  <Text style={globalStyles.buttonText}>Submit ({user.newOtp})</Text>
</TouchableOpacity>




<View style={styles.contentWrapper}>
<Text style={styles.label}>{timer} min left</Text>

<Pressable onPress={handleResend}>
<Text style={styles.label}>RESEND</Text></Pressable>
</View>


    </SafeAreaView>
  )
}


export default Verification

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    marginTop:20,
    marginHorizontal:20
  },
  label:{
    fontWeight:'600',
    fontSize:14,
  },
  infoWrapper:{
    width:width,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:50
  },
  infoText:{
    fontSize:12,
    color:'#9E9E9E',
    fontWeight:'500'

  },
contentWrapper:{
  width:width-40,
  display:'flex',
  justifyContent:'space-between',
  flexDirection:'row',
  alignItems:'center',
  marginHorizontal:20,
  marginTop:20
  
},
 

textWrapper:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  width:width-40,
  height:50,
  paddingHorizontal:10,
  marginHorizontal:20,
  backgroundColor:'#F4F8FB',
  borderRadius:5,
  marginBottom:20
},

textInput:{
fontWeight:'600',
color:colors.dark,
fontSize:14,
letterSpacing:5
},


  
})