
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
  AccountProfile: undefined;
  Profiles:undefined; 
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
  navigation.navigate('Profiles');
}


    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="close" size={18} color={MODE==='Light'?colors.primary:colors.grey}  />
   <Text style={styles.label}>Account</Text>
<View/>
    </View>

<ScrollView>



<View style={{display:'flex', flexDirection:'row', alignItems:'center',
 backgroundColor:MODE==='Light'?colors.white:colors.dark, padding:10, paddingTop:0}}>
  
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png"}} style={styles.profile} />

<View style={{marginLeft:10}}>

<View style={{width:(width/2)-40}}>
  <Text style={styles.title}>Dr. Joseph Williamson</Text>
  </View>

  <Text style={[styles.infoText, { marginTop:15}]}>+1 987 654 3210</Text>
</View>
</View>




<View style={{ marginHorizontal:10, marginVertical:5, display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>



<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.box}>
  <Text style={styles.label}>Wallet</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Quick Payments</Text>
    <FontAwesome5Icon name="wallet" size={20} color={MODE==='Light'?colors.grey1Opacity:colors.grey}  />
  </View>
</TouchableOpacity>

<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.box}>
  <Text style={styles.label}>Insight</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Ride Overview</Text>
    <FontAwesome5Icon name="wallet" size={20} color={MODE==='Light'?colors.grey1Opacity:colors.grey}   />
  </View>
</TouchableOpacity>


<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.box}>
  <Text style={styles.label}>My Profile</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Setup Profile</Text>
    <FontAwesome5Icon name="wallet" size={20} color={MODE==='Light'?colors.grey1Opacity:colors.grey}  />
  </View>
</TouchableOpacity>

<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.box}>
  <Text style={styles.label}>Change Language</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Change Language</Text>
    <FontAwesome5Icon name="wallet" size={20} color={MODE==='Light'?colors.grey1Opacity:colors.grey}   />
  </View>
</TouchableOpacity>



<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.box}>
  <Text style={styles.label}>Change Theme</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Change Theme</Text>
    <FontAwesome5Icon name="wallet" size={20} color={MODE==='Light'?colors.grey1Opacity:colors.grey}  />
  </View>
</TouchableOpacity>


<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.box}>
  <Text style={styles.label}>Contact Us</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Let us help you</Text>
    <FontAwesome5Icon name="wallet" size={20} color={MODE==='Light'?colors.grey1Opacity:colors.grey}  />
  </View>
</TouchableOpacity>


<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.box}>
  <Text style={styles.label}>About Us</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Let us help you</Text>
    <FontAwesome5Icon name="wallet" size={20} color={MODE==='Light'?colors.grey1Opacity:colors.grey}  />
  </View>
</TouchableOpacity>

<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.box}>
  <Text style={styles.label}>T&C</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Policies</Text>
    <FontAwesome5Icon name="wallet" size={20} color={MODE==='Light'?colors.grey1Opacity:colors.grey}  />
  </View>
</TouchableOpacity>




<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.box}>
  <Text style={styles.label}>FAQs</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Policies</Text>
    <FontAwesome5Icon name="wallet" size={20} color={MODE==='Light'?colors.grey1Opacity:colors.grey}   />
  </View>
</TouchableOpacity>





<View style={styles.box}>
  <Text style={styles.label}>Logout</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:5, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>Logout</Text>
    <FontAwesome5Icon name="wallet" size={25} color={MODE==='Light'?colors.grey1Opacity:colors.grey}   />
  </View>
</View>

</View>


</ScrollView>

<View>
<View style={styles.boxRider}>


<MaterialIcon name="circle" size={14} color={colors.green}  />

<Text style={[styles.label, {marginHorizontal:10}]}> You're Online</Text>

<MaterialIcon name="keyboard-arrow-up" size={20} color={MODE==='Light'?colors.dark:colors.white}  />
</View>

</View>
    </View>
  )
}


export default AccountProfile

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
    color:MODE==='Light'?colors.dark:colors.white
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
    width:100,
    height:100,
    resizeMode:'contain',
    borderRadius:10
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
    color:MODE==='Light'?colors.dark:colors.white

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
    backgroundColor:MODE==='Light'?colors.white:colors.dark,
    width:(width/2)-15,
    padding:10,
    marginVertical:5,
    borderRadius:5

  },

boxRider:{
  width:width-10,
  backgroundColor:MODE==='Light'?colors.white:colors.dark,
  display:'flex',
  flexDirection:'row',
  justifyContent:'center',
  paddingVertical:20,
  position:'absolute',
  bottom:10,
  borderTopLeftRadius:10,
  borderTopRightRadius:10,
  marginHorizontal:5,
  alignItems:'center',
  zIndex:1,

  shadowColor: "#000",
  shadowOffset: {
    width: 3,
    height: 0
  },
  
  shadowOpacity: 0.5,
  shadowRadius: 6,
  elevation: 5,
  
    },
    hr:{
      width:width-20,
      height:20,
      backgroundColor:colors.white
    }
})