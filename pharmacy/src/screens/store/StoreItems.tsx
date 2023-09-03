
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, TouchableOpacity } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CURRENCY, ImagesUrl, PHARMACY_CODE, ServerUrl, config } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  StoreItems: undefined;
  AddItem:undefined; 
  AccountProfile:undefined;
  EditItem:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'StoreItems'>;
 const StoreItems =({ route, navigation }:Props)=> {

  const MODE = useZustandStore(store => store.theme);
  const dynamicStyle = dynamicStyles(MODE);
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}

const [content, setContent]= useState([] as any)

const handleNext =()=>{
  navigation.navigate('AddItem');
}

const handleBack =()=>{
  navigation.goBack();
}

const handleEdit =(code:string)=>{
  navigation.navigate(
  'EditItem', {
    code:code

    }
  );
}

  const CardItem =({item}:{item:any})=>{
    return <TouchableOpacity activeOpacity={0.8} onPress={()=>handleEdit(item.code)}  style={[dynamicStyle.boxCart]} >

<View style={styles.catImageWrapper}>
  <View style={styles.flexEnd}>
  {item.require_prescription?
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png" }} style={globalStyles.px} />:[]}
</View>

<Image source={{ uri:ImagesUrl+"/products/"+item.image_url}} style={styles.catImage}  />
</View>

<View style={{marginTop:15, marginHorizontal:10}}>
      <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:12, fontWeight:'600'}}>{item.product_name}</Text>

      <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:10,  fontWeight:'600'}}>{item.category_name}</Text>

     
      </View>

  <View style={styles.addItem}>
  <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:12,  fontWeight:'700'}}>{CURRENCY}3.50</Text>
<Text style={styles.infoText}>119 sold</Text>
      </View>

      </TouchableOpacity>
    }

  
    const fetchProducts = async()=>{
      let url = ServerUrl+'/api/pharmacy/display_products/'+PHARMACY_CODE
      try{
  
     await axios.get(url, config).then(response=>{
   
        if(response.data.type==='success'){
          setContent(response.data.data)
        }else{
          setContent([])
        }
      }).finally(()=>{
        setRefreshing(false)
      }) 
    }catch(e){
      console.log('error:',e)
    }
    }



  const onRefresh = useCallback(()=>{
    setRefreshing(true)
    fetchProducts()
    }, [])



    useEffect(()=>{
      fetchProducts()
    },[])
  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="menu" onPress={handleBack} size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
    <Text style={dynamicStyle.label}>My Items</Text>
    <MaterialIcon name="search" size={18} color={MODE==='Light'?colors.dark:colors.white}  />
    </View>



<View style={styles.catItems}>

<FlatList 
data={content}
numColumns={2}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardItem key={item.id} item={item} />}
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


  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },
catItems:{
flex:1,
marginTop:10,
marginHorizontal:5,

},

catImageWrapper:{
height:(height/2)*0.35,
width:(width/2)-15,
backgroundColor:colors.white,
borderTopLeftRadius:10,
borderTopRightRadius:10,
  },

  catImage:{
    height:(height/2)*0.25,
    width:(width/2)-20,
    resizeMode:'contain'
      },
 
addItem:{
  
display:'flex',
justifyContent:'space-between',
flexDirection:'row',
margin:10,
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
  },
  flexEnd:{
    display:'flex',
    width:(width/2)-20,
    justifyContent:'flex-end',
    alignItems:'flex-end'
  }
})