
import React, { useState, useEffect, useRef } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { ImagesUrl, ServerUrl, configJSON, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
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
  Dashboard:undefined;
  AccountProfile: undefined;
  Profile:undefined; 
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

          
    {title:"Wallet", label:'Quick Payments', icon:'account-balance-wallet', screen:'Wallet'},

    {title:"Insight", label:'See the progress', icon:'insert-chart', screen:'Insight'},
    
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



const fetchProfile = async()=>{

  const code = await getData('code');
  let url = ServerUrl+'/api/rider/display_one/'+code
  try{
let config = await configJSON()
 await axios.get(url, config).then(response=>{
  if(response.data.statusCode===200){
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
  navigation.navigate('Dashboard'); 
}



useEffect(()=>{
  fetchProfile()
  AnimationStart()
}, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="close" size={18} onPress={handleBack} color={MODE==='Light'?colors.primary:colors.grey}  />
   <Text style={dynamicStyle.label}>Account</Text>
<View/>
    </View>

<ScrollView>


<Animated.View style={{opacity:fadeValue}}>
<View style={{display:'flex', flexDirection:'row', alignItems:'center',
 backgroundColor:MODE==='Light'?colors.white:colors.dark, padding:10, paddingTop:0}}>
  <Animated.View style={{opacity:fadeValue}}>

<Image source={{ uri: profile.image_url?ImagesUrl+"/riders/"+profile.image_url:ImagesUrl+"/no.png"}} style={styles.profile} />
</Animated.View>


<View style={{marginLeft:10}}>

<View style={{width:(width/2)-40}}>
  <Text style={dynamicStyle.title}>{profile&&profile.fullname}</Text>
  </View>

  <Text style={[styles.infoText, { marginTop:15, letterSpacing:2}]}>{profile&&profile.telephone}</Text>
</View>
</View>
</Animated.View>



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



<TouchableOpacity  onPress={handleBack} activeOpacity={0.9} style={dynamicStyle.boxRider}>


<MaterialIcon name="circle" size={14} color={profile.online_status==='Online'? colors.green:colors.red}  />

<Text style={[dynamicStyle.label, {marginHorizontal:10}]}> You're {profile.online_status}</Text>

<MaterialIcon name="keyboard-arrow-up" size={20} color={MODE==='Light'?colors.dark:colors.white}  />
</TouchableOpacity>


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



boxRider:{
  width:width-10,
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