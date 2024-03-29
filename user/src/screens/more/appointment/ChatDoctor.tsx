
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

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  ChatDoctor: undefined;
  MyLabTest:undefined; 
  SearchLab:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'ChatDoctor'>;
 const ChatDoctor =({ route, navigation }:Props)=> {

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
  navigation.navigate('MyLabTest');
}





  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={18} onPress={handleBack} color={colors.dark}  /> 
    <Text style={styles.label}>Dr. Joseph Williams</Text>
    <View/>
    </View>

    <ImageBackground 
    source={{uri:ImagesUrl+'/hospital/hos.jpeg'}}
    
    style={styles.mapView}
    
    >

      <View style={styles.chatHeader}>


       <Image source={{ uri:ImagesUrl+"/doctors/doc1.png" }} style={styles.profile} /> 


      <Text style={[styles.infoText, {}]}>12 June 12:00pm | Chest Pain</Text>
    
      </View>
      

      <Pressable  style={[styles.box]}>

    <TextInput style={styles.textInput} placeholder='Write your message'/>

<MaterialIcon name="send" size={20} color={colors.primary}  />
      </Pressable>

    </ImageBackground>







    </View>
  )
}


export default ChatDoctor

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'flex-end',
    paddingHorizontal:20,
    paddingBottom:5,
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

  height:height-60,
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

  }
})