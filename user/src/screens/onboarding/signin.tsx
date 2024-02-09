
import React, { useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import axios from 'axios';
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { ImagesUrl, ServerUrl, config } from '../../components/includes';
import Loader from '../../components/loader';
import { getData, storeData } from '../../components/globalFunction';
import { globalStyles } from '../../components/globalStyle';
import ErrorModal from '../../components/errorModal';


const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  SignIn: undefined;
  Register:{
    telephone:string;
  }
  BottomTabs:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
 const SignIn =({ route, navigation }:Props)=> {



const [modalType, setModalType] = useState('load')
  const [loading, setLoading] = useState(false)


const [user, setUser] = useState({
  passwordFocus:false,
  telephoneFocus:false,
  isPassword:false,
  isSecure:true,
  telephone:'',
  password:'',
  errorMessage:''

})


const [errors, setErrors] = useState({

  isError:false,
  telephone:'',
  password:'',
  errorMessage:''
});

const handleFocus =(name:string)=>{
  setUser({...user, [name]:true})
}

const handleBlur =(name:string)=>{
  setUser({...user, [name]:false})
}



const handleChange =(name:string, text:string)=>{
  if(name==='telephone'){
    text = text.replace(/[^0-9]/g, "").substring(0, 11)
  }
  setUser({...user, [name]:text})
  setErrors({...errors, [name]:'', errorMessage:''})
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


        if(!user.password){
          error.password = "Please enter password.";
           errormessage.push('Please enter password.');
       } 

        setErrors(error)
        if (errormessage.length===0) {

setLoading(true)


    const fd  ={
      telephone:user.telephone,
      password:user.password
    }
    let url = ServerUrl+'/api/user/login';
   axios.post(url, fd, config)
   .then(response =>{
     if(response.data.type === 'success'){

      setLoading(false)
      storeData('jwt', response.data.jwt)
      storeData('code', response.data.code)
      storeData('wallet', response.data.wallet)
         navigation.navigate('BottomTabs');  
               } else{
                 //unable to create account please retry
                
                 setModalType('Failed')
          setUser({...user,  errorMessage: response.data.message, passwordFocus:true})
               }   
           })
           .catch((error)=>{
            setModalType('Failed')
            setUser({...user,  errorMessage:error.message})
           
           })
          }
}






const handleContinue =()=>{

  let error = {
    ...errors 
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

        setErrors(error)
        if (errormessage.length===0){

setLoading(true)


var fd = {      
  field:'telephone',
  data:user.telephone
}
let url = ServerUrl+'/api/user/verification';


   axios.post(url, fd, config)
   .then(response =>{

     if(response.data.type === 'success'){
      setLoading(false)
      setUser({...user, passwordFocus:true, isPassword:true})
      
               } else if(response.data.type === 'info'){
                setLoading(false)
                navigation.navigate('Register', {
                  telephone:user.telephone
                }); 
               } else{
                  setModalType('Failed')
                setUser({...user, errorMessage: response.data.message})
                
               }  
           })
           .catch((error)=>{
            setModalType('Failed')
           setUser({...user, errorMessage:error.message})
            
           })
          }
}



  return (<View style={{backgroundColor:'#F4F8Fb', flex:1}}>
    <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={'light-content'}
        showHideTransition={'slide'}
        hidden={false}
      />

    <Loader 
    isModalVisible={loading} 
    type={modalType}
    message={user.errorMessage} 
    action={()=>setLoading(false)}
     />

    <ScrollView 
    showsVerticalScrollIndicator={false}
    >

<View style={{backgroundColor:colors.primary, height:(height/2)+60}}>

    <View style={styles.logoWrapper}>
    <Image source={{ uri:ImagesUrl+"/logo3.png" }} style={styles.logo} />
    <Text style={styles.label}>go<Text style={{fontWeight:'800', fontFamily:'arial'}}>Medicz </Text></Text>

 {/*  <Text style={[styles.buttonText, {color:colors.navyBlue, fontSize:12, marginVertical:5, letterSpacing:1}]}>VENDOR</Text> */}
    </View>
   
<View style={styles.row}>
  <Image source={{ uri:ImagesUrl+"/reception.png" }} style={styles.doctorLogo} /> 
  </View>
  </View>



<View style={[styles.loginWrapper]}>

<View style={[styles.textWrapper, errors.telephone?globalStyles.error:[]]}>
<MaterialIcon name="phone-iphone" size={18} color={colors.icon}  /> 
  <TextInput placeholder='Enter Mobile Number' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} 
  
  keyboardType='number-pad' 
  autoFocus={true}
  autoCorrect={false}
value={user.telephone}
onChangeText={text=>handleChange('telephone', text)}
onBlur={()=>handleBlur('telephoneFocus')}
onFocus={()=>handleFocus('telephoneFocus')}
  
  />
</View>


{user.isPassword?<View style={[styles.textWrapper, {marginTop:10}, errors.password?globalStyles.error:[]]}>
<MaterialIcon name="lock" size={18} color={colors.icon}  /> 
  <TextInput placeholder='Password' 
  placeholderTextColor={'#959595'}
  style={styles.textInput}
  
  
  autoCapitalize='none'
  keyboardType='email-address' 
   secureTextEntry={user.isSecure}
   autoCorrect={false}
   value={user.password}
   onChangeText={text =>handleChange('password', text)}
  onBlur={()=>handleBlur('passwordFocus')}
  onFocus={()=>handleFocus('passwordFocus')}
  
  />


<MaterialIcon 
        name={user.isSecure?'visibility-off':'visibility'} 
        onPress={()=>setUser({...user, isSecure:!user.isSecure})} 
        size={20}  color={colors.grey} />  
</View>:[]}

{user.isPassword?

<TouchableOpacity onPress={handleSubmit} activeOpacity={0.9} style={styles.button}>
  <Text style={styles.buttonText}>Sign In</Text>
</TouchableOpacity>:


<TouchableOpacity onPress={handleContinue} activeOpacity={0.9} style={styles.button}>
  <Text style={styles.buttonText}>Continue</Text>
</TouchableOpacity>
 }


</View> 


<View style={[styles.loginWrapper, {marginVertical:15}]}>
<Text style={{fontSize:12, fontWeight:'600'}}>OR </Text>
</View>


<View style={styles.socialWrapper}>

  <View style={styles.gmail}>

  <Image source={{ uri:ImagesUrl+"/icons/google.png" }} style={styles.icon} />


<Text style={{fontSize:15, marginLeft:15, fontWeight:'600', color:colors.grey}}>Continue with Google</Text>

</View>
</View>



  </ScrollView>

    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  
 logo:{
  height:60,
  width:60,
  resizeMode:'contain'
 },

 logoWrapper:{
  width:width,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  marginTop:60,


 },
 label:{
  color:colors.white,
  fontSize:18,
  marginTop:10,
 },


 row:{
  width:width,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  marginTop:40
 },

 doctorLogo:{
  height:200,
  width:200,
 },


 loginWrapper:{
  
width:width,
display:'flex',
alignItems:'center',

 },

 button:{
  width:width-20,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  height:50,
  backgroundColor:colors.primary,
  borderRadius:5,
},



buttonText:{
  color:colors.white,
  fontWeight:'600'
},



textWrapper:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  width:width-20,
  height:50,
  paddingHorizontal:10,
  backgroundColor:colors.white,
  borderRadius:5,
  top:-20,
},

textInput:{
marginLeft:15,
width:width-90,
fontWeight:'600',
color:colors.dark,
fontSize:14
},


socialWrapper:{
  display:'flex',
  flexDirection:'row',
  marginVertical:10,
  justifyContent:'space-between',
  width:width,
  paddingHorizontal:10
},


gmail:{
  display:'flex',
  flexDirection:'row',
  height:50,
  backgroundColor:'transparent',
  borderWidth:1,
  borderColor:colors.grey1Opacity,
alignItems:'center',
justifyContent:'center',
width:width-20,
borderRadius:5,
},

icon:{
  height:10,
  width:10,
  resizeMode:'contain'
},
})