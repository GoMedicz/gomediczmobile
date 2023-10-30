
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

import axios from 'axios';
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CURRENCY, ImagesUrl, ServerUrl, configJSON, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';
import { FormatNumber, abbreviate, getData, getDays } from '../../components/globalFunction';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Insight: undefined;
  Earnings:undefined; 
    BottomTabs:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Insight'>;
 const Insight =({ route, navigation }:Props)=> {

  const [products, setProducts] = useState([] as any)
  const MODE = useZustandStore(store => store.theme);
  const dynamicStyle = dynamicStyles(MODE);
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState({
    order:0,
    pending:0,
    revenue:0,
    items:[] as any
  })
  const [refreshing, setRefreshing] = useState(false)


  const fadeValue = useRef(new Animated.Value(0)).current 
  const [chartData, setChartData] = useState({
    label:[] as any,
    item:[] as any
  })


  const data = {
    labels: chartData.label,
    datasets: [
      {
        data: chartData.item
      }
    ]
  };

const CardCategory =({item}:{item:any})=>{
  
  return <Pressable  style={[styles.card, 
    {backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>


<Animated.View style={{opacity:fadeValue}}>
<View style={globalStyles.rowCenterBetween}>
<View style={styles.imageWrapper}>
<Image source={{ uri:item.image_url?ImagesUrl+"/vendors/products/"+item.image_url:ImagesUrl+"/no.png"}} style={styles.cardImage} />

</View>


<View>

<Text style={dynamicStyle.label}>{item.product_name}</Text>
<Text style={styles.infoText}>Operum England</Text>

<View style={styles.addPlus}>
  <Text style={dynamicStyle.label}>{item.total} Sold</Text>
</View>
</View>
</View>
</Animated.View>


    <View style={{display:'flex', flexDirection:'column',  height:60, justifyContent:'flex-end', alignItems:'flex-end'}}>
      <Text style={[styles.infoText, {color:MODE==='Light'?colors.dark:colors.white}]}>Revenue 
    <Text style={[dynamicStyle.label, {color:MODE==='Light'?colors.dark:colors.grey}]}> {CURRENCY+FormatNumber(item.revenue)}</Text></Text>
    </View>

    </Pressable>
  }

const Header =()=>{

  return (

<>

<Animated.View style={{opacity:fadeValue}}>
<View style={[globalStyles.rowCenterBetween,{height:60, padding:10, backgroundColor:MODE==='Light'?colors.white:colors.dark, marginVertical:5, justifyContent:'space-around'}]}>

<View style={globalStyles.columnCenterCenter}>
  <Text style={[dynamicStyle.label, {color:colors.grey, marginBottom:5}]}>Orders</Text>
  <Text style={dynamicStyle.label}>{content.order}</Text>
</View>


<View style={[globalStyles.columnCenterCenter, styles.bordered]}>
  <Text style={[dynamicStyle.label, {color:colors.grey, marginBottom:5}]}>Revenue</Text>
  <Text style={dynamicStyle.label}>{CURRENCY+ abbreviate(content.revenue, 0)} </Text>
</View>


<View style={globalStyles.columnCenterCenter}>
  <Text style={[dynamicStyle.label, {color:colors.grey, marginBottom:5}]}>Pending</Text>
  <Text style={dynamicStyle.label}>{content.pending}</Text>
</View>

</View>
</Animated.View>



<View style={{backgroundColor:MODE==='Light'?colors.white:colors.dark, height:(height/3)+30, padding:10}}>
  <Text style={[dynamicStyle.label, {marginBottom:10}]}>Orders</Text>

  
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


<View style={{height:50, justifyContent:'center', marginHorizontal:10}}>
  <Text style={dynamicStyle.label}>Top Selling Items</Text>
</View>

</>
  )
}

const handleBack =()=>{
  
  navigation.navigate('BottomTabs');
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
        order:response.data.data[0].order,
        pending:response.data.data[0].pending,
        revenue:response.data.data[0].revenue,
        items:response.data.items
      })
    }else{
      setContent(  {order:0,
        pending:0,
        revenue:0,
        items:[] as any
        
      })
    }
  }) 
}catch(e){
  console.log('error:',e)
}
}



useEffect(()=>{
  AnimationStart()
}, [content])


const AnimationStart =()=>{
  const config:any ={
    toValue:1,
    duration:1000,
    useNativeDriver: true
  }
  Animated.timing(fadeValue, config).start()

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
      let sqlString = result.map(data=>"sum(CAST(case when date_order  = '"+data+"'  then amount::varchar else 0::varchar end AS INTEGER)) AS "+getDays(data).toLowerCase()+"")

      let final =   "SELECT  "+String(sqlString)+ " from tbl_order_items where vendor_code ='"+code+"'"

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



  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    fetchBalance()
    fetchChart()
    }, [])


    useEffect(()=>{
      fetchBalance()
      fetchChart()
    }, [])


  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="menu" onPress={handleBack} size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
    <Text style={dynamicStyle.label}>Insight</Text>
    
    <View style={globalStyles.rowCenterCenter}>
      <Text style={[dynamicStyle.label, {color:colors.primary, marginRight:10, fontWeight:'700'}]}>TODAY</Text>
      <MaterialIcon name="arrow-drop-down" size={18} color={colors.primary}  />
    </View>
    </View>


    <View style={{ marginVertical:5, flex:1}}>
<FlatList 
ListHeaderComponent={<Header />}
data={content.items}
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


export default Insight

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
  marginBottom:5,
  padding:10
},
cardImage:{
height:60,
width:80,
resizeMode:'contain',
},
addPlus:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  marginTop:10
},


  bordered:{
    height:40,
    width:width/3,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderColor:colors.grey1Opacity
    
  },
  imageWrapper:{
    display:'flex', 
    flexDirection:'row',
     alignItems:'center',
     justifyContent:'center',
     backgroundColor:colors.white,
     borderRadius:10,
    marginRight:10
  }
  
})