
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, DOCTORS, LANGUAGELIST } from '../../components/data';
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
  DoctorsList: undefined;
  Cart:undefined; 
  DoctorsDetails:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'DoctorsList'>;
 const DoctorsList =({ route, navigation }:Props)=> {

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

const handleNext =()=>{
   navigation.navigate('DoctorsDetails', {
    code:'cds',
  });  
}




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box]}>


<View style={styles.content}>

<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:ImagesUrl+"/doctors/"+item.image }} style={styles.profile} />

    
    <View style={[{display:'flex'}, {marginLeft:2}]}>
      <Text style={{color:colors.dark, fontSize:12, fontWeight:'600', marginBottom:2}}>{item.fullname}</Text>


      <Text style={styles.infoText}>Cardiac Surgeon <Text style={{color:colors.grey, opacity:0.5}}>at</Text> Apple Hospital</Text>


<View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:10}}>
      <Text style={[styles.infoText]}>Exp. <Text style={{color:colors.dark}}>22 years</Text> </Text>
      <Text style={[styles.infoText, {marginLeft:10}]}>Fees <Text style={{color:colors.dark}}>$30</Text></Text>
      </View>
    </View> 
</View>

 
  <View style={[globalStyles.rowCenterCenter, { position:'absolute', bottom:5, right:5}]}>
      <View style={[globalStyles.rowCenterCenter]}>
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={colors.grey}  />
      </View>
      <Text style={styles.infoText}>(20)</Text>
  </View> 

</View>



      </Pressable>
    }


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={{backgroundColor:colors.white}}>
   
    <View style={styles.header}>
      
      <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
    <MaterialIcon name="arrow-back-ios" size={18} onPress={handleBack} color={colors.dark}  /> 
    <TextInput placeholder='Search' style={styles.textInput} />
    </View>

    <MaterialIcon name="search" size={18} color={colors.dark}  />

    </View>


   <View style={[styles.header,{width:width, marginTop:10, borderRadius:0, marginHorizontal:0}]}>
    <Text style={styles.label}>27 Results found</Text>

    </View> 

    </View>


    <View style={styles.catItems}>

<FlatList 
data={DOCTORS}
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


export default DoctorsList

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:colors.lightSkye,
    height:45,
    marginTop:40,
    marginHorizontal:10,
    borderRadius:5
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
  paddingVertical:10,
  paddingHorizontal:5
  
    },

catItems:{
flex:1,
marginHorizontal:5,

},

  profile:{
    width:60,
    height:60,
    resizeMode:'contain'
  },
 content:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center', 
  },
  textInput:{
    width:width-100,
    marginLeft:10,
    fontSize:12,
    fontWeight:'600',
    color:colors.dark
  },
  label:{
    fontWeight:'600',
    fontSize:12,
    color:colors.grey
  },
})