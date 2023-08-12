
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl, MODE } from '../../components/includes';
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
  StoreProfile: undefined;
  Wallet:undefined; 
   };

type Props = NativeStackScreenProps<RootStackParamList, 'StoreProfile'>;

 const StoreProfile =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleNext =()=>{
  navigation.navigate('Wallet');
}


    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark,}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="menu" size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
   <Text style={styles.label}>My Profile</Text>
<View />
    </View>

<ScrollView>



<View style={{display:'flex', flexDirection:'row', alignItems:'flex-end',  backgroundColor:MODE==='Light'?colors.white:colors.dark, paddingVertical:5}}>
  

<Image source={{ uri:ImagesUrl+"/doctors/doc1.png"}} style={styles.profile} />


<View style={{ display:'flex', justifyContent:'flex-start', alignItems:'flex-start'}}>

<View style={styles.circle}>
<MaterialIcon name="photo-camera" size={14} color={MODE==='Light'?colors.white:colors.dark}  /> 
</View>

<Text style={[styles.label, { color:colors.primary, fontWeight:'700'}]}>Change Image</Text>


</View>



</View>


<View style={styles.card}>

<View style={[styles.textWrapper]}>
<MaterialIcon name="store" size={15} color={colors.icon}  /> 
  <TextInput style={styles.textInput} 
  placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='Well Life Store'
  />

</View>



<View style={styles.textWrapper}>
<MaterialIcon name="phone-iphone" size={15} color={colors.icon}  /> 
  <TextInput style={styles.textInput} 
  placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='+1987 654 3210'
  />

</View>


<View style={styles.textWrapper}>
<MaterialIcon name="mail" size={15} color={colors.icon}  /> 
  <TextInput style={styles.textInput} 
  placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='Email Address'
  />

</View>

</View>


<View style={styles.card}>
  
  <View style={[globalStyles.rowCenterBetween, {marginHorizontal:10, }]}>
  <Text style={[styles.infoText]}>Select Address on Map</Text>
  <MaterialIcon name="add-location" size={15} color={colors.primary}  /> 
  </View>

<View style={[styles.about]}>

  <Text
  style={[styles.label, {fontWeight:'500'}]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure temporibus </Text>

</View>

</View>



</ScrollView>

<View>
  <PrimaryButton
  handleAction={handleNext}
  title='Update'
  />
</View>
    </View>
  )
}


export default StoreProfile

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:MODE==='Light'?colors.white:colors.dark,
    height:60
  },
  label:{
    fontWeight:'600',
    fontSize:12,
    color:MODE==='Light'?colors.dark:colors.white,
  },
  h3:{
    fontWeight:'600',
    fontSize:10,
    marginVertical:3,
    color:MODE==='Light'?colors.dark:colors.white,
  },
  infoText:{
    fontSize:12,
    color:'#9E9E9E',
    fontWeight:'500'

  },

  profile:{
    width:(width/2)-40,
    height:120,
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
  card:{
    display:'flex',
     backgroundColor:MODE==='Light'?colors.white:colors.dark, 
     padding:10, 
     width:width
    },
  hospital:{
paddingVertical:10,
display:'flex',
justifyContent:'space-between',
alignItems:'center',
flexDirection:'row'
  },

  box:{
    backgroundColor:colors.white,
    width:(width/2)-15,
    padding:10,
    marginVertical:5,
    borderRadius:5

  },
  circle:{
    height:25,
    width:25,
    borderRadius:15,
    backgroundColor:colors.primary,
    marginBottom:10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },

  textWrapper:{
    height:45,
    width:width-40,
    marginVertical:8,
    marginHorizontal:10,
    backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    borderRadius:10

  },

  textInput:{
    color:MODE==='Light'?colors.dark:colors.white,
    marginLeft:10,
    fontSize:14,
    width:width-90,
    

  },
  about:{
    display:'flex', 
    width:width-20,
     backgroundColor:colors.white, 
     padding:10
    
    }
})