
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';
import { ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Register: undefined;
    Language:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;
 const Register =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.navigate('Language');
}

const handleNext =()=>{
  //navigation.navigate('Welcome');
}

  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<SafeAreaView style={[ {flex:1, backgroundColor:colors.white}]}>
    

    <View style={styles.header}>

    <MaterialIcon name="arrow-back-ios" size={14} color={colors.dark}  /> 

    <Text style={styles.label}>Register Now</Text>
    <View />
    </View>

<View style={styles.infoWrapper}>
    <Text style={styles.infoText}>Your phone number is not registered yet.</Text>
    <Text style={styles.infoText}>Let us know basic details for registration.</Text>
    </View>


    <View style={styles.textWrapper}>
<MaterialIcon name="phone-iphone" size={18} color={colors.icon}  /> 
  <TextInput placeholder='Enter Mobile Number' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} />
</View>



<View style={styles.textWrapper}>
<MaterialIcon name="person" size={18} color={colors.icon}  /> 
  <TextInput placeholder='Full Name' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} />
</View>



<View style={styles.textWrapper}>
<MaterialIcon name="mail" size={18} color={colors.icon}  /> 
  <TextInput placeholder='Email Address' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} />
</View>



<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={globalStyles.button}>
  <Text style={globalStyles.buttonText}>Continue</Text>
</TouchableOpacity>


<View style={styles.infoWrapper}>

<Text style={styles.label}>Back to sign in</Text>

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
  height:45,
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
fontSize:12
},


  
})