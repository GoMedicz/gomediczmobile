
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATEGORY, LANGUAGELIST } from '../../components/data';
import { ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Verification: undefined;
    Language:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Verification'>;
 const Dashboard =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.navigate('Language');
}

const handleNext =()=>{
  //navigation.navigate('Welcome');
}

  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

const CATCOLOR = ['','#4CD1BC', '#75B4FC', '#FC9680', '#9BE471', '#585AE1', '#FFDA6E']

    const CardCategory =({item}:{item:any})=>{
        return <Pressable style={[styles.box, {backgroundColor:CATCOLOR[item.id]} ]}>

          <Text style={{color:colors.white, fontSize:10, marginLeft:15, marginTop:15, fontWeight:'600'}}>{item.title}</Text>

          <Image source={{ uri:ImagesUrl+"/category/"+item.image }} style={styles.catImage} />
          </Pressable>
        }


        const CardOffer =({item}:{item:any})=>{
            return <Pressable style={[styles.offer, {backgroundColor:CATCOLOR[item.id]} ]}>
    
              <Text style={{color:colors.white, fontSize:10, marginLeft:15, marginTop:15, fontWeight:'600'}}>{item.title}</Text>
    
              <Image source={{ uri:ImagesUrl+"/category/"+item.image }} style={styles.catImage} />
              </Pressable>
            }

  return (<SafeAreaView style={[ {flex:1, backgroundColor:colors.white}]}>
    

    <View style={styles.header}>

<View style={styles.location}>
    <MaterialIcon name="location-on" size={14} color={colors.primary}  /> 
    <Text style={[styles.label, {fontSize:12, marginLeft:20}]}>Wallington</Text>
</View>

    <View style={styles.cart}>

    <MaterialIcon name="shopping-cart" size={14} color={colors.dark}  /> 
        <View style={styles.circle}>
            <Text style={{color:colors.white, fontSize:8, fontWeight:'500'}}>1</Text>
        </View>

        </View>
    </View>

    <ScrollView>

    <Text style={[styles.infoText,{marginHorizontal:20, marginTop:30}]}>Hello, Sam Smith,</Text>

    <Text style={styles.h1}>Find your medicines</Text> 


    <View style={styles.textWrapper}>
    <MaterialIcon name="search" size={14} color={colors.icon}  /> 
  <TextInput placeholder='Search medicines' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} />
</View>



<View style={styles.contentWrapper}>

<Text style={styles.infoText}>Shop by category</Text>

<Text style={[styles.infoText,{color:colors.primary}]}>View all</Text>
</View>

<View style={{marginLeft:20, marginVertical:15}}>
<FlatList 
data={CATEGORY}
horizontal
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}

/>

</View>

<View style={[styles.contentWrapper, {marginTop:4} ]}>
<Text style={styles.infoText}>Offers</Text>
<Text style={[styles.infoText,{color:colors.primary}]}>View all</Text>
</View>


<View style={{marginLeft:20, marginVertical:15}}>
<FlatList 
data={CATEGORY}
horizontal
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardOffer key={item.id} item={item} />}

/>

</View>


</ScrollView>
    </SafeAreaView>
  )
}


export default Dashboard

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


  infoWrapper:{
    width:width,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:50
  },
  infoText:{
    fontSize:12,
    color:'#9E9E9E',
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
    marginTop:10,
    marginBottom:30,
    marginHorizontal:20,
  },

  box:{
height:100,
width:90,
borderRadius:10,
marginRight:6

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
    marginRight:15
    
      },
})