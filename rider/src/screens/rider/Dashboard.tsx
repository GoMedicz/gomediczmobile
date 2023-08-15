
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput, ImageBackground, StatusBar } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl, MODE } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import ShoppingCart from '../../components/include/ShoppingCart';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Dashboard: undefined;
  AcceptDelivery:undefined; 
  SearchLab:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
 const Dashboard =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleCart =()=>{
  navigation.navigate('AcceptDelivery');
}

const handleNext =()=>{
  navigation.navigate('AcceptDelivery');
}





  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<SafeAreaView style={[ {flex:1, backgroundColor:'#F0F0F0'}]}>
    <StatusBar barStyle={'dark-content'} />
  

<ScrollView>
    <ImageBackground 
    source={{uri:ImagesUrl+'/hospital/hos.jpeg'}}
    
    style={styles.mapView}
    
    >
  <View style={styles.header}>

<Image source={{ uri:ImagesUrl+"/doctors/doc1.png" }} style={styles.profile} /> 

<View style={{marginLeft:10}}>
<Text style={styles.label}>64 Orders | $302.00</Text>
<Text style={styles.infoText}>Today</Text>
</View>

</View>
     
      <View style={styles.btn}>
<Pressable onPress={handleNext}  style={styles.circleWrapper}>
  <View style={styles.circle}>
    <Text style={[styles.label, {color:colors.white, fontSize:14, textAlign:'center'}]}>Go</Text>
    <Text style={[styles.label, {color:colors.white, fontSize:14, textAlign:'center'}]}> Online</Text>
  </View>
</Pressable>
</View>
      <View style={styles.box}>


      <MaterialIcon name="circle" size={14} color={colors.red}  />

    <Text style={[styles.label, {marginHorizontal:10, color:
  MODE==='Light'?colors.dark:colors.white}]}> You're Offline</Text>

<MaterialIcon name="keyboard-arrow-up" size={20} color={
  MODE==='Light'?colors.dark:colors.white}  />
      </View>

    </ImageBackground>


    </ScrollView>
    </SafeAreaView>
  )
}


export default Dashboard

const styles = StyleSheet.create({

  header:{

    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingHorizontal:10,
    paddingBottom:5,
    backgroundColor:'#F0F0F0',
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
  backgroundColor:MODE==='Light'?colors.white:colors.dark,
  display:'flex',
  flexDirection:'row',
  justifyContent:'center',
  paddingVertical:20,
  position:'absolute',
  bottom:0,
  borderTopLeftRadius:10,
  borderTopRightRadius:10,
  alignItems:'center',
  zIndex:1,

  shadowColor: "#000",
  shadowOffset: {
    width: 3,
    height: 0
  },
  
  shadowOpacity: 0.5,
  shadowRadius: 6,
  elevation: 5,
  
    },

    textInput:{
      width:width - 40,
      fontSize:12,
      fontWeight:'600',


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

  height:height-20,
  width:width

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
    height:50,
    borderRadius:10,
    resizeMode:'contain',

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
  circleWrapper:{
    height:90,
    width:90,
    borderRadius:45,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#B3B7EB',

  },
  circle:{
    height:70,
    width:70,
    borderRadius:35,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:colors.primary,
    zIndex:1
  },
  btn:{
    width:width,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:100
  }
})