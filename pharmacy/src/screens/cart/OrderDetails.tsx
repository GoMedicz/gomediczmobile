
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { PrimaryButton } from '../../components/include/button';
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
  RiderMapView:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetails'>;

 const OrderDetails =({ route, navigation }:Props)=> {

  const [refreshing, setRefreshing] = useState(false)

  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE)




const handleBack =()=>{
  navigation.goBack();
}

const handleNext =()=>{
  navigation.navigate('RiderMapView'); 
}


const CardCategory =({item}:{item:any})=>{
  return <Pressable onPress={handleNext} style={[styles.card, {
    backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>

<View>

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Text style={dynamicStyle.label}>{item.title}</Text> 
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png"}} style={styles.cardImage} />
</View>


<Text style={[styles.infoText, {marginBottom:10}]}>2 Packs</Text>

</View>
</View>


    <Text style={[dynamicStyle.label, {fontWeight:'700'}]}>N44.00</Text>
 


    </Pressable>
  }


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
    <Text style={dynamicStyle.label}>Order Num 221451</Text>
   
    <MaterialIcon name="more-vert" size={18} color={MODE==='Light'?colors.primary:colors.navyBlue}  />
    </View>


<ScrollView>

    <View style={[styles.content, {
    backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>

<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png" }} style={styles.profile} />

<View  style={{marginLeft:10}}>
<Text style={dynamicStyle.label}>Well Life Store 1</Text>
<Text style={styles.infoText}>11 June, 11:20 am </Text>
</View>
</View>


<View>

<Text style={[dynamicStyle.label, {fontSize:12, color:colors.rating, textAlign:'right'}]}>Pending</Text>

<Text style={styles.infoText}>$18.00 | PayPal </Text>

</View>
</View>



    <View style={{ marginVertical:5, maxHeight:(height/3)+25, backgroundColor:MODE==='Light'?colors.white:colors.dark  }}>
      <Text style={[styles.infoText, {marginHorizontal:20, marginTop:10}]}> Ordered Items</Text>


      <ScrollView
      horizontal={true}
      contentContainerStyle={{height:'100%', width:'100%'}}
      >
        
<FlatList 
data={CATITEMS}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />}
/>
</ScrollView>



</View>

<View style={[globalStyles.rowCenterBetween, {paddingHorizontal:10, marginBottom:0, backgroundColor:MODE==='Light'?colors.white:colors.dark, height:50, width:width}]}>

  <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png"}} style={styles.cardImage} />

<Text style={{fontSize:12, fontWeight:'700', marginLeft:30, color:MODE==='Light'?colors.dark:colors.white}}>Prescription Uploaded</Text>
</View>

<MaterialIcon name="visibility" size={18} color={colors.icon}  /> 

</View>



<View style={[styles.container, {
backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>


<View style={styles.row}>
  <Text style={dynamicStyle.label}>Sub total</Text>
  <Text style={dynamicStyle.label}>N18.00</Text>
</View>

<View style={styles.row}>
  <Text style={dynamicStyle.label}>Promo Code Applied</Text>
  <Text style={dynamicStyle.label}>N18.00</Text>
</View>

<View style={styles.row}>
  <Text style={dynamicStyle.label}>Service Charge</Text>
  <Text style={dynamicStyle.label}>N18.00</Text>
</View>

<View style={styles.row}>
  <Text style={[dynamicStyle.label, {color:colors.navyBlue, fontSize:13}]}>Amount via COD</Text>
  <Text style={[dynamicStyle.label, {color:colors.navyBlue, fontSize:13}]}>N18.00</Text>
</View>

</View>

</ScrollView>






<View style={{position:'absolute', bottom:0, backgroundColor:MODE==='Light'?colors.white:colors.dark}}>


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
  handleAction={handleNext}
  title='Mark as ready'
  />
</View>


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