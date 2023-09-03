
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
  AccountProfile: undefined;
  MyAppointment:undefined; 
  MyLabTest:undefined;
  Wallet:undefined;
  Theme:undefined;
  Language:undefined;
  Faqs:undefined;
  Terms:undefined;
  Contact:undefined;
  MyOrder:undefined;
  Reminder:undefined;
  Address:undefined;
  SavedItems:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'AccountProfile'>;

 const AccountProfile =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

  const MODE = useZustandStore((store:any) => store.theme);
  const dynamicStyle = dynamicStyles(MODE);


interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleNext =()=>{
  navigation.navigate('MyAppointment');
}




const ITEM = [

  {
    id:1,
    label:'Appointments',
    title:'Doctor Appointments',
    navigation:'MyAppointment',
    icon:'assignment-ind'
  },
  {
    id:2,
    label:'Lab Tests',
    title:'Test Booking',
    navigation:'MyLabTest',
    icon:'event-available'
  }
]
    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
      <View/>
   <Text style={styles.label}>Account</Text>
   <View/>
    </View>

<ScrollView>



<View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:MODE==='Light'?colors.white:colors.dark, padding:10}}>
  
<Image source={{ uri:ImagesUrl+"/profile_1.png"}} style={styles.profile} />

<View style={{marginLeft:10}}>

<View style={{width:(width/2)-20}}>
  <Text style={dynamicStyle.title}>Dr. Joseph Williamson</Text>
  </View>

  <Text style={[styles.infoText, { marginTop:15}]}>+1 987 654 3210</Text>
</View>
</View>




<View style={{ marginHorizontal:10, marginVertical:5, display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>


{ITEM.map((list:any, index:number)=>
<TouchableOpacity key={index} activeOpacity={0.8} onPress={()=>navigation.navigate(list.navigation)} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>{list.label}</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>{list.title}</Text>
    
<MaterialIcon name={list.icon} size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>
)}









<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Wallet')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Wallet</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Quick Payments</Text>
    
<MaterialIcon name="account-balance-wallet" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>






<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('MyOrder')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>My Order</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Order Status</Text>
    
<MaterialIcon name="two-wheeler" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>



<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Reminder')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Pill Reminders</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Take Pill on time</Text>
    
<MaterialIcon name="alarm" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>





<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Address')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>My Address</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Saved Address</Text>
    
<MaterialIcon name="location-on" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>






<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('SavedItems')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Saved</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Medics & Doctor</Text>
    
<MaterialIcon name="bookmark" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>





<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Language')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Change Language</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Change Language</Text>
    
<MaterialIcon name="language" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>



<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Theme')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Change Theme</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Change Theme</Text>
    
<MaterialIcon name="palette" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>




<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Terms')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>T&C</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Company Policies</Text>
    
<MaterialIcon name="article" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>





<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Contact')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Contact Us</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Let us help you</Text>
    
<MaterialIcon name="mail" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>



<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Faqs')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>FAQs</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Quick Answer</Text>
    
<MaterialIcon name="feedback" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>



<TouchableOpacity activeOpacity={0.8}  style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Logout</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>See you soon</Text>
    
<MaterialIcon name="logout" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>

</View>



</ScrollView>

<View style={{display:'flex', padding:20, backgroundColor:MODE==='Light'?colors.white:colors.dark, flexDirection:'row', justifyContent:'space-between'}}>
  <Text style={[dynamicStyle.label, {color:colors.primary, fontSize:15} ]}>Developed by:</Text>

  <Text style={{color:colors.grey}}>GoMedicz logo</Text>
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
    width:100,
    height:100,
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