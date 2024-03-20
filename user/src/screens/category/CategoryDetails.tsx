
import React, { useCallback, useEffect, useState, useRef } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, TouchableOpacity, Animated, ImageBackground } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CURRENCY, ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';

import axios from 'axios';
import { FormatNumber } from '../../components/globalFunction';
import CartTop from '../home/cartTop';
const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  CategoryDetails: {
    search:string,
    title:string,
    code:string
  };
  BottomTabs:undefined;
  Cart:{
    offer:any
  }; 
  DrugDetails:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryDetails'>;
 const CategoryDetails =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  
  const [refreshing, setRefreshing] = useState(false)
  const fadeValue = useRef(new Animated.Value(0)).current 
  const [content, setContent]= useState([] as any)


  const handleBack =()=>{
    navigation.navigate('BottomTabs');
  }

const handleCart =()=>{
  navigation.navigate('Cart', {
    offer:''
  });
}

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


const  FetchContent = async()=>{
  //setLoading(true)
  let config = await configToken()
  let url = ServerUrl+'/api/user/products/'+route.params.code

  if(route.params.search && route.params.search!==''){
    url  = ServerUrl+'/api/user/search_products/'+route.params.search
  }

  

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



  const CardCategory =({item}:{item:any})=>{
    return <TouchableOpacity activeOpacity={0.8} onPress={()=>handleNext(item.code)}   style={[styles.box]}>

<Animated.View style={{opacity:fadeValue}}>

<ImageBackground source={{ uri:item.image_url!=='' && item.image_url!==null ?ImagesUrl+"/vendors/products/"+item.image_url:ImagesUrl+"/no.png"}}   style={styles.catImage}>

{item.require_prescription?<View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png" }} style={globalStyles.px} /></View>:[]}

</ImageBackground>



<View style={{ padding:10}}>
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
    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={18} color={colors.dark}  /> 
    <Text style={styles.label}>{route.params.title}</Text>
    
    

<CartTop handleCart ={handleCart} />

    </View>



    <View style={styles.catItems}>
    {content.length!==0?
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
/>:
<View style={styles.nothing}>
  <Text> There's nothing to show!</Text>
</View>
 }

</View>



    </View>
  )
}


export default CategoryDetails

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
  marginHorizontal:5
  
    },
    catImageWrapper:{
      height:(height/2)*0.35,
      width:(width/2)-15,
      backgroundColor:colors.white,
        },
catItems:{
flex:1,
marginTop:10,

marginHorizontal:5,


},

overlay:{
display:'flex',
justifyContent:'flex-end',
alignItems:'center',
backgroundColor:colors.white,
position:'absolute',
bottom:5,
width:70,
height:40,
right:3,
opacity: 0.5,

},
px:{
  height:25,
  width:25,
  resizeMode:'cover',
    },
    catImage:{
      height:(height/2)*0.25,
      resizeMode:'cover',
      borderTopLeftRadius:10,
      borderTopRightRadius:10
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

  circle:{
    height:10,
    width:10,
    borderRadius:5,
    backgroundColor:'#F14338',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    left:8,
    top:-5


},
cart:{
    display:'flex',
    flexDirection:'row'
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
bottomItem:{
  display:'flex', 
  justifyContent:'space-between', 
  alignItems:'center', 
  flexDirection:'row',
  backgroundColor:'red',

},
nothing:{ 
  height:height-50, 
  width:width-40, 
  display:'flex', 
  justifyContent:'center',
   alignItems:'center'}
})