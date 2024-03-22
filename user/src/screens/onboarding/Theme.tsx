
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { THEME } from '../../components/data';
import { PrimaryButton } from '../../components/include/button';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';

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
  
    BottomTabs:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Theme'>;
 const Theme =({ route, navigation }:Props)=> {
  const themeItem = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(themeItem)
  const [themes, setThemes] = useState(THEME)
  const [refreshing, setRefreshing] = useState(false)

  const setStoreTheme = useZustandStore(s => s.setTheme);

interface item {
  title:string,
  isDefault:string,
  id:number
}

const handleSelect =(item:item)=>{

const LIST = [...themes].map((rs:item)=>{
                   
  if( rs.id === item.id){
      return {...rs, isDefault:item.isDefault ==='No'?'Yes':'Yes'}
  }

    return {...rs, isDefault:'No'}
  
    })
    setThemes(LIST)
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

const handleBack =()=>{
  navigation.navigate('BottomTabs');
}

  
const handleNext =()=>{
const rs = themes.filter((item:any)=>item.isDefault==='Yes')
setStoreTheme(rs[0].title)
  navigation.goBack();
}


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])


const changeDefaultTheme =()=>{
  let options = THEME;


   let ls = [];
   for (var i = 0, l = options.length; i < l; i++) {
    ls.push(
      {
        id:options[i].id,
        title:options[i].title,
        isDefault:options[i].title===themeItem?'Yes':'No'
      }
        )
  }

  setThemes(ls) 
}



useEffect(()=>{
  changeDefaultTheme()
},[THEME])

  return (<SafeAreaView style={{flex:1, backgroundColor:themeItem==='Light'?colors.white:colors.dark}}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={18} color={themeItem==='Light'?colors.dark:colors.white} /> 
    <Text style={dynamicStyle.label}>Change Theme</Text>
    
    <View/>
    </View>

    <View style={[ {flex:1, marginLeft:25, marginTop:0}]}>

<FlatList
contentContainerStyle={{ marginTop:5 }}
showsVerticalScrollIndicator={false}
numColumns={1}
data={themes}
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

  
})