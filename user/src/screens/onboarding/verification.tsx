
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
  Verification: undefined;
    Language:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Verification'>;
 const Verification =({ route, navigation }:Props)=> {

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
  navigation.navigate('BottomTabs', {
    code:'cds',
  }); 
}

  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<SafeAreaView style={[ {flex:1, backgroundColor:colors.white}]}>
    

    <View style={styles.header}>

    <MaterialIcon name="arrow-back-ios" size={14} color={colors.dark}  /> 

    <Text style={styles.label}>Phone Verification</Text>
    <View />
    </View>

<View style={styles.infoWrapper}>
    <Text style={styles.infoText}>We've sent an OTP verification code</Text>
    <Text style={styles.infoText}>on your given number.</Text>
    </View>


    <View style={styles.textWrapper}>
  <TextInput placeholder='Enter 4 digit OTP' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} />
</View>




<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={globalStyles.button}>
  <Text style={globalStyles.buttonText}>Submit</Text>
</TouchableOpacity>




<View style={styles.contentWrapper}>
<Text style={styles.label}>0:19 min left</Text>
<Text style={styles.label}>RESEND</Text>
</View>


    </SafeAreaView>
  )
}


export default Verification

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
  justifyContent:'center',
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
width:width/2,
fontWeight:'600',
color:colors.dark,
fontSize:12
},


  
})