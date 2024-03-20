
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CURRENCY, ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import { FormatNumber, getData, storeData } from '../../components/globalFunction';

import Loader from '../../components/loader';
const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Cart: {
    offer:any
  }
  Offers:undefined;
  ConfirmOrder:undefined; 
    BottomTabs:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;
 const Cart =({ route, navigation }:Props)=> {

  const [modalType, setModalType] = useState('load')
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [products, setProducts]= useState([] as any)
  const [items, setItems]= useState({
    offer:route.params.offer,
    subtotal:0,
    discount:0,
    service_charge:0,
    ground_total:0,
    percentage:0,
    reference:'r'+Math.random().toString(36).substring(2, 9),
    code:Math.random().toString(36).substring(2, 9)
  })

  const [errors, setErrors] = useState({
    product:'',
    subtotal:'',
    errorMessage:''
  });

const handleBack =()=>{
  navigation.navigate('BottomTabs');
}
const Previous =()=>{
  setLoading(false)
  
}


const  handleFetchOffer = async()=>{
  setLoading(true)
  if(items.offer!=='' && products.length!==0){
  let config = await configToken()
  let url = ServerUrl+'/api/offer/'+items.offer
  try{
 await axios.get(url, config).then(response=>{

    if(response.data.type==='success'){  
      let amount = (Number(response.data.data.percentage)/100) * Number(items.subtotal)

       setItems({
        ...items,
        percentage:Number(response.data.data.percentage),
        discount:amount,
         ground_total:(Number(items.subtotal)+ Number(items.service_charge)) - amount
   
       }) 


       setModalType('Success')
       setErrors({...errors, errorMessage: response.data.data.percentage+'% discount added'})
       
    }

  }).finally(()=>{
    setLoading(false)
  })
}catch(e){
  console.log('error:',e)
}
  }
}

const handleOffer =()=>{
  navigation.navigate('Offers');
}
const GetCart =async(content:any)=>{
  try{

    const getProduct =(code:string, field:string)=>{

      let rs =  content&&content.filter((item:any)=>item.code===code)
 
      return rs.length!==0?rs[0][field]:''
    }



    let data:any  = await getData('drug');


    if(data){
      let records = []
      let product =  JSON.parse(data)
     
      for (var i in product){
        records.push({
          id:'i'+Math.random().toString(36).substring(2, 9),
          code:product[i].code,
          amount:product[i].amount,
          qty:product[i].qty,
          pack:product[i].pack,
          product_name:getProduct(product[i].code, 'product_name'),
          image_url:getProduct(product[i].code, 'image_url'),
          require_prescription:getProduct(product[i].code, 'require_prescription'),
          store_name:getProduct(product[i].code, 'store_name'),
          total:Number(product[i].pack) * Number(product[i].amount)
         
        })

      }
      const subtotal = records.reduce((acc:number, item:any)=>acc+parseFloat(item.total), 0)

      let discount = (Number(items.percentage)/100) * subtotal

      setItems({
       ...items,
       discount:discount, 
        subtotal:subtotal,
        ground_total:(Number(subtotal)+ Number(items.service_charge)) - discount  
  
      })
setProducts(records)

    }
  
  }catch(e){

  }
}


const handlelongpress = (id:string)=>{
  let newProduct =  products.filter((item:any)=>item.id!==id)
  const subtotal = newProduct.reduce((acc:number, item:any)=>acc+parseFloat(item.total), 0)

     
      let discount = (Number(items.percentage)/100) * subtotal

      setItems({
       ...items,
       discount:discount, 
        subtotal:subtotal,
        ground_total:(Number(subtotal)+ Number(items.service_charge)) - discount  
  
      })

  setProducts(newProduct)

  
}

const  FetchProducts = async()=>{
  //setLoading(true)
  let config = await configToken()
  let url = ServerUrl+'/api/users/drugs/all'
  try{
 await axios.get(url, config).then(response=>{

    if(response.data.type==='success'){  
      GetCart(response.data.data)
    }

  })
}catch(e){
  console.log('error:',e)
}
}


const handleConfirm =async()=>{

    try{

      if(products.length===0){

        setLoading(true)
          setModalType('Failed')
             setErrors({...errors, errorMessage: 'Please add item to cart'})

      }else{
      storeData('cartSummary', JSON.stringify(items, null, 2));
       storeData('drug', JSON.stringify(products, null, 2));

       let order_code = await getData('order_code');

       if(!order_code && order_code ===undefined){
        storeData('order_code', Math.random().toString(36).substring(2, 9));
       }

      navigation.navigate('ConfirmOrder');
      }
     
    }catch(e){
  
    }
}




const handleSub =(id:string)=>{

  const currentContent = products.map((list:any)=>{
                 
    if(list.id ===id && Number(list.pack) >1){

        return {...list, 
          pack:Number(list.pack)-1,
          total:Number(list.amount) *  (Number(list.pack)-1)
        
        }
    }

     return list
      })

     

    const subtotal = currentContent.reduce((acc:number, item:any)=>acc+parseFloat(item.total), 0)

   
    let discount = (Number(items.percentage)/100) * subtotal

    setItems({
     ...items,
     discount:discount, 
      subtotal:subtotal,
      ground_total:(Number(subtotal)+ Number(items.service_charge)) - discount  

    })
      setProducts(currentContent)

}

const handleAdd =(id:string)=>{

  const currentContent = products.map((list:any)=>{
                 
    if(list.id ===id){

        return {...list, 
          pack:Number(list.pack)+1,
          total:Number(list.amount) *  (Number(list.pack)+1)
        
        }
    }

     return list
      })

     

    const subtotal = currentContent.reduce((acc:number, item:any)=>acc+parseFloat(item.total), 0)

    let discount = (Number(items.percentage)/100) * subtotal

    setItems({
     ...items,
     discount:discount, 
      subtotal:subtotal,
      ground_total:(Number(subtotal)+ Number(items.service_charge)) - discount  

    })
      setProducts(currentContent)

}

useEffect(()=>{
  FetchProducts()
 
}, [route])


const CardCategory =({item}:{item:any})=>{
  return <Pressable onLongPress={()=>handlelongpress(item.id)} style={[styles.card]}>

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Image source={{ uri:item.image_url!=='' && item.image_url!==null ?ImagesUrl+"/vendors/products/"+item.image_url:ImagesUrl+"/no.png"}} style={styles.cardImage} />


<View>

<Text style={styles.label}>{item.product_name}</Text>
<Text style={styles.infoText}>{item.qty}</Text>

<View style={styles.addPlus}>
<MaterialIcon name="remove" size={18} onPress={()=>handleSub(item.id)} color={colors.primary}   /> 
  <Text style={{marginHorizontal:10, fontWeight:'500'}}>{item.pack}</Text>
  <MaterialIcon name="add" onPress={()=>handleAdd(item.id)} size={18} color={colors.primary}   /> 
</View>
</View>
</View>


<View style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>

{item.require_prescription===1?<Image source={{ uri:ImagesUrl+"/pharmacy/px.png" }} style={styles.px} />:[]}

<Text style={[styles.label, {marginTop:20}]}>{CURRENCY+FormatNumber(item.total)}</Text>

   
    </View>
    </Pressable>
  }


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    FetchProducts()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:'#F4F8FB'}]}>
    
    <View style={styles.header}>
    <MaterialIcon onPress={handleBack} name="arrow-back-ios" size={18} color={colors.dark}  /> 
    <Text style={styles.label}>My Cart</Text>
    <View />
    </View>

    <View style={{ marginVertical:5, height:height/2}}>
<FlatList 
data={products}
numColumns={1}
contentContainerStyle={{}}
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>

<View style={styles.container}>

<View style={styles.textWrapper}>

<TextInput 
placeholder='Add Promocode'
 placeholderTextColor={'#9E9E9E'} 
 style={styles.textInput} 
 

 autoCapitalize='none'
 keyboardType='email-address' 
  autoCorrect={false}
  value={items.offer}
  onChangeText={text =>setItems({...items, offer:text})}

 
 />

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
  
  <Pressable onPress={handleOffer}>
  <Text style={{fontSize:10, color:colors.primary, fontWeight:'600', marginRight:5}}> VIEW OFFERS</Text>
  </Pressable>


<Pressable onPress={handleFetchOffer} style={styles.btnOk}>
<MaterialIcon name="done" size={18} color={colors.white}  /> 
</Pressable>

</View>

</View>

<Loader isModalVisible={loading} 
    type={modalType}

    message={errors.errorMessage} 
    action={Previous}
     />

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
  <Text style={styles.label}>Amount Payable</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(items.ground_total)}</Text>
</View>

<TouchableOpacity  onPress={handleConfirm}activeOpacity={0.9} style={[globalStyles.button, {width:width, marginHorizontal:0, borderRadius:0, marginTop:10, flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20} ]}>
  <Text style={globalStyles.buttonText}>Checkout</Text>
  <MaterialIcon name="arrow-forward-ios" size={14} color={colors.white}  /> 
</TouchableOpacity>

</View>



<ModalDialog 
isModalVisible={false}
style={styles.modal}
>

<View style={styles.modalContent}>
<Image source={{ uri:ImagesUrl+"/pharmacy/prescription.png"}} style={styles.modalImage} />
<Text style={{color:colors.primary, fontSize:14, fontWeight:'700', marginBottom:15}}>Prescription Require</Text>

<Text style={styles.label}>Your order contains</Text>
<Text style={styles.label}>2 Items which required</Text>
<Text style={styles.label}>doctor's prescription.</Text>


<TouchableOpacity onPress={handleConfirm} activeOpacity={0.9} style={[globalStyles.button, {width:width-200, height:40, marginVertical:20}]}>
  <Text style={[globalStyles.buttonText, {fontSize:12}]}> Upload Prescription</Text>
</TouchableOpacity>

<Text style={{color:colors.primary, fontSize:12, fontWeight:'600', marginBottom:20}}>Cancel</Text>
</View>
</ModalDialog>
    </View>
  )
}


export default Cart

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
  marginBottom:5,
  height:80
},
cardImage:{
height:70,
width:70,
resizeMode:'contain',
marginRight:20
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
px:{
  height:25,
  width:25,
  resizeMode:'cover',
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
  backgroundColor:colors.grey5,

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

  
})