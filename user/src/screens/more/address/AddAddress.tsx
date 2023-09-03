
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput, ImageBackground } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../../components/data';
import { ImagesUrl } from '../../../components/includes';
import { globalStyles } from '../../../components/globalStyle';
import ModalDialog from '../../../components/modal';
import ShoppingCart from '../../../components/include/ShoppingCart';
import { PrimaryButton } from '../../../components/include/button';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );

      

type RootStackParamList = {
  AddAddress: undefined;
  SavedItems:undefined; 
  SearchLab:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'AddAddress'>;
 const AddAddress =({ route, navigation }:Props)=> {

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
  navigation.navigate('SavedItems');
}





  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<SafeAreaView style={[ {flex:1, backgroundColor:colors.white}]}>
    
    <View style={styles.header}>
      <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
    <MaterialIcon name="arrow-back-ios" size={18} onPress={handleBack} color={colors.dark}  /> 
    <Text style={[styles.label, {marginLeft:10}]}>Cancel</Text>
    </View>

    <Text style={[styles.label, {color:colors.primary}]}>Continue</Text>
    </View>

    <ImageBackground 
    source={{uri:ImagesUrl+'/hospital/hos.jpeg'}}
    
    style={styles.mapView}
    
    >

    
      <View style={styles.addItem}>

      <View style={{padding:10}}>

    <View style={[globalStyles.rowCenterBetween, {marginBottom:10}]}>

      <View style={globalStyles.rowCenterCenter}>
      <MaterialIcon name="add-location" size={25} color={colors.icon}  /> 
        <Text style={[styles.infoText, {marginLeft:10}]}>Paris, France</Text>
      </View>
    <MaterialIcon name="close" size={18} color={colors.dark}  /> 
    </View>


    <Text style={styles.infoText}>Select Address Type</Text>


    <View style={styles.addWrapper}>
      <View style={styles.addType}>
      <MaterialIcon name="home" size={20} color={colors.icon}  /> 
        <Text style={[styles.label, {marginLeft:5, fontSize:10}]}>Home</Text>
      </View>


      <View style={styles.addType}>
      <MaterialIcon name="home" size={20} color={colors.icon}  /> 
        <Text style={[styles.label, {marginLeft:5, fontSize:10}]}>Office</Text>
      </View>


      <View style={styles.addType}>
      <MaterialIcon name="home" size={20} color={colors.icon}  /> 
        <Text style={[styles.label, {marginLeft:5, fontSize:10}]}>Other</Text>
      </View>

    </View>

    

    <View style={styles.inputWrapper}>
  <Text style={[styles.label, {color:colors.grey, fontSize:10, marginBottom:10}]}>Enter Address Details</Text>
  <TextInput placeholder='Address' style={styles.textInput} />
  </View>



      </View>

     
      <PrimaryButton
      handleAction={handleNext}
      title='Save'
      />
      </View>



    </ImageBackground>

    





    </SafeAreaView>
  )
}


export default AddAddress

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    paddingBottom:5,
    backgroundColor:colors.white,
    height:50
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
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  padding:10,
  height:45,
  alignItems:'center'
  
    },

    textInput:{
      height:45,
  backgroundColor:colors.lightSkye,
  padding:10,
  borderRadius:5,
  color:colors.grey,
  fontWeight:'600'


    },

catItems:{

position:'absolute',
bottom:30,

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
mapView:{

  flex:1

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
    height:50,
    borderRadius:5,
    resizeMode:'contain',
    position:'absolute',
    left:40,
    top:-30

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
  chatHeader:{
    display:'flex',
     justifyContent:'center', 
     alignItems:'center', 
     backgroundColor:'#eef3F9', 
     width:width,
     height:30

  },
  addItem:{

    position:'absolute',
    bottom:0,
    backgroundColor:colors.white,

  },
  addType:{
    height:35,
    backgroundColor:colors.lightSkye,
    borderRadius:5,
    paddingHorizontal:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
    
  },
  addWrapper:{
display:'flex',
flexDirection:'row',
justifyContent:'space-evenly',
marginVertical:10

  },
  inputWrapper:{
    marginVertical:5
  
  },
})