
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CURRENCY, ImagesUrl, ServerUrl, configJSON, configToken, fluterwave, paystack } from '../../components/includes';
import { FormatNumber, getData } from '../../components/globalFunction';
import { Paystack } from "react-native-paystack-webview";
import {PayWithFlutterwave} from 'flutterwave-react-native';
import Loader from '../../components/loader';
import axios from 'axios';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Payment:{
    reference:string,
    order_code:string,
    amount:number,
    screen:string

  }; 
    OrderPlaced:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;
 const Payment=({ route, navigation }:Props)=> {

  const [items, setItems]= useState([] as any)
  const [loading, setLoading] = useState(false)
  const [isPaystack, setIsPaystack] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [modalType, setModalType] = useState('load')
  const [profile, setProfile]= useState({
    telephone:'',
    email_address:'',
    fullname:''
  })

  interface RedirectParams {
    status: 'successful' | 'cancelled',
    transaction_id?: string;
    tx_ref: string;
  }

  const [errors, setErrors] = useState({
 
    errorMessage:''
  });


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

const handleSubmit =async(status:string, mode:string, ref:string)=>{

   let data:any  = await getData('drug');
   let products = [];
   if(data && data !==undefined){
    products =  JSON.parse(data)
   }
  

      let config = await configJSON()

      const user_code = await getData('code');
      const wallet = await getData('wallet');

      let fd = {
        ...items,
          items: products,
          wallet:wallet,
          order_code:route.params.order_code,
          user_code: user_code,
          vendor_code: "v40notkq",
          rider_code:'rider_code',
          status: status,
         method: mode,
         payer: profile.fullname,
         payment_ref:ref,
         total_item: products.length
      }

     
  let url = ServerUrl+'/api/user/order/create';

  if(route.params.screen==='LabTest'){
   url = ServerUrl+'/api/lab/test/booking';
 
 }
 let fdtest = {
  ...items,
    status: status,
   method: mode,
   payer: profile.fullname,
   payment_ref:ref,
}



let formdata = route.params.screen==='LabTest'?fdtest:fd 

      axios.post(url, formdata, config)
     .then(response =>{
       if(response.data.type ==='success'){
        navigation.navigate('OrderPlaced'); 
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


const handleWallet =async()=>{

  const wallet = await getData('wallet');
  handleSubmit("PENDING", 'Wallet', String(wallet))
  
}



const FetchContent =async()=>{
  try{

    let cart:any  = await getData('cartSummary');
    let summ =  [];
    let labTestData = [];
    if(cart && cart !==''){
     summ =  JSON.parse(cart)
    }
   
    let labTest:any  = await getData('LabTest');
    if(labTest && labTest !==''){
      labTestData =  JSON.parse(labTest)
     }

    

    if(route.params.screen==='LabTest'){
        setItems(labTestData)

      }else{
        setItems(summ)
      }
  
  }catch(e){

  }
}


const handleOnRedirect=async(data:RedirectParams)=>{
  //save transactions
  if(data.status==='successful'){
  } 

}

const Previous =()=>{
  setLoading(false)
  
}

  



    useEffect(()=>{
      FetchContent()
      FetchProfile()
    }, [route])

  return (<View style={[ {flex:1, backgroundColor:'#F4F8FB'}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={18} onPress={handleBack} color={colors.dark}  /> 
    <Text style={styles.label}>Select Payment Method</Text>
    <View />
    </View>


    <Loader isModalVisible={loading} 
    type={modalType}
    message={errors.errorMessage} 
    action={Previous}
     />


<ScrollView>

<View style={styles.address}>
<View style={{marginLeft:10}}>
  <Text style={[styles.infoText, {fontSize:12, fontWeight:'700'}]}>AMOUNT TO PAY</Text>
  <Text style={{fontSize:30, marginTop:10, fontWeight:'bold', fontFamily:'arial'}}> {CURRENCY+FormatNumber(route.params.amount)}</Text>
</View>
</View>


<Text style={[styles.label,{marginVertical:20, marginLeft:10}]}>Payment modes</Text>
<TouchableOpacity onPress={handleWallet} activeOpacity={0.9} style={styles.card}>
<View style={styles.circle}>

<MaterialIcon name="credit-card" size={14} color={'#8DC14B'}  /> 
</View>

<Text style={styles.labelPay}>Wallet</Text> 
</TouchableOpacity>


<TouchableOpacity onPress={()=>handleSubmit("PENDING", 'Cash on Delivery', '')} activeOpacity={0.9} style={[styles.card]}>
<View style={styles.circle}>

<MaterialIcon name="payments" size={14} color={'#8DC14B'}  /> 
</View>

<Text style={styles.labelPay}>Cash On Delivery</Text> 
</TouchableOpacity>


<TouchableOpacity  onPress={()=>setIsPaystack(!isPaystack)} activeOpacity={0.9} style={styles.card}>
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
    amount: route.params.amount,
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

{isPaystack&&
<Paystack
  paystackKey={paystack}
  amount={route.params.amount}
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
/>}


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
height:30,
width:30,
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