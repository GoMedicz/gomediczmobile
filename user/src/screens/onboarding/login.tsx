/* import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import colors from '../../assets/color'
import { config, ImagesUrl, ServerUrl, storeData } from '../../components/includes'
import axios from 'axios'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Loader from '../../components/loader';


const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );


type RootStackParamList = {
   Login: undefined;
   Register:undefined; 
   BottomTabs:{
    code:string;
  }
  };
  
  type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ route, navigation }:Props) => {

const [user, setUser] = useState({
  passwordFocus:false,
  emailFocus:false,
  isSecure:true,
  email:'',
  password:'',
  isRemember:false,

})
const [errors, setErrors] = useState({
  email:'',
  password:'',
  errorMessage:''
});

const handleFocus =(name:string)=>{
  setUser({...user, [name]:true})
}

const handleBlur =(name:string)=>{
  setUser({...user, [name]:false})
}

const [modalType, setModalType] = useState('load')
  const [loading, setLoading] = useState(false)




const handleChange =(name:string, text:string)=>{
  if(name==='telephone'){
    text = text.replace(/[^0-9]/g, "").substring(0, 10)
  }
  setUser({...user, [name]:text})
  setErrors({...errors, [name]:'', errorMessage:''})
}


let emailAddress = user.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

const handleLogin =()=>{
  let error = {
    email:'', 
    password:'',  
    errorMessage:'',
  }

  var errormessage = [];
let msg = 'This field is required';


        if(!emailAddress){
            error.email = 'Enter valid email address'
          errormessage.push('Enter valid email address');
        }

        if(!user.password){
          error.password = "Please enter password.";
           errormessage.push('Please enter password.');
       }

        setErrors(error)
        if (errormessage.length===0) {

setLoading(true)


var fd = {  
  email:user.email,
  password:user.password,
  }

let url = ServerUrl+'/login';
   axios.post(url, fd, config)
   .then(response =>{
     if(response.data.status === 200){
      setLoading(false)
       storeData('jwt', response.data.jwt)
        storeData('code', response.data.code)

        navigation.navigate('BottomTabs', {
          code:response.data.code,
        }); 
               } else if(response.data.status === 401){
                 //unable to create account please retry
                 setLoading(false)
          setErrors({...errors, password: response.data.message})
               }   
           })
           .catch((error)=>{
           setErrors({...errors, errorMessage:error.message})
           setLoading(false)
           }).finally(()=>{
            setUser({
              passwordFocus:false,
              emailFocus:false,
              isSecure:true,
              email:'',
              password:'',
              isRemember:false,
            })
           })
          }
}


const homeAction =()=>{

}

useEffect(() => {
 // check if there is existence login
}, [])

  return (<SafeAreaView style={{flex:1, backgroundColor:colors.white}}>
    <ScrollView>
     
     
<Loader isModalVisible={loading} type={modalType} action={homeAction} />
     <View style={[styles.flexCenter,{marginTop:30}]}>
      <Image source={{ uri:ImagesUrl+"/logo.png" }} style={styles.logo} />
       <Text style={styles.title}>Sign in to your account</Text>
      </View>


      <View style={[styles.textWrapper, user.emailFocus?{borderColor:colors.black} :[] ]}>
        <MaterialIcon name="mail-outline" size={25}  color={colors.grey1Opacity} /> 
          <TextInput 
           placeholder='Email here'
           autoCapitalize='none'
            keyboardType='email-address' 
             autoFocus={true}
             autoCorrect={false}
           style={styles.textInput} 
           value={user.email}
           onChangeText={text=>handleChange('email', text)}
           onBlur={()=>handleBlur('emailFocus')}
           onFocus={()=>handleFocus('emailFocus')}
           />
        </View>
        {errors.email? <Text style={{color:colors.red, marginLeft:20, marginTop:2}}>{errors.email}</Text>:[]}


        <View style={[styles.textWrapper, user.passwordFocus?{borderColor:colors.black} :[] ]}>
        <MaterialIcon name="lock-outline" size={25}  color={colors.grey1Opacity}  />  
          <TextInput 
           placeholder='Password'
           autoCapitalize='none'
           keyboardType='email-address' 
            secureTextEntry={user.isSecure}
            autoCorrect={false}
            value={user.password}
            onChangeText={text =>handleChange('password', text)}
           style={[styles.textInput, {width:width-120}]}
           onBlur={()=>handleBlur('passwordFocus')}
           onFocus={()=>handleFocus('passwordFocus')}
           />

        <MaterialIcon 
        name={user.isSecure?'visibility-off':'visibility'} 
        onPress={()=>setUser({...user, isSecure:!user.isSecure})} 
        size={25}  color={colors.grey1Opacity}  />  
        </View> 

       {errors.password? <Text style={{color:colors.red, marginLeft:20, marginTop:2}}>{errors.password}</Text>:[]}



          <View style={styles.container}>
            <Pressable onPress={()=>setUser({...user, isRemember:!user.isRemember})} style={[styles.circleWrapper, {justifyContent:user.isRemember?'flex-start':'flex-end', 
    backgroundColor:user.isRemember?colors.green:colors.black,}]}> 
            <View style={styles.innerCircle}>
            </View>
            </Pressable>
            <Text style={styles.h4}> Remember me</Text>
          </View>

          <View style={{marginTop:20}} />
<TouchableOpacity onPress={handleLogin}  activeOpacity={0.8} >
          <LinearGradient style={[styles.textWrapper, {justifyContent:'center', borderWidth:0, marginBottom:0}]} colors={['#FFD1D1', '#D2001A', '#CC3636']}> 
        
        <Text style={[styles.h3, {color:colors.white}]}> LOGIN </Text>
        </LinearGradient> 
</TouchableOpacity>

<Text style={{color:colors.red, marginLeft:20, marginTop:2}}>{errors.errorMessage}</Text>
          <View style={[styles.container, {justifyContent:'space-between'}]}>

            <View style={styles.line} />
            <Text style={[styles.h4, {marginRight:10, marginLeft:10}]}>OR</Text>
            <View style={styles.line}  />
        </View>

       

        <View style={[styles.textWrapper, {justifyContent:'center', borderColor:colors.black}]}>
          <Image source={{ uri:ImagesUrl+"/google.png" }} style={styles.icon} />
          <Text style={styles.h3}> LOGIN WITH GOOGLE</Text>
        </View>

      <View style={[styles.flexCenter,{ margin:30}]}>
        <Text style={{fontSize:15, fontWeight:'600'}}>Forgot Password?</Text>

        <View style={{marginTop:10, flexDirection:'row'}}>
          <Text style={{fontSize:16}}>Don't have an account?</Text>

          <Text style={styles.linkText} onPress={()=>navigation.navigate('Register')}>Create a new account</Text>
        </View>

      </View>

    </ScrollView>
    
</SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({

  flexCenter:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    height:100,
    width:100,
    resizeMode:'contain'
  },
  h3:{
    fontSize:16,
    fontWeight:'600',
    marginLeft:10,
  },
  title:{
    fontSize:25,
    fontWeight:'600',
    marginTop:10,
    marginBottom:30,
  },
  textWrapper:{
    width:width-40,
    height:50,
    borderRadius:10,
    borderWidth:1.5,
   borderStyle:'solid',
   marginHorizontal:20,
    marginTop:15,

    display:'flex',
    flexDirection:'row',
   alignItems:'center',
   padding:10,
   borderColor:colors.grey1Opacity

  },
  textInput:{
    marginLeft:10,
    width:width-100,
    fontSize:18,
    fontWeight:'500'
  },

  container:{
    marginTop:20,
    marginHorizontal:20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center'


  },
  circleWrapper:{
    width:40,
    height:22,
    borderRadius:20,
    opacity:0.8,
    display:'flex',
    flexDirection:'row',
   padding:2,
   alignItems:'center'


  },
  innerCircle:{
    height:18,
    borderRadius:20,
    width:20,
    backgroundColor:colors.white,

  },
  h4:{
    fontSize:18,
    color:colors.grey2
  },
  line:{
    flex:1/2,
    height:1,
    backgroundColor:colors.grey2,

  },
  icon:{
    height:30,
    width:30,
    resizeMode:'contain'
  },
  linkText:{
    fontSize:16,
    color:colors.green,
    marginLeft:2,
   textDecorationLine:'underline',

  }

}) */