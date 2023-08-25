
import React from 'react'
import { MODE } from '../includes'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons'
import { StyleSheet, Text, View, StyleProp, ViewStyle  } from 'react-native'
import colors from '../../assets/colors'

const Header = ({children, style}:{children?:React.ReactElement, style?: StyleProp<ViewStyle>}) => {
  return (
    <View style={[styles.header, style ]}>
        {children}
    </View>
  )
}

export default Header


const styles = StyleSheet.create({

    header:{
  
      display:'flex',
      justifyContent:'space-between',
      flexDirection:'row',
      alignItems:'center',
      paddingHorizontal:20,
      backgroundColor:MODE==='Light'?colors.white:colors.dark,
      height:60
    },
    label:{
        fontWeight:'600',
        fontSize:12,
        color:MODE==='Light'?colors.dark:colors.white,
      },
  })