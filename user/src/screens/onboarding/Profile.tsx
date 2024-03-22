
import React, { useEffect, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, TextInput, TouchableOpacity, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { ImagesUrl,   ServerUrl,  configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { PrimaryButton } from '../../components/include/button';
import axios from 'axios';
import Loader from '../../components/loader';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';
import { getData } from '../../components/globalFunction';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Profile:undefined;

  BottomTabs:undefined;
  AccountProfile:undefined; 
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

 const Profile =({ route, navigation }:Props)=> {

  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE);
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({} as any)

  const fadeValue = useRef(new Animated.Value(0)).current 
const [errors, setErrors] = useState({
  fullname:'',
  telephone:'',
  email:'',
  errorMessage:''
});
const [modalType, setModalType] = useState('load')
const [image, setImage] = useState({
  uri:'',
  type:'',
   name:''
})

const handleNext =()=>{
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

      setProfile({...profile, image_url:profile.code+'_'+filename})
    }
  });

};


const  FetchContent = async()=>{
  setLoading(true)
  let config = await configToken()
  let code = await getData('code')
  let url = ServerUrl+'/api/user/display_one/'+code
  try{
 await axios.get(url, config).then(response=>{
    if(response.data.type==='success'){
      setProfile(response.data.data)
      AnimationStart()
    }

  }).finally(()=>{
    setLoading(false)
  }) 
}catch(e){
  console.log('error:',e)
}
}


const handleChange =(name:string, text:string)=>{
  
  setProfile({...profile, [name]:text})
  setErrors({...errors, [name]:''})
}




const handleSubmit =async()=>{
       
  let error = {...errors}; 
let formIsValid = true;

let msg ='This field is required';

if(!profile.fullname){
  error.fullname = msg;
    formIsValid = false;
} 

if(!profile.email_address){
  error.email = msg;
    formIsValid = false;
}  
   



if(!formIsValid){
  setErrors(error) 
  }


if(formIsValid) {
//setModalType('load')
  setLoading(true)
  
  const fd = new FormData();
  Object.entries(profile).forEach(([key, value]) => {
          fd.append(key, String(value));
      });
      if(image.uri!==''){
        fd.append('image',  image)
      }
  let url = ServerUrl+'/api/user/profile/update';
  let config = await configToken()
     axios.post(url, fd, config)
     .then(response =>{
       if(response.data.statusCode ===200){
        
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


useEffect(()=>{
  FetchContent()
  AnimationStart()
}, [])
    
  

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark,}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="menu" onPress={handleNext} size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
   <Text style={dynamicStyle.label}>My Profile</Text>
<View />
    </View>

    <Loader isModalVisible={loading} 
    type={modalType}
    message={errors.errorMessage} 
    action={()=>setLoading(false)}
     />

{profile&&profile?
<ScrollView>



<View style={[styles.imageWrapper,{ backgroundColor:MODE==='Light'?colors.white:colors.dark, }]}>
  
<Animated.View style={{opacity:fadeValue}}>
<Image source={{ uri: image.uri?image.uri:profile.image_url?ImagesUrl+"/users/"+profile.image_url:ImagesUrl+"/no.png"}} style={styles.profile} />
</Animated.View>

<TouchableOpacity onPress={openImagePicker} activeOpacity={0.6} style={{ display:'flex', justifyContent:'flex-start', alignItems:'flex-start'}}>

<View style={styles.circle}>
<MaterialIcon name="photo-camera" size={14} color={MODE==='Light'?colors.white:colors.dark}  /> 
</View>

<Text style={[dynamicStyle.label, { color:colors.primary, fontWeight:'700'}]}>Change Image</Text>


</TouchableOpacity>



</View>
<Animated.View style={{opacity:fadeValue}}>
<View style={[styles.card,{
     backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>


<View style={[dynamicStyle.textWrapper, errors.fullname?globalStyles.error:[]]}>

<MaterialIcon name="store" size={15} color={colors.icon}  /> 
  <TextInput style={dynamicStyle.textInput} 
  placeholder='fullname '
  placeholderTextColor={colors.grey}
  value={profile.fullname}
  autoCapitalize='none'
  keyboardType='email-address' 
   autoFocus={true}
   autoCorrect={false}
 onChangeText={text=>handleChange('fullname', text)}
  />

</View>



<View style={dynamicStyle.textWrapper}>
<MaterialIcon name="phone-iphone" size={15} color={colors.icon}  /> 
  <TextInput style={dynamicStyle.textInput}
  placeholder='telephone'
editable={false}
  placeholderTextColor={colors.grey}
  value={profile.telephone}
  autoCapitalize='none'
  keyboardType='number-pad' 
   autoFocus={true}
   autoCorrect={false}
 onChangeText={text=>handleChange('telephone', text)}
  />

</View>


<View style={dynamicStyle.textWrapper}>
<MaterialIcon name="mail" size={15} color={colors.icon}  /> 
  <TextInput style={dynamicStyle.textInput} 

  placeholderTextColor={colors.grey}
  placeholder='Email Address'
  value={profile.email}
  autoCapitalize='none'
  keyboardType='email-address' 
   autoFocus={true}
   autoCorrect={false}
 onChangeText={text=>handleChange('email_address', text)}
  />

</View>

</View>
</Animated.View>


{/* <View style={[styles.card, {marginTop:5, backgroundColor:MODE==='Light'?colors.white:colors.dark} ]}>
  
  <View style={[globalStyles.rowCenterBetween, {marginHorizontal:10, }]}>
  <Text style={[styles.infoText]}>Select Address on Map</Text>
  <MaterialIcon name="add-location" size={15} color={colors.primary}  /> 
  </View>

<View style={[dynamicStyle.about]}>

  <Text
  style={[dynamicStyle.label, {fontWeight:'500'}]}>{profile.address} </Text>

</View>

</View> */}



</ScrollView>:[]}

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

  profile:{
    width:(width/2)-20,
    marginHorizontal:10,
    height:150,
    resizeMode:'cover'
  },

  
  card:{
    display:'flex',
     padding:10, 
     width:width
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
  imageWrapper:{
    display:'flex', 
    flexDirection:'row', 
    alignItems:'flex-end',
     justifyContent:'flex-start', 
     paddingHorizontal:20, paddingVertical:5
    },
})