
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CATITEMS, LANGUAGELIST } from '../../components/data';
import { CURRENCY, ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
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
  Insight: undefined;
  Earnings:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Insight'>;
 const Insight =({ route, navigation }:Props)=> {

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




const CardCategory =({item}:{item:any})=>{
  return <Pressable  style={[styles.card, 
    {backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>



<View style={globalStyles.rowCenterBetween}>
<View style={styles.imageWrapper}>
<Image source={{ uri:ImagesUrl+"/products/"+item.image }} style={styles.cardImage} />

</View>


<View>

<Text style={dynamicStyle.label}>{item.title}</Text>
<Text style={styles.infoText}>Operum England</Text>

<View style={styles.addPlus}>
  <Text style={dynamicStyle.label}>124 Sold</Text>
</View>
</View>
</View>

    <View style={{display:'flex', flexDirection:'column',  height:60, justifyContent:'flex-end', alignItems:'flex-end'}}>
      <Text style={[styles.infoText, {color:MODE==='Light'?colors.dark:colors.white}]}>Revenue 
    <Text style={[dynamicStyle.label, {color:MODE==='Light'?colors.dark:colors.grey}]}> N44.00</Text></Text>
    </View>

    </Pressable>
  }

const Header =()=>{

  return (

<>


<View style={[globalStyles.rowCenterBetween,{height:60, padding:10, backgroundColor:MODE==='Light'?colors.white:colors.dark, marginVertical:5, justifyContent:'space-around'}]}>

<View style={globalStyles.columnCenterCenter}>
  <Text style={[dynamicStyle.label, {color:colors.grey, marginBottom:5}]}>Orders</Text>
  <Text style={dynamicStyle.label}>698</Text>
</View>


<View style={[globalStyles.columnCenterCenter, styles.bordered]}>
  <Text style={[dynamicStyle.label, {color:colors.grey, marginBottom:5}]}>Revenue</Text>
  <Text style={dynamicStyle.label}>{CURRENCY}7.8k</Text>
</View>


<View style={globalStyles.columnCenterCenter}>
  <Text style={[dynamicStyle.label, {color:colors.grey, marginBottom:5}]}>Pending</Text>
  <Text style={dynamicStyle.label}>14</Text>
</View>

</View>


<View style={{backgroundColor:MODE==='Light'?colors.white:colors.dark, height:(height/3)+30, padding:10}}>
  <Text style={dynamicStyle.label}>Orders</Text>

  <View>
    <Text>Chart here</Text>
  </View>
</View>


<View style={{height:50, justifyContent:'center', marginHorizontal:10}}>
  <Text style={dynamicStyle.label}>Top Selling Items</Text>
</View>

</>
  )
}

const handleBack =()=>{
  navigation.goBack();
}

  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
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