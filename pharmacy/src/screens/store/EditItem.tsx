
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
  EditItem: undefined;
  StoreItems:undefined; 
   };

type Props = NativeStackScreenProps<RootStackParamList, 'EditItem'>;

 const EditItem =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleNext =()=>{
  navigation.navigate('StoreItems');
}


    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
   <Text style={styles.label}>Edit Item</Text>


<View  style={globalStyles.rowCenterCenter}>


<MaterialIcon name="star" size={14} color={colors.rating}  /> 
<Text style={[styles.label, {color:colors.rating, marginLeft:10}]}>4.5</Text>
</View>
    </View>

<ScrollView>



<View style={{display:'flex', flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-start', marginHorizontal:10, backgroundColor:MODE==='Light'?colors.white:colors.dark, paddingVertical:5}}>
  

<Image source={{ uri:ImagesUrl+"/products/med4.png"}} style={styles.profile} />


<View style={{ display:'flex', justifyContent:'flex-start', alignItems:'flex-start'}}>

<View style={styles.circle}>
<MaterialIcon name="photo-camera" size={14} color={MODE==='Light'?colors.white:colors.dark}  /> 
</View>

<Text style={[styles.label, { color:colors.primary, fontWeight:'600'}]}>Change Image</Text>


</View>



</View>


<View style={[styles.card, {paddingTop:20}]}>
<Text style={[styles.infoText, {paddingVertical:5}]}>Product ID</Text>
<View style={[styles.textWrapper]}> 
  <TextInput style={styles.textInput} 
  placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='DW14114'
  />

</View>



<Text style={[styles.infoText, {paddingVertical:5}]}>Product Name</Text>
<View style={styles.textWrapper}>
  <TextInput style={styles.textInput} 
  placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='+1987 654 3210'
  />

</View>

</View>


<View style={[styles.card, {marginVertical:5}]}>
<Text style={[styles.infoText, {paddingVertical:5}]}>Item Category</Text>

<View style={[styles.textWrapper]}> 
  <TextInput style={styles.textInput} 
  placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='DW14114'
  />

<MaterialIcon name="search" size={14} color={MODE==='Light'?colors.grey2:colors.dark}  /> 
</View>



<Text style={[styles.infoText, {paddingVertical:5}]}>Sub Category</Text>
<View style={styles.textWrapper}>
  <TextInput style={styles.textInput} 
  placeholderTextColor={MODE==='Light'?colors.dark:colors.grey}
  placeholder='+1987 654 3210'
  />

<MaterialIcon name="search" size={14} color={MODE==='Light'?colors.grey2:colors.dark}  /> 
</View>

</View>




<View style={[styles.card, {marginVertical:5}]}>
  
<Text style={[styles.infoText]}>Description</Text>

<View style={[styles.about]}>

  <TextInput
  multiline={true}
  style={[styles.label, {fontWeight:'500'}]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure temporibus Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure temporibus </TextInput>

</View>

</View>

<View style={[globalStyles.rowCenterBetween,{paddingHorizontal:10, backgroundColor:MODE==='Light'?colors.white:colors.dark, height:50,  width:width}]}>

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png"}} style={styles.cartImage} />

<Text style={{fontSize:12, fontWeight:'700', marginLeft:30, color:MODE==='Light'?colors.dark:colors.white}}>Prescription Uploaded</Text>
</View>

<View style={globalStyles.rowCenterCenter}>

<View style={styles.slider} />
  <View style={styles.slides} />
</View>

</View>





<View style={[styles.card, {marginVertical:5}]}>
  
<Text style={[styles.infoText, {fontWeight:'600'}]}>Set Pricing</Text>

<View style={[globalStyles.rowCenterBetween, {marginTop:10}]}>
  <Text style={[styles.infoText, {width:width/2}]}>Pricing</Text>
  <Text style={[styles.infoText, {width:width/2}]}>Quantity</Text>
</View>

<View style={[globalStyles.rowCenterBetween, {marginTop:5}]}>
  <TextInput placeholder='$3.50' style={styles.qty} placeholderTextColor={colors.grey} />
  <TextInput placeholder='$3.50' style={styles.qty} placeholderTextColor={colors.grey} />
</View>

<View style={[globalStyles.rowCenterBetween, {marginTop:5}]}>
  <TextInput placeholder='$3.50' style={styles.qty} placeholderTextColor={colors.grey} />
  <TextInput placeholder='$3.50' style={styles.qty} placeholderTextColor={colors.grey} />
</View>



<View style={{width:width-40, marginVertical:5, justifyContent:'flex-end', display:'flex', alignItems:'flex-end', marginHorizontal:20 }}>
<View style={styles.addItem}>
<MaterialIcon name="add" size={18} color={MODE==='Light'?colors.white:colors.dark}  /> 
</View>
</View>


</View>



</ScrollView>

<View>
  <PrimaryButton
  handleAction={handleNext}
  title='Update Item'
  />
</View>
    </View>
  )
}


export default EditItem

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
    color: MODE==='Light'?colors.grey:colors.white,
    fontWeight:'500'

  },

  profile:{
    width:(width/2)-40,
    height:120,
    resizeMode:'contain',
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    backgroundColor:colors.white
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
    width:width-20,
    marginVertical:8,
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
    width:width-60,
    

  },
  about:{
    display:'flex', 
    width:width-20,
     backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark, 
     padding:10,
     borderRadius:10,
     marginVertical:10,
     height:100
    
    },

cartImage:{
  height:30,
  width:30,
  resizeMode:'cover',
  },

  slider:{
    height:15,
    width:40,
    borderRadius:10,
    backgroundColor:colors.navyBlue,
    opacity:0.6
  },
  slides:{
    height:20,
    width:20,
    borderRadius:10,
    backgroundColor:colors.navyBlue,
    position:'absolute',
    right:0,

shadowColor: "#000",
shadowOffset: {
  width: 0,
  height: 2
},

shadowOpacity: 0.25,
shadowRadius: 2,
elevation: 5,
  },

  qty:{
    width:(width/2)-20,
    height:45,
    backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark,
    borderRadius:10,
    padding:10,
    color:MODE==='Light'?colors.dark:colors.white,
    marginVertical:5,

  },
  addItem:{
    height:35,
    width:35,
    borderRadius:5,
    backgroundColor:colors.navyBlue,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    


  }
})