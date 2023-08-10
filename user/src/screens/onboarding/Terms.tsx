
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
  Terms: undefined;
    Welcome:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Terms'>;
 const Terms =({ route, navigation }:Props)=> {

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
    <Text style={styles.label}>Terms & Conditions</Text>
    
    <View/>
    </View>
<ScrollView>
    <View style={[ {flex:1, marginHorizontal:25, marginTop:0}]}>

<Text style={[styles.label, {fontWeight:'500', marginVertical:10}]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem animi laboriosam similique hic quaerat, fugit quo quae, molestias modi quod temporibus saepe reiciendis exercitationem, ea quia reprehenderit totam soluta pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum natus repudiandae vel dignissimos facere itaque. Ea atque corporis quia, nemo nulla, laborum unde officiis, ducimus assumenda placeat reprehenderit enim vitae!</Text>


<Text style={[styles.label, {fontWeight:'500', marginVertical:10}]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem animi laboriosam similique hic quaerat, fugit quo quae, molestias modi quod temporibus saepe reiciendis exercitationem, ea quia reprehenderit totam soluta pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum natus repudiandae vel dignissimos facere itaque. Ea atque corporis quia, nemo nulla, laborum unde officiis, ducimus assumenda placeat reprehenderit enim vitae!</Text>


<Text style={[styles.label, {fontWeight:'500', marginVertical:10}]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem animi laboriosam similique hic quaerat, fugit quo quae, molestias modi quod temporibus saepe reiciendis exercitationem, ea quia reprehenderit totam soluta pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum natus repudiandae vel dignissimos facere itaque. Ea atque corporis quia, nemo nulla, laborum unde officiis, ducimus assumenda placeat reprehenderit enim vitae!</Text>
</View> 

</ScrollView>

    </SafeAreaView>
  )
}

export default Terms

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