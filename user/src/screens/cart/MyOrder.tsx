
import React, { useCallback, useState, useRef, useEffect } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';

import { dynamicStyles } from '../../components/dynamicStyles';
import { CURRENCY, ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { FormatNumber, getBritishDate, getData, getTime } from '../../components/globalFunction';
import { useZustandStore } from '../../api/store';
const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  MyOrder: undefined;
  BottomTabs:undefined; 
  OrderDetails:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'MyOrder'>;
 const MyOrder =({ route, navigation }:Props)=> {


  const [products, setProducts] = useState([] as any)
  const [old, setOld] = useState([] as any)
  const [list, setList] = useState([] as any)
  const [refreshing, setRefreshing] = useState(false)
  const fadeValue = useRef(new Animated.Value(0)).current 
  const [content, setContent]= useState([] as any)
interface item {
  title:string,
  isDefault:string,
  id:number
}

const MODE = useZustandStore(s => s.theme);
const dynamicStyle = dynamicStyles(MODE)


const handleBack =()=>{
  navigation.navigate('BottomTabs');
}

const handleNext =(code:string)=>{
  navigation.navigate('OrderDetails', {
    code:code,
  });  
}

const getProduct=(code:string)=>{

  let ans = products&&products.filter((item:any)=>item.code===code)
  
  let rs = ans.length!==0?ans[0].product_name:''
  
  return rs
  }


  const fetchProducts = async()=>{
    let config = await configToken()
  
    let url = ServerUrl+'/api/users/drugs/all'
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

  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={()=>handleNext(item.code)} style={[styles.box]}>


<View style={[styles.content, {paddingVertical:10}]}>
<View style={styles.content}>
<Image source={{ uri:item.image_url?ImagesUrl+"/user/"+item.image_url:ImagesUrl+"/no.png"}} style={styles.profile} />


<View  style={{marginLeft:10}}>
<Text style={styles.label}>{item.fullname}</Text>
<Text style={styles.infoText}>{getBritishDate(item.date_order)+', '+getTime(item.date_order.slice(11,item.date_order.length))}</Text>




<View style={{marginTop:15}}>
 
{list.filter((ls:any)=>ls.order_code===item.code).map((list:any, id:number)=>getProduct(list.product_code)!==''?<Text key={id} style={[styles.infoText,{
          color:MODE==='Light'?colors.dark:colors.white}]}>
            {getProduct(list.product_code)} ({list.qty})</Text>:null)}
</View>


</View>



</View>


<View>

<Text style={[styles.label, {fontSize:12, color:colors.navyBlue}]}>{item.status}</Text>

<Text style={styles.infoText}>{CURRENCY+FormatNumber(item.ground_total)} | {item.method} </Text>

</View>
</View>

<Text style={{textAlign:'right', color:colors.primary, fontSize:12, fontWeight:'600' }}>Review now</Text>

      </Pressable>
    }


  


    const  FetchContent = async()=>{
      //setLoading(true)
      let config = await configToken()
      let code = await getData('code')
      let url = ServerUrl+'/api/transaction/getorder/'+code
      try{
     await axios.get(url, config).then(response=>{
     
        if(response.data.type==='success'){
          setList(response.data.items)
 
  let recent = response.data.data.slice(0,20)
  let past = response.data.data.slice(20,response.data.data.length)

      setContent(recent)
      setOld(past)
       

          AnimationStart()
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




    useEffect(()=>{
      FetchContent()
      fetchProducts()
    }, [route])

const Header =()=>{

  return <>
  
  
<View style={{height:45, paddingHorizontal:10, justifyContent:'center'}}>
<Text style={styles.infoText}>Past</Text>
</View>

    <View style={styles.catItems}>

<FlatList 
data={old}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>
  </>
}

    const AnimationStart =()=>{
      const config:any ={
        toValue:1,
        duration:1000,
        useNativeDriver: true
      }
      Animated.timing(fadeValue, config).start()
    
    }

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back" size={18} onPress={handleBack} color={colors.dark}  /> 
    <Text style={styles.label}>Recent Order</Text>

    <View/>
    </View>

    <View style={{height:45, paddingHorizontal:10, justifyContent:'center'}}>
<Text style={styles.infoText}>In Progress</Text>
</View>


    <View style={styles.catItems}>

<FlatList 
data={content}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
ListFooterComponent={<Header />}
renderItem={({item})=> <CardCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>


    </View>
  )
}


export default MyOrder

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
 
  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },



box:{
  width:width,
  backgroundColor:colors.white,
  marginBottom:5,
  display:'flex',
  padding:10,
    },

catItems:{
marginBottom:50

},

px:{
  height:25,
  width:25,
  resizeMode:'cover',
    },
catImage:{
height:(height/2)*0.2,
width:(width/2)-40,
resizeMode:'contain',
marginTop:15
  },

  address:{
    backgroundColor:colors.white,
    display:'flex',
    flexDirection:'row',
    paddingVertical:10
  },

 
addItem:{
  height:25,
  width:25,
  backgroundColor:colors.primary,
  borderBottomRightRadius:5,
  borderTopLeftRadius:5,
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  position:'absolute',
  bottom:0,
  right:0
},
sellerImage:{
  height:80,
  width:80,
  resizeMode:'cover'
},
companyLogo:{
  height:100,
  width:100,
  backgroundColor:'#9Be471',
  borderRadius:10,
  display:'flex',
  justifyContent:'center',
  alignItems:'center'

},
container:{
  display:'flex',
   flexDirection:'row', 
   backgroundColor:colors.white,
   paddingVertical:15,
   paddingHorizontal:10
  
  
  },
  profile:{
    width:50,
    height:50,
    borderRadius:5,
    resizeMode:'contain'
  },
 content:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'flex-start',
  },
  locationWrapper:{
    position:'absolute', 
    top:100,
    right:10,
    width:(width/4)+10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor:colors.white,
    padding:10,
  },

  labelLocation:{
    fontWeight:'600',
    fontSize:12,
    marginVertical:10
    
  },
})