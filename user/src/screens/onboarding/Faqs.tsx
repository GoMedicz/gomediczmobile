
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
  Faqs: undefined;
    Welcome:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Faqs'>;
 const Faqs =({ route, navigation }:Props)=> {

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

  return (<View style={{flex:1, backgroundColor:colors.lightSkye}}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={14} color={colors.dark}  /> 
    <Text style={styles.label}>FAQs</Text>
    
    <View/>
    </View>
<ScrollView>
    <View style={[ {flex:1,  marginTop:0}]}>


<View style={styles.itemWrapper}>
<Text style={styles.h2}> 1. How to Login to App?</Text>
</View>


<View style={styles.itemWrapper}>
<Text style={styles.h2}> 2. How to book an appointment?</Text>
<Text style={styles.h5}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde excepturi, repellendus laboriosam quas veniam, deleniti a soluta ipsam cum porro ea temporibus ipsum? Eius maxime nostrum deserunt error nulla laborum.</Text>
</View>

<View style={styles.itemWrapper}>
<Text style={styles.h2}> 3. How to cancel an appointment?</Text>
</View>

<View style={styles.itemWrapper}>
<Text style={styles.h2}> 4. What if i fail to book?</Text>
</View>

<View style={styles.itemWrapper}>
<Text style={styles.h2}> 5. How to make payment?</Text>
</View>

<View style={styles.itemWrapper}>
<Text style={styles.h2}> 6. Payment modes Available?</Text>
</View>

<View style={styles.itemWrapper}>
<Text style={styles.h2}> 7. How to Pay?</Text>
</View>

</View> 

</ScrollView>

    </View>
  )
}

export default Faqs

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

  h2:{
    fontSize:14,
    fontWeight:'600',

  },
  h5:{
    fontSize:10,
    fontWeight:'500',
    marginLeft:20,
    marginTop:10,
    color:colors.dark,
    opacity:0.6

  },
  itemWrapper:{
    marginBottom:4,
    padding:10,
    backgroundColor:colors.white,
    width:width
  }

})