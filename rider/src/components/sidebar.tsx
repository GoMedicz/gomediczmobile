import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import colors from '../assets/colors'
import { ImagesUrl } from '../components/includes'
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );


type RootStackParamList = {
  DrawerContent: undefined;
  Reminder:undefined;
  History:undefined; 
  Dashboard:undefined;
  Account:undefined;
  Login:undefined;
  Support:undefined;
  };
  
  type Props = NativeStackScreenProps<RootStackParamList, 'DrawerContent'>;

const DrawerContent = (props:Props) => {
  const DrawerNavigation = useNavigation<DrawerNavigationProp <ParamListBase>>()

const Header =()=>{
  return <View style={styles.header}>

<Image source={{ uri:ImagesUrl+"/logo.png" }} style={styles.logo} />
<MaterialIcon name="close" size={35}  color={colors.white} onPress={() =>props.navigation.navigate('Dashboard')} />
  </View>
}

const Footer =()=>{

  const logout =async()=>{
    try {
    /* const dt = await removeData('user')
    const code = await removeData('code')
    const jwt = await removeData('jwt')
    const basket = await removeData('basket') */

    props.navigation.navigate('Login')
    

  } catch(e) {
    //console.warn(e)
  }

  }

  return <View style={styles.footer}>

<View style={styles.divider} />


    <Pressable style={styles.logout} onPress={logout}>
    <MaterialIcon name="logout" size={25}  color={colors.white}  />
    <Text style={{color:colors.white, fontSize:18, marginLeft:15}}> Logout</Text>
    </Pressable>

  </View>
}


useEffect(() => {
 // NativeModules.DevSettings.reload()
}, [])

  return (<DrawerContentScrollView {...props} style={styles.drawer}>
   
    {/* <DrawerItemList {...props} /> */}
    <Header />
    <DrawerItem label='Home' onPress={() => props.navigation.navigate('Dashboard')} 
     labelStyle={{color: colors.white, fontSize:18}} 
     icon={()=><MaterialIcon name="home" size={25}  color={colors.white} />}
    />


    <DrawerItem label='Reminder'  onPress={() => props.navigation.navigate('Reminder')} 
     labelStyle={{color: colors.white, fontSize:18}} 
     icon={()=><MaterialIcon name="event" size={25}  color={colors.white} />}
    />

    <DrawerItem label='Orders' onPress={() => props.navigation.navigate('History')}
     labelStyle={{color: colors.white, fontSize:18}} 
    icon={()=><MaterialIcon name="description" size={25}  color={colors.white} />}
    />

    <DrawerItem label='Account' 
      icon={()=><MaterialIcon name="person-outline" size={25}  color={colors.white} />}
    labelStyle={{color: colors.white, fontSize:18}} 
     onPress={() => props.navigation.navigate('Account')}
     />


    <DrawerItem label='Support'  onPress={() => props.navigation.navigate('Support')} 
     icon={()=><MaterialIcon name="help-outline" size={25}  color={colors.white} />}
     labelStyle={{color: colors.white, fontSize:18}} 

    />
    <Footer />
   
</DrawerContentScrollView>
  )
}

export default DrawerContent

const styles = StyleSheet.create({
  drawer:{
    backgroundColor:'#01216a'
  },
  drawerItem:{
    display:'flex',
    flexDirection:'row',
    backgroundColor:'red'
  },
  footer:{
    marginTop:(height/2)-100,
  },
  divider:{
    height:1,
    backgroundColor:colors.white,
    width:width

  },
  logout:{
display:'flex',
flexDirection:'row',
alignItems:'center',
marginTop:30,
marginLeft:20
  },
  logo:{
    height:60,
    width:60,
    resizeMode:'contain',
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:20,
    marginBottom:30
  }
})