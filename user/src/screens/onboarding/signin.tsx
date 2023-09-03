
import React, { useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import axios from 'axios';
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { ImagesUrl, ServerUrl, config } from '../../components/includes';
import { getData, storeData } from '../../components/globalFunction';
import { globalStyles } from '../../components/globalStyle';
import Loader from '../../components/loader';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  SignIn: undefined;
  Orders:undefined;
  Register:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
 const SignIn =({ route, navigation }:Props)=> {

  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}


const [modalType, setModalType] = useState('load')
  const [loading, setLoading] = useState(false)
const [user, setUser] = useState({
  passwordFocus:false,
  telephoneFocus:false,
  isSecure:true,
  telephone:'',
  password:'',

})


const [errors, setErrors] = useState({
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
    password:'', 
    telephone:'',  
    errorMessage:'',
  }

  var errormessage = [];
let msg = 'This field is required';

if(!user.telephone){
  error.telephone = "Please enter password.";
   errormessage.push('Please enter password.');
}

        if(!user.password){
          error.password = "Please enter password.";
           errormessage.push('Please enter password.');
       }

        setErrors(error)
        if (errormessage.length===0) {

setLoading(true)


const fd = new FormData();
Object.entries(user).forEach(([key, value]) => {
        fd.append(key, value);
    });

    let url = ServerUrl+'/api/login_vendor';
   axios.post(url, fd, config)
   .then(response =>{
    setLoading(false)

     if(response.data.type === 'success'){

      storeData('jwt', response.data.jwt)
      storeData('code', response.data.code)

         navigation.navigate('Orders');  
               } else{
                 //unable to create account please retry
                 setUser({...user, passwordFocus:true})
          setErrors({...errors, errorMessage: response.data.message, password:response.data.message})
               }   
           })
           .catch((error)=>{
           setErrors({...errors, errorMessage:error.message})
           setLoading(false)
           }).finally(()=>{
            setUser({...user,
              passwordFocus:false,
              telephoneFocus:false,
              isSecure:true,
              password:'',
            })
           })
          }
}

const handleRegister =()=>{
  navigation.navigate('Register'); 
}

  return (<View style={{backgroundColor:'#F4F8Fb', flex:1}}>
    <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={'light-content'}
        showHideTransition={'slide'}
        hidden={false}
      />


    <Loader isModalVisible={loading} 
    type={modalType}
    action={()=>setLoading(false)}
     />


    <ScrollView 
    showsVerticalScrollIndicator={false}
    >


<View style={{backgroundColor:colors.primary, height:(height/2)+60}}>

    <View style={styles.logoWrapper}>
    <Image source={{ uri:ImagesUrl+"/logo3.png" }} style={styles.logo} />
    <Text style={styles.label}>go<Text style={{fontWeight:'800', fontFamily:'arial'}}>Medicz </Text></Text>

  <Text style={[styles.buttonText, {color:colors.navyBlue, fontSize:12, marginVertical:5, letterSpacing:1}]}></Text>
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


<View style={[styles.textWrapper, {marginTop:10}, errors.password?globalStyles.error:[]]}>
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
</View>

<TouchableOpacity onPress={handleRegister} activeOpacity={0.9} style={styles.button}>
  <Text style={styles.buttonText}>Continue</Text>
</TouchableOpacity>
</View> 


<View style={[styles.loginWrapper, {marginVertical:5}]}>
<Text style={{fontSize:12, fontWeight:'600'}}>OR </Text>
</View>


<View style={styles.socialWrapper}>

  <View style={styles.gmail}>

  <Image source={{ uri:ImagesUrl+"/icons/google.png" }} style={styles.icon} />


<Text style={{fontSize:15, marginLeft:15, fontWeight:'600', color:colors.grey}}>Continue with Google</Text>

</View>
</View>

<View style={[styles.loginWrapper]}>
<Text style={{fontSize:10, fontWeight:'600', color:colors.primary}}>Skip Login</Text>
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
  height:45,
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
  height:45,
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
fontSize:12
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
  height:45,
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