
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { CURRENCY, ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import axios from 'axios';
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../components/data';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import ShoppingCart from '../../components/include/ShoppingCart';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Offers: undefined;
  BottomTabs:undefined;
  Cart: {
    offer:string;
  }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Offers'>;
 const Offers =({ route, navigation }:Props)=> {

  
  const [refreshing, setRefreshing] = useState(false)

  const [offer, setOffer]= useState([] as any)


const handleBack =()=>{
  navigation.navigate('BottomTabs');
}



const handleNext =(code:string)=>{
  navigation.navigate('Cart', {
    offer:code
  });
}

const  FetchOffer = async()=>{

  let config = await configToken()
  let url = ServerUrl+'/api/discount/active_offer'
  try{
 await axios.get(url, config).then(response=>{

    if(response.data.type==='success'){  
      setOffer(response.data.data)
    }

  })
}catch(e){
  console.log('error:',e)
}
}



useEffect(()=>{
  FetchOffer()
}, [route])

  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={()=>handleNext(item.promo_code)} style={[styles.box]}>


<View style={styles.content}>

<View style={globalStyles.rowCenterBetween}>

    
    <View style={[{display:'flex', width:(width/2)-20}]}>
      <Text style={{color:colors.dark, fontSize:12, fontWeight:'600'}}>{item.title}</Text>
    </View> 
</View>

 
  <View style={styles.btnOffer}>
    <Text style={{color:colors.primary, fontSize:12, fontWeight:'600'}}>{item.promo_code}</Text>
  </View>

</View>


      </Pressable>
    }


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
  FetchOffer()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={styles.header}>
    <MaterialIcon onPress={handleBack} name="arrow-back-ios" size={18} color={colors.dark}  /> 
    <Text style={styles.label}>Offers</Text>

    <View/>
    </View>



    <View style={styles.catItems}>

<FlatList 
data={offer}
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



    </View>
  )
}


export default Offers

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
 
 


box:{
  width:width,
  backgroundColor:colors.white,
  marginBottom:5,
  display:'flex',
  padding:10,
  
    },

catItems:{
flex:1,
marginHorizontal:5,
marginTop:15

},


 content:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    paddingHorizontal:10, 
    marginVertical:5
  },

  btnOffer:{
    height:35,
    width:80,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:colors.lightSkye
  }
})