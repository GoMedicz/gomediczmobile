
import React from 'react'
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput, StyleProp, ViewStyle  } from 'react-native'
import { globalStyles } from '../globalStyle';
import colors from '../../assets/colors';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



export const PrimaryButtonChildren = ({children, handleAction, style}:{children:React.ReactElement, handleAction?:()=>void, style?: StyleProp<ViewStyle>}) => {
  return (
    <TouchableOpacity onPress={handleAction} activeOpacity={0.9} style={[styles.button, style ]}>

      {children}
</TouchableOpacity>
  )
}


export const PrimaryButton = ({title, handleAction, style}:{title:string, handleAction?:()=>void, style?: StyleProp<ViewStyle>}) => {
  return (
    <TouchableOpacity onPress={handleAction} activeOpacity={0.9} style={[styles.button, style ]}>
  <Text style={styles.buttonText}>{title}</Text> 
</TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    button:{
        width:width,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:45,
        backgroundColor:colors.primary,
      },
      buttonText:{
        color:colors.white,
        fontWeight:'600',
        fontSize:14
      },
})