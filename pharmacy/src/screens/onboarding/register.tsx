
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import axios from 'axios';
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';
import { ImagesUrl, ServerUrl, config } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import Loader from '../../components/loader';
import { generateRandom, storeData } from '../../components/globalFunction';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Register:{
    telephone:string;
  }
  Verification:{
    otp:string;
  }; 
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;
 const Register =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [modalType, setModalType] = useState('load')

const [user, setUser] = useState({
  telephone:route.params.telephone,
  fullnameFocus:true,
  email:'',
  fullname:'',
  isMailLoading:false,
  

})



const [errors, setErrors] = useState({
  telephone:'',
  email:'',
  fullname:'',
  errorMessage:''
})

let emailAddress = user.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

const handleChange =(name:string, text:string)=>{
  
  setUser({...user, [name]:text})
  setErrors({...errors, [name]:'', errorMessage:''})
}



const handleBack =()=>{
  navigation.goBack();
}



const ValidateExistence=()=>{
  if(user.email&&emailAddress){ 
var fd = {      
  field:'email_address',
  data:user.email
}
let url = ServerUrl+'/api/vendor/verification';
try{
setUser({...user, isMailLoading:true})
axios.post(url, fd, config).then(response=>{

if(response.data.status===200){
  setLoading(true)
  setModalType('Failed')
setErrors({...errors, email:"already register", errorMessage:user.email+" already register"})
setUser({...user, email:'', isMailLoading:false})
}else{

setUser({...user, isMailLoading:false})
}
}).finally(()=>{

})
}catch(error){

}
}
} 



    const handleFocus =(name:string)=>{
      setUser({...user, [name]:true})
    }
    
    const handleBlur =(name:string)=>{
      setUser({...user, [name]:false})
    }


const handleSubmit =()=>{
  let error = {
    ...errors,  
  }

  var errormessage = [];
let msg = 'This field is required';

if(!user.telephone){
  error.telephone = msg;
   errormessage.push(msg);
}


if(user.telephone.length<11){
  error.telephone = msg;
   errormessage.push(msg);
}


if(!emailAddress){
  error.email = msg
   errormessage.push(msg);
} 


  if(!user.fullname){
    error.fullname = msg
      errormessage.push(msg);
  } 



        setErrors(error)
        if (errormessage.length===0) {

//setLoading(true)

const fd = {
  telephone:user.telephone,
  email_address:user.email,
  store_name:user.fullname
}
let otp = generateRandom(4)

    let url = ServerUrl+'/api/vendor/otp';
   // setModalType('Failed')
    storeData('register', JSON.stringify(fd)) 
    
    navigation.navigate('Verification', {
      otp:otp
     }); 

     
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

    <MaterialIcon onPress={handleBack} name="arrow-back-ios" size={14} color={colors.dark}  /> 

    <Text style={styles.label}>Register Now</Text>
    <View />
    </View>


    <Loader 
    isModalVisible={loading} 
    type={modalType}
    message={errors.errorMessage} 
    action={()=>setLoading(false)}
     />


<View style={styles.infoWrapper}>
    <Text style={styles.infoText}>Your phone number is not registered yet.</Text>
    <Text style={styles.infoText}>Let us know basic details for registration.</Text>
    </View>


    <View style={[styles.textWrapper, errors.telephone?globalStyles.error:[]]}>
<MaterialIcon name="phone-iphone" size={18} color={colors.icon}  /> 
  <TextInput placeholder='Enter Mobile Number' 
  placeholderTextColor={'#959595'}
  style={styles.textInput}
  editable={false}
  keyboardType='number-pad' 
  autoFocus={true}
  autoCorrect={false}
value={user.telephone}
onChangeText={text=>handleChange('telephone', text)}
  
  />
</View>


<View style={[styles.textWrapper, errors.email?globalStyles.error:[]]}>
<MaterialIcon name="mail" size={18} color={colors.icon}  /> 
  <TextInput 
  placeholder='Email Address' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} 
  autoCapitalize='none'
  keyboardType='email-address' 
   autoCorrect={false}
   value={user.email}
   onBlur={ValidateExistence}
   onChangeText={text =>handleChange('email', text)}
  
  />
</View>

<View style={[styles.textWrapper, errors.fullname?globalStyles.error:[]]}>
<MaterialIcon name="house" size={18} color={colors.icon}  /> 

  <TextInput 
  placeholder='Store Name' 
  placeholderTextColor={'#959595'}
  style={styles.textInput}
  autoCapitalize='none'
  keyboardType='email-address' 
   autoCorrect={false}
   value={user.fullname}
   onBlur={()=>handleBlur('fullnameFocus')}
   onFocus={()=>handleFocus('fullnameFocus')}
   onChangeText={text =>handleChange('fullname', text)}
  
  />
</View>






<TouchableOpacity onPress={user.isMailLoading?()=>{}:handleSubmit} activeOpacity={0.9} style={[globalStyles.button, {opacity:user.isMailLoading?0.4:1} ]}>
  <Text style={globalStyles.buttonText}> {user.isMailLoading?'Please wait ..':'Continue'}</Text>
</TouchableOpacity>


<View style={styles.infoWrapper}>

<Pressable onPress={()=>navigation.goBack()} ><Text style={styles.label}> Back to sign in</Text></Pressable>

<Text style={[styles.infoText, {marginTop:60}]}>We'll send an OTP on above</Text>
    <Text style={styles.infoText}>given phone number</Text>

</View>


    </SafeAreaView>
  )
}


export default Register

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
  width:width,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
},
 

textWrapper:{
  display:'flex',
  flexDirection:'row',
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
marginLeft:15,
width:width-100,
fontWeight:'600',
color:colors.dark,
fontSize:14
},


  
})