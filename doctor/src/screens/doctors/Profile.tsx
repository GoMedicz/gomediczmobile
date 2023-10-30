
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, TextInput, Animated, Pressable } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';
import { ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { PrimaryButton } from '../../components/include/button';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';
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
  Profile: undefined;
  AccountProfile:undefined; 
  BottomTabs:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

 const Profile =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)
  const [servicesAt, setServicesAt]= useState([] as any)
  const [services, setServices]= useState([] as any)
  const [specification, setSpecification]= useState([] as any)
  const [modalType, setModalType] = useState('load')
  const fadeValue = useRef(new Animated.Value(0)).current 
  const [profile, setProfile] = useState({} as any)
  
  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE);
  const [errors, setErrors] = useState({
    fullName:'',
    about:'',
    fees:'',
    location:'',
    experience:'',
    errorMessage:''
  });
  const [image, setImage] = useState({
    uri:'',
    type:'',
     name:''
  })


const handleBack =()=>{
  navigation.navigate('BottomTabs');
}


const openImagePicker = async() => {
  const options:any = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

 await launchImageLibrary(options, (response) => {
    if (response.didCancel) {
     // console.log('User cancelled image picker');
    } else if (response.errorCode) {
     // console.log('Image picker error: ', response.errorMessage);
    } else {
      let imageUri:any =  response.assets?.[0]?.uri;
      let type:any = response.assets?.[0]?.type
      let filename:any = response.assets?.[0]?.fileName

      setImage({
        uri:imageUri,
        name:filename,
        type:type

      })
    }
  });

};

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
    


const AnimationStart =()=>{
  const config:any ={
    toValue:1,
    duration:1000,
    useNativeDriver: true
  }
  Animated.timing(fadeValue, config).start()

}





const handleSubmit =async()=>{
       
  let error = {...errors}; 
let formIsValid = true;

let msg ='This field is required';

if(!profile.fullName){
  error.fullName = msg;
    formIsValid = false;
} 

if(!profile.about){
  error.about = msg;
    formIsValid = false;
}   

if(!profile.experience){
  error.experience = msg;
    formIsValid = false;
} 

if(!profile.fees){
  error.fees = msg;
    formIsValid = false;
} 


const newService = servicesAt.map((data:any)=>{
  if(data.location===''){
    error.location= 'Please enter location';
    formIsValid = false;
      };
})

if(!formIsValid){
  setErrors(error) 
  }

if(formIsValid) {

  setLoading(true)
  setModalType('load')
  const fd = new FormData();
  Object.entries(profile).forEach(([key, value]) => {
          fd.append(key, String(value));
      });

      if(image.uri!==''){
        fd.append('profilePicture',  image)
      } 
  let url = ServerUrl+'/api/update/doctor/profile';
  let config = await configToken()



     axios.post(url, fd, config)
     .then(response =>{
      console.log(response.data)
      if(response.data.statusCode === 200){
        
        setModalType('Updated')
        setErrors({...errors, errorMessage:'Record updated'})
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


const handleChange =(name:string, text:string)=>{
  if(name==='fees'){
    text = text.replace(/[^0-9]/g, "")
  }
  setProfile({...profile, [name]:text})
  setErrors({...errors, [name]:'', errorMessage:''})
}

 


const createNewRow =()=>{
  setServicesAt(servicesAt.concat({location:'', code:Math.random().toString(36).substring(2, 9)}))

}


const removeRow=()=>{

if(services.length!==1){
  let item = servicesAt.splice(0, servicesAt.length-1)
  setServicesAt(item)
  }
 }


 const handleChangeService =(name:string, code:string, text:string)=>{

  const newServices = servicesAt.map((data:any)=>{
      if(data.code === code){
          return {...data, 
              [name]:text
          }
          };
          return data;
  })

  setServicesAt(newServices)
  setErrors({...errors, [name]:''})
}

useEffect(()=>{
  fetchProfile()
  AnimationStart()
}, [])


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    fetchProfile()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark,}]}>
    
    <View style={dynamicStyle.header}>

    <MaterialIcon name="arrow-back" onPress={handleBack} size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 

   <Text style={dynamicStyle.label}>My Profile</Text>
<View />
    </View>

    <Loader 
    isModalVisible={loading} 
    type={modalType}
    message={errors.errorMessage} 
    action={()=>setLoading(false)}
     />



<ScrollView>



<Animated.View style={{opacity:fadeValue}}>
<View style={{display:'flex', flexDirection:'row', alignItems:'flex-end',  backgroundColor:MODE==='Light'?colors.white:colors.dark,  paddingVertical:15}}>
  
<Image source={{ uri: image.uri?image.uri:profile.profilePicture?ImagesUrl+"/doctors/profile/"+profile.profilePicture:ImagesUrl+"/no.png"}} style={globalStyles.profile} />


<TouchableOpacity onPress={openImagePicker} activeOpacity={0.6} style={{ display:'flex', justifyContent:'flex-start', alignItems:'flex-start'}}>

<View style={styles.circle}>
<MaterialIcon name="photo-camera" size={14} color={MODE==='Light'?colors.white:colors.dark}  /> 
</View>

<Text style={[dynamicStyle.label, { color:colors.primary, fontWeight:'700'}]}>Change Profile Picture</Text>


</TouchableOpacity>
</View>

</Animated.View>

<View style={dynamicStyle.cards}>


<View style={[dynamicStyle.textWrapper, errors.fullName?globalStyles.error:[]]}>
<MaterialIcon name="account-circle" size={15} color={colors.icon}  /> 
  <TextInput style={dynamicStyle.textInput} 
  placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='Full Name'
  value={profile.fullName}

  autoCapitalize='none'
  keyboardType='email-address' 
   autoCorrect={false}
onChangeText={text=>handleChange('fullName', text)}
  />

</View>



<View style={[dynamicStyle.textWrapper]}>
<MaterialIcon name="phone-iphone" size={15} color={colors.icon}  /> 
  <TextInput style={dynamicStyle.textInput} 
  placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='1987 654 3210'
  value={profile.phoneNumber}
  editable={false}

  autoCapitalize='none'
  keyboardType='email-address' 
   autoCorrect={false}
onChangeText={text=>handleChange('phoneNumber', text)}
  />

</View>


<View style={dynamicStyle.textWrapper}>
<MaterialIcon name="mail" size={15} color={colors.icon}  /> 
  <TextInput style={dynamicStyle.textInput} 
  placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='Email Address'
  value={profile.email}
  editable={false}
  />

</View>

</View>


<View style={dynamicStyle.cards}>
  <Text style={[styles.infoText, {marginLeft:10}]}>About</Text>

<View style={[ errors.about?globalStyles.error:[]]}>

  <TextInput
  multiline={true}
  style={[dynamicStyle.label,dynamicStyle.about, {fontWeight:'500'}]}
  autoCapitalize='none'
  keyboardType='email-address' 
   autoCorrect={false}
onChangeText={text=>handleChange('about', text)}
placeholderTextColor={'#959595'}
  >{profile.about}</TextInput>

</View>

</View>




<View style={dynamicStyle.cards}>
  <View style={[globalStyles.rowCenterBetween, {marginHorizontal:10}]}>
  <Text style={[styles.infoText]}>Service at</Text>

  <TouchableOpacity activeOpacity={0.6} onPress={createNewRow}>

<View style={styles.row}>
  {servicesAt.length>1?<Pressable onPress={removeRow}>
  <Text style={[dynamicStyle.label, {color:colors.navyBlue, marginRight:10}]}>REMOVE</Text></Pressable>:[]}
  <Pressable onPress={createNewRow}>
  <Text style={[dynamicStyle.label, {color:colors.navyBlue}]}>ADD</Text></Pressable>
</View>
</TouchableOpacity>


  </View>


  
  {servicesAt&&servicesAt.map((item:any, index:number)=>
  <View key={index} style={[dynamicStyle.textWrapper, {marginVertical:5}, errors.location?globalStyles.error:[]]}>
  <TextInput style={dynamicStyle.textInput} 
  placeholderTextColor={'#959595'}
  placeholder='Apple Hospital, Wallington, New York'

  keyboardType='email-address'
  autoCapitalize='none' 
   autoFocus={true}
   autoCorrect={false}
  onChangeText={text=>handleChangeService('location', item.code, text)}

  />

<MaterialIcon name="calendar-today" size={15} color={colors.icon} style={{marginRight:10}}  /> 
</View>)}


</View>





<View style={dynamicStyle.cards}>
  <View style={[globalStyles.rowCenterBetween, {marginHorizontal:10}]}>
  <Text style={[styles.infoText]}>Experience & Consultation Fees</Text>
  </View>



  <View style={[dynamicStyle.textWrapper,{marginVertical:5}, errors.experience?globalStyles.error:[]]}>

<MaterialIcon name="calendar-today" size={15} color={colors.icon}   /> 

  <TextInput style={dynamicStyle.textInput} 
  placeholder='e.g 18 years'

  placeholderTextColor={'#959595'}
  value={profile.experience}
  autoCapitalize='none'
  keyboardType='email-address' 
   autoCorrect={false}
onChangeText={text=>handleChange('experience', text)}
  />

</View>


<View style={[dynamicStyle.textWrapper,{marginVertical:5}, errors.fees?globalStyles.error:[]]}>

<MaterialIcon name="wallet" size={15} color={colors.icon}  /> 

  <TextInput style={dynamicStyle.textInput} 
   placeholderTextColor={'#959595'}
  placeholder='e.g 2800'
  value={profile.fees}
  autoCapitalize='none'
  keyboardType='email-address' 
   autoCorrect={false}
onChangeText={text=>handleChange('fees', text)}
  />

</View>


</View>



<View style={dynamicStyle.cards}>
  
<View style={[globalStyles.rowCenterBetween, {marginHorizontal:10}]}>
<Text style={styles.infoText}>Services</Text>
<Text style={[dynamicStyle.label, {color:colors.navyBlue}]}>EDIT</Text>
</View>


<View style={{marginTop:10, marginHorizontal:10}}>

{services&&services.map((item:any, index:number)=>
<Text style={dynamicStyle.h3} key={index}>{item.title}</Text>)}
</View>

<View>
  <Text style={[dynamicStyle.label, {color:colors.navyBlue, marginVertical:10, marginHorizontal:10}]}>+5 More</Text>
</View>

</View>


<View style={dynamicStyle.cards}>
  
<View style={[globalStyles.rowCenterBetween, {marginHorizontal:10}]}>
<Text style={styles.infoText}>Specifications</Text>
<Text style={[dynamicStyle.label, {color:colors.navyBlue}]}>EDIT</Text>
</View>


<View style={{marginTop:10, marginHorizontal:10}}>
{specification&&specification.map((item:any, index:number)=>
<Text style={dynamicStyle.h3} key={index}>{item.title}</Text>)
 }
</View>

<View>
  <Text style={[dynamicStyle.label, {color:colors.navyBlue, marginVertical:10, marginHorizontal:10}]}>+1 More</Text>
</View>

</View>
</ScrollView>

<View>
  <PrimaryButton
  handleAction={handleSubmit}
  title='Update'
  />
</View>
    </View>
  )
}


export default Profile

const styles = StyleSheet.create({


  infoText:{
    fontSize:12,
    color:'#9E9E9E',
    fontWeight:'500'

  },


  row:{
    display:'flex',
    flexDirection:'row',
    padding:10,
    justifyContent:'space-between'
  },
  title:{
    fontSize:20,
    fontWeight:'600',
    color:colors.dark,

  },
  hospital:{
paddingVertical:10,
display:'flex',
justifyContent:'space-between',
alignItems:'center',
flexDirection:'row'
  },

  box:{
    backgroundColor:colors.white,
    width:(width/2)-15,
    padding:10,
    marginVertical:5,
    borderRadius:5

  },
  circle:{
    height:25,
    width:25,
    borderRadius:15,
    backgroundColor:colors.primary,
    marginBottom:10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },

 
  
 
})