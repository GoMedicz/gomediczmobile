
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../../components/data';
import { ImagesUrl } from '../../../components/includes';
import { globalStyles } from '../../../components/globalStyle';
import ModalDialog from '../../../components/modal';
import ShoppingCart from '../../../components/include/ShoppingCart';
import { useZustandStore } from '../../../api/store';
import { dynamicStyles } from '../../../components/dynamicStyles';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Reminder: undefined;
  CreateReminder:undefined; 
  Offers:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Reminder'>;
 const Reminder =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)


  const MODE = useZustandStore((store:any) => store.theme);
  const dynamicStyle = dynamicStyles(MODE);


interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.goBack();
}

const handleNext =()=>{
  navigation.navigate('CreateReminder');
}




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box]}>


<View style={styles.circle}>

<MaterialIcon name="notifications-active" size={20} color={colors.icon}  />
</View>

    
    <View style={[{display:'flex'}, {marginLeft:15}]}>
      <Text style={styles.label}>Multi Vitamins</Text>
      <Text style={styles.infoText}>Mon, Tue, Wed</Text>
      <Text style={[styles.infoText, {fontSize:8, marginTop:5}]}>08:00 am, 02:00 pm</Text>
    </View> 




      </Pressable>
    }


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="arrow-back" onPress={handleBack} size={18} color={colors.dark}  /> 
    <Text style={dynamicStyle.label}>Pill Reminders</Text>

    <View/>
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


<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.addMore}>
  
<MaterialIcon name="add" size={20} color={colors.white}  /> 
</TouchableOpacity>
    </View>
  )
}


export default Reminder

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
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'center',
  padding:10,
  
    },

catItems:{
flex:1,
margin:5,

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

  circle:{
    height:50,
    width:50,
    borderRadius:25,
    backgroundColor:colors.lightSkye,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
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
  addMore:{
    height:50,
    width:50,
    borderRadius:25,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.primary,
    position:'absolute',
    bottom:10,
    right:10,


    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4
    },
    
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  }
})