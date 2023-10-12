
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import ShoppingCart from '../../components/include/ShoppingCart';
import { PrimaryButton, PrimaryButtonChildren } from '../../components/include/button';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
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
  AccountProfile: undefined;
  Profiles:undefined; 

  Theme:undefined;
  Wallet:undefined;
  Insight:undefined;
  Earnings:undefined;
  Language:undefined;
  Faqs:undefined;
  Terms:undefined;
  Contact:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'AccountProfile'>;

 const AccountProfile =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)



  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE);


interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleNext =()=>{
  navigation.navigate('Profiles');
}


    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
      <View/>
   <Text style={dynamicStyle.label}>Account</Text>
<View/>
    </View>

<ScrollView>



<View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:MODE==='Light'?colors.white:colors.dark, paddingBottom:20, paddingTop:20}}>
  
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png"}} style={styles.profile} />

<View style={{marginLeft:5}}>

<View style={{width:(width/2)-20}}>
  <Text style={dynamicStyle.title}>Dr. Joseph Williamson</Text>
  </View>

  <Text style={[styles.infoText, { marginTop:15}]}>+1 987 654 3210</Text>
</View>
</View>




<View style={{ marginHorizontal:10, marginVertical:5, display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>




<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Profiles')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>My Profile</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Setup Profile</Text>
    
<MaterialIcon name="language" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>


<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Language')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Change Language</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Change Language</Text>
    
<MaterialIcon name="language" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>


<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Theme')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Change Theme</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Change Theme</Text>
    
<MaterialIcon name="palette" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>



<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Terms')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>T&C</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Company Policies</Text>
    
<MaterialIcon name="article" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>





<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Contact')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Contact Us</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Let us help you</Text>
    
<MaterialIcon name="mail" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>



<TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Faqs')} style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>FAQs</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>Quick Answer</Text>
    
<MaterialIcon name="feedback" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>





<TouchableOpacity activeOpacity={0.8}  style={dynamicStyle.box}>
  <Text style={dynamicStyle.label}>Logout</Text>
  <View style={[globalStyles.rowCenterBetween, {marginVertical:10, opacity:0.6}]}>
  <Text style={[styles.infoText, {fontSize:10} ]}>See you soon</Text>
    
<MaterialIcon name="logout" size={30} color={MODE==='Light'?colors.grey1Opacity:colors.white} />
  </View>
</TouchableOpacity>

</View>



</ScrollView>

    </View>
  )
}


export default AccountProfile

const styles = StyleSheet.create({

  
  h3:{
    fontWeight:'600',
    fontSize:10,
    marginVertical:3
  },
  infoText:{
    fontSize:12,
    color:'#9E9E9E',
    fontWeight:'500'

  },

  profile:{
    width:width/2,
    height:180,
    resizeMode:'contain'
  },

  row:{
    display:'flex',
    flexDirection:'row',
    padding:10,
    justifyContent:'space-between'
  },
  card:{
    padding:10,
    backgroundColor:colors.white,
    marginVertical:5

  },
  hospital:{
paddingVertical:10,
display:'flex',
justifyContent:'space-between',
alignItems:'center',
flexDirection:'row'
  },

})