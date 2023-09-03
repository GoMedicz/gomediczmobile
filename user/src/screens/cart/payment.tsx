
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Payment: undefined;
    Language:undefined; 
    OrderPlaced:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;
 const Payment=({ route, navigation }:Props)=> {

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
  navigation.navigate('OrderPlaced', {
    code:'cds',
  }); 
}



  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:'#F4F8FB'}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={18} onPress={handleBack} color={colors.dark}  /> 
    <Text style={styles.label}>Select Payment Method</Text>
    <View />
    </View>


<ScrollView>

<View style={styles.address}>


<View style={{marginLeft:10}}>
  <Text style={[styles.infoText, {fontSize:12, fontWeight:'700'}]}>AMOUNT TO PAY</Text>
  <Text style={{fontSize:30, marginTop:10, fontWeight:'bold', fontFamily:'arial'}}>$20.00</Text>
</View>
</View>



<Text style={[styles.label,{marginVertical:20, marginLeft:10}]}>Payment modes</Text>




<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={[styles.card]}>
<View style={styles.circle}>

<MaterialIcon name="credit-card" size={14} color={'#8DC14B'}  /> 
</View>

<Text style={styles.labelPay}>Wallet</Text> 
</TouchableOpacity>


<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={[styles.card]}>
<View style={styles.circle}>

<MaterialIcon name="payments" size={14} color={'#8DC14B'}  /> 
</View>

<Text style={styles.labelPay}>Cash On Delivery</Text> 
</TouchableOpacity>


<TouchableOpacity  onPress={handleNext} activeOpacity={0.9}style={[styles.card]}>
<View style={styles.circle}>

<Image source={{ uri:ImagesUrl+"/icons/paypal.png"}} style={styles.cardImage} />
</View>

<Text style={styles.labelPay}>PayPal</Text> 
</TouchableOpacity>

<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={[styles.card]}>
<View style={styles.circle}>

<Image source={{ uri:ImagesUrl+"/icons/payu.png"}} style={styles.cardImage} />
</View>

<Text style={styles.labelPay}>PayU Money</Text> 
</TouchableOpacity>

<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={[styles.card]}>
<View style={styles.circle}>

<Image source={{ uri:ImagesUrl+"/icons/stripe.jpeg"}} style={[styles.cardImage, {borderRadius:20}]} />
</View>

<Text style={styles.labelPay}>Stripe</Text> 
</TouchableOpacity>

</ScrollView>
    </View>
  )
}


export default Payment

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
  circle:{
    height:30,
    width:30,
    borderRadius:15,
    backgroundColor:colors.grey5,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
    
  },

  labelPay:{
    fontWeight:'700',
    fontSize:14,
    marginLeft:20,
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
  flexDirection:'row',
  alignItems:'center',
  paddingHorizontal:20,
  backgroundColor:colors.white,
  marginVertical:4,
  paddingVertical:10,
},
cardImage:{
height:40,
width:40,
resizeMode:'cover',
},
  address:{
    backgroundColor:colors.white,
    paddingHorizontal:20,
    display:'flex',
    flexDirection:'row',
    paddingVertical:15
  }
  
})