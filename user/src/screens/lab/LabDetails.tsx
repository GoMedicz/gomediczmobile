
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { globalStyles } from '../../components/globalStyle';
import { PrimaryButtonChildren } from '../../components/include/button';

import { ImagesUrl, ServerUrl, configToken } from '../../components/includes';

import axios from 'axios';
const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  LabDetails:{
    code:undefined
   }

  BottomTabs:undefined; 
  Cart:undefined; 
  SearchLab:{
     code:string;
  name:undefined;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'LabDetails'>;
 const LabDetails =({  route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [content, setContent]= useState([] as any)
  const [lab, setLab]= useState({
    facility:[] as any,
    total_facility:4
  })

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.navigate('BottomTabs');
}

const handleNext =(item:any)=>{
 navigation.navigate('SearchLab', {
    code:item.code,
    name:item.lab_name
  });  
}


const  FetchContent = async()=>{
  //setLoading(true)
  let config = await configToken()
  let url = ServerUrl+'/api/lab/view/'+route.params.code
  try{
 await axios.get(url, config).then(response=>{
    if(response.data.type==='success'){
 let facility = JSON.parse(response.data.data.facility)
      setLab({...lab, 
          
        facility:facility,
        total_facility:facility.length>4?4:facility.length

      }) 
      setContent(response.data.data)
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

    
useEffect(()=>{
  FetchContent()
}, [route])


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    FetchContent
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>

    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={18} onPress={handleBack} color={colors.dark}  /> 
    
    <MaterialIcon name="phone" size={18} color={colors.primary}  /> 
    </View>

<ScrollView>

    <View style={{backgroundColor:colors.white, paddingVertical:10,  paddingHorizontal:20, display:'flex', flexDirection:'row'}}>

    <Image source={{ uri:content.image_url!=='' && content.image_url!==null ?ImagesUrl+"/lab/"+content.image_url:ImagesUrl+"/no.png"}}  style={styles.profile} />


<View style={{marginTop:10, marginLeft:10}}>
    <Text style={{color:colors.dark, fontSize:17, fontWeight:'700', marginBottom:5}}>{content.lab_name}</Text>

<View style={{display:'flex', flexDirection:'row', marginTop:15}}>
    <MaterialIcon name="add-location" size={14} color={colors.grey}  /> 
<Text style={[styles.infoText, {marginLeft:5}]}>{content.address}</Text>
</View>



<View style={{display:'flex', justifyContent:'space-between', flexDirection:'row',  width:width/2, marginTop:30}}>
<Text style={styles.infoText}>Availability</Text>
<MaterialIcon name="arrow-forward-ios" size={14} color={colors.grey}  /> 
</View> 


<Text style={styles.label}>07:00 AM to 17:00 PM</Text>
</View>

</View>



<View style={styles.card}>
<Text style={styles.infoText}>About</Text>

<Text style={[styles.infoText, {marginTop:10}]}>{content.about}
</Text>

</View>


<View style={[styles.card,{marginTop:0}]}>
<Text style={styles.infoText}>Facilities</Text>
{lab.facility.length!==0?lab.facility.slice(0,lab.total_facility).map((item:any, index:number)=>
<View style={{marginTop:5}} key={index}>
<Text style={styles.h3}>{item.title}</Text>
</View>):<Text style={styles.h3} >{'No record found'}</Text>}


{lab.total_facility!==lab.facility.length?
<View style={{marginTop:5}}>
  <Pressable onPress={()=>setLab({...lab, total_facility:lab.facility.length})} ><Text style={[styles.label, {color:colors.navyBlue, marginVertical:10}]}>+{((lab.facility.length)-lab.total_facility)} More</Text></Pressable>
</View>:[]}


</View>
   



<View style={[styles.card,{marginTop:0, paddingTop:20}]}>
<Text style={styles.infoText}>Address</Text>


<View style={{display:'flex', flexDirection:'row', marginBottom:5, marginTop:10, alignItems:'center', justifyContent:'space-between'}}>

<View style={{display:'flex', flexDirection:'row'}}>
<MaterialIcon name="add-location" size={14} color={colors.grey}  />
<Text style={[styles.infoText, {fontWeight:'700', marginLeft:5}]}>{content.address}</Text>
</View>

<MaterialIcon name="navigation" size={18} color={colors.navyBlue}  />
</View>

</View>



<View>

<View>

  <Text>map here</Text>
</View>


</View>

</ScrollView>

<PrimaryButtonChildren handleAction={()=>handleNext(content)} style={{position:'absolute', bottom:0}}>
  <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>

  <MaterialIcon name="search" size={14} color={colors.white}  />

    <Text style={[globalStyles.buttonText, {marginLeft:10}]} >Search for Test</Text>

  </View>
</PrimaryButtonChildren>


    </View>
  )
}


export default LabDetails

const styles = StyleSheet.create({

  header:{

    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-end',
    paddingHorizontal:20,
    backgroundColor:colors.white,
    height:60,
  },
  h3:{
    fontWeight:'600',
    fontSize:10,
    marginVertical:3
  },
  label:{
    fontWeight:'600',
    fontSize:12,
  },
 
  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },

box:{
  width:width,
  backgroundColor:colors.white,
  marginBottom:5,
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  padding:10,
  height:50,
  justifyContent:'space-between'
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
  card:{
    paddingVertical:10,
    paddingHorizontal:20,
    backgroundColor:colors.white,
    marginVertical:8

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
    width:130,
    height:140,
    borderRadius:20,
    resizeMode:'cover',
    marginRight:5
  },
 content:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    paddingHorizontal:10, 
    paddingBottom:10,
    marginVertical:5
  }
})