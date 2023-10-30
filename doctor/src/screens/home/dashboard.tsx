
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CATEGORY, LANGUAGELIST } from '../../components/data';
import { ImagesUrl, MODE } from '../../components/includes';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Appointments: undefined;
  Cart:undefined; 
  AppointmentDetails:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Appointments'>;
 const Appointments =({ route, navigation }:Props)=> {

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
  navigation.navigate('AppointmentDetails'); 
}



const CardPast =({item}:{item:any})=>{
  return <Pressable onPress={handleNext} style={[styles.box]}>

<View style={styles.row}>
<Image source={{ uri:ImagesUrl+"/seller/profile_4.png" }} style={styles.profile} />


<View style={{marginLeft:15}}>
    <Text style={{color:colors.dark, fontSize:14, fontWeight:'600', }}>Henry Johnson</Text>
    <Text style={[styles.infoText, {marginBottom:10}]}>Chest Pain</Text>

    <Text style={styles.label}>12 June 2020 | 12:00 pm</Text>
  </View> 
  </View>

<View style={{justifyContent:'space-between', alignItems:'flex-end', display:'flex', marginRight:5}}>


<MaterialIcon name="more-vert" size={18} color={colors.icon}  />

<View style={[styles.row, {marginTop:15}]}>
<MaterialIcon name="call" size={18} color={colors.icon} style={{marginRight:10}} />
<MaterialIcon name="chat" size={18} color={colors.icon}  />
</View>




</View>

    </Pressable>
  }




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box]}>

<View style={styles.row}>
<Image source={{ uri:ImagesUrl+"/seller/profile_4.png" }} style={styles.profile} />


<View style={{marginLeft:15}}>
      <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:14, fontWeight:'600', }}>Henry Johnson</Text>
      <Text style={[styles.infoText, {marginBottom:10}]}>Chest Pain</Text>

      <Text style={styles.label}>12 June 2020 | 12:00 pm</Text>
    </View> 
    </View>

<View style={styles.row}>

  <View style={[styles.btn, {backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>

  <MaterialIcon name="close" size={18} color={colors.primary}  />
  </View>


  <View style={styles.btn}>

<MaterialIcon name="done" size={18} color={colors.white}  />
</View>

</View>

      </Pressable>
    }


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={styles.header}>
      <View/>
    <Text style={styles.label}>My Appointments</Text>


    <MaterialIcon name="history" size={18} color={colors.navyBlue}  /> 

    </View>

<ScrollView>
 <View style={{height:45, marginHorizontal:10, justifyContent:'center' }}>
    <Text style={styles.infoText}>Today</Text>
 </View>

 <ScrollView
horizontal

contentContainerStyle={{height:'100%', width:'100%'}}
>
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
</ScrollView>


<View style={{height:45, marginHorizontal:10, justifyContent:'center' }}>
    <Text style={styles.infoText}>Tomorrow</Text>
 </View>

<ScrollView
horizontal

contentContainerStyle={{height:'100%', width:'100%'}}
>
    <View style={styles.catItems}>

<FlatList 
data={CATEGORY}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardPast key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>
</ScrollView>
</ScrollView>
    </View>
  )
}


export default Appointments

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:MODE==='Light'?colors.white:colors.dark,
    height:60
  },
  label:{
    fontWeight:'600',
    fontSize:12,
    color:MODE==='Light'?colors.dark:colors.white,
  },
 
  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },



box:{
  width:width,
  backgroundColor:MODE==='Light'?colors.white:colors.dark,
  marginBottom:5,
  display:'flex',
  padding:10,
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center'

    },

catItems:{

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
    width:50,
    height:50,
    borderRadius:5,
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
  },
  row:{
    
    display:'flex',
    flexDirection:'row'
  },
  btn:{
    height:30,
    width:30,
    borderRadius:5,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.primary,
    marginHorizontal:5
  }
})