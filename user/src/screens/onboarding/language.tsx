
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity } from 'react-native'

import MaterialIcon  from 'react-native-vector-icons/MaterialIcons'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';
import { PrimaryButton } from '../../components/include/button';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
    Language: undefined;
    SignIn:undefined; 
    BottomTabs:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Language'>;
 const Language =({ route, navigation }:Props)=> {

  const languageItem = useZustandStore(s => s.language);

  const themeItem = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(themeItem)

  const setStoreLanguage = useZustandStore(s => s.setLanguage);
  const MODE = useZustandStore(s => s.theme);

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
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
<Text style={dynamicStyle.label}>{item.title}</Text>
</TouchableOpacity>
  
}

const handleNext =()=>{
  const rs = Languages.filter((item:any)=>item.isDefault==='Yes')
  setStoreLanguage(rs[0].title)
    navigation.goBack();
  }

  
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])



const changeDefaultLanguage =()=>{
  let options = LANGUAGELIST;


   let ls = [];
   for (var i = 0, l = options.length; i < l; i++) {
    ls.push(
      {
        id:options[i].id,
        title:options[i].title,
        isDefault:options[i].title===languageItem?'Yes':'No'
      }
        )
  }

  setLanguages(ls) 
}



const handleBack =()=>{
  navigation.navigate('BottomTabs');
}




useEffect(()=>{
  changeDefaultLanguage()
},[LANGUAGELIST])

  return (<SafeAreaView style={{flex:1, backgroundColor:MODE==='Light'?colors.white:colors.dark}}>
    
    <View style={dynamicStyle.header}>
    
    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={18} color={themeItem==='Light'?colors.dark:colors.white} /> 
    <Text style={dynamicStyle.label}>Change Language</Text>
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
handleAction={handleNext}
title='Continue'
style={{bottom:0}}
/>



    </SafeAreaView>
  )
}

export default Language

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



})