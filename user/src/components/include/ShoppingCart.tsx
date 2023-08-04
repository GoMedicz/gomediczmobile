
import React from 'react'
import { StyleSheet, Text, View, Pressable, StyleProp, ViewStyle } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import colors from '../../assets/colors'


const ShoppingCart = ({num, handleAction, style}:{num?:number, handleAction?:()=>void, style?: StyleProp<ViewStyle>}) => {



  return (
    <Pressable onPress={handleAction} style={[styles.cart, style]}>

    <MaterialIcon name="shopping-cart" size={18} color={colors.dark}  /> 
       {num&&num!==0? <View style={styles.circle}>
            <Text style={{color:colors.white, fontSize:8, fontWeight:'500'}}>{num}</Text>
        </View>:[]}
    
        </Pressable>
  )
}

export default ShoppingCart

const styles = StyleSheet.create({
    circle:{
        height:10,
        width:10,
        borderRadius:5,
        backgroundColor:'#F14338',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        left:8,
        top:-5
    },
    cart:{
        display:'flex',
        flexDirection:'row',
    },

})