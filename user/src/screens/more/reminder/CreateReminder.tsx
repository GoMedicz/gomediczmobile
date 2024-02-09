
import React, { useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Platform, Dimensions, Pressable, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../../assets/colors';
import { ServerUrl, configToken } from '../../../components/includes';
import { globalStyles } from '../../../components/globalStyle';
import { PrimaryButton } from '../../../components/include/button';
import ChooseDays from './ChooseDays';
import { getData, getTime } from '../../../components/globalFunction';
import Loader from '../../../components/loader';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );


      
type RootStackParamList = {
  CreateReminder: undefined;
  Cart:undefined; 
  Address:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'CreateReminder'>;
 const CreateReminder =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)

const [modalType, setModalType] = useState('load')
  const [refreshing, setRefreshing] = useState(false)
  const [reminder, setReminder] = useState({
    isDays:false,
    isTime:false,
    pillName:'',
    time: '' as any,
    days:[] as any
  })

  const [times, setTimes]= useState([] as any)
  const [errors, setErrors] = useState({
    pillName:'',
    time:'',
    days:'',
    errorMessage:''
  })
  const [days, setDays] = useState([
    {day:'Mon', id:1, status:false},
    {day:'Tue', id:2, status:false},
    {day:'Wed', id:3, status:false},
    {day:'Thur', id:4, status:false},
    {day:'Fri', id:5, status:false},
    {day:'Sat', id:6, status:false},
    {day:'Sun', id:7, status:false},
  ])




  const hideDatePicker = () => {
   
    setReminder({...reminder, isTime:false })
   

  };

  const handleConfirm = (date:Date) => {
    setReminder({...reminder, time:date.toISOString().slice(11,19), isTime:false })

  };



  const showTimepicker = () => {
    setReminder({...reminder, isTime:true})
  };

const handleSelectDays =(id:number)=>{

  const currentContent = days.map((list:any)=>{
                 
    if(list.id ===id){
        return {...list, 
          status:!list.status
        }
    }
     return list
      })
setDays(currentContent)

}

const handleBack =()=>{
  navigation.goBack();
}

const handleNext =()=>{
  navigation.navigate('Address', {
    code:'cds',
  }); 
}


const handleChange =(name:string, text:string)=>{
  
  setReminder({...reminder, [name]:text})
  setErrors({...errors, [name]:'', errorMessage:''})
}

  
useEffect(()=>{
 let d  = days.filter((item:any)=>item.status==true)
 setReminder({...reminder, days:d})
}, [days])




const createNewRow =()=>{

  if(reminder.time!==''){
  setTimes(times.concat({
     code:Math.random().toString(36).substring(2, 9),
      time:reminder.time
    
    }))
setReminder({...reminder, time:''})
  }
}

const removeRow=()=>{

  if(times.length>=1){
    let item = times.splice(1, times.length-1)
    setTimes(item)
    }
   } 

   const handleClose =()=>{
    setLoading(false)
   // navigation.goBack();
  }

   const handleSubmit =async()=>{
    let error = {
      ...errors,  
    }
  
    var errormessage = [];
  let msg = 'This field is required';
  
  if(!reminder.pillName){
    error.pillName = msg;
     errormessage.push(msg);
  }
  
  
  if(times.length==0){
    error.time = msg;
     errormessage.push(msg);
  }
  
  let day = days.filter((item:any)=>item.status==true)
 
  if(day.length==0){
    error.days = msg;
     errormessage.push(msg);
  }

          setErrors(error)
          if (errormessage.length===0) {
  
  setLoading(true)
  
  let config = await configToken()
  const code = await getData('code');


  let records = []
     
  for (var i = 0; i < day.length; i++){
    for (var j = 0; j < times.length; j++) {

        records.push({
          day:day[i].day,
          time:times[j].time
         
        })
      }
      }
      const fd = new FormData();
      fd.append('pillName',  reminder.pillName)
      fd.append('user_code',  code)
      fd.append('days',  JSON.stringify(days, null, 2))
      fd.append('times',  JSON.stringify(times, null, 2))
      fd.append('itemse',  JSON.stringify(records, null, 2))

   /*    const fd  ={
        items:JSON.stringify(records),
       pillName:reminder.pillName,
       user_code:code
      } */

      let url = ServerUrl+'/api/user/reminder/add';
     axios.post(url, fd, config)
     .then(response =>{
       if(response.data.type === 'success'){
  
        setModalType('Success')
        setErrors({...errors,  errorMessage: response.data.message})
          // navigation.navigate('BottomTabs');  
                 } else{
                  
                   setModalType('Failed')
                   setErrors({...errors,  errorMessage: response.data.message})
                 }   
             })
             .catch((error)=>{
              setModalType('Failed')
              setErrors({...errors,  errorMessage:error.message})
             
             })
            }
  }

  return (<SafeAreaView style={[ {flex:1, backgroundColor:colors.white}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios"  onPress={handleBack} size={18} color={colors.dark}  /> 
    <Text style={styles.label}>Create Pill Reminders</Text>

    <View/>
    </View>


<ScrollView>
  

<View style={styles.row}>
<Text style={[styles.infoText,{color:colors.grey, fontSize:12, marginBottom:10}]}>Pill Name</Text>

<View  style={[styles.textWrapper, errors.pillName?globalStyles.error:[]]}>
  <TextInput 
  style={styles.textInput}
  placeholder='Enter Pill Name'
  placeholderTextColor={colors.grey3}
  autoCapitalize='none'
  keyboardType='email-address' 
   autoCorrect={false}
   value={reminder.pillName}
   onChangeText={text =>handleChange('pillName', text)}
  
  />
</View>

</View>

<View style={styles.row}>
<Text style={[styles.infoText,{color:colors.grey, fontSize:12, marginBottom:5}]}>Select Days</Text>

<Pressable onPress={()=>setReminder({...reminder, isDays:!reminder.isDays})} style={[styles.dateWrapper, errors.days?globalStyles.error:[]]}>
<MaterialIcon name="event" size={14} color={colors.icon}  /> 

{reminder.days.length!==0?
 <Text style={[styles.label, {color:colors.grey, fontSize:12}]}> {String(reminder.days.map((item:any)=>item.day))}</Text>:<Text style={[styles.label, {color:colors.grey, fontSize:12}]}>Days </Text>}


</Pressable>

</View>


<Loader isModalVisible={loading} 
    type={modalType}

    message={errors.errorMessage} 
    action={handleClose}
     />
<View style={styles.row}>
<Text style={[styles.infoText,{color:colors.grey, fontSize:12, marginBottom:5}]}>Select Time</Text>

 
<DateTimePickerModal
        isVisible={reminder.isTime}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> 
      
<View style={globalStyles.rowCenterBetween}>

<Pressable onPress={showTimepicker} style={[styles.dateWrapper, {width:width-70}, errors.time?globalStyles.error:[]]}>
<MaterialIcon name="notifications" size={14} color={colors.icon}  /> 
 <Text style={[styles.label, {color:colors.grey, fontSize:12, marginLeft:10}]}>{reminder.time!==''?reminder.time:'Time'}</Text>
</Pressable>


<TouchableOpacity onPress={createNewRow} activeOpacity={0.9} style={styles.addMore}>
  
<MaterialIcon name="add"   size={20} color={colors.white}  /> 

</TouchableOpacity>

</View>


{times.map((ls:any, index:number)=>
<View style={globalStyles.rowCenterBetween} key={index}>


<View style={[styles.dateWrapper, {width:width-70}]}>
<MaterialIcon name="notifications" size={14} color={colors.icon}  /> 
 <Text style={[styles.label, {color:colors.grey, fontSize:12, marginLeft:10}]}>{getTime(ls.time)}</Text>
</View>

<TouchableOpacity onPress={removeRow} activeOpacity={0.9} style={[styles.addMore, {backgroundColor:colors.red}]}>
  
<MaterialIcon name="remove"  size={20} color={colors.white}  /> 
</TouchableOpacity>

</View>)}





</View>


</ScrollView>

<View>
  <PrimaryButton 
  handleAction={handleSubmit}
  title='Set Reminder'
  />
</View>


<ChooseDays
isModalVisible={reminder.isDays}

>
  <View style={{marginTop:10}}>

<View  style={[globalStyles.rowCenterBetween, {marginHorizontal:10}]}>
<View/>
  <Text style={styles.label}>Select Days</Text>
<MaterialIcon onPress={()=>setReminder({...reminder, isDays:!reminder.isDays})} name="close" size={14} color={colors.dark}  /> 
</View>


<View style={styles.daysWrapper}>
{days.map((item:any, index:number)=><TouchableOpacity activeOpacity={0.8} key={index} onPress={()=>handleSelectDays(item.id)} >
  <Text style={[styles.day, {color:item.status?colors.primary:colors.dark}]}>{item.day}</Text></TouchableOpacity>)}

</View>


  <PrimaryButton 
  title='Done'
  handleAction={()=>setReminder({...reminder, isDays:!reminder.isDays})}
  />

  </View>
</ChooseDays>
    </SafeAreaView>
  )
}


export default CreateReminder

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
  justifyContent:'flex-start',
  alignItems:'center',
  padding:10,
  
    },

catItems:{
flex:1,
margin:5,

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

  circle:{
    height:50,
    width:50,
    borderRadius:25,
    backgroundColor:colors.lightSkye,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
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
  row:{
    width:width,
    paddingHorizontal:10,
    paddingVertical:5
  },
  textWrapper:{

  },
  textInput:{
    height:45,
    backgroundColor:colors.lightSkye,
    padding:10,
    color:colors.dark,
    borderRadius:5,
    marginVertical:5
  },
  dateWrapper:{
    height:45,
    backgroundColor:colors.lightSkye,
    padding:10,
    color:colors.dark,
    borderRadius:5,
    marginVertical:5,
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  addMore:{
    height:45,
    width:45,
    borderRadius:5,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.primary,

    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4
    },
    
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },

daysWrapper:{
padding:30,
display:'flex',
flexDirection:'row',
flexWrap:'wrap',
alignItems:'flex-start',
justifyContent:'space-between'

},

  day:{
    fontSize:20,
    fontWeight:'700',
    color:colors.dark,
    marginHorizontal:25,
    marginVertical:10,
    textAlign:'center'
  }
})