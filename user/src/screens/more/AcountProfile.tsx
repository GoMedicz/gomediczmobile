
import React, { useCallback, useRef, useState, useEffect } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';
import { ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';

import axios from 'axios';
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
  Profile:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'AccountProfile'>;

 const AccountProfile =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [content, setContent]= useState([] as any)
  const fadeValue = useRef(new Animated.Value(0)).current 
  const MODE = useZustandStore((store:any) => store.theme);
  const dynamicStyle = dynamicStyles(MODE);


interface item {
  title:string,
  isDefault:string,
  id:number
}





const  FetchContent = async()=>{
  //setLoading(true)
  let config = await configToken()
  let code = await getData('code')
  let url = ServerUrl+'/api/user/display_one/'+code
  try{
 await axios.get(url, config).then(response=>{
    if(response.data.type==='success'){
      setContent(response.data.data)
      AnimationStart()
    }else{
      setContent([])
    }

  }).finally(()=>{
    setRefreshing(false)
   // setLoading(false)
  }) 
}catch(e){
  console.log('error:',e)
}
}






const [items, setItems] = useState([

  {title:"Appointments", label:'Doctor Appointments', icon:'assignment-ind', screen:'MyAppointment'}, 
  {title:"Lab Tests", label:'Test Booking', icon:'event-available', screen:'MyLabTest'},
  {title:"Wallet", label:'Quick Payments', icon:'account-balance-wallet', screen:'Wallet'},
  {title:"My Orders", label:'List of Orders', icon:'article', screen:'MyOrder'},
  {title:"Pill Reminders", label:'Take Pill on time', icon:'alarm', screen:'Reminder'},

  {title:"My Address", label:'Saved Address', icon:'location-on', screen:'Address'},

  {title:"Saved", label:'Medics & Doctor', icon:'bookmark', screen:'SavedItems'},
  
  {title:"Profile", label:'Setup Profile', icon:'store', screen:'Profile'},

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


useEffect(()=>{
  FetchContent()
  AnimationStart()
}, [route])


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
      <View/>
   <Text style={styles.label}>Account</Text>
   <View/>
    </View>

<ScrollView>



<View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:MODE==='Light'?colors.white:colors.dark, padding:10}}>
  
<Image source={{ uri:content.image_url!=='' && content.image_url!==null ?ImagesUrl+"/user/"+content.image_url:ImagesUrl+"/no.png"}}  style={styles.profile} />

<View style={{marginLeft:10}}>

<View style={{width:(width/2)-20}}>
  <Text style={dynamicStyle.title}>{content.fullname}</Text>
  </View>

  <Text style={[styles.infoText, { marginTop:15,letterSpacing:3}]}>{content.telephone}</Text>
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