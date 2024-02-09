
import React, { useCallback, useEffect, useState, useRef } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../../assets/colors';
import { ImagesUrl, ServerUrl, configToken } from '../../../components/includes';
import { globalStyles } from '../../../components/globalStyle';
import { PrimaryButtonChildren } from '../../../components/include/button';
import { getBritishDate, getTime } from '../../../components/globalFunction';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  AppointmentDetails: {
    code:string
  };
  ChatDoctor:{
    code:string
  }; 
   };

type Props = NativeStackScreenProps<RootStackParamList, 'AppointmentDetails'>;
 const AppointmentDetails =({ route, navigation }:Props)=> {

  const fadeValue = useRef(new Animated.Value(0)).current 
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [content, setContent]= useState([] as any)
interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.goBack();
}

const handleNext =()=>{
  //navigation.navigate('Wallet');
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
  FetchContent()
}, [route])


const  FetchContent = async()=>{
  //setLoading(true)
  let config = await configToken()
  let url = ServerUrl+'/api/user/appointment/details/'+route.params.code
  try{
 await axios.get(url, config).then(response=>{
    if(response.data.type==='success'){
      setContent(response.data.data[0])
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


const handleDoctor =(code:string)=>{
  navigation.navigate('ChatDoctor', {
    code:code,
  });  
}


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.white}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={18} color={colors.dark}  /> 
    <Text style={styles.label}>Appointment details</Text>
    <MaterialIcon name="more-vert" size={18} color={colors.primary}  /> 
    </View>

<ScrollView>



    <View style={{backgroundColor:colors.white, marginBottom:5, paddingBottom:5}}>


<View style={{display:'flex', flexDirection:'row'}}>
  
<Image source={{ uri:content.image_url!=='' && content.image_url!==null ?ImagesUrl+"/doctors/"+content.image_url:ImagesUrl+"/no.png"}} style={styles.profile} />

<View style={{marginLeft:0}}>

<View style={{width:(width/2)-40, height:120,  display:'flex', justifyContent:'space-between', marginTop:40}}>
  <View>
  <Text style={styles.title}>{content.fullname}</Text>
   </View>

<View >
  <Text style={[styles.infoText]}>{content.job_title}</Text>
  <Text style={[styles.infoText]}>at {content.office}</Text>
  </View>

  </View>


</View>
</View>





<View style={{display:'flex',  marginHorizontal:20, marginTop:25}}>

<Text style={styles.infoText}>Apointment on</Text>

<Text style={[styles.label, {marginTop:15}]}>{content.appointment_date? getBritishDate(content.appointment_date):''} | {content.appointment_time?getTime(content.appointment_time):''} </Text>


<Text style={[styles.infoText, {marginTop:30}]}>Location</Text>

<Text style={[styles.label, {marginTop:20}]}>{content.office}</Text>






<View style={{display:'flex', justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>

<Text style={[styles.infoText, {marginTop:15}]}>Walter street, New York</Text>
<MaterialIcon name="navigation" size={18} color={colors.icon}  /> 

</View>


<Text style={[styles.infoText, {marginTop:35}]}>Appointment for</Text>
<Text style={[styles.label, {marginTop:15}]}>{content.title}</Text>



{content.attachment!==''?
<View>
<Text style={[styles.infoText, {marginTop:25}]}>Attachment</Text>


<View style={globalStyles.rowCenterBetween}>

<Text style={[styles.label, {marginTop:15}]}>{content.attachment}</Text>

<View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
<MaterialIcon name="download" size={18} color={colors.icon}  /> 
<Text style={{color:colors.icon, fontSize:12}}>Download</Text>
</View>


</View></View>:[]}


</View>


</View>



</ScrollView>
<View style={{position:'absolute', bottom:0, display:'flex', flexDirection:'row'}}>


<PrimaryButtonChildren

handleAction={handleNext}
style={{backgroundColor:colors.lightSkye, width:width/2}}
>
<View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>


<MaterialIcon name="download" size={18} color={colors.primary}  /> 
  <Text style={[globalStyles.buttonText, {marginLeft:10, color:colors.primary}]}>Call</Text>
</View>
</PrimaryButtonChildren>



<PrimaryButtonChildren
style={{ width:width/2}}
handleAction={handleNext}
>
<TouchableOpacity activeOpacity={0.8} onPress={()=>handleDoctor(content.doctor_code)} style={globalStyles.rowCenterCenter}>


<MaterialIcon name="chat" size={18} color={colors.white}  /> 
  <Text style={[globalStyles.buttonText, {marginLeft:10, color:colors.white}]}>Chat</Text>
</TouchableOpacity>
</PrimaryButtonChildren>


</View>
    </View>
  )
}


export default AppointmentDetails

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
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
  infoText:{
    fontSize:12,
    color:'#9E9E9E',
    fontWeight:'500'

  },

  profile:{
    width:180,
    height:180,
    resizeMode:'contain'
  },

  row:{
    display:'flex',
    flexDirection:'row',
    padding:10,
    justifyContent:'space-between'
  },
  title:{
    fontSize:18,
    fontWeight:'600',
    color:colors.dark,

  },

  time:{
    fontWeight:'600',
    fontSize:14,
    marginTop:3
  },

  date:{
    fontWeight:'600',
    fontSize:18,
    marginTop:3
  },
  box:{
  height:45,
  width:45,
  borderRadius:5,
  backgroundColor:colors.lightSkye,
  display:'flex',
  alignItems:'center',
  justifyContent:'space-between',
  paddingVertical:5,
  marginRight:10
  },
  
  timeBox:{
    height:45,
    borderRadius:5,
    backgroundColor:colors.lightSkye,
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical:10,
    paddingHorizontal:22,
    marginRight:10
  },
  textInput:{
    width:width-20,
    marginHorizontal:10,
    height:45,
    backgroundColor:colors.lightSkye,
    fontSize:12,
    color:colors.dark,
    borderRadius:5,
    paddingHorizontal:10
  },
  appointment:{
    width:width-20,
    marginHorizontal:10,
    height:40,
    backgroundColor:'#E5F8FF',
    borderRadius:5,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:10
  },
  textAreaWrapper:{
    width:width-20,
    marginHorizontal:10,
    borderRadius:5,
    paddingHorizontal:10,
    paddingVertical:10,
    height:80,
    marginTop:10,
    backgroundColor:colors.lightSkye,
  },
  textArea:{
   
   fontSize:12,
   fontWeight:'500'
    

  }
})