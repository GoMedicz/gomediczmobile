
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
import { PrimaryButton } from '../../components/include/button';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  AcceptDelivery: undefined;
  OrderDelivered:undefined; 
  SearchLab:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'AcceptDelivery'>;
 const AcceptDelivery =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleCart =()=>{
  navigation.navigate('OrderDelivered');
}

const handleNext =()=>{
  navigation.navigate('OrderDelivered');
}





  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:'#F0F0F0'}]}>
    <StatusBar barStyle={'dark-content'} />
  

<ScrollView>
    <ImageBackground 
    source={{uri:ImagesUrl+'/hospital/hos.jpeg'}}
    
    style={styles.mapView}
    
    >


  {/* <View  style={styles.box}>


<View style={{width:width-40, padding:10}}>

<View style={globalStyles.rowCenterBetween}>
    <Text style={styles.label}>16.5 km <Text style={styles.infoText}>(12 min)</Text></Text>

    <View style={globalStyles.rowCenterCenter}>
    <MaterialIcon name="navigation" size={18} color={colors.navyBlue}  />
      <Text style={[styles.label, {color:colors.navyBlue, marginLeft:10}]}>Direction</Text>
    </View>
  </View>


  <View style={[styles.row,{marginTop:30}]}>

  <MaterialIcon name="add-location" size={18} color={colors.navyBlue}  />

  <View style={{marginLeft:30}}>
    <Text style={styles.label}>Well Life Store</Text>
    <Text style={styles.infoText}>1024, Hemilton Street</Text>
    <Text style={styles.infoText}>Union Market, USA</Text>
  </View>
  </View>


  <View style={[styles.row,{marginBottom:10}]}>

<MaterialIcon name="navigation" size={18} color={colors.navyBlue}  />

<View style={{marginLeft:30}}>
  <Text style={styles.label}>Samantha Smith</Text>
  <Text style={styles.infoText}>1024, Hemilton Street</Text>
  <Text style={styles.infoText}>Union Market, USA</Text>
</View>
</View>


</View>




    <PrimaryButton 
    handleAction={handleNext}
    style={{
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,
      width:width-20
    }}
    title='Accept Delivery (0:15)'
    />
      </View> 

<View style={{width:width-20, alignItems:'flex-end', marginTop:40}}>
<View style={styles.cart}>
<MaterialIcon name="shopping-cart" size={16} color={MODE==='Light'?colors.white:colors.dark}  />
</View>
</View> */}

 <View  style={styles.box}>


<View style={{width:width-40, padding:10}}>

<View style={globalStyles.rowCenterBetween}>
    <Text style={styles.label}>16.5 km <Text style={styles.infoText}>(12 min)</Text></Text>

    <View style={globalStyles.rowCenterCenter}>
    <MaterialIcon name="navigation" size={18} color={MODE==='Light'?colors.navyBlue:colors.primary}   />
      <Text style={[styles.label, {color:MODE==='Light'?colors.navyBlue:colors.primary, marginLeft:10}]}>Direction</Text>
    </View>
  </View>


 
  <View style={[globalStyles.rowCenterBetween,{marginVertical:30}]}>

<View style={globalStyles.rowCenterCenter}>
<MaterialIcon name="add-location" size={18} color={MODE==='Light'?colors.navyBlue:colors.primary}  />

<View style={{marginLeft:30}}>
  <Text style={styles.label}>Samantha Smith</Text>
  <Text style={styles.infoText}>1024, Hemilton Street</Text>
  <Text style={styles.infoText}>Union Market, USA</Text>
</View>
</View>

<View style={globalStyles.rowCenterCenter}>


<MaterialIcon name="call" size={18} color={MODE==='Light'?colors.navyBlue:colors.primary}   style={{marginRight:10}} />

<MaterialIcon name="chat" size={18} color={MODE==='Light'?colors.navyBlue:colors.primary}   />
</View>
</View>


  <View style={[globalStyles.rowCenterBetween,{marginBottom:10}]}>

<View style={globalStyles.rowCenterCenter}>
<MaterialIcon name="navigation" size={18} color={MODE==='Light'?colors.navyBlue:colors.primary}   />

<View style={{marginLeft:30}}>
  <Text style={styles.label}>Samantha Smith</Text>
  <Text style={styles.infoText}>1024, Hemilton Street</Text>
  <Text style={styles.infoText}>Union Market, USA</Text>
</View>
</View>

<View style={globalStyles.rowCenterCenter}>


<MaterialIcon name="call" size={18} color={MODE==='Light'?colors.navyBlue:colors.primary}   style={{marginRight:10}} />

<MaterialIcon name="chat" size={18} color={MODE==='Light'?colors.navyBlue:colors.primary}  />
</View>
</View>


</View>




    <PrimaryButton 
    style={{
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,
      width:width-20
    }}
    handleAction={handleNext}
    title='Mark as Picked'
    />
      </View> 


    </ImageBackground>


    </ScrollView>
    </View>
  )
}


export default AcceptDelivery

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
    color:MODE==='Light'?colors.dark:colors.white
  },
 
  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },



box:{
  width:width-20,
  backgroundColor:MODE==='Light'?colors.white:colors.dark,
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  marginHorizontal:10,
  position:'absolute',
  bottom:10,
  borderRadius:10,
  alignItems:'center',
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
  },
  row:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    marginVertical:15
  },
  cart:{
    height:30,
    width:30,
    borderRadius:15,
    backgroundColor:colors.primary,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  }
})