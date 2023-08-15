
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, StatusBar } from 'react-native'

import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import { FlatList, RefreshControl, ScrollView, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';
import { ImagesUrl, MODE } from '../../components/includes';


const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  SignIn: undefined;
  Dashboard:undefined; 
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
  navigation.navigate('Dashboard');
}

const handleNext =()=>{
  navigation.navigate('Dashboard');
}

  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={{
    backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark, flex:1}}>
    <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={'light-content'}
        showHideTransition={'slide'}
        hidden={false}
      />
    <ScrollView 
    showsVerticalScrollIndicator={false}
    >


<View style={{backgroundColor:colors.primary, height:(height/2)+60}}>

    <View style={styles.logoWrapper}>
    <Image source={{ uri:ImagesUrl+"/logo3.png" }} style={styles.logo} />
    <Text style={styles.label}>go<Text style={{fontWeight:'800', fontFamily:'arial'}}>Medicz </Text></Text>

  <Text style={[styles.buttonText, {color:colors.navyBlue, fontSize:12, marginVertical:5}]}>DELIVERY</Text>
    </View>
   
<View style={styles.row}>
  <Image source={{ uri:ImagesUrl+"/reception.png" }} style={styles.doctorLogo} /> 
  </View>
  </View>



<View style={[styles.loginWrapper]}>

<View style={styles.textWrapper}>
<MaterialIcon name="phone-iphone" size={18} color={colors.icon}  /> 
  <TextInput placeholder='Enter Mobile Number' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} />
</View>


<View style={[styles.textWrapper, {marginTop:10}]}>
<MaterialIcon name="lock" size={18} color={colors.icon}  /> 
  <TextInput placeholder='Password' 
  placeholderTextColor={'#959595'}
  style={styles.textInput} />

<MaterialIcon name="visibility" size={18} color={colors.grey}  /> 
</View>

<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.button}>
  <Text style={styles.buttonText}>Continue</Text>
</TouchableOpacity>
</View> 


<View style={[styles.loginWrapper, {marginVertical:5}]}>
<Text style={{fontSize:12, fontWeight:'600', color:MODE==='Light'?colors.dark:colors.white}}>OR </Text>
</View>


<View style={styles.socialWrapper}>

  <View style={styles.gmail}>

  <Image source={{ uri:ImagesUrl+"/icons/google.png" }} style={styles.icon} />


<Text style={{fontSize:15, marginLeft:15, fontWeight:'600', color:colors.grey}}>Continue with Google</Text>

</View>
</View>

<View style={[styles.loginWrapper]}>
<Text style={{fontSize:12, fontWeight:'600', color:MODE==='Light'?colors.primary:colors.white}}>Skip Login</Text>
</View>


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
  backgroundColor:MODE==='Light'?colors.white:colors.dark,
  borderRadius:5,
  top:-20,
},

textInput:{
marginLeft:15,
width:width-90,
fontWeight:'600',
color:colors.dark,
fontSize:12
},


socialWrapper:{
  display:'flex',
  flexDirection:'row',
  marginVertical:10,
  justifyContent:'space-between',
  width:width,
  paddingHorizontal:10,
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
  borderWidth:1,

  borderColor:MODE==='Light'?colors.lightSkye:colors.dark,
  backgroundColor:MODE==='Light'?colors.grey1Opacity:colors.dark,
alignItems:'center',
justifyContent:'center',
width:width-20,
borderRadius:5,
},

icon:{
  height:10,
  width:10,
  resizeMode:'contain'
},
})