
import React, { useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, TouchableOpacity } from 'react-native'

import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { removeData } from '../../components/globalFunction';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  OrderPlaced: {
    code:string;
  }
  MyOrder:undefined; 
    BottomTabs:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'OrderPlaced'>;
 const OrderPlaced =({ route, navigation }:Props)=> {

const handleNext =()=>{
  navigation.navigate('BottomTabs'); 
}

const handleOrder =()=>{
  navigation.navigate('MyOrder'); 
}

const FetchContent =async()=>{
  try{

     removeData('drug');
     removeData('cartSummary');
  
  }catch(e){

  }
}


useEffect(()=>{
  FetchContent()
}, [route])



  return (<SafeAreaView style={[ {flex:1, backgroundColor:colors.white}]}>
    
    <View style={styles.header}>
    <Text style={styles.label}>Order Placed</Text>
   
    </View>

<ScrollView>
<View style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:50}}>

    <Image source={{ uri:ImagesUrl+"/icons/delivery.png"}} style={styles.cardImage} />


    <Text style={[styles.label,{color:colors.primary, marginTop:50}]}>Your Order placed !!</Text>



<Text style={[styles.label,{ marginTop:40}]}>Your order has been placed</Text>
<Text style={[styles.label]}>Successfully.</Text>
<Text style={[styles.label]}>Visit My Order</Text>

<Text style={[styles.label]}>to check order status.</Text>

<Pressable onPress={handleOrder}> <Text style={[styles.label,{color:colors.primary, marginTop:80}]}>My Orders</Text> </Pressable>
    </View>

   



    </ScrollView>

<View style={styles.container}>


<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={[globalStyles.button, {width:width, marginHorizontal:0, borderRadius:0, marginTop:10, } ]}>
  <Text style={globalStyles.buttonText}>Continue Shopping</Text> 
</TouchableOpacity>

</View>

    </SafeAreaView>
  )
}


export default OrderPlaced

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
  
})