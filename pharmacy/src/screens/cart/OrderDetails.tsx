
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl, MODE } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { PrimaryButton } from '../../components/include/button';

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

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handlePayment =()=>{
  navigation.navigate('RiderMapView');
}

const handleNext =()=>{
  navigation.navigate('RiderMapView'); 
}


const CardCategory =({item}:{item:any})=>{
  return <Pressable onPress={handleNext} style={[styles.card]}>

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>

<View>

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Text style={styles.label}>{item.title}</Text> 
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png"}} style={styles.cardImage} />
</View>


<Text style={[styles.infoText, {marginBottom:10}]}>2 Packs</Text>

</View>
</View>


    <Text style={[styles.label, {fontWeight:'700'}]}>N44.00</Text>
 


    </Pressable>
  }


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={14} color={MODE==='Light'?colors.dark:colors.white}  /> 
    <Text style={styles.label}>Order Num 221451</Text>
   
    <MaterialIcon name="more-vert" size={14} color={MODE==='Light'?colors.primary:colors.navyBlue}  />
    </View>


<ScrollView>

    <View style={[styles.content]}>

<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png" }} style={styles.profile} />

<View  style={{marginLeft:10}}>
<Text style={styles.label}>Well Life Store 1</Text>
<Text style={styles.infoText}>11 June, 11:20 am </Text>
</View>
</View>


<View>

<Text style={[styles.label, {fontSize:12, color:colors.rating, textAlign:'right'}]}>Pending</Text>

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
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
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



<View style={styles.container}>


<View style={styles.row}>
  <Text style={styles.label}>Sub total</Text>
  <Text style={styles.label}>N18.00</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Promo Code Applied</Text>
  <Text style={styles.label}>N18.00</Text>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Service Charge</Text>
  <Text style={styles.label}>N18.00</Text>
</View>

<View style={styles.row}>
  <Text style={[styles.label, {color:colors.navyBlue, fontSize:13}]}>Amount via COD</Text>
  <Text style={[styles.label, {color:colors.navyBlue, fontSize:13}]}>N18.00</Text>
</View>

</View>

</ScrollView>






<View style={{position:'absolute', bottom:0, backgroundColor:MODE==='Light'?colors.white:colors.dark}}>


<View style={[globalStyles.rowCenterBetween, {padding:10}]}>


<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png" }} style={styles.profile} />

<View style={{marginLeft:10}}>
  <Text style={styles.label}>George Anderson</Text>
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

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:MODE==='Light'?colors.white:colors.dark,
    height:50
  },
  label:{
    fontWeight:'600',
    fontSize:12,
    color:MODE==='Light'?colors.dark:colors.white,
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
  flexDirection:'row',
  alignItems:'center',
  paddingHorizontal:20,
  backgroundColor:MODE==='Light'?colors.white:colors.dark
},
cardImage:{
height:40,
width:40,
resizeMode:'cover',
},
container:{
width:width,
backgroundColor:MODE==='Light'?colors.white:colors.dark,
marginVertical:5,
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
    paddingHorizontal:20,
    display:'flex',
    flexDirection:'row',
    paddingVertical:10
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
    backgroundColor:MODE==='Light'?colors.white:colors.dark
  },
  circle:{
    height:18,
    width:18,
    borderRadius:9,
    backgroundColor:colors.navyBlue,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'

  }
})