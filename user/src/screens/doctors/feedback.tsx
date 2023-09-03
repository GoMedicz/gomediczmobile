
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
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Appointment'>;
 const Feedback =({ route, navigation }:Props)=> {

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
  navigation.navigate('DoctorReviews');
}


    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.white}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={18} onPress={handleBack} color={colors.dark}  /> 
    <Text style={styles.label}>Give Feedback</Text>
<View/>
    </View>

<ScrollView>



    <View style={{backgroundColor:colors.white, marginBottom:5, paddingBottom:5}}>


<View style={{display:'flex', flexDirection:'row'}}>
  
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png"}} style={styles.profile} />

<View style={{marginLeft:0}}>

<View style={{width:(width/2)-40, height:120,  display:'flex', justifyContent:'space-between', marginTop:40}}>
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
<Text style={styles.infoText}>Overall Experience</Text>
</View>


<View style={{display:'flex', flexDirection:'row', marginHorizontal:10, marginTop:20}}>
<MaterialIcon name="star" size={30} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={30} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={30} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={30} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={30} color={'#EEA31E'}  />
</View>




<View style={[styles.row, {marginTop:10}]}>
<Text style={styles.infoText}>Brief your experience</Text>

</View>

<View style={styles.textAreaWrapper}>


<TextInput 

placeholder='Write your experience'
multiline={true}
numberOfLines={10}
style={styles.textArea}
placeholderTextColor={colors.grey}


/>
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


export default Feedback

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