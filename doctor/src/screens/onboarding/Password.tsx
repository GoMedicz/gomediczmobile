
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';
import { ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Password: undefined;
    Language:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Password'>;
 const Password =({ route, navigation }:Props)=> {

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

const handleNext =()=>{
  navigation.navigate('BottomTabs', {
    code:'cds',
  }); 
}

  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<SafeAreaView style={[ {flex:1, backgroundColor:colors.white}]}>
    

    <View style={styles.header}>


    <Text style={styles.label}>Create Password</Text>
    <View />
    </View>

<View style={styles.infoWrapper}>
    <Text style={styles.infoText}>Create a unique password that</Text>
    <Text style={styles.infoText}>will be used when you sign in.</Text>
    </View>



    <Text style={[styles.infoText, {marginLeft:20, marginBottom:10, color:colors.dark}]}>Password</Text>
    <View style={styles.textWrapper}>
  <TextInput placeholder='*******' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} />
<FontAwesome5Icon name="eye" size={14} color={colors.grey}  /> 

</View>

<Text style={[styles.infoText, {marginLeft:20}]}>Must be at least 8 characters</Text>


<Text style={[styles.infoText, {marginLeft:20, marginBottom:10, marginTop:30, color:colors.dark}]}>Confirm Password</Text>
    <View style={[styles.textWrapper, {marginBottom:40}]}>
  <TextInput placeholder='*******' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} />
<FontAwesome5Icon name="eye" size={14} color={colors.grey}  /> 

</View>



<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={globalStyles.button}>
  <Text style={globalStyles.buttonText}>Proceed</Text>
</TouchableOpacity>





    </SafeAreaView>
  )
}


export default Password

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    marginHorizontal:20,
    height:50
  },
  label:{
    fontWeight:'600',
    fontSize:14,
  },
  infoWrapper:{
    width:width,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:50
  },
  infoText:{
    fontSize:12,
    color:'#9E9E9E',
    fontWeight:'500'

  },
contentWrapper:{
  width:width-40,
  display:'flex',
  justifyContent:'space-between',
  flexDirection:'row',
  alignItems:'center',
  marginHorizontal:20,
  marginTop:20
  
},
 

textWrapper:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  width:width-40,
  height:45,
  paddingHorizontal:10,
  marginHorizontal:20,
  backgroundColor:'#F4F8FB',
  borderRadius:5,
  marginBottom:2
},

textInput:{
fontWeight:'600',
color:colors.dark,
fontSize:12,
letterSpacing:10
},


  
})