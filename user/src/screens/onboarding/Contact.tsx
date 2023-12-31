
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { PrimaryButton } from '../../components/include/button';
import { ImagesUrl } from '../../components/includes';
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
  Contact: undefined;
    Welcome:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Contact'>;
 const Contact =({ route, navigation }:Props)=> {

  const [refreshing, setRefreshing] = useState(false)


  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE)

interface item {
  title:string,
  isDefault:string,
  id:number
}





const handleBack =()=>{
  navigation.goBack();
}


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<SafeAreaView style={{flex:1, backgroundColor:MODE==='Light'?colors.white:colors.dark}}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="arrow-back"  onPress={handleBack} size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
    <Text style={dynamicStyle.label}>Support</Text>
    
    <View/>
    </View>
<ScrollView>

<View style={{paddingHorizontal:10}}>
  <Text style={[styles.h1, {color:MODE==='Light'?colors.dark:colors.white}]}>How may we</Text>
  <Text style={[styles.h1, {color:MODE==='Light'?colors.dark:colors.white}]}>help you?</Text>
  <Text style={[dynamicStyle.label, {marginTop:20, color:colors.grey}]}>Let us know yours queries & feedbacks</Text>
</View>




<View style={{marginVertical:50}}>
<View style={[styles.inputWrapper, {
    backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>

<MaterialIcon name="mail" size={14} color={colors.icon}  /> 
  <TextInput 
  placeholder='Email Address'
  placeholderTextColor={colors.grey}
  style={[styles.inputText,{
    color:MODE==='Light'?colors.dark:colors.white} ]}
  />
</View>

<View style={[styles.textAreaWrapper, {
    backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
<MaterialIcon name="edit" size={14} color={colors.icon}  /> 

<TextInput 

placeholder='Write your message'
multiline={true}
numberOfLines={10}
style={[styles.textArea, {
  color:MODE==='Light'?colors.dark:colors.white}]}
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
    </SafeAreaView>
  )
}

export default Contact

const styles = StyleSheet.create({
 
  textAreaWrapper:{
    width:width-20,
    marginHorizontal:10,
    borderRadius:5,
    padding:10,
    height:80,
    marginTop:10,
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
    marginLeft:10

  },
  inputWrapper:{
    width:width-20,
    flexDirection:'row',
    display:'flex',
    marginHorizontal:10,
    height:45,
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