
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, StatusBar } from 'react-native'

import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import { FlatList, RefreshControl, ScrollView, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';
import { ImagesUrl } from '../../components/includes';

import ModalDialog from '../../components/subscribe';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  SignIn: undefined;
    Language:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
 const SignIn =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
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
  //navigation.navigate('Welcome');
}

  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={{backgroundColor:'#F4F8Fb', flex:1}}>
    <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={'light-content'}
        showHideTransition={'slide'}
        hidden={false}
      />
    <ScrollView >


<View style={{backgroundColor:colors.primary, flex:1}}>

    <View style={styles.logoWrapper}>
    <Image source={{ uri:ImagesUrl+"/logo3.png" }} style={styles.logo} />
    <Text style={styles.label}>go<Text style={{fontWeight:'800', fontFamily:'arial'}}>Medicz </Text></Text>
    </View>
   
<View style={styles.row}>
  <Image source={{ uri:ImagesUrl+"/reception.png" }} style={styles.doctorLogo} /> 
  </View>
  </View>



<View style={styles.loginWrapper}>
<View style={styles.textWrapper}>
<MaterialIcon name="phone-iphone" size={18} color={colors.icon}  /> 
  <TextInput placeholder='Enter Mobile Number' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} />
</View>

<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.button}>
  <Text style={styles.buttonText}>Continue</Text>
</TouchableOpacity>
</View> 



<View style={[styles.loginWrapper, {marginTop:40}]}>
<Text style={{fontSize:14, fontWeight:'600'}}>Or quick continue with</Text>
</View>


<View style={styles.socialWrapper}>

  <View style={styles.facebook}>

  <Image source={{ uri:ImagesUrl+"/icons/facebook.png" }} style={styles.icon} />

<Text style={{fontSize:14,  marginLeft:35,fontWeight:'600', color:colors.white}}>Facebook</Text>
  </View>


  <View style={styles.gmail}>

  <Image source={{ uri:ImagesUrl+"/icons/google.png" }} style={styles.icon} />


<Text style={{fontSize:15, marginLeft:15, fontWeight:'600'}}>Gmail</Text>

</View>
</View>


<View style={[styles.loginWrapper, {marginTop:20}]}>
<Text style={{fontSize:14, fontWeight:'600', color:colors.primary}}>Skip Login</Text>
</View>

{/*  <ModalDialog
 isModalVisible={true}
 > 

<Text>Hello </Text>
 </ModalDialog> */}

  </ScrollView>

    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  
 logo:{
  height:60,
  width:60,
  resizeMode:'contain'
 },

 logoWrapper:{
  width:width,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  marginTop:60,


 },
 label:{
  color:colors.white,
  fontSize:18,
  marginTop:10,
 },


 row:{
  width:width,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  marginTop:40
 },

 doctorLogo:{
  height:200,
  width:200,
 },


 loginWrapper:{
  
width:width,
display:'flex',
alignItems:'center',

 },

 button:{
  width:width-20,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  height:45,
  backgroundColor:colors.primary,
  borderRadius:5,
},

contentWrapper:{
width:width,
display:'flex',
justifyContent:'center',
alignItems:'center',

},


buttonText:{
  color:colors.white,
  fontWeight:'600'
},



textWrapper:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  width:width-20,
  height:45,
  paddingHorizontal:10,
  backgroundColor:colors.white,
  borderRadius:5,
  top:-20,
  elevation:10,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.25,
  shadowRadius: 2,
},

textInput:{
marginLeft:15,
width:width-80,
fontWeight:'600',
color:colors.dark,
fontSize:12
},


socialWrapper:{
  display:'flex',
  flexDirection:'row',
  marginTop:20,
  justifyContent:'space-between',
  width:width,
  paddingHorizontal:10
},

facebook:{
display:'flex',
flexDirection:'row',
height:45,
backgroundColor:'#4167B2',
alignItems:'center',

justifyContent:'center',
width:(width/2)-20,
borderRadius:5,
},

gmail:{
  display:'flex',
  flexDirection:'row',
  height:45,
  backgroundColor:colors.white,
alignItems:'center',
justifyContent:'center',
width:(width/2)-20,
borderRadius:5,
},

icon:{
  height:20,
  width:20,
  resizeMode:'contain'
},
})