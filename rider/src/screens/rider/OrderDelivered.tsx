
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl, MODE } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import { PrimaryButton } from '../../components/include/button';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  OrderDelivered: undefined;
  AccountProfile:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDelivered'>;
 const OrderDelivered =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handlePayment =()=>{
  navigation.navigate('AccountProfile');
}

const handleNext =()=>{
  navigation.navigate('AccountProfile');
}




  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<SafeAreaView style={[ {flex:1, backgroundColor:MODE==='Light'?colors.white:colors.dark }]}>
    

<ScrollView>
<View style={{display:'flex', justifyContent:'center', alignItems:'center', height:height-50}}>

    <Image source={{ uri:ImagesUrl+"/icons/delivery.png"}} style={styles.cardImage} />


    <Text style={[styles.label,{ marginTop:50, fontSize:16}]}>Delivered Successfully !</Text>

<Text style={{fontSize:12, color:MODE==='Light'?colors.dark:colors.white, fontWeight:'500', marginTop:10}}>Thank you for deliver safely & on time.</Text>



<View style={[globalStyles.rowCenterBetween,{width:width, paddingHorizontal:20, marginTop:60 }]}>

<View>
  <Text style={[styles.infoText, {marginBottom:5}]}>You drove</Text>
  <Text style={[styles.label, {marginBottom:5}]}>18 min (6.5 km)</Text>
  <Text style={[styles.label, {color:MODE==='Light'?colors.navyBlue:colors.primary, fontSize:14}]}>View Order Info</Text>
</View>

<View >
  <Text style={[styles.infoText, {marginBottom:5}]}>You earnings</Text>
  <Text style={[styles.label, {marginBottom:5}]}>$8.50</Text>
  <Text style={[styles.label, {color:MODE==='Light'?colors.navyBlue:colors.primary, fontSize:14}]}>View Earnings</Text>
</View>

</View>


    </View>

   


    </ScrollView>

<View style={styles.container}>

<PrimaryButton 
title='Back to Home'
handleAction={handleNext}
/>
</View>

    </SafeAreaView>
  )
}


export default OrderDelivered

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'center',
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
  infoWrapper:{
    width:width,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:50
  },
  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },
card:{
  display:'flex',
  justifyContent:'space-between',
  flexDirection:'row',
  alignItems:'center',
  paddingHorizontal:20,
  backgroundColor:colors.white,
},
cardImage:{
height:height/4,
width:width-40,
resizeMode:'cover',
},
addPlus:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  marginTop:20
},
container:{
position:'absolute',
bottom:0,
backgroundColor:colors.white,
},
btnOk:{
  height:45,
  width:45,
  display:'flex',
  justifyContent:'center',
  backgroundColor:colors.primary,
  alignItems:'center',
  borderTopEndRadius:5,
  borderBottomEndRadius:5

},
textWrapper:{

  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  marginHorizontal:10,
  borderRadius:5,
  height:45,
  marginVertical:10,
  backgroundColor:'#F5F5F50'

},
textInput:{
  fontSize:12,
  color:colors.dark,
  marginLeft:10,
  width:width-150

},
row:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  marginHorizontal:10,
  marginVertical:5
},
modal:{
 width:width-120,
 height:undefined
},

modalContent:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
},
modalImage:{
  height:120,
  width:150,
  resizeMode:'contain',
  },
  address:{
    backgroundColor:colors.white,
    paddingHorizontal:20,
    display:'flex',
    flexDirection:'row',
    paddingVertical:10
  }
  
})