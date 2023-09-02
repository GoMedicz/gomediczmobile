
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Platform, Dimensions, Pressable } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CATITEMS, LANGUAGELIST } from '../../components/data';
import { globalStyles } from '../../components/globalStyle';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';
import { CURRENCY } from '../../components/includes';

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
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.goBack();
}





const CardCategory =({item}:{item:any})=>{
  return <Pressable  style={[styles.card, {
    backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>



<View style={[globalStyles.rowCenterBetween, {width:width-30}]}>
<Text style={dynamicStyle.label}>Bank of New York</Text>
<Text style={dynamicStyle.label}>{CURRENCY}378.00</Text>
</View>

<View style={[globalStyles.rowCenterBetween, {width:width-100}]}>
<Text style={styles.infoText}>6546 5456 1354 5435</Text>
<Text style={styles.infoText}>30 Jun 2020, 11:59 am</Text>
</View>




    </Pressable>
  }

const Header =()=>{

  return (

<>


<View style={[globalStyles.rowCenterBetween,{height:50, paddingVertical:10,paddingHorizontal:20, backgroundColor:MODE==='Light'?colors.white:colors.dark, marginBottom:5}]}>
<Text style={[dynamicStyle.label, {color:colors.grey}]}>Total Earnings</Text>

  <Text style={dynamicStyle.label}>{CURRENCY}7.8k</Text>

</View>


<View style={{backgroundColor:MODE==='Light'?colors.white:colors.dark, height:(height/3), padding:10}}>
  <Text style={dynamicStyle.label}>Earnings</Text>

  <View style={{backgroundColor:MODE==='Light'?colors.white:colors.dark}}>
    <Text >Chart here</Text>
  </View>
</View>


<View style={{height:40, justifyContent:'center', marginHorizontal:10}}>
  <Text style={dynamicStyle.label}>Payouts</Text>
</View>

</>
  )
}
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
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
data={CATITEMS}
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