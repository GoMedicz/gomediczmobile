
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, DATES, LANGUAGELIST, TIMES } from '../../components/data';
import { ImagesUrl} from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import ShoppingCart from '../../components/include/ShoppingCart';
import { PrimaryButton, PrimaryButtonChildren } from '../../components/include/button';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
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
  AppointmentDetails: undefined;
  BottomTabs:undefined; 
   };

type Props = NativeStackScreenProps<RootStackParamList, 'AppointmentDetails'>;
 const AppointmentDetails =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

  const MODE = useZustandStore(store => store.theme);
  const dynamicStyle = dynamicStyles(MODE);






const handleNext =()=>{
  navigation.navigate('BottomTabs');
}


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="arrow-back-ios" size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
    <Text style={dynamicStyle.label}>Appointment details</Text>
    <View/>
    </View>

<ScrollView>



    <View style={{backgroundColor:MODE==='Light'?colors.white:colors.dark, marginBottom:5, paddingBottom:5}}>


<View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-end', marginLeft:20 }}>
  
<Image source={{ uri:ImagesUrl+"/profile_5.png"}} style={styles.profile} />

<Text style={styles.title}>Samantha Smith</Text>


</View>





<View style={{display:'flex',  marginHorizontal:20, marginTop:25}}>

<Text style={styles.infoText}>Apointment on</Text>

<Text style={[dynamicStyle.label, {marginTop:15}]}>12 June 2020 | 12:00 pm</Text>


<Text style={[styles.infoText, {marginTop:35}]}>Appointment for</Text>
<Text style={[dynamicStyle.label, {marginTop:15}]}>Chest Pain</Text>


<Text style={[styles.infoText, {marginTop:25}]}>Attachment</Text>


<View style={{display:'flex', justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>

<Text style={[dynamicStyle.label, {marginTop:15}]}>report212220.pdf</Text>

<View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
<MaterialIcon name="visibility" size={18} color={colors.icon}  /> 
<Text style={{color:colors.icon, marginLeft:2, fontSize:12}}>View</Text>
</View>


</View>


</View>


</View>



</ScrollView>
<View style={{position:'absolute', bottom:0, display:'flex', flexDirection:'row'}}>


<PrimaryButtonChildren

handleAction={handleNext}
style={{backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark, width:width/2}}
>
<View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', width:width/2}}>

<MaterialIcon name="close" size={18} color={colors.primary}  /> 
  <Text style={[globalStyles.buttonText, { color:colors.primary}]}>Reject</Text>
</View>
</PrimaryButtonChildren>



<PrimaryButtonChildren
style={{ width:width/2}}
handleAction={handleNext}
>
<View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', width:width/2}}>


<MaterialIcon name="done" size={18} color={colors.white}  /> 
  <Text style={[globalStyles.buttonText, {color:colors.white}]}>Accept</Text>
</View>
</PrimaryButtonChildren>


</View>
    </View>
  )
}


export default AppointmentDetails

const styles = StyleSheet.create({

  
  infoText:{
    fontSize:12,
    color:'#9E9E9E',
    fontWeight:'500'

  },

  profile:{
    width:160,
    height:160,
    resizeMode:'contain',
    marginRight:10
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
    width:(width/2)-50

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
})