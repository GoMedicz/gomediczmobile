
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, DATES, LANGUAGELIST, TIMES } from '../../components/data';
import { ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import ShoppingCart from '../../components/include/ShoppingCart';
import { PrimaryButton, PrimaryButtonChildren } from '../../components/include/button';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Appointment: undefined;
  DoctorReviews:undefined; 
  Feedback:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Appointment'>;
 const Appointment =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.goBack();
}

const handleNext =()=>{
  navigation.navigate('Feedback');
}


const CardDate =({item}:{item:any})=>{
  return <Pressable style={styles.box}>
<Text style={[styles.infoText, {fontSize:10}]}>{item.day}</Text>
<Text style={styles.date}>{item.date}</Text>
    </Pressable>
  }
  

  const CardTime =({item}:{item:any})=>{
    return <Pressable style={[styles.timeBox]}>
  <Text style={styles.time}>{item.time}</Text>
      </Pressable>
    }
    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.white}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={18} color={colors.dark}  /> 
    <Text style={[styles.label, {fontSize:18}]}>Select Date & Time</Text>
<View/>
    </View>

<ScrollView>



    <View style={{backgroundColor:colors.white, marginBottom:5, paddingBottom:5}}>


<View style={{display:'flex', flexDirection:'row'}}>
  
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png"}} style={styles.profile} />

<View style={{marginLeft:5}}>

<View style={{width:(width/2)-20, height:130, marginTop:10, display:'flex', justifyContent:'space-between'}}>
  <View>
  <Text style={styles.title}>Dr.</Text>
  <Text style={styles.title}>Joseph Williamson</Text>
  </View>



<View >
  <Text style={[styles.infoText]}>Cardiac Surgeon</Text>
  <Text style={[styles.infoText]}>at Apple Hospital</Text>
  </View>

  </View>


</View>
</View>




<View style={[styles.row, {marginTop:25, paddingBottom:0}]}>
<Text style={styles.infoText}>Select Date</Text>

<Text style={[styles.label]}>June 2020</Text>
</View>

<View style={[styles.row]}>
<FlatList 
data={DATES}
horizontal
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardDate key={item.id} item={item} />}

/>

</View>

<View style={[styles.row, {marginTop:10}]}>
<Text style={styles.infoText}>Select Time</Text>

</View>


<View style={[styles.row, {paddingTop:0}]}>
<FlatList 
data={TIMES}
horizontal
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardTime key={item.id} item={item} />}

/>

</View>

<View style={[styles.row, {marginTop:10}]}>
<Text style={styles.infoText}>Appointment for</Text>
</View>

<TextInput 
style={styles.textInput}
placeholder='eg. Heart pain, Body ache, etc.'
 placeholderTextColor={colors.grey2} />


<View style={[styles.row, {marginTop:10}]}>
<Text style={styles.infoText}>Attach Document (eg. photo, report, etc)</Text>
</View>


<View style={styles.appointment}>

<FontAwesome5Icon name="paperclip" size={12} color={'#65D0EB'}  /> 
  <Text style={{color:'#65D0EB', marginLeft:20, fontWeight:'600'}}>Attach Now</Text>
</View>

</View>



</ScrollView>
<View style={{position:'absolute', bottom:0}}>


<PrimaryButton

title='Submit Feedback'
handleAction={handleNext}

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