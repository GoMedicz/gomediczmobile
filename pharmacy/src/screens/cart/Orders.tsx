
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, TouchableOpacity } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { DOCTORS } from '../../components/data';
import { ImagesUrl} from '../../components/includes';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  OrderDetails: undefined;
  Orders:undefined; 
  AccountProfile:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Orders'>;
 const Orders =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState('Present')
  const [refreshing, setRefreshing] = useState(false)


  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE)






const handleNext =()=>{
  navigation.navigate('OrderDetails');
}



const ItemCategory =({item}:{item:any})=>{
  return <Pressable onPress={handleNext} style={[styles.docBox,{
    backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>

<View style={{display:'flex', flexDirection:'row'}}>
<Image source={{ uri:ImagesUrl+"/doctors/"+item.image }} style={styles.profile} />


<View style={ {marginLeft:10}}>

    <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:12, fontWeight:'600', marginBottom:2}}>{item.fullname}</Text>


    <Text style={styles.infoText}>13 June, 11:20 am</Text>

<View style={{marginTop:30}}>
    <Text style={[styles.h4,{
          color:MODE==='Light'?colors.dark:colors.white}]}>Salospir 100mg Tablet</Text>
     <Text style={[styles.h4,{
          color:MODE==='Light'?colors.dark:colors.white}]}>Non Drosy Lerinrin Tablet</Text>
  <Text style={[styles.h4,{
          color:MODE==='Light'?colors.dark:colors.white}]}>Xenical 120mg Tablet</Text>
    </View>

  </View> 
  </View>

  <View >
    <Text style={[dynamicStyle.label, {fontSize:12, color:colors.rating}]}>PENDING </Text>
    <Text style={[styles.infoText]}>$18.00 | COD </Text>
    </View>




    </Pressable>
  }

  const handleBack =()=>{
    navigation.navigate('AccountProfile');
  }


  const handleSwitch =(data:string)=>{
    setCurrent(data)
  }

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
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



<View style={styles.catItems}>

<FlatList 
data={DOCTORS}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <ItemCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>


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