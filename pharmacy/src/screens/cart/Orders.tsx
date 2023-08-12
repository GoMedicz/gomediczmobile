
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, DOCTORS, LANGUAGELIST, SELLER } from '../../components/data';
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
  OrderDetails: undefined;
  Orders:undefined; 
  DrugDetails:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Orders'>;
 const Orders =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleCart =()=>{
 //navigation.navigate('OrderDetails');
}

const handleNext =()=>{
  navigation.navigate('OrderDetails');
}



const ItemCategory =({item}:{item:any})=>{
  return <Pressable onPress={handleNext} style={[styles.docBox]}>

<View style={{display:'flex', flexDirection:'row'}}>
<Image source={{ uri:ImagesUrl+"/doctors/"+item.image }} style={styles.profile} />


<View style={ {marginLeft:10}}>

    <Text style={{color:colors.dark, fontSize:12, fontWeight:'600', marginBottom:2}}>{item.fullname}</Text>


    <Text style={styles.infoText}>13 June, 11:20 am</Text>

<View style={{marginTop:30}}>
    <Text style={styles.h4}>Salospir 100mg Tablet</Text>
    <Text style={styles.h4}>Non Drosy Lerinrin Tablet</Text>
    <Text style={styles.h4}>Xenical 120mg Tablet</Text>
    </View>

  </View> 
  </View>

  <View >
    <Text style={[styles.label, {fontSize:12, color:colors.rating}]}>PENDING </Text>
    <Text style={[styles.infoText]}>$18.00 | COD </Text>
    </View>




    </Pressable>
  }


  const Clinic =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.clinic]}>



<View style={globalStyles.rowCenterBetween}>
<View >
<Text style={{fontSize:12, fontWeight:'600'}}>{item.title}</Text>
<Text style={[styles.infoText, {fontSize:10}]}>{item.address}</Text>
</View>




<View style={globalStyles.rowCenterCenter} >

<Image source={{ uri:ImagesUrl+"/seller/"+item.image }} style={styles.clinicImage} />
<Image source={{ uri:ImagesUrl+"/seller/"+item.image }} style={styles.clinicImage} />

</View>
</View>





<View style={[globalStyles.rowCenterBetween, {marginTop:10}]}>

<View style={globalStyles.rowCenterCenter}>
<MaterialIcon name="location-on" size={10} color={colors.grey}  />
<Text style={[styles.infoText, {fontSize:8}]}>Walter street, Wallington, New York</Text>
</View>


<View style={globalStyles.rowCenterCenter}>
<MaterialIcon name="call" size={8} color={colors.primary}  />
<Text style={{fontSize:8, marginLeft:10, color:colors.primary, fontWeight:'600'}}>Call Now</Text>
</View>

</View>


</Pressable>
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
    <MaterialIcon name="menu" size={14} color={colors.dark}  /> 
    <Text style={styles.label}>Recent Orders</Text>
    
    <View/>
    </View>

    <View style={styles.headerItem}>
      <Text style={[styles.label, {color:colors.grey, fontWeight:'700'}]}>New Orders</Text>
      <Text style={[styles.label, {color:colors.navyBlue}]}>Past Orders</Text>
    </View>



<View style={styles.catItems}>

<FlatList 
data={DOCTORS}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <ItemCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>


    </View>
  )
}


export default Orders

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:10,
    backgroundColor:colors.white,
    height:50,
  },
  label:{
    fontWeight:'600',
    fontSize:14,
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

},
profile:{
  width:40,
  height:40,
  borderRadius:5,
  resizeMode:'contain'
},
content:{
  display:'flex', 
  flexDirection:'row', 
  justifyContent:'space-between', 
  alignItems:'center', 
},
docBox:{
  width:width,
  backgroundColor:colors.white,
  marginBottom:5,
  display:'flex',
  padding:10,
  flexDirection:'row',
  justifyContent:'space-between'
  
    },
    clinicImage:{
      height:45,
      width:75,
      borderRadius:5,
      marginLeft:5,
      resizeMode:'cover'

    },
    clinic:{
      width:width,
      display:'flex',
      marginBottom:5,
      padding:10,
      backgroundColor:colors.white,
      
        },

        headerItem:{
         display:'flex',
         flexDirection:'row',
         justifyContent:'space-between',
         backgroundColor:colors.white,
         paddingVertical:12,
         paddingHorizontal:50
        },

        h4:{
          color:colors.dark, 
          fontSize:10, 
          fontWeight:'600', 
          marginBottom:5
        }
})