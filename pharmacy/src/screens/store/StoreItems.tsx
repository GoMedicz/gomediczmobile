
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl, MODE } from '../../components/includes';
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
  StoreItems: undefined;
  EditItem:undefined; 
  Reviews:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'StoreItems'>;
 const StoreItems =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleCart =()=>{
  navigation.navigate('EditItem');
}

const handleNext =()=>{
  navigation.navigate('EditItem');
}




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box]}>

<View style={styles.catImageWrapper}>
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png" }} style={styles.px} />

<Image source={{ uri:ImagesUrl+"/category/"+item.image }} style={styles.catImage}  />
</View>

<View style={{marginTop:15, marginHorizontal:10}}>
      <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:12, fontWeight:'600'}}>Allerygy Relief</Text>

      <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:10,  fontWeight:'600'}}>Tablet</Text>

     
      </View>

  <View style={styles.addItem}>
  <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:12,  fontWeight:'700'}}>$3.50</Text>
<Text style={styles.infoText}>119 sold</Text>
      </View>

      </Pressable>
    }


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="menu" size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
    <Text style={styles.label}>My Items</Text>
    <MaterialIcon name="search" size={18} color={MODE==='Light'?colors.dark:colors.white}  />
    </View>





    <View style={styles.catItems}>

<FlatList 
data={CATEGORY}
numColumns={2}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>


<TouchableOpacity onPress={handleNext} style={styles.circle}>
  
<MaterialIcon name="add" size={18} color={colors.white}  /> 
</TouchableOpacity>


    </View>
  )
}


export default StoreItems

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
 
  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },



box:{
  height:(height/3)-30,
  width:(width/2)-15,
  backgroundColor:MODE==='Light'?colors.white:colors.dark,
  borderRadius:10,
  marginBottom:10,
  display:'flex',
  marginHorizontal:5
  
    },

catItems:{
flex:1,
marginTop:10,
marginHorizontal:5,

},

px:{
  height:25,
  width:25,
  resizeMode:'cover',
    },

catImageWrapper:{
height:(height/2)*0.35,
width:(width/2)-20,
backgroundColor:colors.white,
borderTopLeftRadius:10,
borderTopRightRadius:10,
  },

  catImage:{
    height:(height/2)*0.25,
    width:(width/2)-20,
    resizeMode:'contain'
      },
  address:{
    backgroundColor:colors.white,
    display:'flex',
    flexDirection:'row',
    paddingVertical:10
  },

 
addItem:{
  
display:'flex',
justifyContent:'space-between',
flexDirection:'row',
margin:10,
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
  circle:{
    height:50,
    width:50,
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.primary,
    position:'absolute',
    right:10,
    bottom:10,

shadowColor: "#000",
shadowOffset: {
  width: 0,
  height: 0
},

shadowOpacity: 0.25,
shadowRadius: 2,
elevation: 5,
  }
})