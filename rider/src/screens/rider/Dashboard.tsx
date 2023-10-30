
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import MapView, {PROVIDER_GOOGLE, Marker } from 'react-native-maps' 
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput, ImageBackground, Animated, StatusBar } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import axios from 'axios';
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../components/data';
import Loader from '../../components/loader'
import { CURRENCY, ImagesUrl, ServerUrl, configJSON, configToken} from '../../components/includes';
 
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import ShoppingCart from '../../components/include/ShoppingCart';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';
import { FormatNumber, getData } from '../../components/globalFunction';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Dashboard: undefined;
  AcceptDelivery:undefined; 
  AccountProfile:undefined;
  SearchLab:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
 const Dashboard =({ route, navigation }:Props)=> {

  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE);
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({} as any)

  const [modalType, setModalType] = useState('load')
  const fadeValue = useRef(new Animated.Value(0)).current 

  const [errors, setErrors] = useState({
    errorMessage:''
  });

  const [region, setRegion] = useState({
    latitude: 9.0734389,
    longitude: 7.4906504,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })


const handleCart =()=>{
  navigation.navigate('AcceptDelivery');
}

const handleNext =()=>{
  navigation.navigate('AcceptDelivery');
}

const handleMenu =()=>{
  navigation.navigate('AccountProfile');
}


const AnimationStart =()=>{
  const config:any ={
    toValue:1,
    duration:1000,
    useNativeDriver: true
  }
  Animated.timing(fadeValue, config).start()

}




const fetchRider = async()=>{

  const code = await getData('code');
  let url = ServerUrl+'/api/rider/summary/'+code
  try{
let config = await configToken()
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




const handleStatus =async(status:string)=>{

let newStatus = status==='Online'?'Offline':'Online'
  setLoading(true)
  
  const code = await getData('code');
  var fd = {  
    code:code,    
    field:'online_status',
    data:newStatus
  }
  let url = ServerUrl+'/api/rider/field/update';
  
  let configJ = await configJSON()
  

     axios.post(url, fd, configJ)
     .then(response =>{
  
       if(response.data.type === 'success'){
  
        setModalType('Success')
        setErrors({...errors, errorMessage:'Order updated'})
        
                 }else{
                    setModalType('Failed')
                    setErrors({...errors, errorMessage:response.data.message})
                 
                 }  
             })
             .catch((error)=>{
              setModalType('Failed')
              setErrors({...errors, errorMessage:error.message})
              
             }).finally(()=>{
  
              fetchRider()
  
             })
  }
  const onRegionChange =(region:any)=>{
    //console.warn(region)

    //let currentLongitude;
  //let currentLatitude
/*   Geolocation.getCurrentPosition(
    (position) => {
    let  currentLongitude = JSON.stringify(position.coords.longitude);
   let   currentLatitude =  JSON.stringify(position.coords.latitude);
    },
    (error) => console.warn('GetCurrentPosition Error', JSON.stringify(error)),
    { enableHighAccuracy: true }
  ); 
 */
   // updateLocation(region.latitude, region.longitude)
  }

useEffect(()=>{
  fetchRider()
  AnimationStart()
}, [])

  return (<View        
  style={styles.mapView}
              > 


  <Pressable onPress={handleMenu} style={[dynamicStyle.header,{width:width, height:70}]}>

<View style={{display:'flex', padding:10,flexDirection:'row', alignItems:'center'}}>

<Image source={{ uri: profile.image_url?ImagesUrl+"/riders/"+profile.image_url:ImagesUrl+"/no.png"}} style={styles.profile} />

<View style={{marginLeft:10}}>
<Text style={dynamicStyle.label}>{profile.order} Orders | {CURRENCY+ FormatNumber(profile.amount)}</Text>
<Text style={dynamicStyle.infoText}>Today</Text>
</View>
</View>


<MaterialIcon name="menu" size={14} color={colors.dark}  />
</Pressable> 


  
      <View style={styles.btn}>
<TouchableOpacity  onPress={()=>handleStatus(profile.online_status)} activeOpacity={0.9}  style={styles.circleWrapper}>
  <View style={styles.circle}>
    <Text style={[dynamicStyle.label, {color:colors.white, fontSize:14, textAlign:'center'}]}>Go</Text>
    <Text style={[dynamicStyle.label, {color:colors.white, fontSize:14, textAlign:'center'}]}> {profile.online_status==='Online'?'Offline':'Online'}</Text>
  </View>
</TouchableOpacity>
</View> 




      <View style={dynamicStyle.boxRider}>
      <MaterialIcon name="circle" size={14} color={profile.online_status==='Offline'?colors.red:colors.green}  />

    <Text style={[dynamicStyle.label, {marginHorizontal:10, color:
  MODE==='Light'?colors.dark:colors.white}]}> You're {profile.online_status}</Text>

<MaterialIcon name="keyboard-arrow-up" size={20} color={
  MODE==='Light'?colors.dark:colors.white}  />
      </View> 

      </View>
  )
}


export default Dashboard

const styles = StyleSheet.create({


 

    textInput:{
      width:width - 40,
      fontSize:12,
      fontWeight:'600',


    },

catItems:{

position:'absolute',
bottom:30,

},

px:{
  height:25,
  width:25,
  resizeMode:'cover',
    },
catImage:{
height:(height/2)*0.2,
width:(width/2)-40,
resizeMode:'contain',
marginTop:15
  },

  address:{
    backgroundColor:colors.white,
    display:'flex',
    flexDirection:'row',
    paddingVertical:10
  },
mapView:{

flex:1

},
 
addItem:{
  height:25,
  width:25,
  backgroundColor:colors.primary,
  borderBottomRightRadius:5,
  borderTopLeftRadius:5,
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  position:'absolute',
  bottom:0,
  right:0
},
sellerImage:{
  height:80,
  width:80,
  resizeMode:'cover'
},
companyLogo:{
  height:100,
  width:100,
  backgroundColor:'#9Be471',
  borderRadius:10,
  display:'flex',
  justifyContent:'center',
  alignItems:'center'

},
container:{
  display:'flex',
   flexDirection:'row', 
   backgroundColor:colors.white,
   paddingVertical:15,
   paddingHorizontal:10
  
  
  },
  profile:{
    width:50,
    height:50,
    borderRadius:10,
    resizeMode:'contain',

  },
 content:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    paddingHorizontal:10, 
    paddingBottom:10,
    marginVertical:5
  },
  chatHeader:{
    display:'flex',
     justifyContent:'center', 
     alignItems:'center', 
     backgroundColor:'#eef3F9', 
     width:width,
     height:30

  },
  circleWrapper:{
    height:90,
    width:90,
    borderRadius:45,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#B3B7EB',

  },
  circle:{
    height:70,
    width:70,
    borderRadius:35,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:colors.primary,
    zIndex:1
  },
  btn:{
    width:width,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:100
  }
})