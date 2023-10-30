
import React, { useCallback, useState, useRef, useEffect } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, TextInput, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { PrimaryButton } from '../../components/include/button';
import { ImagesUrl, ServerUrl, configJSON, configToken } from '../../components/includes';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';
import { globalStyles } from '../../components/globalStyle';
import { getData } from '../../components/globalFunction';
import Loader from '../../components/loader';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Contact: undefined;
    Welcome:undefined; 
    BottomTabs:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Contact'>;
 const Contact =({ route, navigation }:Props)=> {


  const [loading, setLoading] = useState(false)
  const [modalType, setModalType] = useState('load')
  const fadeValue = useRef(new Animated.Value(0)).current 
  const [profile, setProfile] = useState({} as any)
  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE)
  const [message, setMessage] = useState({
    content:'',
    email:''
  })

  const [errors, setErrors] = useState({
    content:'',
    email:'',
    errorMessage:''
  })

const handleBack =()=>{
 
  navigation.navigate('BottomTabs');
}

const AnimationStart =()=>{
  const config:any ={
    toValue:1,
    duration:1000,
    useNativeDriver: true
  }
  Animated.timing(fadeValue, config).start()

}
const fetchProfile = async()=>{

  const code = await getData('code');
  let url = ServerUrl+'/api/doctor/profile/'+code
  try{
let config = await configToken()
 await axios.get(url, config).then(response=>{
  if(response.data.statusCode===200){
    setProfile(response.data.data)
    }else{
      setProfile([])
    }
  }) 
}catch(e){
  console.log('error:',e)
}
}

const handleChange =(name:string, text:string)=>{
  
  setMessage({...message, [name]:text.slice(0,300)})
  setErrors({...errors, [name]:'', errorMessage:''})
}



const handleSubmit =async()=>{
  let error = {
    ...errors,  
  }

  var errormessage = [];
let msg = 'This field is required';

if(!message.content){
  error.content = msg;
   errormessage.push(msg);
}


        setErrors(error)
        if (errormessage.length===0) {

setLoading(true)

const fd = {
  message:message.content,
  email:profile.email,
  user_code:profile.code
}
let url = ServerUrl+'/api/general/contact';

let configj = await configJSON()
axios.post(url, fd, configj)
   .then(response =>{
    
    if(response.data.type ==='success'){
        
      setModalType('Updated')
      setErrors({...errors, errorMessage:'Message sent, please do not resend'})
    } else{
      setModalType('Failed')
      setErrors({...errors, errorMessage: response.data.message})
      
               }   
           })
           .catch((error)=>{
            setModalType('Failed')
            setErrors({...errors, errorMessage: error.message})
           }) 
          }
}

useEffect(()=>{
  fetchProfile()
  AnimationStart()
}, [])

  return (<SafeAreaView style={{flex:1, backgroundColor:MODE==='Light'?colors.white:colors.dark}}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="menu"  onPress={handleBack} size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
    <Text style={dynamicStyle.label}>Support</Text>
    
    <View/>
    </View>


    <Loader 
    isModalVisible={loading} 
    type={modalType}
    message={errors.errorMessage} 
    action={()=>setLoading(false)}
     />


<ScrollView>
<Animated.View style={{opacity:fadeValue}}>
<View style={{paddingHorizontal:10}}>
  <Text style={[styles.h1, {color:MODE==='Light'?colors.dark:colors.white}]}>How may we</Text>
  <Text style={[styles.h1, {color:MODE==='Light'?colors.dark:colors.white}]}>help you?</Text>
  <Text style={[dynamicStyle.label, {marginTop:20, color:colors.grey}]}>Let us know yours queries & feedbacks</Text>
</View></Animated.View>



<Animated.View style={{opacity:fadeValue}}>
<View style={{marginVertical:50}}>
<View style={[styles.inputWrapper, {
    backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>

<MaterialIcon name="mail" size={14} color={colors.icon}  /> 
  <TextInput 
  placeholder='Email Address'
  placeholderTextColor={colors.grey}
  style={[styles.inputText,{
    color:MODE==='Light'?colors.dark:colors.white} ]}
  value={profile.email}
    editable={false}
  />
</View>



<View style={[styles.textAreaWrapper, errors.content?globalStyles.error:[],{
    backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>

<TextInput 

placeholder='Write your message'
multiline={true}
numberOfLines={20}
style={[styles.textArea, {
  color:MODE==='Light'?colors.dark:colors.white}]}
placeholderTextColor={colors.grey}
autoCapitalize='none'
  keyboardType='email-address' 
   autoCorrect={false}
   value={message.content}
   onChangeText={text =>handleChange('content', text)}
/>

<View style={{width: width-50, display:'flex', justifyContent:'flex-end', alignItems:'flex-end' }}>
<Text style={{marginTop:10, fontSize:12, color:colors.grey}}>{message.content.length}/300</Text>
</View>

</View>


<PrimaryButton
title='Submit'
handleAction={handleSubmit}
style={{width:width-20, marginHorizontal:10, borderRadius:5, marginVertical:80}}

/>





</View>
</Animated.View>


</ScrollView>
    
    </SafeAreaView>
  )
}

export default Contact

const styles = StyleSheet.create({
 
  textAreaWrapper:{
    width:width-20,
    marginHorizontal:10,
    borderRadius:5,
    padding:10,
    height:150,
    marginTop:10,
    display:'flex',
    flexDirection:'column',
    
  },
  textArea:{
   fontSize:12,
   fontWeight:'500',
   height:110,
  },
  h1:{
    fontSize:20,
    fontWeight:'700'
  },
  inputText:{
    width:width-50,
    marginLeft:10

  },
  inputWrapper:{
    width:width-20,
    flexDirection:'row',
    display:'flex',
    marginHorizontal:10,
    height:45,
    borderRadius:5,
    alignItems:'center',
    padding:10,


  },
 
})