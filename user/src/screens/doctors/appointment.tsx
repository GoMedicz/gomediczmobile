
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, TextInput, TouchableOpacity } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { PrimaryButton } from '../../components/include/button';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { getData, getDays, getMonthYear, getTime } from '../../components/globalFunction';
import { globalStyles } from '../../components/globalStyle';
import Loader from '../../components/loader';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Appointment: {
    code:string;
  };
  DoctorReviews:undefined; 
  BottomTabs:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Appointment'>;
 const Appointment =({ route, navigation }:Props)=> {


const [modalType, setModalType] = useState('load')
  const [content, setContent]= useState([] as any)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [office, setOffice]= useState('')
  const [dateList, setDateList]= useState([] as any)
  const [timeList, setTimeList]= useState([] as any)
  const [image, setImage] = useState({
    uri:'',
    type:'',
     name:''
  })

  const [user, setUser]= useState({
    code:'a'+Math.random().toString(36).substring(2, 9),
    title:'',
    image_url:''
  })
let date = new Date()
var today = date.toISOString().slice(0,10)
var weekend:any =new Date(date.setDate(date.getDate()+6)).toISOString().slice(0,10)



const [errors, setErrors] = useState({
  title:'',
  date:'',
  time:'',
  errorMessage:''
});



const handleSubmit =async()=>{
       
  let error = {...errors}; 
let formIsValid = true;

let msg ='This field is required';

if(!user.title){
  error.title = msg;
    formIsValid = false;
} 


  const date = dateList.filter((item:any)=>item.status===true)[0]
  const time = timeList.filter((item:any)=>item.status===true)[0]


  if(!date){
    error.date = msg;
      formIsValid = false;
  } 

  if(!time){
    error.time = msg;
      formIsValid = false;
  } 


if(!formIsValid){
  setErrors(error) 
  }


if(formIsValid) {
 
   setLoading(true)

  const fd = new FormData();
 
      let config = await configToken()
      Object.entries(user).forEach(([key, value]) => {
              fd.append(key, value);
          });

      const user_code = await getData('code');
      fd.append('time',  time.startTime)
  fd.append('date',  date.date)

  if(image.uri!==''){
  fd.append('image',  image)
  }
  fd.append('doctor_code',  route.params.code)
  fd.append('user_code',  user_code)

  let url = ServerUrl+'/api/doctor/appointment/add';

     axios.post(url, fd, config)
     .then(response =>{
       if(response.data.type === 'success'){
        
        setModalType('Success')
        setErrors({...errors, errorMessage: 'Successfully Booked'})
        
      } else{
        setModalType('Failed')
            setErrors({...errors, errorMessage: response.data.message})
                 }   
             })
             .catch((error)=>{
              setModalType('Failed')
            setErrors({...errors, errorMessage: error.message})

             }).finally(()=>{
              handleReset()
            
             }) 
            }
}

const Previous =()=>{
  setLoading(false)
  navigation.navigate('BottomTabs');
  
}
const openImagePicker = async() => {
  const options:any = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

 await launchImageLibrary(options, (response) => {
    if (response.didCancel) {
     // console.log('User cancelled image picker');
    } else if (response.errorCode) {
     // console.log('Image picker error: ', response.errorMessage);
    } else {
      let imageUri:any =  response.assets?.[0]?.uri;
      let type:any = response.assets?.[0]?.type

      let filename:any = response.assets?.[0]?.fileName

      setImage({
        uri:imageUri,
        name:filename,
        type:type

      })

      setUser({...user, image_url:user.code+'_'+filename})
    }
  });

};

const handleChange =(name:string, text:string)=>{
  setUser({...user, [name]:text})
  setErrors({...errors, [name]:''})
}

const handleReset =()=>{

  const currentContent = timeList.map((item:any)=>{
    return {...item, status:false}
      })
      const currentDate = dateList.map((item:any)=>{
        return {...item, status:false}
          })

          setUser({...user, code:'a'+Math.random().toString(36).substring(2, 9)})
            
             setImage({
              uri:'',
              type:'',
               name:''
             })
 setDateList(currentDate) 
setTimeList(currentContent) 

}

const handleChooseTime =(startTime:string)=>{  
  const currentContent = timeList.map((item:any)=>{
                 
      if(item.startTime ===startTime){
          return {...item, status:true}
      }else{
        return {...item, status:false}
      }
        })

 setTimeList(currentContent) 
    
  setErrors({...errors, time:''})  
     }

const handleChooseDate =(date:string)=>{  
  const currentContent = dateList.map((item:any)=>{
                 
      if(item.date ===date){
          return {...item, status:true}
      }else{
        return {...item, status:false}
      }
        })

 setDateList(currentContent) 
 setErrors({...errors, date:''}) 
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
      let service = JSON.parse(response.data.data[0].service)
        if(service.length!==0){
          let office = service[0].name;
          setOffice(office)
        }

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


function timeAddMinutes(time:any, min:any) {
  var t = time.split(":"),      // convert to array [hh, mm, ss]
      h = Number(t[0]),         // get hours
      m = Number(t[1]);         // get minutes
  m+= min % 60;                 // increment minutes
  h+= Math.floor(min/60);       // increment hours
  if (m >= 60) { h++; m-=60 }   
  
  return (h+"").padStart(2,"0")  +":"  //create string padded with zeros for HH and MM
         +(m+"").padStart(2,"0") +":"
         +t[2];                        // original seconds unchanged
  }  

const getTimeInterval =(startTime:any, endTime:any, minuteToAdd:any)=>{
  var futureDate = timeAddMinutes(startTime, minuteToAdd);
  let timeList =[];
  var maxSlot =24; //maximum slot per day in 30 minutes interval
  
  for(var i=0; i<=maxSlot; i++){
      if(String(futureDate)<= endTime){
          timeList.push({
            startTime:startTime, 
            label:getTime(startTime),
            status:false
          })
          startTime = futureDate;
          futureDate = timeAddMinutes(startTime, minuteToAdd);
      }
  }
  setTimeList(timeList)
}





const getNumWorkDays =(startDate:any, endDate:any)=>{
   
  var numWorkDays = [];
  const theDate = new Date(startDate)
  const theEnd =  new Date(endDate)
  while (theDate <= theEnd){
          numWorkDays.push({
            day:theDate.getDate(),
            date:theDate.toISOString().slice(0,10),
            title:getDays(String(theDate.getDay())),
            status:false
            }
            )
      theDate.setDate(theDate.getDate()+1)
  }
  return numWorkDays 
}


const handleBack =()=>{
  navigation.goBack();
}



useEffect(()=>{
  fetchDoctor()
  getTimeInterval('07:00:00', '18:30:00', 30)
  setDateList(getNumWorkDays(today, weekend))
}, [route])


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    fetchDoctor()
    }, [])


const CardDate =({item}:{item:any})=>{
  return <Pressable style={[styles.box, item.status===true?styles.active:[]]} onPress={()=>handleChooseDate(item.date)}>
<Text style={[styles.infoText, {fontSize:10}]}>{item.title}</Text>
<Text style={[styles.date, item.status===true?{color:colors.white}:[]]}>{item.day}</Text>
    </Pressable>
  }
  

  const CardTime =({item}:{item:any})=>{
    return <Pressable style={[styles.timeBox, item.status===true?styles.active:[] ]} onPress={()=>handleChooseTime(item.startTime)}>
  <Text style={[styles.time, item.status===true?{color:colors.white}:[]]}>{item.label}</Text>
      </Pressable>
    }
    

  return (<View style={[ {flex:1, backgroundColor:colors.white}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={18} color={colors.dark}  /> 
    <Text style={[styles.label, {fontSize:18}]}>Select Date & Time</Text>
<View/>
    </View>

<ScrollView>



    <View style={{backgroundColor:colors.white, marginBottom:5, paddingBottom:5}}>


<View style={{display:'flex', flexDirection:'row'}}>
  

<Image source={{ uri:content.image_url!==''?ImagesUrl+"/doctors/"+content.image_url:ImagesUrl+"/no.png"}} style={styles.profile} />

<View style={{marginLeft:5}}>

<View style={{width:(width/2)-20, height:130, marginTop:10, display:'flex', justifyContent:'space-between'}}>
  
  <Text style={[styles.title, {flexWrap:'wrap'}]}>{content.fullname}</Text>


<View >
  <Text style={[styles.infoText]}>{content.job_title}</Text>
  <Text style={[styles.infoText]}>at {office}</Text>
  </View>

  </View>


</View>
</View>


<View style={[styles.row, {marginTop:25, paddingBottom:0}]}>
<Text style={styles.infoText}>Select Date</Text>

<Text style={[styles.label]}>{getMonthYear()}</Text>
</View>

<View style={[styles.row]}>
<FlatList 
data={dateList}
horizontal
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardDate key={item.date} item={item} />}

/>

</View><Text style={[styles.infoText, {color:colors.red, marginLeft:10} ]}>{errors.date}</Text>

<View style={[styles.row, {marginTop:10}]}>
<Text style={styles.infoText}>Select Time</Text>

</View>


<View style={[styles.row, {paddingTop:0}]}>
<FlatList 
data={timeList}
horizontal
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardTime key={item.startTime} item={item} />}

/>

</View><Text style={[styles.infoText, {color:colors.red, marginLeft:10} ]}>{errors.time}</Text>

<View style={[styles.row, {marginTop:10}]}>
<Text style={styles.infoText}>Appointment for</Text>
</View>

<TextInput 
style={[styles.textInput, errors.title?globalStyles.error:[] ]}
placeholder='eg. Heart pain, Body ache, etc.'
 placeholderTextColor={colors.grey2} 
 
 autoCapitalize='none'
 keyboardType='email-address' 
  autoCorrect={false}
  value={user.title}
  onChangeText={text =>handleChange('title', text)}
   
 />


<View style={[styles.row, {marginTop:10}]}>
<Text style={styles.infoText}>Attach Document (eg. photo, report, etc) {user.image_url}</Text>
</View>





<TouchableOpacity activeOpacity={0.8} onPress={openImagePicker} style={[styles.appointment, {marginBottom:40}]}>
<FontAwesome5Icon name="paperclip" size={12} color={'#65D0EB'}  /> 
  <Text style={{color:'#65D0EB', marginLeft:20, fontWeight:'600'}}>Attach Now</Text>
</TouchableOpacity>



</View>

<Loader isModalVisible={loading} 
    type={modalType}

    message={errors.errorMessage} 
    action={Previous}
     />

</ScrollView>
<View style={{position:'absolute', bottom:0}}>


<PrimaryButton

title='Set Appointment'
handleAction={handleSubmit}

/>
</View>
    </View>
  )
}


export default Appointment

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
    width:160,
    height:160,
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
  active:{
    backgroundColor:colors.primary,
    color:colors.white
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
  }
})