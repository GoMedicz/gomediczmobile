
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

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Cart: undefined;
  ConfirmOrder:undefined; 
    BottomTabs:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;
 const Cart =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [products, setProducts]= useState([] as any)
  const [items, setItems]= useState({
    subtotal:0,
    promo:0,
    charges:0,
    total:0
  })

interface item {
  title:string,
  isDefault:string,
  id:number
}


const handleBack =()=>{
  navigation.navigate('BottomTabs');
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
      let items =  JSON.parse(data)
     
      for (var i in items){
        records.push({
          id:'i'+Math.random().toString(36).substring(2, 9),
          code:items[i].code,
          amount:items[i].amount,
          qty:items[i].qty,
          pack:items[i].pack,
          product_name:getProduct(items[i].code, 'product_name'),
          image_url:getProduct(items[i].code, 'image_url'),
          require_prescription:getProduct(items[i].code, 'require_prescription'),
          store_name:getProduct(items[i].code, 'store_name'),
          total:Number(items[i].pack) * Number(items[i].amount)
         
        })

      }
      const subtotal = records.reduce((acc:number, item:any)=>acc+parseFloat(item.total), 0)

      setItems({
        ...items,
        subtotal:subtotal,
        total:(subtotal+ items.charges) - items.promo 
  
      })
setProducts(records)
    
    }
  
  }catch(e){

  }
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
      storeData('cartSummary', JSON.stringify(items, null, 2));
       storeData('drug', JSON.stringify(products, null, 2));
    
      navigation.navigate('ConfirmOrder');
     
    }catch(e){
  
    }
}




const handleSub =(id:string)=>{

  const currentContent = products.map((list:any)=>{
                 
    if(list.id ===id && Number(list.pack) >1){

        return {...list, 
          pack:Number(list.pack)-1,
          total:Number(list.amount) *  Number(list.pack)-1
        
        }
    }

     return list
      })

     

    const subtotal = currentContent.reduce((acc:number, item:any)=>acc+parseFloat(item.total), 0)

    setItems({
      ...items,
      subtotal:subtotal,
      total:(subtotal+ items.charges) - items.promo 

    })
      setProducts(currentContent)

}

const handleAdd =(id:string)=>{

  const currentContent = products.map((list:any)=>{
                 
    if(list.id ===id){

        return {...list, 
          pack:Number(list.pack)+1,
          total:Number(list.amount) *  Number(list.pack)+1
        
        }
    }

     return list
      })

     

    const subtotal = currentContent.reduce((acc:number, item:any)=>acc+parseFloat(item.total), 0)

    setItems({
      ...items,
      subtotal:subtotal,
      total:(subtotal+ items.charges) - items.promo 

    })
      setProducts(currentContent)

}

useEffect(()=>{
  FetchProducts()
 
}, [route])


const CardCategory =({item}:{item:any})=>{
  return <Pressable style={[styles.card]}>

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
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:'#F4F8FB'}]}>
    
    <View style={styles.header}>
    <MaterialIcon onPress={handleBack} name="arrow-back-ios" size={18} color={colors.dark}  /> 
    <Text style={styles.label}>My Cart</Text>
    <View />
    </View>

    <View style={{ marginVertical:5, marginBottom:50, flex:1}}>
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

<View style={styles.container}>

<View style={styles.textWrapper}>
<TextInput placeholder='Add Promocode' placeholderTextColor={'#9E9E9E'} style={styles.textInput} />

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Text style={{fontSize:10, color:colors.primary, fontWeight:'600', marginRight:5}}> VIEW OFFERS</Text>

<View style={styles.btnOk}>
<MaterialIcon name="done" size={18} color={colors.white}  /> 
</View>

</View>

</View>


<View style={styles.row}>
  <Text style={styles.label}>Sub total</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(items.subtotal)}</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Promo Code Applied</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(items.promo)}</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Service Charge</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(items.charges)}</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Amount Payable</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(items.total)}</Text>
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