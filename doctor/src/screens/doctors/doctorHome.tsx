
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR,  DOCTORSCATEGORY, LANGUAGELIST, OFFER, SELLER, SPECIALITY } from '../../components/data';
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
  DoctorHome: undefined;
  Cart:undefined;
  DoctorsList:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'DoctorHome'>;
 const DoctorHome =({ route, navigation }:Props)=> {

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
  navigation.navigate('DoctorsList');
}

  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

const OFFERCOLOR = ['', '#585AE1', '#FFDA6E',  '#4CD1BC', '#75B4FC', '#FC9680', '#9BE471' ]

    const CardCategory =({item}:{item:any})=>{
        return <Pressable style={[styles.box, {backgroundColor:CATCOLOR[item.id]} ]}>

          <Text style={{color:colors.white, fontSize:10, marginLeft:15, marginTop:15, fontWeight:'600'}}>{item.title}</Text>

          <View style={styles.docImage}>
          <FontAwesome5Icon name="user-md" size={50} color={colors.grey4}  />
          </View>

          </Pressable>
        }


        const CardOffer =({item}:{item:any})=>{
            return <Pressable style={[styles.offer, {backgroundColor:OFFERCOLOR[item.id]} ]}>
    
            <View>
              <Text style={{color:colors.white, fontSize:14,  marginTop:15, fontWeight:'700'}}>{item.title}</Text>
              <Text style={{color:colors.white, fontSize:14,  fontWeight:'700'}}>{item.titleb}</Text>
            <View style={styles.line} />
    
             </View>

              <Image source={{ uri:ImagesUrl+"/category/"+item.image }} style={styles.offerImage} />
              </Pressable>
            }



            const Speciality =({item}:{item:any})=>{
                return <Pressable style={[styles.seller]} onPress={handleNext}>
        
                <View style={{ display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={{fontSize:12, width:width-50, fontWeight:'700'}}>{item.title}</Text>

    <MaterialIcon name="arrow-forward-ios" size={14} color={colors.grey3}  /> 
                 </View>


    
                   </Pressable>
                }


  return (<SafeAreaView style={[ { backgroundColor:colors.white, flex:1}]}>
    

    <View style={styles.header}>

<View style={styles.location}>
    <MaterialIcon name="location-on" size={14} color={colors.primary}  /> 
    <Text style={[styles.label, {fontSize:12, marginLeft:20}]}>Wallington</Text>
</View>

    <Pressable onPress={handleCart} style={styles.cart}>

    <MaterialIcon name="shopping-cart" size={14} color={colors.dark}  /> 
        <View style={styles.circle}>
            <Text style={{color:colors.white, fontSize:8, fontWeight:'500'}}>1</Text>
        </View>

        </Pressable>
    </View>

    <ScrollView>

    <Text style={styles.h1}>Find Doctors</Text> 


    <View style={styles.textWrapper}>
    <MaterialIcon name="search" size={14} color={colors.icon}  /> 
  <TextInput placeholder='Search Doctors' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} />
</View>



<View style={styles.contentWrapper}>

<Text style={styles.infoText}>Find Specialities</Text>

<Text style={[styles.infoText,{color:colors.primary}]}>View all</Text>
</View>

<View style={{marginLeft:20, marginVertical:15}}>
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

<View style={[styles.contentWrapper, {marginTop:4} ]}>
<Text style={styles.infoText}>Sponsor ad</Text>
</View>


<View style={{marginLeft:20, marginVertical:15}}>
<FlatList 
data={OFFER}
horizontal
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardOffer key={item.id} item={item} />}

/>

</View>

<View style={[styles.contentWrapper, {marginTop:4} ]}>
<Text style={styles.infoText}>List of specialities</Text>
</View>




<ScrollView
  horizontal={true}
  contentContainerStyle={{width: '100%', height: '100%'}}
>
<FlatList 
data={SPECIALITY}
numColumns={1}
snapToInterval={width-20}
contentContainerStyle={{ paddingHorizontal:20, marginTop:10}}
showsHorizontalScrollIndicator={false}
renderItem={({item})=> <Speciality key={item.id} item={item} />}

/>
</ScrollView>
</ScrollView>



{/* <View style={styles.locationWrapper}>
  <Text style={styles.labelLocation}>Wallington</Text>
  <Text style={styles.labelLocation}>Office</Text>
  <Text style={styles.labelLocation}>Other</Text>
  <Text style={styles.labelLocation}>Set Location</Text>
</View> */}
    </SafeAreaView>
  )
}


export default DoctorHome

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    marginTop:20,
    marginHorizontal:20
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
  width:width-40,
  display:'flex',
  justifyContent:'space-between',
  flexDirection:'row',
  alignItems:'center',
  marginHorizontal:20,
  marginTop:10
  
},
 

textWrapper:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  width:width-40,
  height:45,
  paddingHorizontal:10,
  marginHorizontal:20,
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
    marginVertical:20,
    marginHorizontal:20,
  },

  box:{
    height:100,
    width:87,
    borderRadius:10,
    marginRight:8
    
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

      sellerImage:{
        height:40,
        width:40,
        borderRadius:10,
        resizeMode:'cover'

      },
      seller:{
        
        width:(width/2),
        display:'flex',
        flexDirection:'row',
       paddingVertical:5
    
        
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