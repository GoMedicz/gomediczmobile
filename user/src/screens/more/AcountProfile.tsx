
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl } from '../../components/includes';
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
  AccountProfile: undefined;
  MyAppointment:undefined; 
   };

type Props = NativeStackScreenProps<RootStackParamList, 'AccountProfile'>;

 const AccountProfile =({ route, navigation }:Props)=> {

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

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={styles.header}>
   <Text style={styles.label}>Account</Text>

    </View>

<ScrollView>



<View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:colors.white, paddingBottom:5}}>
  
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png"}} style={styles.profile} />

<View style={{marginLeft:5}}>

<View style={{width:(width/2)-20}}>
  <Text style={styles.title}>Dr. Joseph Williamson</Text>
  </View>

  <Text style={[styles.infoText, { marginTop:15}]}>+1 987 654 3210</Text>
</View>
</View>




<View style={{ marginHorizontal:10, marginVertical:5, display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>


<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.box}>
  <Text style={styles.label}>Appointments</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Doctor Appointments</Text>
    <FontAwesome5Icon name="wallet" size={25} color={colors.grey}  />
  </View>
</TouchableOpacity>

<View style={styles.box}>
  <Text style={styles.label}>Lab Tests</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Test Booking</Text>
    <FontAwesome5Icon name="wallet" size={25} color={colors.grey}  />
  </View>
</View>



<View style={styles.box}>
  <Text style={styles.label}>Wallet</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:5, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Quick Payments</Text>
    <FontAwesome5Icon name="wallet" size={25} color={colors.grey}  />
  </View>
</View>


<View style={styles.box}>
  <Text style={styles.label}>My Order</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:5, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Order Status</Text>
    <FontAwesome5Icon name="wallet" size={25} color={colors.grey}  />
  </View>
</View>



<View style={styles.box}>
  <Text style={styles.label}>Pill Reminders</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:5, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Take Pill on time</Text>
    <FontAwesome5Icon name="wallet" size={25} color={colors.grey}  />
  </View>
</View>




<View style={styles.box}>
  <Text style={styles.label}>My Address</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:5, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Saved Address</Text>
    <FontAwesome5Icon name="wallet" size={25} color={colors.grey}  />
  </View>
</View>




<View style={styles.box}>
  <Text style={styles.label}>Saved</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:5, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Medics & Doctor</Text>
    <FontAwesome5Icon name="wallet" size={25} color={colors.grey}  />
  </View>
</View>


<View style={styles.box}>
  <Text style={styles.label}>Change Language</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:5, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Change Language</Text>
    <FontAwesome5Icon name="wallet" size={25} color={colors.grey}  />
  </View>
</View>


<View style={styles.box}>
  <Text style={styles.label}>Change Theme</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:5, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Change Theme</Text>
    <FontAwesome5Icon name="wallet" size={25} color={colors.grey}  />
  </View>
</View>





<View style={styles.box}>
  <Text style={styles.label}>Contact Us</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:5, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Let us help you</Text>
    <FontAwesome5Icon name="wallet" size={25} color={colors.grey}  />
  </View>
</View>



<View style={styles.box}>
  <Text style={styles.label}>T&C</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:5, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Company Policies</Text>
    <FontAwesome5Icon name="wallet" size={25} color={colors.grey}  />
  </View>
</View>


<View style={styles.box}>
  <Text style={styles.label}>FAQs</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:5, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Doctor Appointments</Text>
    <FontAwesome5Icon name="wallet" size={25} color={colors.grey}  />
  </View>
</View>



<View style={styles.box}>
  <Text style={styles.label}>Logout</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:5, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Logout</Text>
    <FontAwesome5Icon name="wallet" size={25} color={colors.grey}  />
  </View>
</View>

</View>



</ScrollView>

<View style={{display:'flex', padding:20, backgroundColor:colors.white, flexDirection:'row', justifyContent:'space-between'}}>
  <Text style={[styles.label, {color:colors.primary, fontSize:15} ]}>Developed by:</Text>

  <Text>GoMedicz logo</Text>
</View>
    </View>
  )
}


export default AccountProfile

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'center',
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
  h3:{
    fontWeight:'600',
    fontSize:10,
    marginVertical:3
  },
  infoText:{
    fontSize:12,
    color:'#9E9E9E',
    fontWeight:'500'

  },

  profile:{
    width:120,
    height:120,
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
    padding:10,
    backgroundColor:colors.white,
    marginVertical:5

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

  }
})