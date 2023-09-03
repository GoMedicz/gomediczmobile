
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import ShoppingCart from '../../components/include/ShoppingCart';
import { PrimaryButton, PrimaryButtonChildren } from '../../components/include/button';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  DoctorsDetails: undefined;
  DoctorReviews:undefined; 
  Appointment:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'DoctorsDetails'>;
 const DoctorsDetails =({ route, navigation }:Props)=> {

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

const handleAppointment =()=>{
  navigation.navigate('Appointment');
}

const handleReview =()=>{
  navigation.navigate('DoctorReviews');
}



  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={styles.header}>
    <MaterialIcon onPress={handleBack} name="arrow-back-ios" size={18} color={colors.dark}  /> 
    <MaterialIcon name="bookmark-outline" size={18} color={colors.dark}  /> 

    </View>

<ScrollView>



    <View style={{backgroundColor:colors.white, marginBottom:5, paddingBottom:5}}>


<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
  
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png"}} style={styles.profile} />

<View style={{marginLeft:5}}>
  <Text style={[styles.infoText]}>Experience</Text>
  <Text style={styles.label}>18 years</Text>

  <Text style={[styles.infoText, { marginTop:15}]}>Consultancy Fees</Text>
  <Text style={styles.label}>$28</Text>
</View>
</View>




<View style={[styles.row]}>
  <View style={{width:(width/2)-20}}>
  <Text style={styles.title}>Dr.</Text>
  <Text style={styles.title}>Joseph Williamson</Text>
  </View>


  <View style={{marginRight:0}}>
    <Text style={styles.infoText}>Feedbacks</Text>

    <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:5}}>

      <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
    <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
    <Text style={[styles.label, {color:'#EEA31E'}]}>4.5</Text>
    <Text style={[styles.infoText, {marginRight:30}]}> (124)</Text>
    </View>

    <MaterialIcon name="arrow-forward-ios" size={12} color={colors.grey}  />
    </View>


  </View>
</View>




<View style={[styles.row,{paddingVertical:5}]}>
<View style={{display:'flex',  justifyContent:'flex-end', alignItems:'flex-end'}}>

<Text style={styles.infoText}>Cardiac Surgeon</Text>
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

<Text style={[styles.label, {marginVertical:4}]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum alias placeat velit, laudantium at tempore tenetur fuga nam perferendis pariatur doloribus numquam ratione enim accusamus minus, sequi asperiores modi quibusdam! Lorem ipsum dolor sit amet consectetur, sequi asperiores modi quibusdam! Lorem ipsum dolor sit  </Text>

</View>




<View style={styles.card}>
<Text style={styles.infoText}>Service at</Text>


<View style={[styles.hospital, {marginTop:5}]}>
<View>
  <Text style={styles.label}>Apple Hospital</Text>
  <Text style={[styles.infoText, {color:colors.grey1, opacity:0.6, marginTop:2}]}>JJ Towers, Johnson street, Hemilton</Text>
  </View>
    <MaterialIcon name="arrow-forward-ios" size={12} color={colors.grey}  />
</View>


<View style={styles.hospital}>
<View>
  <Text style={styles.label}>Seven Star Clinic</Text>
  <Text style={[ {color:colors.grey1, opacity:0.6, marginTop:2, fontSize:10}]}>Hemilton Bridge City Point, Hemilton</Text>
  </View>
    <MaterialIcon name="arrow-forward-ios" size={12} color={colors.grey}  />
</View>


<View>
  <Text style={[styles.label, {color:colors.primary}]}>+1 More</Text>
</View>
</View>


<View style={styles.card}>
<Text style={styles.infoText}>Service at</Text>

<View style={{marginTop:10}}>
<Text style={styles.h3}>Hypertension Treatment</Text>
<Text style={styles.h3}>COPD Treatment</Text>
<Text style={styles.h3}>Diabetes Management</Text>
<Text style={styles.h3}>ECG</Text>
<Text style={styles.h3}>Obesity Treatment</Text>
</View>

<View>
  <Text style={[styles.label, {color:colors.primary, marginVertical:10}]}>+5 More</Text>
</View>

</View>



<View style={styles.card}>
<Text style={styles.infoText}>Specification</Text>

<View style={{marginTop:10}}>
<Text style={styles.h3}>General Physician</Text>
<Text style={styles.h3}>Family Physician</Text>
<Text style={styles.h3}>Cardiologist</Text>
<Text style={styles.h3}>Consultant Physician</Text>
<Text style={styles.h3}>Diabetologist</Text>
</View>

<View>
  <Text style={[styles.label, {color:colors.primary, marginVertical:10}]}>+1 More</Text>
</View>

</View>


<PrimaryButtonChildren

handleAction={handleAppointment}
>

<View style={globalStyles.rowCenterCenter}>
<MaterialIcon name="calendar-today" size={12} color={colors.white}  />
  <Text style={[globalStyles.buttonText, {marginLeft:20}]}>Book Appointment now</Text>
</View>

</PrimaryButtonChildren>


</ScrollView>
    </View>
  )
}


export default DoctorsDetails

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