
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, TouchableOpacity, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { DOCTORS } from '../../components/data';
import { CURRENCY, ImagesUrl, ServerUrl, configToken} from '../../components/includes';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';
import { FormatNumber, getBritishDate, getData, getTime } from '../../components/globalFunction';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  OrderDetails:{
    code:string
  };
  Orders:undefined; 
  AccountProfile:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Orders'>;
 const Orders =({ route, navigation }:Props)=> {

  const fadeValue = useRef(new Animated.Value(0)).current 
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState('Present')
  const [content, setContent] = useState([] as any)
  const [products, setProducts] = useState([] as any)
  const [old, setOld] = useState([] as any)
  const [refreshing, setRefreshing] = useState(false)
  const [list, setList] = useState([] as any)

  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE)



  const AnimationStart =()=>{
    const config:any ={
      toValue:1,
      duration:1000,
      useNativeDriver: true
    }
    Animated.timing(fadeValue, config).start()
  
  }

const getProduct=(code:string)=>{

let ans = products&&products.filter((item:any)=>item.code===code)

let rs = ans.length!==0?ans[0].product_name:''

return rs
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

const handleNext =(code:string)=>{
  navigation.navigate('OrderDetails', {
    code:code
  });
}



const ItemCategory =({item}:{item:any})=>{

  
  return  <Pressable onPress={()=>handleNext(item.code)} style={[styles.docBox,{
    backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>

<View style={{display:'flex', flexDirection:'row'}}>

<Image source={{ uri:item.image_url?ImagesUrl+"/user/"+item.image_url:ImagesUrl+"/no.png"}} style={styles.profile} />




<View style={ {marginLeft:10}}>

    <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:12, fontWeight:'600', marginBottom:2}}>{item.fullname}</Text>


    <Text style={styles.infoText}>{getBritishDate(item.date_order)+', '+getTime(item.date_order.slice(11,item.date_order.length))}</Text>

<View style={{marginTop:30}}>


{list.filter((ls:any)=>ls.order_code===item.code).map((list:any, id:number)=>getProduct(list.product_code)!==''?<Text key={id} style={[styles.h4,{
          color:MODE==='Light'?colors.dark:colors.white}]}>
            {getProduct(list.product_code)}</Text>:'')}
  
    </View>

  </View> 
  </View>

<View>
    <Text style={[dynamicStyle.label, {fontSize:12, textAlign:'right', color:item.status==='PENDING'?colors.rating:colors.primary}]}>{item.status} </Text>


    <Text style={[styles.infoText]}>{CURRENCY+''+FormatNumber(item.ground_total)} | {item.method} </Text>
    </View>
    </Pressable>
  }

  const handleBack =()=>{
    navigation.navigate('AccountProfile');
  }


  const handleSwitch =(data:string)=>{
    setCurrent(data)
  }

    

  const fetchOrder = async()=>{

    const code = await getData('code');
    let url = ServerUrl+'/api/vendor/transaction/'+code
    try{
  let config = await configToken()
   await axios.get(url, config).then(response=>{
    if(response.data.type==='success'){

  let recent = response.data.data.slice(0,20)
  let past = response.data.data.slice(20,response.data.data.length)

      setContent(recent)
      setOld(past)
      setList(response.data.items)
      }else{
        setContent([])
        setOld([])
      }
    }).finally(()=>{
      setRefreshing(false)
    }) 
  }catch(e){
    console.log('error:',e)
  }
  }

  useEffect(()=>{
    AnimationStart()
  }, [content])


  const onRefresh = ()=>{
    fetchOrder()
    }

useEffect(()=>{

  fetchProducts()
  fetchOrder()
}, [])
  
  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon onPress={handleBack} name="menu" size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
    <Text style={dynamicStyle.label}>Recent Orders</Text>
    
    <View/>
    </View>

    <View style={[styles.headerItem, {
         backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>
      <TouchableOpacity activeOpacity={0.8} onPress={()=>handleSwitch('Present')}>
      <Text style={[dynamicStyle.label, {color:current==='Present'?colors.navyBlue:colors.grey, fontWeight:'700'}]}>New Orders</Text>
      </TouchableOpacity>


      <TouchableOpacity activeOpacity={0.8} onPress={()=>handleSwitch('Past')}>
      <Text style={[dynamicStyle.label, {color: current==='Past'?colors.navyBlue:colors.grey}]}>Past Orders</Text>
      </TouchableOpacity>
    </View>


    <Animated.View style={[styles.catItems, {opacity:fadeValue}]}>


<FlatList 
data={current==='Past'?old:content}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <ItemCategory key={item.code} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</Animated.View>


    </View>
  )
}


export default Orders

const styles = StyleSheet.create({
 
  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },

catItems:{
flex:1,
marginTop:10,


},

profile:{
  width:40,
  height:40,
  borderRadius:5,
  resizeMode:'contain'
},
docBox:{
  width:width,
  marginBottom:5,
  display:'flex',
  padding:10,
  flexDirection:'row',
  justifyContent:'space-between'
  
    },
  
        headerItem:{
         display:'flex',
         flexDirection:'row',
         justifyContent:'space-between',
         paddingVertical:12,
         paddingHorizontal:50
        },

        h4:{
          fontSize:10, 
          fontWeight:'600', 
          marginBottom:5
        }
})