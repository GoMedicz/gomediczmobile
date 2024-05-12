
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
//import { Paystack } from "react-native-paystack-webview";
import {PayWithFlutterwave} from 'flutterwave-react-native';
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../../assets/colors';
import { CATITEMS, LANGUAGELIST } from '../../../components/data';
import { ImagesUrl, ServerUrl, configJSON, configToken, fluterwave, paystack } from '../../../components/includes';
import { globalStyles } from '../../../components/globalStyle';
import ModalDialog from '../../../components/modal';
import { getData } from '../../../components/globalFunction';
import Loader from '../../../components/loader';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  ChosePayment: undefined;
  Wallet:undefined; 
    MyOrder:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'ChosePayment'>;

 const ChosePayment=({ route, navigation }:Props)=> {

  const [isPaystack, setIsPaystack] = useState(false)
  
  const [modalType, setModalType] = useState('load')
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState({
    errorMessage:''
  });
  interface RedirectParams {
    status: 'successful' | 'cancelled',
    transaction_id?: string;
    tx_ref: string;
  }

const [profile, setProfile]= useState({
  telephone:'',
  email_address:'',
  fullname:''
})

const handleBack =()=>{
  navigation.goBack();
}

const  FetchProfile = async()=>{
  let config = await configToken()
  let code = await getData('code')
  let url = ServerUrl+'/api/user/display_one/'+code
  try{
 await axios.get(url, config).then(response=>{
    if(response.data.type==='success'){
      setProfile(response.data.data)
    }else{
      setProfile({} as any)
    }

  }) 
}catch(e){
  console.log('error:',e)
}
}

const handleOnRedirect=async(data:RedirectParams)=>{
  //save transactions
  if(data.status==='successful'){
  } 

}

const handleSubmit =async(status:string, mode:string, ref:string)=>{

     let config = await configJSON()

     const user_code = await getData('code');
     const wallet = await getData('wallet');

     let fd = {
      code:Math.random().toString(36).substring(2, 9),
         wallet:wallet,
         user_code: user_code,
         amount:amount,
         status: status,
        method: mode,
        reference:ref
     }

    
 let url = ServerUrl+'/api/user/wallet/add';

     axios.post(url, fd, config)
    .then(response =>{
      if(response.data.type ==='success'){
       
       navigation.navigate('Wallet'); 
     } else{

       setModalType('Failed')
           setErrors({...errors, errorMessage: response.data.message})
                }   
            })
            .catch((error)=>{
             setModalType('Failed')
          setErrors({...errors, errorMessage: error.message})

            }) 
}


useEffect(()=>{
  FetchProfile()
}, [route])

const handlePaystack =()=>{
  if(Number(amount) && Number(amount)>=500 ){

  setIsPaystack(true)
  }else{
    setErrors({...errors, errorMessage: 'Please update your email address under profile'})
  }
}


const handleChange =(text:string)=>{
  setAmount(text.replace(/[^0-9]/g, "").substring(0, 11))
  setErrors({...errors, errorMessage:''})
}


const Previous =()=>{
  setLoading(false)
}

  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:'#F4F8FB'}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={14} onPress={handleBack} color={colors.dark}  /> 
    <Text style={styles.label}>Add Money</Text>
    <View />
    </View>


<ScrollView>

<Loader isModalVisible={loading} 
    type={modalType}

    message={errors.errorMessage} 
    action={Previous}
     />



<View style={styles.address}>


<View style={ errors.errorMessage?globalStyles.error:[]}>
  <Text style={[styles.infoText, {fontSize:12, fontWeight:'700'}]}>Enter Amount to add</Text>


  <TextInput 
  placeholderTextColor={colors.grey3}
  placeholder='minimum of 500' style={styles.textInput}
  
  autoCapitalize='none'
  keyboardType='numeric' 
   autoCorrect={false}
   value={amount}
   onChangeText={text =>handleChange(text)}
  />
  </View>

</View>



<Text style={[styles.label,{paddingVertical:10, marginLeft:10}]}>Add Money via</Text>

<TouchableOpacity  onPress={handlePaystack} activeOpacity={0.9} style={styles.card}>
<View style={styles.circle}>

<Image source={{ uri:ImagesUrl+"/icons/paystack.png"}} style={styles.cardImage} />
</View>

<Text style={styles.labelPay}>Pay via Paystack</Text> 
</TouchableOpacity>

 <PayWithFlutterwave
  
  onRedirect={handleOnRedirect}
  options={{
    tx_ref: new Date().toString(),
    authorization:fluterwave,
    customer: {
      email: profile.email_address,
      phonenumber:profile.telephone
    },
    amount: Number(amount),
    currency: 'NGN',
    payment_options: 'card'
  }}
  customButton={(props:any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={props.onPress}
      disabled={props.disabled}>


<View style={styles.circle}>

<Image source={{ uri:ImagesUrl+"/icons/fluterwave.png"}} style={styles.cardImage} />
</View>

<Text style={styles.labelPay}>Pay via Fluterwave</Text> 
        
    </TouchableOpacity>
  )}
/> 
{/* 
{isPaystack&&
<Paystack
  paystackKey={paystack}
  amount={Number(amount)}
  billingEmail={profile.email_address}
  activityIndicatorColor="green"
  onCancel={(e) =>{
    // handle response here
  }}
  onSuccess={(res) => {
    // handle response here
    let ref =  res.data.transactionRef.reference
    handleSubmit("Paid", 'Paystack', ref)
  }}
  autoStart={isPaystack}
/>} */}

</ScrollView>
    </View>
  )
}


export default ChosePayment

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
    paddingVertical:10
  },
 
  textInput:{
    height:50,
    backgroundColor:colors.lightSkye,
    padding:10,
    marginTop:10,
    marginBottom:5,
    borderRadius:5,
    width:width-40,
    color:colors.dark,
  }
  
})