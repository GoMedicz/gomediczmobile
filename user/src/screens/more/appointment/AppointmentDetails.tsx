
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, DATES, LANGUAGELIST, TIMES } from '../../../components/data';
import { ImagesUrl } from '../../../components/includes';
import { globalStyles } from '../../../components/globalStyle';
import ModalDialog from '../../../components/modal';
import ShoppingCart from '../../../components/include/ShoppingCart';
import { PrimaryButton, PrimaryButtonChildren } from '../../../components/include/button';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  AppointmentDetails: undefined;
  Wallet:undefined; 
   };

type Props = NativeStackScreenProps<RootStackParamList, 'AppointmentDetails'>;
 const AppointmentDetails =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.goBack();
}

const handleNext =()=>{
  navigation.navigate('Wallet');
}


    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.white}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={18} color={colors.dark}  /> 
    <Text style={styles.label}>Appointment details</Text>
    <MaterialIcon name="menu" size={18} color={colors.primary}  /> 
    </View>

<ScrollView>



    <View style={{backgroundColor:colors.white, marginBottom:5, paddingBottom:5}}>


<View style={{display:'flex', flexDirection:'row'}}>
  
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png"}} style={styles.profile} />

<View style={{marginLeft:0}}>

<View style={{width:(width/2)-40, height:120,  display:'flex', justifyContent:'space-between', marginTop:40}}>
  <View>
  <Text style={styles.title}>Dr.</Text>
  <Text style={styles.title}>Joseph Williamson</Text>
  </View>



<View >
  <Text style={[styles.infoText]}>Cardiac Surgeon</Text>
  <Text style={[styles.infoText]}>at Apple Hospital</Text>
  </View>

  </View>


</View>
</View>





<View style={{display:'flex',  marginHorizontal:20, marginTop:25}}>

<Text style={styles.infoText}>Apointment on</Text>

<Text style={[styles.label, {marginTop:15}]}>12 June 2020 | 12:00 pm</Text>


<Text style={[styles.infoText, {marginTop:30}]}>Location</Text>

<Text style={[styles.label, {marginTop:20}]}>Apple Hospital</Text>






<View style={{display:'flex', justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>

<Text style={[styles.infoText, {marginTop:15}]}>Walter street, New York</Text>
<MaterialIcon name="navigation" size={18} color={colors.icon}  /> 

</View>


<Text style={[styles.infoText, {marginTop:35}]}>Appointment for</Text>
<Text style={[styles.label, {marginTop:15}]}>Chest Pain</Text>





<Text style={[styles.infoText, {marginTop:25}]}>Attachment</Text>


<View style={{display:'flex', justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>

<Text style={[styles.label, {marginTop:15}]}>report212220.pdf</Text>

<View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
<MaterialIcon name="download" size={18} color={colors.icon}  /> 
<Text style={{color:colors.icon, fontSize:12}}>Download</Text>
</View>


</View>


</View>


</View>



</ScrollView>
<View style={{position:'absolute', bottom:0, display:'flex', flexDirection:'row'}}>


<PrimaryButtonChildren

handleAction={handleNext}
style={{backgroundColor:colors.lightSkye, width:width/2}}
>
<View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>


<MaterialIcon name="download" size={18} color={colors.primary}  /> 
  <Text style={[globalStyles.buttonText, {marginLeft:10, color:colors.primary}]}>Call</Text>
</View>
</PrimaryButtonChildren>



<PrimaryButtonChildren
style={{ width:width/2}}
handleAction={handleNext}
>
<View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>


<MaterialIcon name="chat" size={18} color={colors.white}  /> 
  <Text style={[globalStyles.buttonText, {marginLeft:10, color:colors.white}]}>Chat</Text>
</View>
</PrimaryButtonChildren>


</View>
    </View>
  )
}


export default AppointmentDetails

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:colors.white,
    height:60
  },
  label:{
    fontWeight:'600',
    fontSize:12,
  },
  infoText:{
    fontSize:12,
    color:'#9E9E9E',
    fontWeight:'500'

  },

  profile:{
    width:180,
    height:180,
    resizeMode:'contain'
  },

  row:{
    display:'flex',
    flexDirection:'row',
    padding:10,
    justifyContent:'space-between'
  },
  title:{
    fontSize:18,
    fontWeight:'600',
    color:colors.dark,

  },

  time:{
    fontWeight:'600',
    fontSize:14,
    marginTop:3
  },

  date:{
    fontWeight:'600',
    fontSize:18,
    marginTop:3
  },
  box:{
  height:45,
  width:45,
  borderRadius:5,
  backgroundColor:colors.lightSkye,
  display:'flex',
  alignItems:'center',
  justifyContent:'space-between',
  paddingVertical:5,
  marginRight:10
  },
  
  timeBox:{
    height:45,
    borderRadius:5,
    backgroundColor:colors.lightSkye,
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical:10,
    paddingHorizontal:22,
    marginRight:10
  },
  textInput:{
    width:width-20,
    marginHorizontal:10,
    height:45,
    backgroundColor:colors.lightSkye,
    fontSize:12,
    color:colors.dark,
    borderRadius:5,
    paddingHorizontal:10
  },
  appointment:{
    width:width-20,
    marginHorizontal:10,
    height:40,
    backgroundColor:'#E5F8FF',
    borderRadius:5,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:10
  },
  textAreaWrapper:{
    width:width-20,
    marginHorizontal:10,
    borderRadius:5,
    paddingHorizontal:10,
    paddingVertical:10,
    height:80,
    marginTop:10,
    backgroundColor:colors.lightSkye,
  },
  textArea:{
   
   fontSize:12,
   fontWeight:'500'
    

  }
})