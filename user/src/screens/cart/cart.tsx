
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATITEMS, LANGUAGELIST } from '../../components/data';
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
  Cart: undefined;
  ConfirmOrder:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;
 const Cart =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.navigate('ConfirmOrder');
}

const handleConfirm =()=>{
  navigation.navigate('ConfirmOrder');
}


const handleNext =()=>{
  navigation.navigate('BottomTabs', {
    code:'cds',
  }); 
}


const CardCategory =({item}:{item:any})=>{
  return <Pressable style={[styles.card]}>

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Image source={{ uri:ImagesUrl+"/products/"+item.image }} style={styles.cardImage} />


<View>

<Text style={styles.label}>{item.title}</Text>
<Text style={styles.infoText}>Operum England</Text>

<View style={styles.addPlus}>
<MaterialIcon name="remove" size={14} color={colors.primary}   /> 
  <Text style={{marginHorizontal:10, fontWeight:'500'}}>1</Text>
  <MaterialIcon name="add" size={14} color={colors.primary}   /> 
</View>
</View>
</View>


    <View style={{position:'absolute', bottom:10, right:20}}>
    <Text style={styles.label}>N44.00</Text>
    </View>

    </Pressable>
  }


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:'#F4F8FB'}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={14} color={colors.dark}  /> 
    <Text style={styles.label}>My Cart</Text>
    <View />
    </View>


    <View style={{ marginVertical:5, flex:1}}>
<FlatList 
data={CATITEMS}
numColumns={1}
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}

/>

</View>

<View style={styles.container}>

<View style={styles.textWrapper}>
<TextInput placeholder='Add Promocode' placeholderTextColor={'#9E9E9E'} style={styles.textInput} />

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Text style={{fontSize:10, color:colors.primary, fontWeight:'600', marginRight:5}}> VIEW OFFERS</Text>

<View style={styles.btnOk}>
<MaterialIcon name="done" size={18} color={colors.white}  /> 
</View>

</View>

</View>


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
  <Text style={styles.label}>Amount Payable</Text>
  <Text style={styles.label}>N18.00</Text>
</View>

<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={[globalStyles.button, {width:width, marginHorizontal:0, borderRadius:0, marginTop:10, flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20} ]}>
  <Text style={globalStyles.buttonText}>Checkout</Text>
  <MaterialIcon name="arrow-forward-ios" size={14} color={colors.white}  /> 
</TouchableOpacity>

</View>



<ModalDialog 
isModalVisible={false}
style={styles.modal}
>

<View style={styles.modalContent}>
<Image source={{ uri:ImagesUrl+"/pharmacy/prescription.png"}} style={styles.modalImage} />
<Text style={{color:colors.primary, fontSize:14, fontWeight:'700', marginBottom:15}}>Prescription Require</Text>

<Text style={styles.label}>Your order contains</Text>
<Text style={styles.label}>2 Items which required</Text>
<Text style={styles.label}>doctor's prescription.</Text>


<TouchableOpacity onPress={handleConfirm} activeOpacity={0.9} style={[globalStyles.button, {width:width-200, height:40, marginVertical:20}]}>
  <Text style={[globalStyles.buttonText, {fontSize:12}]}> Upload Prescription</Text>
</TouchableOpacity>

<Text style={{color:colors.primary, fontSize:12, fontWeight:'600', marginBottom:20}}>Cancel</Text>
</View>
</ModalDialog>
    </View>
  )
}


export default Cart

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
  flexDirection:'row',
  alignItems:'center',
  paddingHorizontal:20,
  backgroundColor:colors.white,
  marginBottom:5,
  height:80
},
cardImage:{
height:70,
width:70,
resizeMode:'contain',
marginRight:20
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

  
})