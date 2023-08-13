
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput, ImageBackground } from 'react-native'
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

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  RiderMapView: undefined;
  ChatDelivery:undefined; 
  SearchLab:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'RiderMapView'>;
 const RiderMapView =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleCart =()=>{
  navigation.navigate('ChatDelivery');
}

const handleNext =()=>{
  navigation.navigate('ChatDelivery');
}




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box]}>

    
<Text style={{color:colors.dark, fontSize:14, fontWeight:'600'}}>City Cure Labs</Text>

<View style={{display:'flex', flexDirection:'row', marginTop:5}}>
<MaterialIcon name="add-location" size={14} color={colors.grey}  />
<Text style={[styles.infoText]}>Wallington Bridge</Text>
</View>


<Text style={[styles.infoText, {marginTop:10, color:colors.navyBlue}]}>120+ Tests available</Text>


      </Pressable>
    }


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    

    <ImageBackground 
    source={{uri:ImagesUrl+'/hospital/hos.jpeg'}}
    
    style={styles.mapView}
    
    >
      

    
<View style={{position:'absolute', bottom:0, backgroundColor:MODE==='Light'?colors.white:colors.dark}}>


<View style={[globalStyles.rowCenterBetween, {padding:15}]}>


<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png" }} style={styles.profile} />

<View style={{marginLeft:10}}>
  <Text style={styles.label}>George Anderson</Text>
  <Text style={styles.infoText}>Delivery Partner Assign</Text>
  </View>
  </View>



</View>


<View style={globalStyles.rowCenterBetween}>

<PrimaryButtonChildren

handleAction={handleNext}
style={{width:width/2, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}}
>

<View style={[globalStyles.rowCenterBetween, { padding:10, width:width/2, justifyContent:'flex-start' }]}>
  <MaterialIcon name="call" size={18} color={colors.primary}  />
  <Text style={[globalStyles.buttonText, {marginLeft:80, color:colors.primary}]}>Call</Text> 
  </View>
</PrimaryButtonChildren>


<PrimaryButtonChildren
handleAction={handleNext}
style={{width:width/2}}
>

<View style={[globalStyles.rowCenterBetween, { padding:10, width:width/2, justifyContent:'flex-start' }]}>
  <MaterialIcon name="chat" size={18} color={colors.white}  />
  <Text style={[globalStyles.buttonText, {marginLeft:80}]}>Chat</Text> 
  </View>
</PrimaryButtonChildren>
</View>

</View>

    </ImageBackground>







    </View>
  )
}


export default RiderMapView

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
    color:MODE==='Light'?colors.dark:colors.white
  },
 
  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },



box:{
  width:width-100,
  backgroundColor:colors.white,
  display:'flex',
  padding:20,
  marginHorizontal:10,
  
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

  height:height,
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
    width:40,
    height:40,
    borderRadius:5,
    resizeMode:'contain'
  },
 content:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    paddingHorizontal:10, 
    paddingBottom:10,
    marginVertical:5
  }
})