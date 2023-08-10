
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { LANGUAGELIST, THEME } from '../../components/data';
import { PrimaryButton } from '../../components/include/button';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Theme: undefined;
    Welcome:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Theme'>;
 const Theme =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(THEME)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}


const handleSelect =(item:item)=>{

const LIST = [...Languages].map((rs:item)=>{
                   
  if( rs.id === item.id){
      return {...rs, isDefault:item.isDefault ==='No'?'Yes':'Yes'}
  }

    return {...rs, isDefault:'No'}
  
    })
   setLanguages(LIST)
}



const Checkbox =({item}:{item:item})=>{
  return <TouchableOpacity activeOpacity={0.9} style={styles.checkboxWrapper}
  onPress={()=>handleSelect(item)}
 
  >
<View style={styles.checkbox}>
  <View style={[item.isDefault==='Yes'? styles.checked:[]]} />
</View>
<Text style={styles.label}>{item.title}</Text>
</TouchableOpacity>
  
}

const handleNext =()=>{
  navigation.navigate('Welcome');
}
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<SafeAreaView style={{flex:1, backgroundColor:colors.white}}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={14} color={colors.dark}  /> 
    <Text style={styles.label}>Change Theme</Text>
    
    <View/>
    </View>

    <View style={[ {flex:1, marginLeft:25, marginTop:0}]}>

<FlatList
contentContainerStyle={{ marginTop:5 }}
showsVerticalScrollIndicator={false}
numColumns={1}
data={Languages}
renderItem ={({item})=><Checkbox item={item} key={item.id} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View> 

<PrimaryButton
title='Continue'
handleAction={handleNext}

/>

    </SafeAreaView>
  )
}

export default Theme

const styles = StyleSheet.create({
  checkboxWrapper:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginBottom:30
  },

  checkbox:{
    height:20,
    width:20,
    borderRadius:10,
    borderWidth:2,
    borderColor:colors.skye,
    marginRight:30,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  checked:{
    height:10,
    width:10,
    borderRadius:10,
    backgroundColor:colors.skye
  },
  textWrapper:{
    width:width,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:15
  },
  title:{
  fontSize:16,
  fontWeight:'600',
  color:colors.dark,

  },
  label:{
    fontSize:12,
    fontWeight:'600',
    color:colors.dark,

  },

  button:{
    width:width,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:50,
    backgroundColor:colors.primary,
    bottom:0,
  },
  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:colors.white,
    height:60,
  },

})