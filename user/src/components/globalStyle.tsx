import { Dimensions, StyleSheet } from "react-native";
import colors from "../assets/colors";

const {width} = Dimensions.get('screen');

export  const globalStyles = StyleSheet.create({
    buttonText:{
        color:colors.white,
        fontWeight:'600'
      },

      button:{
        width:width-40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:45,
        backgroundColor:colors.primary,
        borderRadius:5,
        marginHorizontal:20
      },
      rowCenterBetween:{
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'space-between',
         alignItems:'center' 
      },
      rowCenterCenter:{
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'center',
         alignItems:'center' 
      },
      columnCenterBetween:{
        display:'flex', 
        flexDirection:'column', 
        justifyContent:'space-between',
         alignItems:'center' 
      },
      columnCenterCenter:{
        display:'flex', 
        flexDirection:'column', 
        justifyContent:'center',
         alignItems:'center' 
      },
    })