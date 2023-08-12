
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import Icon  from 'react-native-vector-icons/Feather' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, DOCTORS, LANGUAGELIST } from '../../../components/data';
import { ImagesUrl } from '../../../components/includes';
import { globalStyles } from '../../../components/globalStyle';
import ModalDialog from '../../../components/modal';
import ShoppingCart from '../../../components/include/ShoppingCart';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  MyAppointment: undefined;
  Cart:undefined; 
  ChatDoctor:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'MyAppointment'>;
 const MyAppointment =({ route, navigation }:Props)=> {

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
  navigation.navigate('ChatDoctor', {
    code:'cds',
  });  
}




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box]}>


<View style={styles.content}>

<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:ImagesUrl+"/doctors/"+item.image }} style={styles.profile} />

    
    <View style={[{display:'flex'}, {marginHorizontal:5, flex:1, justifyContent:'center'}]}>
      <Text style={{color:colors.dark, fontSize:12, fontWeight:'600',
       marginBottom:0}}>{item.fullname}</Text>
      <Text style={styles.infoText}>Cardiac Surgeon <Text style={{fontWeight:'400'}}>at</Text> Apple Hospital</Text>

      <View style={{justifyContent:'space-between', display:'flex', flexDirection:'row', alignItems:'center', marginTop:10}}>
        <Text style={styles.label}>14 June 2020 | 2:30 pm </Text>

      <View style={{display:'flex', flexDirection:'row'}}>
      <MaterialIcon name="call" size={12} color={colors.icon} style={{marginRight:15}}  />
      <MaterialIcon name="chat" size={12} color={colors.icon} />
      </View>
      </View>
    </View> 
</View>

 
  <FontAwesome5Icon name="bars" size={12} color={colors.icon} style={{position:'absolute', top:0, right:0}}  />
 
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
    <Text style={styles.label}>My appointments</Text>

    <View/>
    </View>
<ScrollView>
<View style={{height:45, paddingHorizontal:10, justifyContent:'center'}}>
<Text style={styles.infoText}>Upcoming</Text>
</View>

<ScrollView
  horizontal={true}
  contentContainerStyle={{width: '100%', height: '100%'}}
>
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
</ScrollView>


<View style={{height:45, paddingHorizontal:10, justifyContent:'center'}}>
<Text style={styles.infoText}>Past</Text>
</View>


<ScrollView
  horizontal={true}
  contentContainerStyle={{width: '100%', height: '100%'}}
>
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
</ScrollView>
</ScrollView>



<View style={styles.locationWrapper}>
  <Text style={styles.labelLocation}>Cancel</Text>
  <Text style={styles.labelLocation}>Reschedule</Text>
</View>
    </View>
  )
}


export default MyAppointment

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
  paddingHorizontal:10,
  
  
    },

catItems:{


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
    width:75,
    height:75,
    borderRadius:5,
    resizeMode:'contain'
  },
 content:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    marginVertical:5
  },
  locationWrapper:{
    position:'absolute', 
    top:100,
    right:10,
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