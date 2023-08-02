
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';
import { ImagesUrl } from '../../components/includes';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
    Welcome: undefined;
    Language:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
 const Welcome =({ route, navigation }:Props)=> {

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



  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<SafeAreaView style={[ {flex:1, backgroundColor:colors.primary}]}>
    

    <View style={styles.logoWrapper}>
    <Image source={{ uri:ImagesUrl+"/logo3.png" }} style={styles.logo} />
    <Text style={styles.label}>go<Text style={{fontWeight:'800', fontFamily:'arial'}}>Medicz</Text></Text>
    </View>
   


<View style={styles.row}>

<View style={styles.doctorWrapper} />
<View style={styles.circle} />
  <Image source={{ uri:ImagesUrl+"/reception.png" }} style={styles.doctorLogo} /> 

  </View>

    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({
  
 logo:{
  height:70,
  width:70,
 },

 logoWrapper:{
  width:width,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  marginTop:(height/4),


 },
 label:{
  color:colors.white,
  fontSize:18,
  marginTop:20,
 },


 doctorWrapper:{
  height:(height/3)+20,
  width:width-60,
  backgroundColor:'#e6e1e1',
  bottom:0,
borderTopRightRadius:width/2,
borderTopLeftRadius:width/2,
opacity:0.1,
display:'flex',
justifyContent:'center',
alignItems:'center',
position:'absolute'
 },

circle:{
  height:(height/3)-10,
  width:width-120,
  backgroundColor:'#e6e1e1',
  bottom:0,
borderTopRightRadius:width/2 + 100,
borderTopLeftRadius:width/2 + 100,
position:'absolute',
opacity:0.1,

},
 row:{
  width:width,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  position:'absolute',
  bottom:50
 },

 doctorLogo:{
  height:200,
  width:200,
  zIndex:1
 }
})