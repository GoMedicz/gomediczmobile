
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { LANGUAGELIST, THEME } from '../../components/data';
import { PrimaryButton } from '../../components/include/button';
import { ImagesUrl } from '../../components/includes';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Contact: undefined;
    Welcome:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Contact'>;
 const Contact =({ route, navigation }:Props)=> {

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

  return (<View style={{flex:1, backgroundColor:colors.white}}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={14} color={colors.dark}  /> 
    <Text style={styles.label}>Support</Text>
    
    <View/>
    </View>
<ScrollView>

<View style={{paddingHorizontal:10}}>
  <Text style={styles.h1}>How may we</Text>
  <Text style={styles.h1}>help you?</Text>
  <Text style={[styles.label, {marginTop:20, color:colors.grey}]}>Let us know yours queries & feedbacks</Text>
</View>




<View style={{marginVertical:50}}>
<View style={styles.inputWrapper}>

<MaterialIcon name="mail" size={14} color={colors.icon}  /> 
  <TextInput 
  placeholder='Email Address'
  placeholderTextColor={colors.grey}
  style={styles.inputText}
  />
</View>

<View style={styles.textAreaWrapper}>
<MaterialIcon name="edit" size={14} color={colors.icon}  /> 

<TextInput 

placeholder='Write your message'
multiline={true}
numberOfLines={10}
style={styles.textArea}
placeholderTextColor={colors.grey}


/>
</View>


<PrimaryButton
title='Submit'

style={{width:width-20, marginHorizontal:10, borderRadius:5, marginVertical:50}}

/>





</View>



</ScrollView>
    
<View style={styles.row}>

<View style={styles.doctorWrapper} />
<View style={styles.circle} />
  <Image source={{ uri:ImagesUrl+"/reception.png" }} style={styles.doctorLogo} /> 

  </View>
    </View>
  )
}

export default Contact

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
  textAreaWrapper:{
    width:width-20,
    marginHorizontal:10,
    borderRadius:5,
    padding:10,
    height:80,
    marginTop:10,
    backgroundColor:colors.lightSkye,
    display:'flex',
    flexDirection:'row',
    
  },
  textArea:{
   marginLeft:10,
   fontSize:12,
   fontWeight:'500'
  },
  h1:{
    fontSize:20,
    fontWeight:'700'
  },
  inputText:{
    width:width-50,
    color:colors.dark,
    marginLeft:10

  },
  inputWrapper:{
    width:width-20,
    flexDirection:'row',
    display:'flex',
    marginHorizontal:10,
    height:45,
    backgroundColor:colors.lightSkye,
    borderRadius:5,
    alignItems:'center',
    padding:10,


  },
  doctorWrapper:{
    height:(height/3)+20,
    width:width-60,
    backgroundColor:'#e6e1e1',
    
  borderTopRightRadius:width/2,
  borderTopLeftRadius:width/2,
  opacity:0.1,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  position:'absolute',
  bottom:0,
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
    bottom:0
   },
  
   doctorLogo:{
    height:200,
    width:200,
    zIndex:1
   }
})