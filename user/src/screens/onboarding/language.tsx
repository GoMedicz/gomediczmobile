
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
    Language: undefined;
    Welcome:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Language'>;
 const Language =({ route, navigation }:Props)=> {

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
    

    <View style={styles.textWrapper} >
      <Text style={styles.title}>Change Language</Text>
      </View>

    <View style={[ {flex:1, marginLeft:25, marginTop:20}]}>

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

<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.button}>
  <Text style={[styles.label, {color:colors.white}]}>Continue</Text>
</TouchableOpacity>

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
    fontSize:15,
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
  }

})