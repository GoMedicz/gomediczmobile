
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATITEMS, DATES, LANGUAGELIST, TIMES } from '../../components/data';
import { ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );


      
type RootStackParamList = {
  ConfirmBooking: undefined;
  Payment:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmBooking'>;
 const ConfirmBooking =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handlePayment =()=>{
  navigation.navigate('Payment');
}

const handleNext =()=>{
  navigation.navigate('BottomTabs', {
    code:'cds',
  }); 
}


const CardCategory =({item}:{item:any})=>{
  return <Pressable style={[styles.card]}>
 
<Text style={styles.label}>{item.title}</Text> 

<View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
<Text style={[styles.infoText, {marginTop:10}]}>City Cure Labs</Text>
<Text style={[styles.label, {fontWeight:'700'}]}>N44.00</Text>
</View>

    </Pressable>
  }



const CardDate =({item}:{item:any})=>{
  return <Pressable style={styles.box}>
<Text style={[styles.infoText, {fontSize:10}]}>{item.day}</Text>
<Text style={styles.date}>{item.date}</Text>
    </Pressable>
  }
  

  const CardTime =({item}:{item:any})=>{
    return <Pressable style={[styles.timeBox]}>
  <Text style={styles.time}>{item.time}</Text>
      </Pressable>
    }


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:'#F4F8FB'}]}>
    
    <ScrollView>
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={14} color={colors.dark}  /> 
    <Text style={styles.label}>Confirm Booking</Text>
    <View />
    </View>



    <Pressable style={[styles.card]}>
 
 <Text style={styles.label}>Complete Blood Count</Text> 
 
 <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
 <Text style={[styles.infoText, {marginTop:10}]}>City Cure Labs</Text>
 <Text style={[styles.label, {fontWeight:'700'}]}>N44.00</Text>
 </View>
 
     </Pressable>


   {/*   <Pressable style={[styles.card]}>
 
 <Text style={styles.label}>Complete Blood Count</Text> 
 
 <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
 <Text style={[styles.infoText, {marginTop:10}]}>City Cure Labs</Text>
 <Text style={[styles.label, {fontWeight:'700'}]}>N44.00</Text>
 </View>
 
     </Pressable>
 */}


    

<View style={styles.card}>
<Text style={styles.infoText}>Pickup Address</Text>
<View style={styles.address}>
<MaterialIcon name="home" size={18} color={colors.icon}  />

<View style={{marginLeft:10, width:width-50}}>
  <Text style={styles.label}>Home</Text>

  <Text style={{fontSize:10, marginTop:10, opacity:0.6,marginRight:10}}>14134, Silver Green Street, 2nd Avenue, Hamiltone, New York, USA</Text>
 
</View>
</View>
</View>

<View style={{backgroundColor:colors.white, marginTop:10}}>
<View style={[styles.row, {marginTop:25, paddingBottom:0}]}>
<Text style={styles.infoText}>Select Date</Text>

<Text style={[styles.label]}>June 2020</Text>
</View>

<View style={[styles.row]}>

  
<FlatList 
data={DATES}
horizontal
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardDate key={item.id} item={item} />}

/>

</View>

<View style={[styles.row, {marginTop:20}]}>
<Text style={styles.infoText}>Select Time</Text>

</View>


<View style={[styles.row, {paddingVertical:10}]}>
<FlatList 
data={TIMES}
horizontal
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardTime key={item.id} item={item} />}

/>

</View>
</View>



</ScrollView>
<View style={styles.container}>


<View style={styles.row}>
  <Text style={styles.label}>Sub total</Text>
  <Text style={styles.label}>N18.00</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Pickup Charge</Text>
  <Text style={styles.label}>N18.00</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Amount to Pay</Text>
  <Text style={styles.label}>N18.00</Text>
</View>

<TouchableOpacity onPress={handlePayment} activeOpacity={0.9} style={[globalStyles.button, {width:width, marginHorizontal:0, borderRadius:0, marginTop:10, } ]}>
  <Text style={globalStyles.buttonText}>Continue to Pay</Text> 
</TouchableOpacity>

</View>
    </View>
  )
}


export default ConfirmBooking

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
  padding:10,
  backgroundColor:colors.white,
  marginTop:5
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
paddingTop:5,
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
    display:'flex',
    flexDirection:'row',
    paddingVertical:10
  },
  time:{
    fontWeight:'600',
    fontSize:14,
    marginTop:3
  },

  date:{
    fontWeight:'600',
    fontSize:18,
    marginTop:3
  },
  box:{
  height:45,
  width:45,
  borderRadius:5,
  backgroundColor:colors.lightSkye,
  display:'flex',
  alignItems:'center',
  justifyContent:'space-between',
  paddingVertical:5,
  marginRight:10
  },
  
  timeBox:{
    height:45,
    borderRadius:5,
    backgroundColor:colors.lightSkye,
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical:10,
    paddingHorizontal:22,
    marginRight:10
  },
  
})