
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput, ImageBackground, StatusBar } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, DOCTORS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import ShoppingCart from '../../components/include/ShoppingCart';
import { PrimaryButton, PrimaryButtonChildren } from '../../components/include/button';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  HospitalDetails: undefined;
  Cart:undefined; 
  Appointment:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'HospitalDetails'>;
 const HospitalDetails =({ route, navigation }:Props)=> {

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
    return <View style={{backgroundColor:colors.white, marginBottom:5}}>
      
    <Pressable onPress={handleNext} style={[styles.box]}>

      <Text style={[styles.infoText, {color:colors.dark}]}>Cardiology Departments </Text>

      <MaterialIcon name="keyboard-arrow-down" size={18} color={colors.primary}  />
      </Pressable>


      <View style={[styles.content, {backgroundColor:colors.white}]}>

<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:ImagesUrl+"/doctors/"+item.image }} style={styles.profile} />

    
    <View style={[{display:'flex'}, {marginLeft:2}]}>
      <Text style={{color:colors.dark, fontSize:12, fontWeight:'600', marginBottom:2}}>{item.fullname}</Text>


      <Text style={styles.infoText}>Cardiac Surgeon <Text style={{color:colors.grey, opacity:0.5}}>at</Text> Apple Hospital</Text>


<View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:10}}>
      <Text style={[styles.infoText, {marginRight:5}]}>Exp. <Text style={{color:colors.dark}}>22 years</Text> </Text>
      <Text style={[styles.infoText]}>Fees <Text style={{color:colors.dark}}>$30</Text></Text>

      <View style={[globalStyles.rowCenterCenter]}>
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
    </View> 
</View>



</View>
      </View>
    }


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    <StatusBar barStyle={'dark-content'} />
<ScrollView>


    <ImageBackground 
    source={{uri:ImagesUrl+'/hospital/hos.jpeg'}}
    
    style={styles.header}
    
    >
      <View style={{marginTop:40 }}>
    <MaterialIcon name="arrow-back-ios" size={14} color={colors.white}  /> 
    </View>

    </ImageBackground>


    <View style={{backgroundColor:colors.white,  paddingHorizontal:10, paddingVertical:15}}>


    <Text style={{color:colors.dark, fontSize:16, fontWeight:'600', marginBottom:5}}>Apple Hospital</Text>

<Text style={styles.infoText}>General Hospital</Text>


<View style={{display:'flex', flexDirection:'row', marginVertical:20}}>
  <Text style={ {color:colors.primary, fontSize:12, fontWeight:'600'}}>About</Text>
  <Text style={{color:'#9E9E9E', fontSize:12, fontWeight:'600', marginLeft:20}}>Departments</Text>
</View>

</View>


<View style={styles.card}>
<Text style={styles.infoText}>Facilities</Text>

<View style={{marginTop:15}}>
<Text style={styles.h3}>Minor OT/Dressing Room</Text>
<Text style={styles.h3}>Emergency Ward</Text>
<Text style={styles.h3}>DRadiology/X-ray facility</Text>
<Text style={styles.h3}>Laboratory Services</Text>
<Text style={styles.h3}>Ambulance Services</Text>
</View>

<View>
  <Text style={[styles.label, {color:colors.primary, marginVertical:10}]}>+5 More</Text>
</View>

</View>
   



<View style={[styles.card,{marginTop:0, paddingTop:20}]}>
<Text style={styles.infoText}>Address</Text>


<View style={{display:'flex', flexDirection:'row', marginBottom:5, marginTop:10, alignItems:'center'}}>

<MaterialIcon name="add-location" size={14} color={colors.grey}  />
<Text style={[styles.infoText, {fontWeight:'700', marginLeft:5}]}>Walter street, Wallington, New York.</Text>

<MaterialIcon name="navigation" size={18} color={colors.primary}  />
</View>

</View>





<ScrollView
  horizontal={true}
  contentContainerStyle={{width: '100%', height: '100%'}}
>

<FlatList 
data={DOCTORS}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}

/>

</ScrollView>











<View>

<View>

  <Text>map here</Text>
</View>


</View>

</ScrollView>

<PrimaryButtonChildren style={{position:'absolute', bottom:0}}>
  <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>

  <MaterialIcon name="call" size={14} color={colors.white}  />

    <Text style={[globalStyles.buttonText, {marginLeft:10}]} >Call Now</Text>

  </View>
</PrimaryButtonChildren>


    </View>
  )
}


export default HospitalDetails

const styles = StyleSheet.create({

  header:{

    display:'flex',
    flexDirection:'row',
    paddingHorizontal:20,
    backgroundColor:colors.white,
    height:180
  },
  h3:{
    fontWeight:'600',
    fontSize:10,
    marginVertical:3
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
  flexDirection:'row',
  alignItems:'center',
  padding:10,
  height:50,
  justifyContent:'space-between'
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
  card:{
    padding:10,
    backgroundColor:colors.white,
    marginVertical:8

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
    width:50,
    height:60,
    borderRadius:5,
    resizeMode:'contain',
    marginRight:5
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