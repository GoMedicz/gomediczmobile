
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
  DoctorReviews: undefined;
  Cart:undefined; 
  Appointment:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'DoctorReviews'>;
 const DoctorReviews =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleCart =()=>{
  navigation.navigate('Cart');
}

const handleNext =()=>{
  navigation.navigate('Appointment', {
    code:'cds',
  }); 
}




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box]}>


<View style={styles.content}>

<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:ImagesUrl+"/seller/profile_4.png" }} style={styles.profile} />

    
    <View style={[{display:'flex'}, {marginLeft:15}]}>
      <Text style={{color:colors.dark, fontSize:14, fontWeight:'600', marginBottom:5}}>Henry Johnson</Text>
      <Text style={styles.infoText}>Visited For <Text style={{color:colors.dark}}>Cold Fever</Text></Text>
    </View> 
</View>

 
  <View style={[globalStyles.columnCenterBetween]}>
      <View style={[globalStyles.rowCenterCenter, {marginBottom:5}]}>
    <Text style={{color:colors.dark, fontSize:10,  fontWeight:'700'}}>4.5</Text>
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={colors.grey}  />
      </View>
      <Text style={styles.infoText}>10.DEC.2019</Text>
  </View> 

</View>

<Text style={{fontSize:10, marginBottom:5, marginHorizontal:10, textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, commodi ipsum! Dolor cum impedit at unde dignissimos</Text>


      </Pressable>
    }


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={14} color={colors.dark}  /> 
    <Text style={styles.label}>Reviews</Text>

    <View/>
    </View>

    <View style={{backgroundColor:colors.white,  paddingHorizontal:10, marginBottom:5, paddingBottom:10}}>
    <View style={[globalStyles.rowCenterBetween,{marginTop:15}]}>
      <Text style={{color:colors.dark, fontSize:14, fontWeight:'600'}}>Dr. Joseph Wiliamson</Text>

<View style={globalStyles.rowCenterCenter}>
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />

      <Text style={{color:'#EEA31E', fontSize:10,  fontWeight:'700', marginHorizontal:5}}>4.5</Text>
      </View>

      </View>

      <View style={[globalStyles.rowCenterBetween,{marginVertical:5, marginRight:5}]}>
<Text style={styles.infoText}>Average Reviews</Text>
<Text style={styles.infoText}>Avg Reviews</Text>

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



    </View>
  )
}


export default DoctorReviews

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
  width:width,
  backgroundColor:colors.white,
  marginBottom:5,
  display:'flex',
  padding:10,
  
    },

catItems:{
flex:1,
marginHorizontal:5,

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