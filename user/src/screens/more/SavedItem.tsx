
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
  SavedItems: undefined;
  Cart:undefined; 
  DrugDetails:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'SavedItems'>;
 const SavedItems =({ route, navigation }:Props)=> {

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
  navigation.navigate('DrugDetails', {
    code:'cds',
  }); 
}



const DoctorsCategory =({item}:{item:any})=>{
  return <Pressable onPress={handleNext} style={[styles.docBox]}>


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
    <MaterialIcon name="arrow-back-ios" size={14} color={colors.dark}  /> 
    <Text style={styles.label}>Saved</Text>
    
    <View/>
    </View>

    <View style={[globalStyles.rowCenterBetween, {paddingHorizontal:30, paddingVertical:15, backgroundColor:colors.white}]}>
      <Text style={[styles.label, {color:colors.navyBlue, fontWeight:'700'}]}>Medicine</Text>
      <Text style={[styles.label, {color:colors.navyBlue}]}>Doctors</Text>
      <Text style={[styles.label, {color:colors.navyBlue}]}>Hospitals</Text>
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

<View style={styles.catItems}>

<FlatList 
data={DOCTORS}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <DoctorsCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>

<View style={styles.catItems}>

<FlatList 
data={SELLER}

showsVerticalScrollIndicator={false}
snapToInterval={width}
contentContainerStyle={{ padding:5, backgroundColor:colors.lightSkye}}
showsHorizontalScrollIndicator={false}
renderItem={({item})=> <Clinic key={item.id} item={item} />}


/>
</View>

    </View>
  )
}


export default SavedItems

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:colors.white,
    height:60,
    paddingTop:20
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
docBox:{
  width:width,
  backgroundColor:colors.white,
  marginBottom:5,
  display:'flex',
  paddingVertical:10,
  paddingHorizontal:5
  
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
})