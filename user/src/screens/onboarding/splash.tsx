import { Image, StyleSheet, Text, View, Platform, Dimensions,Animated, Pressable } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Icon  from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import colors from '../../assets/colors'
import { ImagesUrl } from '../../components/includes'

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );


type RootStackParamList = {
   Splash: undefined;
   SignIn:undefined; 
   Welcome:undefined;
  };
  
  type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

  const Splash = ({ route, navigation }:Props) => {
    const FadeInView = (props:any) => {
      const animationOpacity = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    
      useEffect(() => {
       Animated.timing(
          animationOpacity,
          {
            toValue: 1,
            delay: 1000,
            duration: 2000,
            useNativeDriver: true
        }
        ).start(()=>navigation.replace('SignIn')); 
      }, [animationOpacity])
    
    
    
    
      return (
        <Animated.View                 // Special animatable View
          style={{
            opacity: animationOpacity,         // Bind opacity to animated value
          }}
        >
          {props.children}
        </Animated.View>
      );
    }
   

  return (<SafeAreaView style={{flex:1, backgroundColor:colors.primary}}>

     <View style={styles.flexCenter}>
      <FadeInView>

      <View style={styles.logoWrapper}>
    <Image source={{ uri:ImagesUrl+"/logo3.png" }} style={styles.logo} />
    <Text style={styles.label}>go<Text style={{fontWeight:'800', fontFamily:'arial'}}>Medicz </Text></Text>

    </View>

      </FadeInView>
      </View>
</SafeAreaView>
  )
}

export default Splash

const styles = StyleSheet.create({

  flexCenter:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flex:1
   
  },
  
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

 },
 label:{
  color:colors.white,
  fontSize:18,
  marginTop:10,
 },

})