
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

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Offers: undefined;
  Doctors:undefined; 
  DrugDetails:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Offers'>;
 const Offers =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleCart =()=>{
  navigation.navigate('Doctors');
}

const handleNext =()=>{
  navigation.navigate('Doctors');
}




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box]}>


<View style={styles.content}>

<View style={globalStyles.rowCenterBetween}>

    
    <View style={[{display:'flex', width:(width/2)-20}]}>
      <Text style={{color:colors.dark, fontSize:12, fontWeight:'600'}}>Flag 50% Off on first medicine order</Text>
    </View> 
</View>

 
  <View style={styles.btnOffer}>
    <Text style={{color:colors.primary, fontSize:12, fontWeight:'600'}}>GET50</Text>
  </View>

</View>


      </Pressable>
    }


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={14} color={colors.dark}  /> 
    <Text style={styles.label}>Offers</Text>

    <View/>
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