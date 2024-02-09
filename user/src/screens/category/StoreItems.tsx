
import React, { useCallback, useState, useRef, useEffect } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../components/data';
import { CURRENCY, ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import ShoppingCart from '../../components/include/ShoppingCart';
import axios from 'axios';
import { FormatNumber } from '../../components/globalFunction';


const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  StoreItems: {
    code:string;
    address:string;
    store_name:string;
    image_url:string;
  };
  DrugDetails:{
    code:string
  }; 
  BottomTabs:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'StoreItems'>;
 const StoreItems =({ route, navigation }:Props)=> {
  const fadeValue = useRef(new Animated.Value(0)).current 

  const [content, setContent]= useState([] as any)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)


  const handleBack =()=>{
    navigation.navigate('BottomTabs');
  }



const  FetchContent = async()=>{
  //setLoading(true)
  let config = await configToken()
  let url = ServerUrl+'/api/vendor/products/all/'+route.params.code
  try{
 await axios.get(url, config).then(response=>{
    if(response.data.type==='success'){
      setContent(response.data.data)
      AnimationStart()
    }else{
      setContent([])
    }

  }).finally(()=>{
    setRefreshing(false)
   // setLoading(false)
  }) 
}catch(e){
  console.log('error:',e)
}
}


const onRefresh = useCallback(()=>{
  setRefreshing(false)
  FetchContent()
  }, [])

  useEffect(()=>{
    FetchContent()
  }, [route])

  const handleNext =(code:string)=>{
    navigation.navigate('DrugDetails', {
      code:code,
    }); 
  }

const AnimationStart =()=>{
  const config:any ={
    toValue:1,
    duration:1000,
    useNativeDriver: true
  }
  Animated.timing(fadeValue, config).start()

}

  const CardCategory =({item}:{item:any})=>{
    return <TouchableOpacity activeOpacity={0.8} onPress={()=>handleNext(item.code)}  style={[styles.box]}>

<Animated.View style={{opacity:fadeValue}}>
<View style={{display:'flex', alignItems:'flex-end'}}>
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png" }} style={styles.px} />
</View>

<Image source={{ uri:item.image_url!=='' && item.image_url!==null ?ImagesUrl+"/vendors/products/"+item.image_url:ImagesUrl+"/no.png"}} style={styles.catImage} />

<View style={{marginTop:15}}>
      <Text style={{color:colors.dark, fontSize:12, fontWeight:'600'}}>{item.product_name}</Text>

      <Text style={{color:colors.dark, fontSize:10,  fontWeight:'600'}}>{item.category}</Text>

      <Text style={{color:colors.dark, fontSize:12,  fontWeight:'700', marginTop:10}}>{CURRENCY+ FormatNumber(item.price)}</Text>
      </View>

  <View style={styles.addItem}>
<MaterialIcon name="add" size={18} color={colors.white}  />
      </View>
      </Animated.View>
      </TouchableOpacity>
    }



  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={styles.header}>
    <MaterialIcon onPress={handleBack} name="arrow-back-ios" size={18} color={colors.dark}  /> 

    </View>


    <View style={styles.container}>

<View style={styles.companyLogo}>
<Image source={{ uri:route.params.image_url!=='' && route.params.image_url!==null ?ImagesUrl+"/vendors/profiles/"+route.params.image_url:ImagesUrl+"/no.png"}}  style={styles.sellerImage} />
            
</View>

<View style={{marginLeft:10, width:width-150}}>
<Text style={{fontSize:18, fontWeight:'700'}}>{route.params.store_name}</Text>
<View style={styles.address}>
<MaterialIcon name="location-on" size={14} color={colors.grey}  /> 
<Text style={{fontSize:14, color:colors.grey, marginLeft:5}}>{route.params.address}</Text>

</View>
</View>


</View>





    <View style={styles.catItems}>

<FlatList 
data={content}
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



box:{
  width:(width/2)-15,
  backgroundColor:colors.white,
  borderRadius:10,
  marginBottom:10,
  display:'flex',
  paddingVertical:5,
  paddingHorizontal:10,
  marginHorizontal:5
  
    },

catItems:{
flex:1,
marginTop:10,
shadowColor: "#000",
marginHorizontal:5,
shadowOffset: {
  width: 0,
  height: 0
},

shadowOpacity: 0.25,
shadowRadius: 2,
elevation: 5,

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
  
  
  }
})