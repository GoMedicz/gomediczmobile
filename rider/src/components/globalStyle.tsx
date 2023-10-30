import { Dimensions, StyleSheet } from "react-native";
import colors from "../assets/colors";
import { MODE } from "./includes";

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
        height:50,
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

      header:{
  
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        backgroundColor:MODE==='Light'?colors.white:colors.dark,
        height:60
      },
      px:{
        height:25,
        width:25,
        resizeMode:'cover',
          },
          error:{
            borderWidth:1,
            borderColor:colors.red,
          },
          infoText:{
            fontSize:12,
            color:'#9E9E9E',
            fontWeight:'500'
          },
    })