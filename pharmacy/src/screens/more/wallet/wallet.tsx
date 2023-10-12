
import React, { useCallback, useState, useRef, useEffect } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Platform, Dimensions, Pressable, TouchableOpacity, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../../assets/colors';
import { CATEGORY } from '../../../components/data';
import { CURRENCY, ServerUrl, configToken} from '../../../components/includes';
import { useZustandStore } from '../../../api/store';
import { dynamicStyles } from '../../../components/dynamicStyles';
import { FormatNumber, getBritishDate, getData, getTime } from '../../../components/globalFunction';
import { globalStyles } from '../../../components/globalStyle';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Wallet: undefined;
  SendMoney:undefined;
  AccountProfile:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Wallet'>;
 const Wallet =({ route, navigation }:Props)=> {


  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE);

  const fadeValue = useRef(new Animated.Value(0)).current 
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [balance, setBalance] = useState(0)
  const [content, setContent]= useState([] as any)

  const AnimationStart =()=>{
    const config:any ={
      toValue:1,
      duration:1000,
      useNativeDriver: true
    }
    Animated.timing(fadeValue, config).start()
  
  }

  const handleBack =()=>{
    navigation.navigate('AccountProfile');
  }

const handleSend =()=>{
  navigation.navigate('SendMoney');
}


  const CardCategory =({item}:{item:any})=>{
    return <Pressable  style={[styles.box, {
      backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>



<Animated.View style={{opacity:fadeValue}}>
      <Text style={dynamicStyle.label}>{item.payer}</Text>
      <Text style={[globalStyles.infoText, {marginTop:5}]}>{item.total_item} Items | {getBritishDate(item.createdAt)+', '+getTime(item.createdAt.slice(11,item.createdAt.length))}</Text>
      
</Animated.View>


<Animated.View style={{opacity:fadeValue}}>
      <Text style={[globalStyles.infoText, {color:colors.dark}]}>{CURRENCY+FormatNumber(item.amount)}</Text>
      <Text style={[globalStyles.infoText, {marginTop:5}]}>{item.method}</Text>
      </Animated.View>
   
  

      <Animated.View style={{opacity:fadeValue}}>
      <Text style={[globalStyles.infoText, {color:colors.dark}]}>{CURRENCY+FormatNumber(item.discount)}</Text>
      <Text style={[globalStyles.infoText, {marginTop:5}]}>Discount</Text>
      </Animated.View>
   

      </Pressable>
    }


  const Header =()=>{


    return (<>
      <View style={{backgroundColor:MODE==='Light'?colors.white:colors.dark,  paddingHorizontal:10, paddingTop:10, paddingBottom:35}}>
    
  
      <Text style={globalStyles.infoText}>AVAILABLE BALANCE</Text>
            <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:25, fontWeight:'700'}}>{CURRENCY+' '+FormatNumber(balance)}</Text>
      </View>

<View style={{display:'flex', flexDirection:'row', height:40, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark, alignItems:'center', paddingHorizontal:10}}>
  <Text style={[globalStyles.infoText, {fontSize:12, fontWeight:'500', color:MODE==='Light'?colors.dark:colors.grey}]}>Recent</Text>

 
</View>
<TouchableOpacity style={styles.addMoney} onPress={handleSend} activeOpacity={0.8}>
    <Text style={{color:colors.white, fontSize:14, fontWeight:'600'}}>Send to Bank</Text>
  </TouchableOpacity>
  </>
    )
  }

  const fetchBalance = async()=>{
    let config = await configToken()
    const wallet = await getData('wallet');
    let url = ServerUrl+'/api/vendor/account/'+wallet
    try{

   await axios.get(url, config).then(response=>{

      if(response.data.type==='success'){
        setBalance(response.data.data[0].balance)
      }else{
        setBalance(0)
      }
    }) 
  }catch(e){
    console.log('error:',e)
  }
  }



  const fetchContent = async()=>{
    let config = await configToken()
    const wallet = await getData('wallet');
    let url = ServerUrl+'/api/payment/transactions/'+wallet
    try{

   await axios.get(url, config).then(response=>{
 
      if(response.data.type==='success'){
        setContent(response.data.data)

        AnimationStart()
      }else{
        setContent([])
      }
    }).finally(()=>{
      setRefreshing(false)
    }) 
  }catch(e){
    console.log('error:',e)
  }
  }


  useEffect(()=>{
    fetchBalance()
    fetchContent()
  },[])


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   fetchContent()
   fetchBalance()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="menu" size={18} onPress={handleBack} color={MODE==='Light'?colors.dark:colors.white}  />  
    <Text style={dynamicStyle.label}>Wallet</Text>
<View />
    </View>

    <View style={styles.catItems}>

<FlatList 
data={content}
numColumns={1}
ListHeaderComponent={<Header/>}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>


    </View>
  )
}


export default Wallet

const styles = StyleSheet.create({


box:{
  width:width,
  marginBottom:5,
  display:'flex',
  justifyContent:'space-between',
  flexDirection:'row',
  alignItems:'center',
  paddingHorizontal:15,
  paddingVertical:20,
  
    },

catItems:{
flex:1,
marginHorizontal:5,

},

  addMoney:{
    height:50,
    backgroundColor:colors.primary,
    position:'absolute',
    right:10,
    padding:10,
    width:140,
    top:60,
    zIndex:1,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'

    
  }
})