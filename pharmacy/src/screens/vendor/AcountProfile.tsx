
import React, { useEffect, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, SafeAreaView, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { globalStyles } from '../../components/globalStyle';
import axios from 'axios';
import { ImagesUrl,  PHARMACY_CODE, ServerUrl,  configToken } from '../../components/includes';
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


  const fadeValue = useRef(new Animated.Value(0)).current 


  const [profile, setProfile] = useState({} as any)

  const [items, setItems] = useState([

          
    {title:"My Orders", label:'List of Orders', icon:'article', screen:'Orders'},
    {title:"Store Profile", label:'Setup Profile', icon:'store', screen:'StoreProfile'},
    {title:"Wallet", label:'Quick Payments', icon:'account-balance-wallet', screen:'Wallet'},
    {title:"Insight", label:'See the progress', icon:'insert-chart', screen:'Insight'},
    {title:"Earnings", label:'Sell Overview', icon:'monetization-on', screen:'Earnings'},
    {title:"My Items", label:'Manage Items', icon:'add-box', screen:'StoreItems'},
    {title:"Change Language", label:'Change Language', icon:'language', screen:'Language'},
    {title:"Change Theme", label:'Change Theme', icon:'palette', screen:'Theme'},
    {title:"T&C", label:'Company Policies', icon:'article', screen:'Terms'},
    {title:"Contact Us", label:'Let us help you', icon:'mail', screen:'Contact'},
    {title:"FAQs", label:'Quick Answer', icon:'feedback', screen:'Faqs'},
    {title:"Logout", label:'See you soon', icon:'logout', screen:'Orders'},
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


const handleBack =()=>{
  //navigation.goBack();
  navigation.navigate('Orders'); 
}




useEffect(()=>{
  fetchStore()
  AnimationStart()
}, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="close" size={18} color={colors.primary} onPress={handleBack} />
   <Text style={dynamicStyle.label}>Account</Text>
  <View/>
</View>

<ScrollView>


<View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:MODE==='Light'?colors.white:colors.dark, paddingBottom:10}}>
  
  <Animated.View style={{opacity:fadeValue}}>
<Image source={{ uri:ImagesUrl+"/profile_5.png"}} style={styles.profile} />
</Animated.View>

<View style={{marginLeft:5}}>

<View style={{width:(width/2)-20}}>
  <Text style={dynamicStyle.title}>{profile&&profile.store_name}</Text>
  </View>

  <Text style={[styles.infoText, { marginTop:15, letterSpacing:2}]}>{profile&&profile.telephone}</Text>
</View>
</View>




<View style={{ marginHorizontal:10, marginVertical:5, display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>

{items.map((item:any, index:number)=>
<TouchableOpacity key={index} onPress={()=>navigation.navigate(item.screen)} activeOpacity={0.9} style={dynamicStyle.box}>
  <Animated.View style={{opacity:fadeValue}}>
  <Text style={dynamicStyle.label}>{item.title}</Text>
  </Animated.View>


  <View style={[globalStyles.rowCenterBetween, {marginVertical:5, opacity:0.6}]}>
    <Text style={[styles.infoText, {fontSize:10} ]}>{item.label}</Text>

<MaterialIcon name={item.icon} size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} /> 
  </View>
</TouchableOpacity>)}


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