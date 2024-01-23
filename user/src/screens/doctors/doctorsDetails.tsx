
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CURRENCY, ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { PrimaryButtonChildren } from '../../components/include/button';
import { FormatNumber, getAge } from '../../components/globalFunction';
import Loader from '../../components/loader';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  DoctorsDetails:{
    code:string;
    title:string;
  }
  DoctorReviews: {
    code:string;
  }; 
  Appointment:{
    code:string;
  };
   };

type Props = NativeStackScreenProps<RootStackParamList, 'DoctorsDetails'>;
 const DoctorsDetails =({ route, navigation }:Props)=> {


const [modalType, setModalType] = useState('load')
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [content, setContent]= useState([] as any)
  const [doctor, setDoctor]= useState({
    speciality:[] as any,
    service:[] as any,
    specification:[] as any,
    total_specification:5,
    total_speciality:5,
    total_service:2
  })

const handleBack =()=>{
  navigation.goBack();
}

const handleAppointment =(code:string)=>{
  navigation.navigate('Appointment',{
    code:code
  });
}


const handleReview =(code:string)=>{
  navigation.navigate('DoctorReviews',{
    code:code
  });
}



const fetchDoctor = async()=>{
  //setLoading(true)
  let config = await configToken()

  let url = ServerUrl+'/api/doctor/profile/'+route.params.code
  try{

 await axios.get(url, config).then(response=>{
    if(response.data.type==='success'){
      try{

        setContent(response.data.data[0])
        let speciality = JSON.parse(response.data.data[0].speciality)
      let service = JSON.parse(response.data.data[0].service)
      let specification = JSON.parse(response.data.data[0].specification)


        setDoctor({...doctor, 
          
          speciality:speciality,
          service:service,
          total_speciality:speciality.length>5?5:speciality.length,
          total_service:service.length>2?2:service.length,
          specification:specification,
          total_specification:specification.length>5?5:specification.length,

        })
      }catch(e){

      }
      
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
  fetchDoctor()
}, [route])


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    fetchDoctor()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={globalStyles.header}>
    <MaterialIcon onPress={handleBack} name="arrow-back-ios" size={18} color={colors.dark}  /> 
    <MaterialIcon name="bookmark-outline" size={18} color={colors.dark}  /> 

    </View>
<ScrollView >



    <View style={{backgroundColor:colors.white, marginBottom:5, paddingBottom:5}}>


<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
  
<Image source={{ uri:content.image_url!==''?ImagesUrl+"/doctors/"+content.image_url:ImagesUrl+"/no.png"}} style={styles.profile} />

<View style={{marginLeft:5}}>
  <Text style={[styles.infoText]}>Experience</Text>
  <Text style={styles.label}>{getAge(content.date_started)} years</Text>

  <Text style={[styles.infoText, { marginTop:15}]}>Consultancy Fees</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(content.fees)}</Text>
</View>
</View>




<View style={[styles.row]}>
  <View style={{width:(width/2)-20}}>
  <Text style={[styles.title, {flexWrap:'wrap'}]}>{content.fullname}</Text>

  </View>


  <Pressable onPress={()=>handleReview(route.params.code)} style={{marginRight:0}}>
    <Text style={styles.infoText}>Feedbacks</Text>

    <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:5}}>

      <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
    <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
    <Text style={[styles.label, {color:'#EEA31E'}]}>4.5</Text>
    <Text style={[styles.infoText, {marginRight:30}]}> (124)</Text>
    </View>

    <MaterialIcon name="arrow-forward-ios" size={12} color={colors.grey}  />
    </View>


  </Pressable>
</View>




<View style={[styles.row,{paddingVertical:5}]}>
<View style={{display:'flex',  justifyContent:'flex-end', alignItems:'flex-end'}}>

<Text style={styles.infoText}>{content.job_title}</Text>
</View>
<View>
  <View style={{display:'flex', flexDirection:'row'}}>
    <Text style={[styles.infoText,{marginRight:30}]}>Availability</Text>
    <MaterialIcon name="arrow-forward-ios" size={12} color={colors.grey}  />
  </View>
  <Text style={[styles.label, {marginTop:4}]}>12:00 to 13:00</Text>
  </View>

</View>

</View>



<View style={styles.card}>
<Text style={styles.infoText}>About</Text>

<Text style={[styles.label, {marginVertical:4}]}>{content.about}  </Text>

</View>




<View style={styles.card}>
<Text style={styles.infoText}>Service at</Text>


{doctor.service.length!==0?doctor.service.slice(0,doctor.total_service).map((item:any, index:number)=>
<View style={[styles.hospital, {marginTop:5}]} key={index}>
<View>
  <Text style={styles.label}>{item.name}</Text>
  <Text style={[styles.infoText, {color:colors.grey1, opacity:0.6, marginTop:2}]}>{item.address}</Text>
  </View>
    <MaterialIcon name="arrow-forward-ios" size={12} color={colors.grey}  />
</View>):<Text style={styles.h3} >{'No record found'}</Text>}


{doctor.total_service!==doctor.service.length?
<View style={{marginTop:5}}>
  <Pressable onPress={()=>setDoctor({...doctor, total_service:doctor.service.length})} ><Text style={[styles.label, {color:colors.primary}]}>+{((doctor.service.length)-doctor.total_service)} More</Text></Pressable>
</View>:[]}



</View>


<View style={styles.card}>
<Text style={styles.infoText}>Specialities</Text>

<View style={{marginTop:10}}>

{doctor.speciality.length!==0?doctor.speciality.slice(0,doctor.total_speciality).map((item:any, index:number)=>

<Text style={styles.h3} key={index}>{item.name}</Text>
):<Text style={styles.h3} >{'No record found'}</Text>}

</View>


{doctor.total_speciality!==doctor.speciality.length?
<View style={{marginTop:5}}>
  <Pressable onPress={()=>setDoctor({...doctor, total_speciality:doctor.speciality.length})} ><Text style={[styles.label, {color:colors.primary}]}>+{((doctor.speciality.length)-doctor.total_speciality)} More</Text></Pressable>
</View>:[]}


</View>



<View style={styles.card}>
<Text style={styles.infoText}>Specification</Text>

<View style={{marginTop:10}}>

{doctor.specification.length!==0?doctor.specification.slice(0,doctor.total_specification).map((item:any, index:number)=>

<Text style={styles.h3} key={index}>{item.name}</Text>
):<Text style={styles.h3} >{'No record found'}</Text>}

</View>


{doctor.total_specification!==doctor.specification.length?
<View style={{marginTop:5}}>
  <Pressable onPress={()=>setDoctor({...doctor, total_specification:doctor.specification.length})} ><Text style={[styles.label, {color:colors.primary}]}>+{((doctor.specification.length)-doctor.total_specification)} More</Text></Pressable>
</View>:[]}



</View>

<Loader 
    isModalVisible={loading} 
    type={modalType}
    message={''} 
    action={()=>setLoading(false)}
     />


<PrimaryButtonChildren

handleAction={()=>handleAppointment(route.params.code)}
>

<View style={globalStyles.rowCenterCenter}>
<MaterialIcon name="calendar-today" size={12} color={colors.white}  />
  <Text style={[globalStyles.buttonText, {marginLeft:20}]}>Book Appointment now</Text>
</View>

</PrimaryButtonChildren>


</ScrollView>
{/* )} */}
    </View>
  )
}


export default DoctorsDetails

const styles = StyleSheet.create({

  
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
    width:150,
    height:150,
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
    lineHeight:20

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
  }
})