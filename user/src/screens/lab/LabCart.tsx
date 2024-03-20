import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import colors from '../../assets/colors'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons'
import { getData } from '../../components/globalFunction'

const LabCart =(props:any)=> {

    const [items, setItems]= useState([] as any)
    const FetchContent =async()=>{
        try{
      
          let data:any  = await getData('LabItems');
      
          if(data){
            
            let prod =  JSON.parse(data)
            setItems(prod)
          }
        
        }catch(e){
      
        }
      }


      useEffect(()=>{
        FetchContent()
      }, [props])

  return (
    <Pressable onPress={props.handleCart} style={styles.cart}>

    <MaterialIcon name="shopping-cart" size={14} color={colors.dark}  /> 
        <View style={styles.circle}>
            <Text style={{color:colors.white, fontSize:8, fontWeight:'500'}}>{items.length}</Text>
        </View>
   </Pressable>
  )
}

export default LabCart

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
    flexDirection:'row'
},

})