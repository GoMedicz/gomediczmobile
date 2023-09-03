
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import ShoppingCart from '../../components/include/ShoppingCart';
import { PrimaryButton } from '../../components/include/button';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  DrugDetails: undefined;
  Cart:undefined; 
  StoreItems:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'DrugDetails'>;
 const DrugDetails =({ route, navigation }:Props)=> {

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


const handleCart =()=>{
  navigation.navigate('Cart');
}

const handleNext =()=>{
  navigation.navigate('StoreItems', {
    code:'cds',
  }); 
}




    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={styles.header}>
    <MaterialIcon onPress={handleBack} name="arrow-back-ios" size={18} color={colors.dark}  /> 
    

<View style={{display:'flex', flexDirection:'row'}}>
    <MaterialIcon name="bookmark-outline" size={18} color={colors.dark}  /> 
    
    <ShoppingCart handleAction={handleCart} style={{marginLeft:30}} />
    </View>
    </View>

<ScrollView>

    <View style={[styles.box]}>

<View style={{display:'flex', alignItems:'flex-end'}}>
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png" }} style={styles.px} />
</View>

<Image source={{ uri:ImagesUrl+"/category/care.png"}} style={styles.catImage} />

<View style={{marginVertical:10}}>
  
  <View style={[globalStyles.rowCenterBetween,{marginTop:15}]}>
      <Text style={{color:colors.dark, fontSize:14, fontWeight:'600'}}>Salospir 100mg Tablet</Text>

<View style={globalStyles.rowCenterCenter}>
      <MaterialIcon name="star" size={18} color={'#EEA31E'}  />

      <Text style={{color:'#EEA31E', fontSize:10,  fontWeight:'700', marginHorizontal:5}}>4.5</Text>
      </View>

      </View>

<View style={[globalStyles.rowCenterBetween,{marginVertical:5, marginRight:5}]}>
<Text style={styles.infoText}>Health Care</Text>


<View style={globalStyles.rowCenterCenter}>
<Text style={styles.infoText}>Read all 125 Reviews</Text>

<MaterialIcon name="arrow-forward-ios" size={12} color={'#9E9E9E'}  /> 
</View>
</View>
      
      </View>
      </View>



<View style={styles.card}>
  <Text style={styles.infoText}>Description</Text>

  <Text style={{marginTop:10, fontSize:12, textAlign:'justify', fontFamily:'ariel' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur veritatis impedit numquam.</Text>
</View>


<View style={styles.card}>
  <Text style={styles.infoText}>Sold by</Text>

<View style={[globalStyles.rowCenterBetween, {marginTop:10}]}>
  <View style={globalStyles.rowCenterCenter}>



    <View style={styles.companyLogo}>
    <Image source={{ uri:ImagesUrl+"/seller/profile.jpg" }} style={styles.sellerImage} />
                
</View>

<View style={{marginLeft:10}}>
<Text style={{fontSize:12, fontWeight:'700'}}>Well Life Store</Text>
<View style={styles.address}>
<MaterialIcon name="location-on" size={10} color={colors.grey}  /> 
<Text style={{fontSize:10, color:colors.grey, marginLeft:5}}>Willinton Bridge</Text>

</View>
</View>


</View>

<View style={[globalStyles.rowCenterCenter, {position:'absolute', bottom:10, right:0}]}>
<Text style={[styles.infoText, {fontSize:10}]}>View Profile</Text>

<MaterialIcon name="arrow-forward-ios" size={10} color={'#9E9E9E'}  /> 
</View>

</View>


</View>


</ScrollView>

<View style={styles.footer}>

<View style={[globalStyles.rowCenterBetween,{marginVertical:15, marginHorizontal:10}]}>
  <Text style={styles.label}>$ 3.50</Text>


  <View style={[globalStyles.rowCenterCenter]}>
<Text style={[styles.infoText, {fontSize:10}]}>Pack of 8</Text>

<MaterialIcon name="expand-more" size={10} color={'#9E9E9E'}  /> 
</View>
</View>
  <PrimaryButton title='Add to Cart' handleAction={handleNext} />

</View>
      
    </View>
  )
}


export default DrugDetails

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

  infoText:{
    fontSize:12,
    color:'#9E9E9E',
    fontWeight:'500'

  },



box:{
  width:width,
  backgroundColor:colors.white,
  marginBottom:5,
  display:'flex',
  paddingVertical:5,
  paddingHorizontal:10,
  
    },


px:{
  height:25,
  width:25,
  resizeMode:'cover',
    },

catImage:{
height:(height/3)-35,
width:width-40,
resizeMode:'contain',
marginTop:15
  },

  card:{
    backgroundColor:colors.white,
    paddingHorizontal:15,
    display:'flex',
    paddingVertical:10,
    marginVertical:5

  },

sellerImage:{
  height:35,
  width:35,
  resizeMode:'cover'
},
address:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  marginTop:5
    },
companyLogo:{
  height:50,
  width:50,
  backgroundColor:'#9Be471',
  borderRadius:10,
  display:'flex',
  justifyContent:'center',
  alignItems:'center'

},
footer:{
width:width,
backgroundColor:colors.white

}
})