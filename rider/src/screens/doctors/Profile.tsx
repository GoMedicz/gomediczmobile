
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl, MODE } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import ShoppingCart from '../../components/include/ShoppingCart';
import { PrimaryButton, PrimaryButtonChildren } from '../../components/include/button';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Profile: undefined;
  MyAppointment:undefined; 
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

 const Profile =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleNext =()=>{
  navigation.navigate('MyAppointment');
}


    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark,}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
   <Text style={styles.label}>My Profile</Text>
<View />
    </View>

<ScrollView>



<View style={{display:'flex', flexDirection:'row', alignItems:'flex-end',  backgroundColor:MODE==='Light'?colors.white:colors.dark,  paddingVertical:15}}>
  

<Image source={{ uri:ImagesUrl+"/doctors/doc1.png"}} style={styles.profile} />


<View style={{ display:'flex', justifyContent:'flex-start', alignItems:'flex-start'}}>

<View style={styles.circle}>
<MaterialIcon name="photo-camera" size={14} color={MODE==='Light'?colors.white:colors.dark}  /> 
</View>

<Text style={[styles.label, { color:colors.primary, fontWeight:'700'}]}>Change Profile Picture</Text>


</View>
</View>


<View style={styles.card}>

<View style={[styles.textWrapper]}>
<MaterialIcon name="account-circle" size={15} color={colors.icon}  /> 
  <TextInput style={styles.textInput} 
  placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='Full Name'
  />

</View>



<View style={styles.textWrapper}>
<MaterialIcon name="phone-iphone" size={15} color={colors.icon}  /> 
  <TextInput style={styles.textInput} 
  placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='+1987 654 3210'
  />

</View>


<View style={styles.textWrapper}>
<MaterialIcon name="mail" size={15} color={colors.icon}  /> 
  <TextInput style={styles.textInput} 
  placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='Email Address'
  />

</View>

</View>


<View style={styles.card}>
  <Text style={[styles.infoText, {marginLeft:10}]}>About</Text>

<View style={styles.about}>

  <TextInput
  multiline={true}
  style={[styles.label, {fontWeight:'500'}]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure temporibus culpa debitis minus tempore consectetur quisquam quaerat veniam saepe soluta, harum veritatis ratione explicabo, voluptas maiores nam non iusto in.</TextInput>

</View>

</View>




<View style={styles.card}>
  <View style={[globalStyles.rowCenterBetween, {marginHorizontal:10}]}>
  <Text style={[styles.infoText]}>Service at</Text>
  <Text style={[styles.label, {color:colors.navyBlue}]}>ADD</Text>
  </View>



  <View style={[styles.textWrapper,{marginVertical:5}]}>
  <TextInput style={styles.textInput} 
   placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='Apple Hospital, Wallington, New York'
  />

<MaterialIcon name="calendar-today" size={15} color={colors.icon} style={{marginRight:10}}  /> 
</View>


<View style={[styles.textWrapper,{marginVertical:5}]}>
  <TextInput style={styles.textInput} 
   placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='drjoseph@gmail.com'
  />

<MaterialIcon name="calendar-today" size={15} color={colors.icon}  /> 
</View>


</View>





<View style={styles.card}>
  <View style={[globalStyles.rowCenterBetween, {marginHorizontal:10}]}>
  <Text style={[styles.infoText]}>Experience & Fees</Text>
  </View>



  <View style={[styles.textWrapper,{marginVertical:5}]}>

<MaterialIcon name="calendar-today" size={15} color={colors.icon}   /> 

  <TextInput style={styles.textInput} 
   placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='18 years'
  />

</View>


<View style={[styles.textWrapper,{marginVertical:5}]}>

<MaterialIcon name="wallet" size={15} color={colors.icon}  /> 

  <TextInput style={styles.textInput} 
   placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='$28'
  />

</View>


</View>



<View style={styles.card}>
  
<View style={[globalStyles.rowCenterBetween, {marginHorizontal:10}]}>
<Text style={styles.infoText}>Services</Text>
<Text style={[styles.label, {color:colors.navyBlue}]}>EDIT</Text>
</View>


<View style={{marginTop:10, marginHorizontal:10}}>
<Text style={styles.h3}>Hypertension Treatment</Text>
<Text style={styles.h3}>COPD Treatment</Text>
<Text style={styles.h3}>Diabetes Management</Text>
<Text style={styles.h3}>ECG</Text>
<Text style={styles.h3}>Obesity Treatment</Text>
</View>

<View>
  <Text style={[styles.label, {color:colors.navyBlue, marginVertical:10, marginHorizontal:10}]}>+5 More</Text>
</View>

</View>


<View style={styles.card}>
  
<View style={[globalStyles.rowCenterBetween, {marginHorizontal:10}]}>
<Text style={styles.infoText}>Specifications</Text>
<Text style={[styles.label, {color:colors.navyBlue}]}>EDIT</Text>
</View>


<View style={{marginTop:10, marginHorizontal:10}}>
<Text style={styles.h3}>Hypertension Treatment</Text>
<Text style={styles.h3}>COPD Treatment</Text>
<Text style={styles.h3}>Diabetes Management</Text>
<Text style={styles.h3}>ECG</Text>
<Text style={styles.h3}>Obesity Treatment</Text>
</View>

<View>
  <Text style={[styles.label, {color:colors.navyBlue, marginVertical:10, marginHorizontal:10}]}>+1 More</Text>
</View>

</View>
</ScrollView>

<View>
  <PrimaryButton
  title='Update'
  />
</View>
    </View>
  )
}


export default Profile

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:MODE==='Light'?colors.white:colors.dark,
    height:60
  },
  label:{
    fontWeight:'600',
    fontSize:12,
    color:MODE==='Light'?colors.dark:colors.white,
  },
  h3:{
    fontWeight:'600',
    fontSize:10,
    marginVertical:3,
    color:MODE==='Light'?colors.dark:colors.white,
  },
  infoText:{
    fontSize:12,
    color:'#9E9E9E',
    fontWeight:'500'

  },

  profile:{
    width:(width/2)-20,
    height:150,
    resizeMode:'contain'
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
  card:{
    display:'flex',
     backgroundColor:MODE==='Light'?colors.white:colors.dark, 
     marginTop:10, 
     padding:10, 
     width:width
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

  textWrapper:{
    height:45,
    width:width-40,
    marginVertical:8,
    marginHorizontal:10,
    backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    borderRadius:10

  },

  textInput:{
    color:MODE==='Light'?colors.dark:colors.white,
    marginLeft:10,
    fontSize:14,
    width:width-90,
    

  },
  about:{
    display:'flex', 
    width:width-40,
     backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark, 
     borderRadius:10, 
     height:height/4,
     marginHorizontal:10,
     margin:10,
     padding:10}
})