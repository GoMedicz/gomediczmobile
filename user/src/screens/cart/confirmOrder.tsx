
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, TouchableOpacity } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CURRENCY, ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { FormatNumber, getData } from '../../components/globalFunction';
import Loader from '../../components/loader';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  ConfirmOrder: undefined;
  Payment:{
    screen:string;
    reference:string,
    order_code:string,
    amount:number

  }; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmOrder'>;
 const ConfirmOrder =({ route, navigation }:Props)=> {

  const [modalType, setModalType] = useState('load')
  const [loading, setLoading] = useState(false)
  const [products, setProducts]= useState([] as any)
  const [items, setItems]= useState({} as any)
  const [profile, setProfile]= useState({} as any)
  const [errors, setErrors] = useState({
    product:'',
    subtotal:'',
    errorMessage:''
  });

  
  const [refreshing, setRefreshing] = useState(false)


const handleBack =()=>{
  navigation.goBack();
}



const handleConfirm =async()=>{

  try{
    
    if(!profile.email_address){
      setLoading(true)
        setModalType('Failed')
           setErrors({...errors, errorMessage: 'Please update your email address under profile'})
    }else{

   
    let order_code = await getData('order_code');

    navigation.navigate('Payment', {
      reference:items.reference,
      order_code:String(order_code),
      amount:items.ground_total,
      screen:'Medicine'

    });
  }
  }catch(e){

  }

}





const CardCategory =({item}:{item:any})=>{
  return <Pressable style={[styles.card]}>

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>

<View>

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Text style={styles.label}>{item.product_name}</Text> 

{item.require_prescription===1?<Image source={{ uri:ImagesUrl+"/pharmacy/px.png" }} style={styles.cardImage} />:[]}


</View>


<Text style={[styles.infoText, {marginBottom:10}]}>{item.qty}</Text>

</View>
</View>


    <Text style={[styles.label, {fontWeight:'700'}]}>{CURRENCY+FormatNumber(item.total)}</Text>
 


    </Pressable>
  }


const FetchContent =async()=>{
  try{

    let data:any  = await getData('drug');
    let cart:any  = await getData('cartSummary');

    if(data){
      
      let prod =  JSON.parse(data)
      let summ =  JSON.parse(cart)
    
      setItems(summ)
    setProducts(prod)
    
    }
  
  }catch(e){

  }
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
      setProfile([])
    }

  }) 
}catch(e){
  console.log('error:',e)
}
}


useEffect(()=>{
  FetchContent()
  FetchProfile()
}, [route])

  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    FetchContent()
    }, [])

    const Previous =()=>{
      setLoading(false)
      
    }


  return (<View style={[ {flex:1, backgroundColor:'#F4F8FB'}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={14} color={colors.dark}  /> 
    <Text style={styles.label}>Confirm Order</Text>
    <View />
    </View>



    <Loader isModalVisible={loading} 
    type={modalType}

    message={errors.errorMessage} 
    action={Previous}
     />


    <Text style={[styles.label,{marginVertical:10, marginLeft:10}]}>Delivery at</Text>

<View style={styles.address}>

<MaterialIcon name="home" size={18} color={colors.primary}  />

<View style={{marginLeft:10}}>
  <Text style={styles.label}>Home</Text>
  <Text style={{fontSize:12, marginTop:10}}>14134, Silver Green Street, 2nd Avenue,</Text>
  <Text style={{fontSize:12}}>Hamiltone, New York, USA</Text>
</View>
</View>


<Text style={[styles.label,{marginVertical:10, marginLeft:10}]}>Items in Cart</Text>

    <View style={{ marginVertical:5, maxHeight:(height/3)+25  }}>
<FlatList 
data={products}
numColumns={1}
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>


</View>

<View style={{display:'flex',  flexDirection:'row', justifyContent:'space-between', alignItems:'center',paddingHorizontal:10, marginBottom:0, backgroundColor:colors.white, height:50, width:width}}>

  <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png"}} style={styles.cardImage} />

<Text style={{fontSize:12, fontWeight:'700', marginLeft:30}}>Prescription Uploaded</Text>
</View>

<MaterialIcon name="visibility" size={18} color={colors.primary}  /> 

</View>




<View style={styles.container}>


<View style={styles.row}>
  <Text style={styles.label}>Sub total</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(items.subtotal)}</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Promo Code Applied</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(items.discount)}</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Service Charge</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(items.service_charge)}</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Amount to Pay</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(items.ground_total)}</Text>
</View>

<TouchableOpacity onPress={handleConfirm} activeOpacity={0.9} style={[globalStyles.button, {width:width, marginHorizontal:0, borderRadius:0, marginTop:10, } ]}>
  <Text style={globalStyles.buttonText}>Continue to Pay</Text> 
</TouchableOpacity>

</View>


    </View>
  )
}


export default ConfirmOrder

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
height:40,
width:40,
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