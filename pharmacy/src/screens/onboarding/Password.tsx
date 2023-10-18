
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
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { getData, storeData } from '../../components/globalFunction';
import Loader from '../../components/loader';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Password: undefined;
  Orders:undefined;
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Password'>;
 const Password =({ route, navigation }:Props)=> {


  const [modalType, setModalType] = useState('load')
  const [loading, setLoading] = useState(false)


const [user, setUser] = useState({
  isPasswordSecure:true,
  isConfirmSecure:true,
  confirmPassword:'',
  password:'',

})

const [errors, setErrors] = useState({

  isError:false,
  confirmPassword:'',
  password:'',
  errorMessage:''
});




const handleSubmit =async()=>{
  let error = {
    ...errors,  
  }

  var errormessage = [];
let msg = 'This field is required';

if(!user.password){
  error.password = msg;
   errormessage.push(msg);
}


if(!user.confirmPassword){
  error.confirmPassword= msg;
   errormessage.push(msg);
}


if(user.password.length<8){
  error.password = msg;
   errormessage.push(msg);
}


if(user.confirmPassword.length<8){
  error.confirmPassword = msg;
   errormessage.push(msg);
}

if(user.password!== user.confirmPassword){
  error.confirmPassword = msg;
   errormessage.push(msg);
}




        setErrors(error)
        if (errormessage.length===0) {

setLoading(true)

let data:any  = await getData('register');
const item  = JSON.parse(data);

const code =  'v'+Math.random().toString(36).substring(2, 9);

let newUser = {
  ...item,
  password:user.password,
  code:code,
  address: '',
  latitude: '',
  longitude: '',
}


    let url = ServerUrl+'/api/vendor/registration';
   axios.post(url, newUser, config)
   .then(response =>{
     if(response.data.type === 'success'){

      setLoading(false)
      storeData('jwt', response.data.jwt)
      storeData('code', code)
      storeData('wallet', response.data.wallet)

         navigation.navigate('Orders');  
               } else{
                 //unable to create account please retry
                 setModalType('Failed')
               
          setErrors({...errors,  errorMessage: response.data.message})
               }   
           })
           .catch((error)=>{
            setModalType('Failed')
            setErrors({...errors,  errorMessage: error.message})
         
           })
          }
}


const handleChange =(name:string, text:string)=>{

  setUser({...user, [name]:text})
  setErrors({...errors, [name]:'', errorMessage:''})
}

  return (<SafeAreaView style={[ {flex:1, backgroundColor:colors.white}]}>
    

    <View style={styles.header}>


    <Text style={styles.label}>Create Password</Text>
    <View />
    </View>

    <Loader 
    isModalVisible={loading} 
    type={modalType}
    message={errors.errorMessage} 
    action={()=>setLoading(false)}
     />

<View style={styles.infoWrapper}>
    <Text style={styles.infoText}>Create a unique password that</Text>
    <Text style={styles.infoText}>will be used when you sign in.</Text>
    </View>



    <Text style={[styles.infoText, {marginLeft:20, marginBottom:10, color:colors.dark}]}>Password</Text>
    <View style={[styles.textWrapper, errors.password?globalStyles.error:[]]}>
  <TextInput placeholder='*******' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} 
  
  autoCapitalize='none'
  keyboardType='email-address' 
   secureTextEntry={user.isPasswordSecure}
   autoCorrect={false}
   value={user.password}
   onChangeText={text =>handleChange('password', text)}
  />


<MaterialIcon 
        name={user.isPasswordSecure?'visibility-off':'visibility'} 
        onPress={()=>setUser({...user, isPasswordSecure:!user.isPasswordSecure})} 
        size={20}  color={colors.grey} /> 

</View>

<Text style={[styles.infoText, {marginLeft:20}]}>Must be at least 8 characters</Text>


<Text style={[styles.infoText, {marginLeft:20, marginBottom:10, marginTop:30, color:colors.dark}]}>Confirm Password</Text>

<View style={[styles.textWrapper, {marginBottom:40}, errors.confirmPassword?globalStyles.error:[]]}>

  <TextInput placeholder='*******' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} 
  
  
  autoCapitalize='none'
  keyboardType='email-address' 
   secureTextEntry={user.isConfirmSecure}
   autoCorrect={false}
   value={user.confirmPassword}
   onChangeText={text =>handleChange('confirmPassword', text)}
  
  />


<MaterialIcon 
        name={user.isConfirmSecure?'visibility-off':'visibility'} 
        onPress={()=>setUser({...user, isConfirmSecure:!user.isConfirmSecure})} 
        size={20}  color={colors.grey} /> 


</View>



<TouchableOpacity onPress={handleSubmit} activeOpacity={0.9} style={globalStyles.button}>
  <Text style={globalStyles.buttonText}>Proceed</Text>
</TouchableOpacity>


    </SafeAreaView>
  )
}


export default Password

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    marginHorizontal:20,
    height:50
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
  justifyContent:'space-between',
  alignItems:'center',
  width:width-40,
  height:50,
  paddingHorizontal:10,
  marginHorizontal:20,
  backgroundColor:'#F4F8FB',
  borderRadius:5,
  marginBottom:2
},

textInput:{
fontWeight:'600',
color:colors.dark,
width:width-90,
fontSize:14,
letterSpacing:10
},


  
})