
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';
import { CURRENCY, ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';
import { FormatNumber } from '../../components/globalFunction';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  OrderDetails: {
    code:string;
  };
  Reminder:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetails'>;

 const OrderDetails =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

  const [payment, setPayment] = useState({
    method:'Online'
  })
  const [content, setContent]= useState([] as any)
  const [order, setOrder] = useState([] as any)

  const MODE = useZustandStore((store:any) => store.theme);
  const dynamicStyle = dynamicStyles(MODE);

interface item {
  title:string,
  isDefault:string,
  id:number
}



const  FetchContent = async()=>{
  //setLoading(true)
  let config = await configToken()
  let url = ServerUrl+'/api/transaction/user/'+route.params.code
  try{
 await axios.get(url, config).then(response=>{
 
    if(response.data.type==='success'){

      setPayment(response.data.payment[0])
      setContent(response.data.data)
     setOrder(response.data.orders[0])
   
    }else{
      setContent([])
    }

  }).finally(()=>{
    setRefreshing(false)
   // setLoading(false)
  }) 
}catch(e){
  console.log('error:',e)
}
}


const handleBack =()=>{
  navigation.goBack();
}

const handleNext =()=>{
  navigation.navigate('Reminder'); 
}


useEffect(()=>{
  FetchContent()
}, [route])


const CardCategory =({item}:{item:any})=>{
  return <Pressable onPress={handleNext} style={[styles.card]}>

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>

<View>

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Text style={styles.label}>{item.product_name}</Text> 
{item.require_prescription==='1'?
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png"}} style={styles.cardImage} />:[]}
</View>


<Text style={[styles.infoText, {marginBottom:10}]}>{item.qty}</Text>

</View>
</View>


    <Text style={[styles.label, {fontWeight:'700'}]}>{CURRENCY+FormatNumber(item.amount)}</Text>
 


    </Pressable>
  }


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:'#F4F8FB'}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={18} color={colors.dark}  /> 
    <Text style={dynamicStyle.label}>Order Num {route.params.code}</Text>
   
    <MaterialIcon name="more-vert" onPress={handleBack} size={18} color={colors.dark}  />
    </View>


<ScrollView>

    <View style={[styles.content]}>

<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png" }} style={styles.profile} />

<View  style={{marginLeft:10}}>
<Text style={styles.label}>Well Life Store 1</Text>
<Text style={styles.infoText}>{order.date_order} </Text>
</View>
</View>

<View>

<Text style={[styles.label, {fontSize:12, color:colors.navyBlue}]}>{order.status}</Text>

<Text style={styles.infoText}>{CURRENCY+FormatNumber(order.ground_total)} | Online </Text>

</View>
</View>


<View style={{padding:10}}>

    <View style={{display:'flex', flexDirection:'row' }}>
      <View>
  <View style={[styles.circle, {marginBottom:10}]}>
    <MaterialIcon name="done" size={14} color={colors.white}  /> 
  </View>
  <MaterialIcon name="more-vert" size={20} color={colors.icon}  /> 
  </View>

      <View style={{marginLeft:20, paddingHorizontal:10}}>
        <Text style={styles.label}>Order Confirmed </Text>
        <Text style={[styles.infoText, {marginTop:5}]}>2:00 pm, 11 June 2020</Text>
       </View>
    </View>
</View>


<View style={{paddingHorizontal:10}}>

    <View style={{display:'flex', flexDirection:'row' }}>
      <View style={{paddingTop:10}}>
  <View style={[styles.circle, {marginBottom:10}]}>
    <MaterialIcon name="done" size={14} color={colors.white}  /> 
  </View>
  <MaterialIcon name="more-vert" size={20} color={colors.icon}  /> 
  </View>

      <View style={{marginLeft:20, backgroundColor:colors.white, flex:1, padding:10}}>
        <Text style={styles.label}>Order Picked </Text>

        <View style={{display:'flex', flexDirection:'row', marginTop:5, alignItems:'center', justifyContent:'space-between'}}>
        <Text style={[styles.infoText]}>4:13 pm, 11 June 2020</Text>


      <View style={{display:'flex', flexDirection:'row'}}>
        <MaterialIcon name="navigation" size={14} color={colors.primary}  /> 
        <Text style={[styles.label, {color:colors.primary, fontSize:12}]}>Track </Text>
        </View>
        </View>


       </View>
    </View>
</View>




<View style={{paddingHorizontal:10}}>

    <View style={{display:'flex', flexDirection:'row' }}>
      <View style={{paddingTop:10}}>
  <View style={[styles.circle, {marginBottom:10, backgroundColor:'transparent', borderWidth:1, borderColor:colors.grey}]}>
    <MaterialIcon name="done" size={14} color={colors.grey}  /> 
  </View>
  </View>

      <View style={{marginLeft:20,  padding:10}}>
        <Text style={[styles.label, {color:colors.grey}]}>Order Delivered </Text>

        <View style={{display:'flex', flexDirection:'row', marginTop:5, alignItems:'center', justifyContent:'space-between'}}>
        <Text style={[styles.infoText]}>Yet to deliver</Text>


     
        </View>


       </View>
    </View>
</View>







    <View style={{ marginVertical:5, maxHeight:(height/3)+25, backgroundColor:colors.white  }}>
      <Text style={[styles.infoText, {marginHorizontal:20, marginTop:10}]}> Ordered Items</Text>

      <ScrollView
      horizontal={true}
      contentContainerStyle={{height:'100%', width:'100%'}}
      >
<FlatList 
data={content}
numColumns={1}
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>
</ScrollView>

</View>

<View style={{display:'flex',  flexDirection:'row', justifyContent:'space-between', alignItems:'center',paddingHorizontal:10, marginBottom:0, backgroundColor:colors.white, height:50, width:width}}>

  <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png"}} style={styles.cardImage} />

<Text style={{fontSize:12, fontWeight:'700', marginLeft:30}}>Prescription Uploaded</Text>
</View>

<MaterialIcon name="visibility" size={18} color={colors.primary}  /> 

</View>

</ScrollView>





<View style={styles.container}>


<View style={styles.row}>
  <Text style={styles.label}>Sub total</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(order.subtotal)}</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Promo Code Applied</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(0)}</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Service Charge</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(order.service_charge)}</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Amount Paid</Text>
  <Text style={styles.label}>{CURRENCY+FormatNumber(order.ground_total)}</Text>
</View>

</View>


    </View>
  )
}


export default OrderDetails

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
width:width,
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
  },
  profile:{
    width:40,
    height:40,
    borderRadius:5,
    resizeMode:'contain'
  },
 content:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    paddingHorizontal:10,
    paddingVertical:10,
    backgroundColor:colors.white
  },
  circle:{
    height:18,
    width:18,
    borderRadius:9,
    backgroundColor:colors.navyBlue,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'

  }
})