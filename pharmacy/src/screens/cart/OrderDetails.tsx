
import React, { useCallback, useState, useRef, useEffect } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CATITEMS, LANGUAGELIST } from '../../components/data';
import { CURRENCY, ImagesUrl, ServerUrl, configJSON, configToken} from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { PrimaryButton } from '../../components/include/button';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';
import { FormatNumber, getBritishDate, getData, getTime } from '../../components/globalFunction';
import Loader from '../../components/loader';

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
  Orders:undefined;
  RiderMapView:undefined; 
    
   };

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetails'>;

 const OrderDetails =({ route, navigation }:Props)=> {

  const [products, setProducts] = useState([] as any)
  const fadeValue = useRef(new Animated.Value(0)).current 
  const [refreshing, setRefreshing] = useState(false)

  const [content, setContent] = useState([] as any)
  const [list, setList] = useState([] as any)
  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE)


  const [modalType, setModalType] = useState('load')
  const [loading, setLoading] = useState(false)


  const [errors, setErrors] = useState({

    isError:false,
    errorMessage:''
  });


  const AnimationStart =()=>{
    const config:any ={
      toValue:1,
      duration:1000,
      useNativeDriver: true
    }
    Animated.timing(fadeValue, config).start()
  
  }

const handleNext =()=>{
  navigation.navigate('Orders'); 
}

const handleBack =()=>{
  setLoading(false)
  navigation.navigate('Orders'); 
}


const CardCategory =({item}:{item:any})=>{
  return <View style={[styles.card, {
    backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>

<View>

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Text style={dynamicStyle.label}>{getProduct(item.product_code, 'product_name')}</Text> 

{getProduct(item.product_code, 'require_prescription')?
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png"}} style={styles.cardImage} />:[]}

</View>


<Text style={[styles.infoText, {marginBottom:10}]}>{item.qty} {item.unit
}{Number(item.qty)>1?'s':''}</Text>

</View>
</View>


    <Text style={[dynamicStyle.label, {fontWeight:'700'}]}>{CURRENCY+FormatNumber(item.amount)}</Text>


    </View>
  }

  const getProduct=(code:string, field:string)=>{

    let ans = products&&products.filter((item:any)=>item.code===code)
    
    let rs = ans.length!==0?ans[0][field]:''
    
    return rs
    }


    const fetchOrder = async()=>{

      const code = await getData('code');
      let url = ServerUrl+'/api/vendor/order/'+code+'/'+route.params.code
      try{
    let config = await configToken()
     await axios.get(url, config).then(response=>{
      if(response.data.type==='success'){

        setContent(response.data.data)
        setList(response.data.items)
        }else{
          setContent([])
        }
      }) 
    }catch(e){
      //console.log('error:',e)
    }
    }




const fetchProducts = async()=>{
  let config = await configToken()
  const code = await getData('code');

  let url = ServerUrl+'/api/vendor/products/all/'+code
  try{

 await axios.get(url, config).then(response=>{

    if(response.data.type==='success'){
      setProducts(response.data.data)

    }else{
      setProducts([])
    }
  })
}catch(e){
  console.log('error:',e)
}
}




const handleStatus =async(status:string)=>{


setLoading(true)


var fd = {  
  
  code:route.params.code,    
  field:'status',
  data:status
}
let url = ServerUrl+'/api/vendor/order/update';

let configJ = await configJSON()

   axios.post(url, fd, configJ)
   .then(response =>{

     if(response.data.type === 'success'){

      setModalType('Success')
      setErrors({...errors, errorMessage:'Order updated'})
      
               }else{
                  setModalType('Failed')
                  setErrors({...errors, errorMessage:response.data.message})
               
               }  
           })
           .catch((error)=>{
            setModalType('Failed')
            setErrors({...errors, errorMessage:error.message})
            
           }).finally(()=>{

            fetchOrder()

           })
}



    useEffect(()=>{
      AnimationStart()
    }, [content])
  
    const onRefresh = useCallback(()=>{
      setRefreshing(false)
      fetchOrder()
      }, [])
  
  useEffect(()=>{
    fetchOrder()
    fetchProducts()
  }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
    <Text style={dynamicStyle.label}>Order Num {route.params.code.toUpperCase()}</Text>
   
    <MaterialIcon name="more-vert" size={18} color={MODE==='Light'?colors.primary:colors.navyBlue}  />
    </View>

    <Loader 
    isModalVisible={loading} 
    type={modalType}
    message={errors.errorMessage} 
    action={handleBack}
     />


{content&&content.map((item:any, id:number)=>
<ScrollView key={id}>

    <View style={[styles.content, {
    backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>

<Animated.View style={{opacity:fadeValue}}>


<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:item.image_url?ImagesUrl+"/user/"+item.image_url:ImagesUrl+"/no.png"}} style={styles.profile} />

<View  style={{marginLeft:10}}>
<Text style={dynamicStyle.label}>{item.fullname}</Text>
<Text style={styles.infoText}>{getBritishDate(item.date_order)+', '+getTime(item.date_order.slice(11,item.date_order.length))} </Text>
</View>
</View>

</Animated.View>

<Animated.View style={{opacity:fadeValue}}>

<Text style={[dynamicStyle.label, {fontSize:12, textAlign:'right', color:item.status==='PENDING'?colors.rating:colors.primary}]}>{item.status}</Text>

<Text style={styles.infoText}>{CURRENCY+''+FormatNumber(item.ground_total)} | {item.method} </Text>

</Animated.View>
</View>


    <View style={{ marginVertical:5, maxHeight:(height/3)+25, backgroundColor:MODE==='Light'?colors.white:colors.dark  }}>
      <Text style={[styles.infoText, {margin:20}]}> Ordered Items</Text>


      <ScrollView
      horizontal={true}
      contentContainerStyle={{height:'100%', width:'100%'}}
      >
        
<FlatList 
data={list}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.code} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />}
/>
</ScrollView>



</View>

{item.prescription!==null?
<View style={[globalStyles.rowCenterBetween, {paddingHorizontal:10, marginBottom:0, backgroundColor:MODE==='Light'?colors.white:colors.dark, height:50, width:width}]}>


  <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png"}} style={styles.cardImage} />

<Text style={{fontSize:12, fontWeight:'700', marginLeft:30, color:MODE==='Light'?colors.dark:colors.white}}>Prescription Uploaded</Text>
</View>

<MaterialIcon name="visibility" size={18} color={colors.icon}  /> 

</View>:[]}



<View style={[styles.container, {
backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>


<View style={styles.row}>
  <Text style={dynamicStyle.label}>Sub total</Text>
  <Text style={dynamicStyle.label}>{CURRENCY+FormatNumber(item.subtotal)}</Text>
</View>

<View style={styles.row}>
  <Text style={dynamicStyle.label}>Promo Code Applied</Text>
  <Text style={dynamicStyle.label}>{CURRENCY+FormatNumber(item.discount)}</Text>
</View>

<View style={styles.row}>
  <Text style={dynamicStyle.label}>Service Charge</Text>
  <Text style={dynamicStyle.label}>{CURRENCY+FormatNumber(item.service_charge)}</Text>
</View>


<View style={styles.row}>
  <Text style={[dynamicStyle.label, {color:colors.navyBlue, fontSize:13}]}>Amount via {item.method}</Text>
  <Text style={[dynamicStyle.label, {color:colors.navyBlue, fontSize:13}]}>{CURRENCY+FormatNumber(item.ground_total)}</Text>
</View>

</View>

</ScrollView>)}





{content&&content.map((item:any, id:number)=>
<View key={id} style={{position:'absolute', bottom:0, backgroundColor:MODE==='Light'?colors.white:colors.dark}}>


<View style={[globalStyles.rowCenterBetween, {padding:10}]}>


<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png" }} style={styles.profile} />

<View style={{marginLeft:10}}>
  <Text style={dynamicStyle.label}>George Anderson</Text>
  <Text style={styles.infoText}>Delivery Partner Assign</Text>
  </View>
  </View>


  <MaterialIcon name="navigation" size={18} color={colors.icon}  /> 

</View>



  <PrimaryButton 
  handleAction={()=>handleStatus(item.status==='PENDING'? 'READY':'COMPLETED')}
  title={item.status==='PENDING'? 'Mark as ready':'Mark as completed'}
  />
</View>

)}
    </View>
  )
}


export default OrderDetails

const styles = StyleSheet.create({

  
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
},
cardImage:{
height:40,
width:40,
resizeMode:'cover',
},
container:{
width:width,
marginVertical:5,
},

row:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  marginHorizontal:10,
  marginVertical:5
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
    padding:10,
  },
})