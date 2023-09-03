
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
import { PrimaryButtonChildren } from '../../components/include/button';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Reviews: undefined;
  ConfirmBooking:undefined; 
 SearchLab:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'SearchLab'>;
 const SearchLab =({ route, navigation }:Props)=> {

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

const handleNext =()=>{
  navigation.navigate('ConfirmBooking'); 
}




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box]}>


<Text style={{color:colors.dark, fontSize:14, fontWeight:'600'}}>Complete Blood Count</Text>

<View style={[globalStyles.rowCenterBetween, {marginTop:10, paddingVertical:5}]}>

      <Text style={styles.infoText}>$20.00</Text>
      <Text style={[styles.infoText, {color:colors.primary, marginRight:15}]}>ADD</Text>
 
</View>
      </Pressable>
    }


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={{width:width, backgroundColor:colors.white}}>
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={18} color={colors.dark} onPress={handleBack}  /> 
    <Text style={[styles.label, {marginLeft:30} ]}>City Cure Labs</Text>
    
    
</View>

    
    <View style={styles.textWrapper}>
    <MaterialIcon name="search" size={16} color={colors.grey}  /> 
  <TextInput placeholder='Search Tests' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} />
  <MaterialIcon name="close" size={16} color={colors.grey}  /> 
</View>



<View style={[styles.textWrapper, {marginTop:0, borderRadius:0, marginHorizontal:0, width:width}]}>
    <Text style={styles.infoText}>Total 125 tests</Text> 
</View>

</View>

    <View style={styles.catItems}>

<FlatList 
data={CATEGORY}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>


<PrimaryButtonChildren
style={{position:'absolute', bottom:0}}
handleAction={handleNext}
>

  <View style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'row', width:width, paddingHorizontal:20}}>

    <Text style={globalStyles.buttonText}>$20.00</Text>


    <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>

    <FontAwesome5Icon name="calendar-check" size={16} color={colors.white}  /> 
    <Text style={[globalStyles.buttonText, {marginLeft:10}]}>Book Now</Text>
  </View>


  </View>


  
</PrimaryButtonChildren>
    </View>
  )
}


export default SearchLab

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'flex-start',
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
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },

  textWrapper:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:width-20,
    height:45,
    marginHorizontal:10,
    paddingHorizontal:10,
    backgroundColor:'#F4F8FB',
    borderRadius:5,
    marginVertical:10
  },
  
  textInput:{
  width:width-100,
  fontWeight:'500',
  color:colors.dark,
  fontSize:12,
  marginLeft:15
  },


box:{
  width:width,
  backgroundColor:colors.white,
  display:'flex',
  padding:10,
  marginBottom:5
  
    },

catItems:{
flex:1,

},

px:{
  height:25,
  width:25,
  resizeMode:'cover',
    },
catImage:{
height:(height/2)*0.2,
width:(width/2)-40,
resizeMode:'contain',
marginTop:15
  },

  address:{
    backgroundColor:colors.white,
    display:'flex',
    flexDirection:'row',
    paddingVertical:10
  },

 
addItem:{
  height:25,
  width:25,
  backgroundColor:colors.primary,
  borderBottomRightRadius:5,
  borderTopLeftRadius:5,
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  position:'absolute',
  bottom:0,
  right:0
},
sellerImage:{
  height:80,
  width:80,
  resizeMode:'cover'
},
companyLogo:{
  height:100,
  width:100,
  backgroundColor:'#9Be471',
  borderRadius:10,
  display:'flex',
  justifyContent:'center',
  alignItems:'center'

},
container:{
  display:'flex',
   flexDirection:'row', 
   backgroundColor:colors.white,
   paddingVertical:15,
   paddingHorizontal:10
  
  
  },
  profile:{
    width:30,
    height:30,
    borderRadius:15,
    resizeMode:'contain'
  },
 content:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    paddingHorizontal:10, 
    paddingBottom:10,
    marginVertical:5
  }
})