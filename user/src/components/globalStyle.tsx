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
    })