
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

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  CategoryDetails: undefined;
  Cart:undefined; 
  DrugDetails:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryDetails'>;
 const CategoryDetails =({ route, navigation }:Props)=> {

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
  navigation.navigate('DrugDetails', {
    code:'cds',
  }); 
}




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box]}>

<View style={{display:'flex', alignItems:'flex-end'}}>
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png" }} style={styles.px} />
</View>

<Image source={{ uri:ImagesUrl+"/category/"+item.image }} style={styles.catImage} />

<View style={{marginTop:15}}>
      <Text style={{color:colors.dark, fontSize:12, fontWeight:'600'}}>Allerygy Relief</Text>

      <Text style={{color:colors.dark, fontSize:10,  fontWeight:'600'}}>Tablet</Text>

      <Text style={{color:colors.dark, fontSize:12,  fontWeight:'700', marginTop:10}}>$3.50</Text>
      </View>

  <View style={styles.addItem}>
<MaterialIcon name="add" size={18} color={colors.white}  />
      </View>

      </Pressable>
    }


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={18} color={colors.dark}  /> 
    <Text style={styles.label}>Health Care</Text>
    
    
    <Pressable onPress={handleCart} style={styles.cart}>

<MaterialIcon name="shopping-cart" size={18} color={colors.dark}  /> 
    <View style={styles.circle}>
        <Text style={{color:colors.white, fontSize:8, fontWeight:'500'}}>1</Text>
    </View>

    </Pressable>
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
  height:(height/3)-40,
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
height:(height/2)*0.2,
width:(width/2)-40,
resizeMode:'contain',
marginTop:15
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

}
})