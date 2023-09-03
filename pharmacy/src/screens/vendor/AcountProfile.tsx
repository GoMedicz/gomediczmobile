
import React, { useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { globalStyles } from '../../components/globalStyle';
import axios from 'axios';
import { ImagesUrl,  PHARMACY_CODE, ServerUrl, config } from '../../components/includes';
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
  StoreProfile:undefined; 
  StoreItems:undefined;
  Orders:undefined;
  Theme:undefined;
  Wallet:undefined;
  Insight:undefined;
  Earnings:undefined;
  Language:undefined;
  Faqs:undefined;
  Terms:undefined;
  Contact:undefined;

   };

type Props = NativeStackScreenProps<RootStackParamList, 'AccountProfile'>;

 const AccountProfile =({ route, navigation }:Props)=> {

  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE);

  const [profile, setProfile] = useState({} as any)

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

    
useEffect(()=>{
  fetchStore()
}, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="close" size={18} color={colors.primary}  />
   <Text style={dynamicStyle.label}>Account</Text>
<View/>
    </View>

<ScrollView>


<View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:MODE==='Light'?colors.white:colors.dark, paddingBottom:10}}>
  
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png"}} style={styles.profile} />

<View style={{marginLeft:5}}>

<View style={{width:(width/2)-20}}>
  <Text style={dynamicStyle.title}>{profile&&profile.store_name}</Text>
  </View>

  <Text style={[styles.infoText, { marginTop:15, letterSpacing:2}]}>{profile&&profile.telephone}</Text>
</View>
</View>




<View style={{ marginHorizontal:10, marginVertical:5, display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>


<TouchableOpacity onPress={()=>navigation.navigate('Orders')} activeOpacity={0.9} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>My Orders</Text>

  <View style={[globalStyles.rowCenterBetween, {marginVertical:5, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>List of Orders</Text>

<MaterialIcon name="article" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} /> 
  </View>
</TouchableOpacity>


<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('StoreProfile')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Store Profile</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Setup Profile</Text>
    
<MaterialIcon name="store" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>



<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Wallet')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Wallet</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Quick Payments</Text>
    
<MaterialIcon name="account-balance-wallet" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>



<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Insight')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Insight</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>See the progress</Text>
    
<MaterialIcon name="insert-chart" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>


<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Earnings')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Earnings</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Sell Overview</Text>
    
<MaterialIcon name="monetization-on" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>



<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('StoreItems')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>My Items</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Manage Items</Text>
    
<MaterialIcon name="add-box" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
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



<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('StoreItems')} style={dynamicStyle.box}>
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

  infoText:{
    fontSize:12,
    color:'#9E9E9E',
    fontWeight:'500'

  },

  profile:{
    width:150,
    height:110,
    resizeMode:'contain'
  },


})