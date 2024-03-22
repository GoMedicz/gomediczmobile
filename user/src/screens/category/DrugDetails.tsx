
import React, { useCallback, useState, useRef, useEffect } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CURRENCY, ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ShoppingCart from '../../components/include/ShoppingCart';
import { PrimaryButton } from '../../components/include/button';

import axios from 'axios';
import { FormatNumber, getData, removeData, storeData } from '../../components/globalFunction';
import Loader from '../../components/loader';
const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  DrugDetails: {
    code:string;
  };
  Cart:undefined; 
   };

type Props = NativeStackScreenProps<RootStackParamList, 'DrugDetails'>;
 const DrugDetails =({ route, navigation }:Props)=> {

  const [refreshing, setRefreshing] = useState(false)
  const fadeValue = useRef(new Animated.Value(0)).current 
  const [content, setContent]= useState([] as any)
  const [loading, setLoading] = useState(false)

  const [modalType, setModalType] = useState('load')

  const [errors, setErrors] = useState({
    errorMessage:'',
    successMessage:''
  });

const handleBack =()=>{
  navigation.goBack();
}


const handleCart =()=>{
  navigation.navigate('Cart');
}


const AnimationStart =()=>{
  const config:any ={
    toValue:1,
    duration:1000,
    useNativeDriver: true
  }
  Animated.timing(fadeValue, config).start()

}

const AddToCart =async()=>{
  try{
    let data:any  = await getData('drug');

    
    let drug = [{
      code:route.params.code,
      amount:content.price,
      qty:content.qty,
      pack:1
    }]


    if(data){
      let item =  JSON.parse(data)
      let allItems =  item.concat(drug)
      storeData('drug', JSON.stringify(allItems))
    }else{
      storeData('drug', JSON.stringify(drug))
    }
    setLoading(true)
    setModalType('Success')
    setErrors({...errors, errorMessage: 'Successfully Added'})

  
  }catch(e){

  }
}
const handleClose =()=>{
  setLoading(false)
  navigation.goBack();
}

const  FetchContent = async()=>{
  //setLoading(true)
  let config = await configToken()
  let url = ServerUrl+'/api/vendor/product/details/'+route.params.code
  try{
 await axios.get(url, config).then(response=>{

    if(response.data.type==='success'){

      setContent(response.data.data[0])
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


const handleBookMark =async()=>{
 
 let medicine:any  = await getData('medicine');
  
   if(medicine){
    let item =  JSON.parse(medicine)

    let allItems =  item.concat([route.params.code])
    let uniq = [...new Set(allItems)];
    storeData('medicine', JSON.stringify(uniq, null, 2))
    }else{
      storeData('medicine', JSON.stringify([route.params.code], null, 2))
    }  

  setLoading(true)
  setModalType('Success')
  setErrors({...errors, errorMessage: 'Successfully Saved'}) 

}

const onRefresh = useCallback(()=>{
  setRefreshing(false)
  FetchContent()
  }, [])

  useEffect(()=>{
    FetchContent()
  }, [route])
    
 

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={styles.header}>
    <MaterialIcon onPress={handleBack} name="arrow-back-ios" size={18} color={colors.dark}  /> 
    

<View style={{display:'flex', flexDirection:'row'}}>
    <MaterialIcon name="bookmark-outline" size={18} onPress={handleBookMark}  color={colors.dark}  /> 
    
    <ShoppingCart handleAction={handleCart} style={{marginLeft:30}} />
    </View>
    </View>

<ScrollView>

<Animated.View style={{opacity:fadeValue}}>
    <View style={[styles.box]}>

<View style={{display:'flex', alignItems:'flex-end'}}>
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png" }} style={styles.px} />
</View>

<Image source={{ uri:content.image_url!=='' && content.image_url!==null ?ImagesUrl+"/vendors/products/"+content.image_url:ImagesUrl+"/no.png"}} style={styles.catImage} />

<View style={{marginVertical:10}}>
  
  <View style={[globalStyles.rowCenterBetween,{marginTop:15}]}>
      <Text style={{color:colors.dark, fontSize:14, fontWeight:'600'}}>{content.product_name}</Text>

<View style={globalStyles.rowCenterCenter}>
      <MaterialIcon name="star" size={18} color={'#EEA31E'}  />

      <Text style={{color:'#EEA31E', fontSize:10,  fontWeight:'700', marginHorizontal:5}}>4.5</Text>
      </View>

      </View>

<View style={[globalStyles.rowCenterBetween,{marginVertical:5, marginRight:5}]}>
<Text style={styles.infoText}>{content.category}</Text>


<View style={globalStyles.rowCenterCenter}>
<Text style={styles.infoText}>Read all 125 Reviews</Text>

<MaterialIcon name="arrow-forward-ios" size={12} color={'#9E9E9E'}  /> 
</View>
</View>
      
      </View>
      </View>



<View style={styles.card}>
  <Text style={styles.infoText}>Description</Text>

  <Text style={{marginTop:10, fontSize:12, textAlign:'justify', fontFamily:'ariel' }}>{content.description}</Text>
</View>


<View style={styles.card}>
  <Text style={styles.infoText}>Sold by</Text>

<View style={[globalStyles.rowCenterBetween, {marginTop:10}]}>
  <View style={globalStyles.rowCenterCenter}>

    <View style={styles.companyLogo}>
    <Image source={{ uri:content.store_image!=='' && content.store_image!==null ?ImagesUrl+"/vendors/profiles/"+content.store_image:ImagesUrl+"/no.png"}} style={styles.sellerImage} />
                
</View>

<View style={{marginLeft:10}}>
<Text style={{fontSize:12, fontWeight:'700'}}>{content.store_name}</Text>
<View style={styles.address}>
<MaterialIcon name="location-on" size={10} color={colors.grey}  /> 
<Text style={{fontSize:10, color:colors.grey, marginLeft:5}}>{content.address}</Text>

</View>
</View>


</View>

<View style={[globalStyles.rowCenterCenter, {position:'absolute', bottom:10, right:0}]}>
<Text style={[styles.infoText, {fontSize:10}]}>View Profile</Text>

<MaterialIcon name="arrow-forward-ios" size={10} color={'#9E9E9E'}  /> 
</View>

</View>


</View>

</Animated.View>
</ScrollView>


<Loader isModalVisible={loading} 
    type={modalType}

    message={errors.errorMessage} 
    action={handleClose}
     />

<View style={styles.footer}>

<View style={[globalStyles.rowCenterBetween,{marginVertical:15, marginHorizontal:10}]}>
  <Text style={styles.label}>{CURRENCY+ FormatNumber(content.price)}</Text>


  <View style={[globalStyles.rowCenterCenter]}>
<Text style={[styles.infoText, {fontSize:10}]}>{content.qty}</Text>

</View>
</View>
  <PrimaryButton title='Add to Cart' handleAction={AddToCart} />

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