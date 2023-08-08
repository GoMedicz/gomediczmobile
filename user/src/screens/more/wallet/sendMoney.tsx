
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
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
  ChosePayment: undefined;
  SendMoney:undefined; 
  Offers:{
     code:string;
   }
   };
   
type Props = NativeStackScreenProps<RootStackParamList, 'SendMoney'>;
 const SendMoney =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleCart =()=>{
 // navigation.navigate('Cart');
}

const handleNext =()=>{
  navigation.navigate('ChosePayment');
}




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box]}>


<View style={[{display:'flex', flexDirection:'row', justifyContent:'space-between'}]}>
      <Text style={{color:colors.dark, fontSize:14, fontWeight:'600', marginBottom:5}}>Well Life Store</Text>
      <Text style={[styles.infoText, {color:colors.red}]}>+$500.00</Text>
    </View> 



    <View style={[{display:'flex', flexDirection:'row', justifyContent:'space-between'}]}>
      <Text style={styles.infoText}>30 Jun 2018, 11:59 am</Text>
      <Text style={[styles.infoText]}>4 Items | Paypal</Text>
    </View> 



      </Pressable>
    }


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={14} color={colors.dark}  /> 
    <Text style={styles.label}>Send to Bank</Text>

    <MaterialIcon name="menu" size={14} color={colors.grey}  /> 
    </View>

<ScrollView>

    <View style={{backgroundColor:colors.white,  paddingHorizontal:10, paddingTop:20, paddingBottom:35}}>
    
  
<Text style={styles.infoText}>AVAILABLE BALANCE</Text>
      <Text style={{color:colors.dark, fontSize:25, fontWeight:'700'}}>$ 520.50</Text>
</View>



<View style={styles.card}>
  <Text style={[styles.infoText, {fontSize:12, marginBottom:25}]}>BANK INFO</Text>


<View style={[styles.inputWrapper]}>
  <Text style={[styles.label, {color:colors.grey}]}>Account Holder Name</Text>
  <TextInput placeholder='Samantha Smith' style={styles.textInput} />
  </View>


  <View style={styles.inputWrapper}>
  <Text style={[styles.label, {color:colors.grey}]}>Bank Name</Text>
  <TextInput placeholder='Samantha Smith' style={styles.textInput} />
  </View>


  <View style={styles.inputWrapper}>
  <Text style={[styles.label, {color:colors.grey}]}>Branch Code</Text>
  <TextInput placeholder='Samantha Smith' style={styles.textInput} />
  </View>


  <View style={styles.inputWrapper}>
  <Text style={[styles.label, {color:colors.grey}]}>Account Number</Text>
  <TextInput placeholder='Samantha Smith' style={styles.textInput} />
  </View>



  <View style={styles.inputWrapper}>
  <Text style={[styles.label, {color:colors.grey}]}>Amount To Transfer</Text>
  <TextInput placeholder='Samantha Smith' style={styles.textInput} />
  </View>



</View>




</ScrollView>

    

<PrimaryButton 
handleAction={handleNext}
title='Send to Bank'
/>

    </View>
  )
}


export default SendMoney

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
 
  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },



box:{
  width:width,
  backgroundColor:colors.white,
  marginBottom:5,
  display:'flex',
  paddingHorizontal:10,
  paddingVertical:15,
  
    },

catItems:{
flex:1,
marginHorizontal:5,

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
    width:30,
    height:30,
    borderRadius:15,
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
  },

card:{
  backgroundColor:colors.white,
  padding:20,
  marginVertical:5
},

inputWrapper:{
  marginVertical:5

},
textInput:{
  height:50,
  backgroundColor:colors.lightSkye,
  padding:10,
  marginVertical:10,
  borderRadius:5,
  color:colors.grey,
  fontWeight:'600'
}
})