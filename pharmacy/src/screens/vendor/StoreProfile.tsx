
import React, { useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { ImagesUrl,  PHARMACY_CODE, ServerUrl, config } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { PrimaryButton } from '../../components/include/button';
import axios from 'axios';
import Loader from '../../components/loader';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  StoreProfile:undefined;
  AccountProfile:undefined; 
   };

type Props = NativeStackScreenProps<RootStackParamList, 'StoreProfile'>;

 const StoreProfile =({ route, navigation }:Props)=> {

  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE);
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({} as any)

const [errors, setErrors] = useState({
  store_name:'',
  telephone:'',
  email_address:''
});
const [modalType, setModalType] = useState('load')

const handleNext =()=>{
  navigation.navigate('AccountProfile');
}



const fetchStore = async()=>{
  let url = ServerUrl+'/api/pharmacy/display_store/'+PHARMACY_CODE
  try{
 await axios.get(url, config).then(response=>{
  
  if(response.data.type==='success'){
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
  
  setProfile({...profile, [name]:text})
  setErrors({...errors, [name]:''})
}




const handleSubmit =()=>{
       
  let error = {...errors}; 
let formIsValid = true;

let msg ='This field is required';

if(!profile.store_name){
  error.store_name = msg;
    formIsValid = false;
} 

if(!profile.email_address){
  error.email_address = msg;
    formIsValid = false;
}  
      
if(!profile.telephone){
  error.telephone = msg;
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
  
  let url = ServerUrl+'/api/pharmacy/store/update';
     axios.post(url, fd, config)
     .then(response =>{
       if(response.data.type ==='success'){
        
        setModalType('Updated')

      } else{
                   //unable to create account please retry
                   setLoading(false)
                 }   
             })
             .catch((error)=>{
            // setErrors({...errors, errorMessage:error.message})
             setLoading(false)
             }).finally(()=>{
              setLoading(false)
             })
            }
}


useEffect(()=>{
  fetchStore()
}, [])
    
  

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark,}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="menu" onPress={handleNext} size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
   <Text style={dynamicStyle.label}>My Profile</Text>
<View />
    </View>

    <Loader isModalVisible={loading} 
    type={modalType}
    action={()=>setLoading(false)}
     />

{profile&&profile?
<ScrollView>



<View style={[styles.imageWrapper,{ backgroundColor:MODE==='Light'?colors.white:colors.dark, }]}>
  

<Image source={{ uri:ImagesUrl+"/doctors/doc1.png"}} style={styles.profile} />


<View style={{ display:'flex', justifyContent:'flex-start', alignItems:'flex-start'}}>

<View style={styles.circle}>
<MaterialIcon name="photo-camera" size={14} color={MODE==='Light'?colors.white:colors.dark}  /> 
</View>

<Text style={[dynamicStyle.label, { color:colors.primary, fontWeight:'700'}]}>Change Image</Text>


</View>



</View>

<View style={[styles.card,{
     backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>

<View style={[dynamicStyle.textWrapper]}>
<MaterialIcon name="store" size={15} color={colors.icon}  /> 
  <TextInput style={dynamicStyle.textInput} 
  placeholder='e.g Well Life Store'
  placeholderTextColor={colors.grey}
  value={profile.store_name}
  autoCapitalize='none'
  keyboardType='email-address' 
   autoFocus={true}
   autoCorrect={false}
 onChangeText={text=>handleChange('store_name', text)}
  />

</View>



<View style={dynamicStyle.textWrapper}>
<MaterialIcon name="phone-iphone" size={15} color={colors.icon}  /> 
  <TextInput style={dynamicStyle.textInput}
  placeholder='080 654 3210'

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
  value={profile.email_address}
  autoCapitalize='none'
  keyboardType='email-address' 
   autoFocus={true}
   autoCorrect={false}
 onChangeText={text=>handleChange('email_address', text)}
  />

</View>

</View>


<View style={[styles.card, {marginTop:5, backgroundColor:MODE==='Light'?colors.white:colors.dark} ]}>
  
  <View style={[globalStyles.rowCenterBetween, {marginHorizontal:10, }]}>
  <Text style={[styles.infoText]}>Select Address on Map</Text>
  <MaterialIcon name="add-location" size={15} color={colors.primary}  /> 
  </View>

<View style={[dynamicStyle.about]}>

  <Text
  style={[dynamicStyle.label, {fontWeight:'500'}]}>{profile.address} </Text>

</View>

</View>



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


export default StoreProfile

const styles = StyleSheet.create({

  infoText:{
    fontSize:12,
    color:'#9E9E9E',
    fontWeight:'500'

  },

  profile:{
    width:(width/2)-40,
    height:120,
    resizeMode:'contain'
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
      paddingTop:5,
        paddingBottom:10}
})