
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, ImageBackground, StatusBar } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { CURRENCY, ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { DOCTORS } from '../../components/data';
import { globalStyles } from '../../components/globalStyle';
import { PrimaryButtonChildren } from '../../components/include/button';
import { FormatNumber, getAge, getData, storeData } from '../../components/globalFunction';
import Doctor from '../doctors/doctor';

import Loader from '../../components/loader';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  HospitalDetails:{
    code:undefined;
  };
  DoctorsDetails:{
    code:string;
    title:string;
  }
  Hospital:undefined; 
  BottomTabs:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'HospitalDetails'>;
 const HospitalDetails =({ route, navigation }:Props)=> {

  const [modalType, setModalType] = useState('load')
  const [loading, setLoading] = useState(false)
  const [doctors, setDoctors]= useState([] as any)
  const [content, setContent]= useState([] as any)
  const [refreshing, setRefreshing] = useState(false)

  const [errors, setErrors] = useState({
    errorMessage:'',
    successMessage:''
  });

const [hospital, setHospital]= useState({
  facility:[] as any,
  total_facility:4,
  active:'about',
  department:[] as any
})

const handleBookMark =async()=>{

 
  let hospital:any  = await getData('hospital');
   
  if(hospital){
     let item =  JSON.parse(hospital)
 
     let allItems =  item.concat([route.params.code])
     let uniq = [...new Set(allItems)];
     storeData('hospital', JSON.stringify(uniq, null, 2))
     }else{
       storeData('hospital', JSON.stringify([route.params.code], null, 2))
     }  
 
   setLoading(true)
   setModalType('Success')
   setErrors({...errors, errorMessage: 'Successfully Saved'})  
   
 }


const  FetchContent = async()=>{
  //setLoading(true)
  let config = await configToken()
  let url = ServerUrl+'/api/hospital/view/'+route.params.code
  
 await axios.get(url, config).then(response=>{
    if(response.data.type==='success'){
      setContent(response.data.data)
      setDoctors(response.data.doctors)
      let department = JSON.parse(response.data.data.department)
      let facility = JSON.parse(response.data.data.facility)

      setHospital({...hospital, 
        facility:facility,
        total_facility:facility.length>4?4:facility.length,
        department:department
      })
    }else{
      setContent([])
    }
  }).finally(()=>{
    setRefreshing(false)
   // setLoading(false)
  }) 
}



const handleSlide =(code:string)=>{ 

  const currentContent = hospital.department.map((list:any)=>{
                 
      if(list.code ===code){
          return {...list, status:list.status==='false'?'true':'false'}
      }

       return list
        })

setHospital({...hospital, department:currentContent}) 
      
     }

     const handleDetails =(item:any)=>{
      navigation.navigate('DoctorsDetails', {
       code:item.doctor_code,
       title:item.category
     });  
   }

const handleNext =()=>{
  navigation.navigate('BottomTabs'); 
}



  const CardCategory =({item}:{item:any})=>{


    return <View style={{backgroundColor:colors.white, marginBottom:5}}>
      
    <Pressable  style={[styles.box]}>
      <Text style={[styles.infoText, {color:colors.dark}]}>{item.title} </Text>


      <MaterialIcon onPress={()=>handleSlide(item.code)} name={item.status==='true'?"keyboard-arrow-down":"keyboard-arrow-up"} size={18} color={colors.primary}  />

      </Pressable>
{item.status==='true'?<View>
{(doctors.filter((ls:any)=>ls.department_code===item.code)).map((list:any, index:number)=> 
      <Doctor key={index} item={list} navigation={navigation} />)}
</View>:[]}

      </View>
    }
  
    useEffect(()=>{
    FetchContent()
    }, [route])
    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    <StatusBar barStyle={'dark-content'} />



    <ImageBackground 
    source={{uri:ImagesUrl+'/hospital/hos.jpeg'}}
    
    style={styles.header}
    
    >
      <View style={{top:20, width:width-40, display:'flex', justifyContent:'space-between', flexDirection:'row',  }}>
    <MaterialIcon name="arrow-back-ios" size={18} color={colors.white} onPress={handleNext} /> 

    <MaterialIcon name="bookmark-outline" size={18} onPress={handleBookMark} color={colors.white}  /> 

    </View>

    </ImageBackground>


    <View style={{backgroundColor:colors.white,  paddingHorizontal:10, paddingVertical:15}}>


    <Text style={{color:colors.dark, fontSize:16, fontWeight:'600', marginBottom:5}}>{content.hospital_name}</Text>

<Text style={styles.infoText}>{content.category}</Text>


<View style={{display:'flex', flexDirection:'row', marginVertical:20}}>
  <Pressable onPress={()=>setHospital({...hospital, active:'about'})}>
  <Text style={ {color:hospital.active==='about'?colors.primary:'#9E9E9E', fontSize:12, fontWeight:'600'}}>About</Text>
  </Pressable>
  <Pressable onPress={()=>setHospital({...hospital, active:'department'})}>
  <Text style={{color:hospital.active==='department'?colors.primary:'#9E9E9E', fontSize:12, fontWeight:'600', marginLeft:20}}>Departments</Text>
  </Pressable>
</View>

</View>

{hospital.active==='about'?<View>
<ScrollView>
<View style={styles.card}>
<Text style={styles.infoText}>Facilities</Text>

<View style={{marginTop:15}}>
{hospital.facility.length!==0?hospital.facility.slice(0,hospital.total_facility).map((item:any, index:number)=>

<Text style={styles.h3} key={index}>{item.title}</Text>
):<Text style={styles.h3} >{'No record found'}</Text>}
</View>


{hospital.total_facility!==hospital.facility.length?
<View style={{marginTop:5}}>
  <Pressable onPress={()=>setHospital({...hospital, total_facility:hospital.facility.length})} ><Text style={[styles.label, {color:colors.primary}]}>+{((hospital.facility.length)-hospital.total_facility)} More</Text></Pressable>
</View>:[]}


</View>
   


<Loader 
    isModalVisible={loading} 
    type={modalType}
    message={errors.errorMessage} 
    action={()=>setLoading(false)}
     />



<View style={[styles.card,{marginTop:0, paddingTop:20}]}>
<Text style={styles.infoText}>Address</Text>


<View style={{display:'flex', flexDirection:'row', marginBottom:5, marginTop:10, alignItems:'center'}}>

<MaterialIcon name="add-location" size={14} color={colors.grey}  />
<Text style={[styles.infoText, {fontWeight:'700', marginLeft:5}]}>{content.address}</Text>

<MaterialIcon name="navigation" size={18} color={colors.primary}  />
</View>

</View>


<View>

<View>

  <Text>map here</Text>
</View>


</View>
</ScrollView>
</View>
:
 <ScrollView
 horizontal={true}
 >

 <FlatList 
data={hospital.department}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}

/> 

 </ScrollView> }














<PrimaryButtonChildren handleAction={handleNext} style={{position:'absolute', bottom:0}}>
  <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>

  <MaterialIcon name="call" size={14} color={colors.white}  />

    <Text style={[globalStyles.buttonText, {marginLeft:10}]} >Call Now</Text>

  </View>
</PrimaryButtonChildren>


    </View>
  )
}


export default HospitalDetails

const styles = StyleSheet.create({

  header:{

    display:'flex',
    flexDirection:'row',
    paddingHorizontal:20,
    backgroundColor:colors.white,
    height:180,
    
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
    padding:10,
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
    width:50,
    height:60,
    borderRadius:5,
    resizeMode:'contain',
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