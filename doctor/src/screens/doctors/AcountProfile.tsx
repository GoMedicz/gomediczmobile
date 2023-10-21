
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import ShoppingCart from '../../components/include/ShoppingCart';
import { PrimaryButton, PrimaryButtonChildren } from '../../components/include/button';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';
import { getData } from '../../components/globalFunction';

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

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)



  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE);


  const fadeValue = useRef(new Animated.Value(0)).current 


  const [profile, setProfile] = useState({} as any)

  const [items, setItems] = useState([

    {title:"My Profile", label:'Setup Profile', icon:'store', screen:'Profiles'},

    {title:"Wallet", label:'Quick Payments', icon:'account-balance-wallet', screen:'Wallet'},

    {title:"Earnings", label:'Sell Overview', icon:'monetization-on', screen:'Earnings'},

    {title:"Insight", label:'See the progress', icon:'insert-chart', screen:'Insight'},

    {title:"My Orders", label:'List of Orders', icon:'article', screen:'Orders'},
    
    {title:"Change Language", label:'Change Language', icon:'language', screen:'Language'},
    {title:"Change Theme", label:'Change Theme', icon:'palette', screen:'Theme'},
    {title:"T&C", label:'Company Policies', icon:'article', screen:'Terms'},
    {title:"Contact Us", label:'Let us help you', icon:'mail', screen:'Contact'},
    {title:"FAQs", label:'Quick Answer', icon:'feedback', screen:'Faqs'},
    {title:"Logout", label:'See you soon', icon:'logout', screen:'SignIn'},
  ])

   

const AnimationStart =()=>{
  const config:any ={
    toValue:1,
    duration:1000,
    useNativeDriver: true
  }
  Animated.timing(fadeValue, config).start()

}



const fetchStore = async()=>{

  const code = await getData('code');
  let url = ServerUrl+'/api/vendor/display_one/'+code
  try{
let config = await configToken()
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
  AnimationStart()
}, [])


  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
      <View/>
   <Text style={dynamicStyle.label}>Account</Text>
<View/>
    </View>

<ScrollView>



<Animated.View style={{opacity:fadeValue}}>
<View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:MODE==='Light'?colors.white:colors.dark, paddingBottom:20, paddingTop:20}}>
  
<Image  source={{ uri: profile.image_url?profile.image_url:ImagesUrl+"/no.png"}} style={styles.profile} />

<View style={{marginLeft:5}}>

<View style={{width:(width/2)-20}}>
  <Text style={dynamicStyle.title}>{profile&&profile.fullName}</Text>
  </View>

  <Text style={[styles.infoText, { marginTop:15}]}>{profile&&profile.phoneNumber}</Text>
</View>
</View>
</Animated.View>



<View style={{ marginHorizontal:10, marginVertical:5, display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>




{items.map((item:any, index:number)=>
<TouchableOpacity key={index} onPress={()=>navigation.navigate(item.screen)} activeOpacity={0.9} style={dynamicStyle.box}>
  <Animated.View style={{opacity:fadeValue}}>
  <Text style={dynamicStyle.label}>{item.title}</Text>
  </Animated.View>


  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>{item.label}</Text>

<MaterialIcon name={item.icon} size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} /> 
  </View>
</TouchableOpacity>)}

</View>



</ScrollView>

    </View>
  )
}


export default AccountProfile

const styles = StyleSheet.create({

  
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
    marginHorizontal:10,
    resizeMode:'cover',
  },

  row:{
    display:'flex',
    flexDirection:'row',
    padding:10,
    justifyContent:'space-between'
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

})