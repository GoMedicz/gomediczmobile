
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Platform, Dimensions, Pressable, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import axios from 'axios';
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CATITEMS, LANGUAGELIST } from '../../components/data';
import { globalStyles } from '../../components/globalStyle';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';

import { CURRENCY, ImagesUrl, ServerUrl, configJSON, configToken } from '../../components/includes';
import { FormatNumber, abbreviate, getBritishDate, getData, getDays, getTime } from '../../components/globalFunction';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Earnings: undefined;
  StoreItems:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Earnings'>;
 const Earnings =({ route, navigation }:Props)=> {

  const MODE = useZustandStore(store => store.theme);
  const dynamicStyle = dynamicStyles(MODE);
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [chartData, setChartData] = useState({
    label:[] as any,
    item:[] as any
  })
  const [transaction, setTransaction] = useState([] as any)
  const fadeValue = useRef(new Animated.Value(0)).current 
  const [content, setContent] = useState({
  
    revenue:0,
    items:[] as any
  })


const handleBack =()=>{
  navigation.goBack();
}




const fetchTransaction = async()=>{
  let config = await configToken()
  const wallet = await getData('wallet');

  let url = ServerUrl+'/api/vendor/withdrawal/'+wallet
  try{

 await axios.get(url, config).then(response=>{

    if(response.data.type==='success'){
      setTransaction(response.data.data)

    }else{
      setTransaction([])
    }
  })
}catch(e){
  console.log('error:',e)
}
}



const fetchBalance = async()=>{
  let configj = await configJSON()
  const wallet = await getData('wallet');
  const code = await getData('code');

  let url = ServerUrl+'/api/vendor/statistics'
  try{


    let fd ={
        code:code,
        wallet:wallet
    }
 await axios.post(url, fd, configj).then(response=>{

    if(response.data.type==='success'){
      setContent({
        revenue:response.data.data[0].revenue,
        items:response.data.items
      })
    }else{
      setContent({
        revenue:0,
        items:[] as any
        
      })
    }
  }) 
}catch(e){
  console.log('error:',e)
}
}

const CardCategory =({item}:{item:any})=>{
  return <Animated.View style={{opacity:fadeValue}}>
    <Pressable  style={[styles.card, {
    backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>

<View style={[globalStyles.rowCenterBetween, {width:width-30}]}>
<Text style={dynamicStyle.label}>{item.bank_name}</Text>
<Text style={dynamicStyle.label}>{CURRENCY+FormatNumber(item.amount)}</Text>
</View>

<View style={[globalStyles.rowCenterBetween, {width:width-100}]}>
<Text style={[styles.infoText, {letterSpacing:2}]}>{item.account_number}</Text>
<Text style={styles.infoText}>{getBritishDate(item.createdAt)+', '+getTime(item.createdAt.slice(11,item.createdAt.length))}</Text>
</View>

    </Pressable></Animated.View>
  }


  const data = {
    labels: chartData.label,
    datasets: [
      {
        data: chartData.item
      }
    ]
  };

const Header =()=>{

  return (

<>


<Animated.View style={{opacity:fadeValue}}>
<View style={[globalStyles.rowCenterBetween,{height:50, paddingVertical:10,paddingHorizontal:20, backgroundColor:MODE==='Light'?colors.white:colors.dark, marginBottom:5}]}>
<Text style={[dynamicStyle.label, {color:colors.grey}]}>Total Earnings</Text>

  <Text style={dynamicStyle.label}>{CURRENCY+FormatNumber(content.revenue)}</Text>

</View>
</Animated.View>

<View style={{backgroundColor:MODE==='Light'?colors.white:colors.dark, height:(height/3), padding:10}}>
  <Text style={dynamicStyle.label}>Earnings</Text>

  <View style={{backgroundColor:MODE==='Light'?colors.white:colors.dark}}>
    

  <BarChart
  
  data={data}
  width={width-20}
  height={height/3}
  yAxisLabel={CURRENCY}
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
  chartConfig={{
    backgroundColor: "#e26a00",
    backgroundGradientFrom: colors.primary,
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => ` rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  }}
  verticalLabelRotation={30}
/>


  </View>
</View>


<View style={{height:40, justifyContent:'center', marginHorizontal:10, marginTop:20}}>
  <Text style={dynamicStyle.label}>Payouts</Text>
</View>

</>
  )
}


var today = new Date().toISOString().slice(0,10)

function getLastSixdays() {
  const date = new Date();
  const today = date.getDate();
  const currentDay = date.getDay();
  const newDate = date.setDate(today - 6);
  return new Date(newDate).toISOString().slice(0,10);
}


const fetchChart = async()=>{


  const start = new Date(getLastSixdays())
      const end =  new Date(today)
  
      var result = []
      while (start <= end){
          result.push(new Date(start).toISOString().slice(0,10))
          start.setDate(start.getDate()+1)
      }

      const code = await getData('code');
      const wallet = await getData('wallet');
      let sqlString = result.map(data=>"sum(CAST(case when TO_CHAR(date_order, 'yyyy-mm-dd')  = '"+data+"'  then ground_total::varchar else 0::varchar end AS INTEGER)) AS "+getDays(data).toLowerCase()+"")

      let final =   "SELECT  "+String(sqlString)+ " from tbl_orders where vendor_code ='"+code+"'"

      let label = result.map(data=>getDays(data).toLowerCase())
  let url = ServerUrl+'/api/vendor/earnings'
  try{
    let fd ={
      sql:final,
      code:code,
      wallet:wallet
    }
let configj = await configJSON()
 await axios.post(url, fd, configj).then(response=>{
  if(response.data.type==='success' && Array.isArray(response.data.data)){
    const res = response.data.data[0];

let ls = label.map((ls:any)=>res[ls])

setChartData({
  label: label,
  item:  ls

})

    }else{
      setChartData({
        label: [],
        item: []
      
      })
    }
  })
}catch(e){
  console.log('error:',e)
}
}




useEffect(()=>{
  AnimationStart()
}, [content, transaction])


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
  fetchBalance()
  fetchChart()
  }, [])


  useEffect(()=>{
    fetchTransaction()
    fetchBalance()
    fetchChart()
  }, [])

  return (<View style={ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="menu" onPress={handleBack} size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
    <Text style={dynamicStyle.label}>Earnings</Text>
    
    <View style={globalStyles.rowCenterCenter}>
      <Text style={[dynamicStyle.label, {color:colors.primary, marginRight:10, fontWeight:'700'}]}>TODAY</Text>
      <MaterialIcon name="arrow-drop-down" size={18} color={colors.primary}  />
    </View>
    </View>


    <View style={{ marginVertical:5, flex:1}}>
<FlatList 
ListHeaderComponent={<Header />}
data={transaction}
numColumns={1}
showsVerticalScrollIndicator={false}
showsHorizontalScrollIndicator={false}
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


export default Earnings

const styles = StyleSheet.create({

 
  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },
card:{
  display:'flex',
  alignItems:'flex-start',
  justifyContent:'center',
  flexDirection:'column',
  padding:15,
  marginBottom:5,
}
  
})