
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import axios from 'axios';
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CATEGORY, LANGUAGELIST } from '../../components/data';
import { ImagesUrl,  ServerUrl, configJSON, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { getData } from '../../components/globalFunction';
import { dynamicStyles } from '../../components/dynamicStyles';
import { useZustandStore } from '../../api/store';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Reviews: undefined;
  Cart:undefined; 
  Offers:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Reviews'>;
 const Reviews =({ route, navigation }:Props)=> {
  const [modalType, setModalType] = useState('load')
  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

  const fadeValue = useRef(new Animated.Value(0)).current 
  const [profile, setProfile] = useState({} as any)
  const [review, setReview] = useState([] as any)


  const MODE = useZustandStore(store => store.theme);
  const dynamicStyle = dynamicStyles(MODE);


const handleCart =()=>{
  navigation.navigate('Cart');
}

const handleNext =()=>{
  navigation.goBack(); 
}


const fetchReveiw = async()=>{

  const code = await getData('code');
  let url = ServerUrl+'/api/appointment/reviews/'+code
  try{
let config = await configToken()
 await axios.get(url, config).then(response=>{
  if(response.data.statusCode===200){
    setReview(response.data.data)
    }else{
      setReview([])
    }
  }) 
}catch(e){
  console.log('error:',e)
}
}




const fetchReview = async()=>{
  const wallet = await getData('wallet');
  const code = await getData('code');

  let sql =   "SELECT  r.rating, 'r.reviewComments', r.date_reviewed, r.totalRating, 'u.fullName', 'u.profilePicture', 'a.appointmentReason'   from tbl_appointments a, tbl_users u, tbl_appointment_reviews r where a.appointment_code = r.appointment_code and u.user_code = r.user_code and   r.doctor_code ='"+code+"'"

let url = ServerUrl+'/api/get/doctor/earnings'
try{
let fd ={
  sql:sql,
  code:code,
  wallet:wallet
}
let configj = await configJSON()
await axios.post(url, fd, configj).then(response=>{
console.log(response.data)
  
  if(response.data.statusCode===200){
    setReview(response.data.data)
    }else{
      setReview([])
    }
  }) 
}catch(e){
  console.log('error:',e)
}
}


const fetchProfile = async()=>{

  const code = await getData('code');
  let url = ServerUrl+'/api/doctor/profile/'+code
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

  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box, {
      backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>


<View style={styles.content}>

<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:ImagesUrl+"/seller/profile_4.png" }} style={styles.profile} />

    
    <View style={[{display:'flex'}, {marginLeft:15}]}>
      <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:14, fontWeight:'600', marginBottom:5}}>Henry Johnson</Text>
      <Text style={dynamicStyle.infoText}>For <Text style={{color:MODE==='Light'?colors.dark:colors.white}}>Cold Fever</Text></Text>
    </View> 
</View>

 
  <View style={[globalStyles.columnCenterBetween]}>
      <View style={[globalStyles.rowCenterCenter, {marginBottom:5}]}>
    <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:10,  fontWeight:'700'}}>4.5</Text>
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={colors.grey}  />
      </View>
      <Text style={dynamicStyle.infoText}>10.DEC.2019</Text>
  </View> 

</View>

<Text style={{fontSize:10, marginBottom:5, marginHorizontal:10, textAlign:'justify',  color:MODE==='Light'?colors.dark:colors.white}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, commodi ipsum! Dolor cum impedit at unde dignissimos</Text>


      </Pressable>
    }


  
const HeaderComponents =()=>{


  return (<View>


<View style={{
    backgroundColor:MODE==='Light'?colors.white:colors.dark, marginBottom:5, paddingBottom:5}}>


<Animated.View style={{opacity:fadeValue}}>
<View style={{display:'flex', flexDirection:'row'}}>
  
<Image source={{ uri:profile.profilePicture?profile.profilePicture:ImagesUrl+"/no.png"}} style={globalStyles.profile} />

<View style={{marginLeft:0}}>

<View style={{width:(width/2)-40, height:120,  display:'flex', justifyContent:'center', marginTop:40}}>
  
  <Text style={dynamicStyle.title}>{profile&&profile.fullName}</Text>
 

<View style={{marginTop:20}} >
  <Text style={dynamicStyle.infoText}>Avg Reveiw</Text>


<View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:10}}>
  <Text style={ {color:'#EEA31E', fontWeight:'600', fontSize:20, marginRight:10}}>4.5</Text>
  <MaterialIcon name="star" size={25} color={'#EEA31E'}  />
</View>

  </View>

  
  </View>

</View>
</View></Animated.View>



<View style={{marginTop:30, marginHorizontal:20}}>

<Text style={dynamicStyle.infoText}>Average Reviews</Text>



<View style={{display:'flex', flexDirection:'row', marginTop:20, alignItems:'center', width:width-20}}>

<Text style={dynamicStyle.label}>5</Text>
<MaterialIcon name="star" size={18} color={'#EEA31E'}  />
<View style={dynamicStyle.progress}>
<View style={dynamicStyle.progressItem} />
</View>

<Text style={dynamicStyle.label}>75</Text>
</View>




<View style={{display:'flex',  flexDirection:'row', marginVertical:2, alignItems:'center', width:width-20}}>

<Text style={dynamicStyle.label}>4</Text>
<MaterialIcon name="star" size={18} color={'#EEA31E'}  />
<View style={dynamicStyle.progress}>
<View style={dynamicStyle.progressItem} />
</View>

<Text style={dynamicStyle.label}>3</Text>
</View>



<View style={{display:'flex', flexDirection:'row', marginVertical:2, alignItems:'center', width:width-20}}>

<Text style={dynamicStyle.label}>3</Text>
<MaterialIcon name="star" size={18} color={'#EEA31E'}  />
<View style={dynamicStyle.progress}>
<View style={dynamicStyle.progressItem} />
</View>

<Text style={dynamicStyle.label}>24</Text>
</View>


<View style={{display:'flex', flexDirection:'row', marginVertical:2, alignItems:'center', width:width-20}}>

<Text style={dynamicStyle.label}>2</Text>
<MaterialIcon name="star" size={18} color={'#EEA31E'}  />
<View style={dynamicStyle.progress}>
<View style={dynamicStyle.progressItem} />
</View>

<Text style={dynamicStyle.label}>8</Text>
</View>

<View style={{display:'flex', flexDirection:'row', marginVertical:2, alignItems:'center', width:width-20}}>

<Text style={dynamicStyle.label}>1</Text>
<MaterialIcon name="star" size={18} color={'#EEA31E'}  />
<View style={dynamicStyle.progress}>
<View style={dynamicStyle.progressItem} />
</View>

<Text style={dynamicStyle.label}>11</Text>
</View>


</View>





<View style={[globalStyles.rowCenterBetween,{marginVertical:20, paddingHorizontal:20 }]}>

<View>
  <Text style={dynamicStyle.infoText}>Total People Rated</Text>

  <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:5}}>
<MaterialIcon name="account-box" size={18} color={colors.icon}  />
<Text style={[dynamicStyle.label, {marginLeft:5}]}>78</Text>
</View>

</View>



<View>
  <Text style={dynamicStyle.infoText}>Appointment Booked</Text>

  <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:5}}>
<MaterialIcon name="check-box" size={18} color={colors.icon}  />
<Text style={[dynamicStyle.label, {marginLeft:5}]}>78</Text>
</View>

</View>

</View>
</View>




    <View style={{ paddingHorizontal:10, marginBottom:5, height:35, justifyContent:'center'}}>

    <Text style={dynamicStyle.infoText}>Recent</Text>
</View>
  </View>

  )
}

const AnimationStart =()=>{
  const config:any ={
    toValue:1,
    duration:1000,
    useNativeDriver: true
  }
  Animated.timing(fadeValue, config).start()

}

    
useEffect(()=>{
  fetchProfile()
  AnimationStart()
  fetchReveiw()
}, [])


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // fetchProfile()
    fetchReveiw()
    }, [])



  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
      <View/> 
        <Text style={dynamicStyle.label}>Reviews</Text>
    <View/>
    </View>


    <View style={styles.catItems}>

<FlatList 

ListHeaderComponent={HeaderComponents}
data={CATEGORY}
numColumns={1}
nestedScrollEnabled={true}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>
</View>


    </View>
  )
}


export default Reviews

const styles = StyleSheet.create({


box:{
  width:width,
  marginBottom:5,
  display:'flex',
  padding:10,
    },

catItems:{
flex:1,
marginHorizontal:5,
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
    width:30,
    height:30,
    borderRadius:15,
    resizeMode:'contain'
  },
  profileDoc:{
    width:170,
    height:170,
    resizeMode:'contain'
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
  

  
})