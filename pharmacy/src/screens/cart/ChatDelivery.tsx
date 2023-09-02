
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, TextInput, ImageBackground } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import colors from '../../assets/colors';
import { ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  ChatDelivery: undefined;
  AccountProfile:undefined; 
  SearchLab:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'ChatDelivery'>;
 const ChatDelivery =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)


  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE)


const handleBack =()=>{
  navigation.goBack();
}


const handleNext =()=>{
  navigation.navigate('AccountProfile');
}

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
      <View style={globalStyles.rowCenterCenter}>
    <MaterialIcon name="arrow-back-ios" size={18} onPress={handleBack} color={MODE==='Light'?colors.dark:colors.white} /> 
    <Text style={[dynamicStyle.label, {marginLeft:75}]}>George Anderson</Text>
    </View>

    <View/>
    </View>

    <ImageBackground 
    source={{uri:ImagesUrl+'/hospital/hos.jpeg'}}
    
    style={styles.mapView}
    
    >

      <View style={styles.chatHeader}>


       <Image source={{ uri:ImagesUrl+"/doctors/doc1.png" }} style={styles.profile} /> 


      <Text style={[styles.infoText, {marginLeft:110}]}>Delivery Partner</Text>
    
      </View>
      

      <Pressable onPress={handleNext} style={[styles.box,{
  backgroundColor:MODE==='Light'?colors.white:colors.lightDark}]}>

    <TextInput style={[styles.textInput, {color:MODE==='Light'?colors.dark:colors.white}]} 
    placeholderTextColor={MODE==='Light'?colors.grey:colors.white}
    placeholder='Write your message'/>

<MaterialIcon name="send" size={20} color={colors.primary}  />
      </Pressable>

    </ImageBackground>
    </View>
  )
}


export default ChatDelivery

const styles = StyleSheet.create({

  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'
  },

box:{
  width:width,
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  padding:10,
  position:'absolute',
  bottom:0,
  height:45,
  alignItems:'center'
  
    },

    textInput:{
      width:width - 40,
      fontSize:12,
      fontWeight:'600',
    },

mapView:{
  height:height-60,
  width:width
},

  profile:{
    width:60,
    height:60,
    borderRadius:5,
    resizeMode:'contain',
    position:'absolute',
    left:40,
    top:-40

  },
  chatHeader:{
    display:'flex',
     justifyContent:'center', 
     alignItems:'flex-start', 
     backgroundColor:'#eef3F9', 
     width:width,
     height:30

  }
})