
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput, StatusBar } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATEGORY, DOCTORSCATEGORY, LANGUAGELIST, OFFER, SELLER } from '../../components/data';
import { ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
    Hospital: undefined;
    HospitalDetails:undefined;
    Language:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Hospital'>;
 const Hospital =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}

const Header = ()=>{
  return(
<View style={{backgroundColor:colors.white, padding:10}}>
<Text style={[styles.infoText]}>Hello, Sam Smith,</Text>

    <Text style={styles.h1}>Find Hospital</Text> 


    <View style={styles.textWrapper}>
    <MaterialIcon name="search" size={14} color={colors.icon}  /> 
  <TextInput placeholder='Search Hospital' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} />
</View>



<View style={styles.contentWrapper}>

<Text style={styles.infoText}>Shop by category</Text>

<Text style={[styles.infoText,{color:colors.primary}]}>View all</Text>
</View>

<View style={{ marginVertical:15}}>
<FlatList 
data={DOCTORSCATEGORY}
horizontal
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}

/>

</View>

<View style={[styles.contentWrapper, {marginVertical:12} ]}>
<Text style={[styles.infoText,{fontSize:12} ]}>Hospitals near you</Text>
<MaterialIcon name="map" size={20} color={colors.grey}  /> 
</View>
</View>
  )
}

const handleCart =()=>{
  navigation.navigate('HospitalDetails');
}

const handleNext =()=>{
  navigation.navigate('HospitalDetails');
}

  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

const CATCOLOR = ['','#4CD1BC', '#75B4FC', '#FC9680', '#9BE471', '#585AE1', '#FFDA6E']
const OFFERCOLOR = ['', '#585AE1', '#FFDA6E',  '#4CD1BC', '#75B4FC', '#FC9680', '#9BE471' ]



const CardCategory =({item}:{item:any})=>{
    return <Pressable style={[styles.box, {backgroundColor:CATCOLOR[item.id]} ]}>

      <Text style={{color:colors.white, fontSize:10, marginLeft:15, marginTop:15, fontWeight:'600'}}>{item.title}</Text>

      <View style={styles.docImage}>
      <FontAwesome5Icon name="user-md" size={50} color={colors.grey4}  />
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


  return (<SafeAreaView style={[ { backgroundColor:colors.white, flex:1}]}>
    
    <StatusBar barStyle={'light-content'} />
    <View style={styles.header}>

<View style={styles.location}>
    <MaterialIcon name="location-on" size={14} color={colors.primary}  /> 
    <Text style={[styles.label, {fontSize:12, marginLeft:20}]}>Wallington</Text>
</View>

    </View>

   

<FlatList 
data={SELLER}
snapToInterval={width}
ListHeaderComponent={<Header />}
contentContainerStyle={{  backgroundColor:colors.lightSkye}}
showsHorizontalScrollIndicator={false}
renderItem={({item})=> <Clinic key={item.id} item={item} />}

/>


    </SafeAreaView>
  )
}


export default Hospital

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    height:40,
    width:width,
    backgroundColor:colors.white,
  },
  label:{
    fontWeight:'600',
    fontSize:14,
  },
 
  
  infoText:{
    fontSize:12,
    color:colors.grey,
    fontWeight:'500'

  },
contentWrapper:{
  width:width-20,
  display:'flex',
  justifyContent:'space-between',
  flexDirection:'row',
  alignItems:'center',
  marginTop:10
  
},
docImage:{
    height:50,
    width:50,
    resizeMode:'cover',
    alignItems:'flex-end',
    justifyContent:'flex-end',
    position:'absolute',
    bottom:5,
    right:5,
    
      },

textWrapper:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  width:width-20,
  height:45,
  paddingHorizontal:10,
  backgroundColor:'#F4F8FB',
  borderRadius:5,
  marginBottom:10
},

textInput:{
width:width/2,
fontWeight:'400',
color:colors.dark,
fontSize:12,
marginLeft:15
},


location:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
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
h1:{
    fontSize:20,
    fontWeight:'700',
    color:colors.dark,
    marginTop:10,
    marginBottom:20
  },

  box:{
    height:102,
    width:87,
    borderRadius:10,
    marginRight:8
    
      },
  catImage:{
height:50,
width:50,
resizeMode:'cover',
position:'absolute',
right:0,
bottom:0
  },
 offer:{
    height:100,
    width:230,
    borderRadius:10,
    paddingHorizontal:15,
    marginRight:15,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

    
      },
      offerImage:{
        height:80,
        width:100,
        resizeMode:'cover'

      },
      line:{
        width:25,
        height:5,
        backgroundColor:colors.white,
        marginTop:10,
        borderRadius:10,
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

          address:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginTop:5
          },

          locationWrapper:{
            position:'absolute', 
            top:30,
            left:50,
            width:(width/4)+10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            backgroundColor:colors.white,
            padding:10,
          },

          labelLocation:{
            fontWeight:'600',
            fontSize:12,
            marginVertical:10
            
          },
})