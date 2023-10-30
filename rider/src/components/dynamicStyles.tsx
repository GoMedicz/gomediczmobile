import { Dimensions, Platform, StyleSheet } from "react-native";
import colors from "../assets/colors";

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );

export  const dynamicStyles =(MODE:string)=> StyleSheet.create({
  label:{
    fontWeight:'600',
    fontSize:12,
    color:MODE==='Light'?colors.dark:colors.white,
  },

  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },
  
  title:{
    fontSize:20,
    fontWeight:'600',
    color:MODE==='Light'?colors.dark:colors.white,

  },
  
  
boxCart:{
  height:(height/3)-30,
  width:(width/2)-15,
  backgroundColor:MODE==='Light'?colors.white:colors.dark,
  borderRadius:10,
  marginBottom:10,
  display:'flex',
  marginHorizontal:5
  
    },
  textWrapper:{
    height:45,
    width:width-40,
    marginVertical:8,
    marginHorizontal:10,
    backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    borderRadius:10

  },

  textInput:{
    color:MODE==='Light'?colors.dark:colors.white,
    marginLeft:10,
    fontSize:14,
    width:width-90,
    

  },
  
  about:{
    display:'flex', 
    width:width-20,
     backgroundColor:MODE==='Light'?colors.white:colors.dark, 
     padding:10
    
    },
    card:{
      backgroundColor:MODE==='Light'?colors.white:colors.dark,
      paddingHorizontal:20,
      paddingVertical:10,
      marginVertical:5,
      
    },

    textbox:{
      height:50,
      backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark,
      padding:10,
      marginVertical:5,
      borderRadius:5,
      color:MODE==='Light'?colors.grey:colors.white,
      fontWeight:'600'
    },
    selectText:{
      color:MODE==='Light'?colors.grey1:colors.white,
      fontSize:14,
      fontWeight:'600',
    },

    selectWrapper:{
      height:45,
      width:width-20,
      marginVertical:8,
      backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark, 
      alignItems:'center',
      padding:10,
      borderRadius:5,
      borderWidth:0
      
    },
    qty:{
      width:(width/2)-20,
      height:45,
      backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark,
      borderRadius:10,
      padding:10,
      color:MODE==='Light'?colors.dark:colors.white,
      marginVertical:5,
  
    },
    h2:{
      fontSize:14,
      fontWeight:'600',
      color:MODE==='Light'?colors.dark:colors.white,
    },
    h5:{
      fontSize:10,
      fontWeight:'500',
      marginLeft:20,
      marginTop:10,
      color:MODE==='Light'?colors.dark:colors.white,
      opacity:0.6
  
    },

    box:{
      backgroundColor:MODE==='Light'?colors.white:colors.dark,
      width:(width/2)-15,
      padding:10,
      marginVertical:5,
      borderRadius:5,
      height:80
  
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

    boxRider:{
      width:width,
      backgroundColor:MODE==='Light'?colors.white:colors.dark,
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      paddingVertical:20,
      position:'absolute',
      bottom:0,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      alignItems:'center',
      zIndex:1,
    
      shadowColor: "#000",
      shadowOffset: {
        width: 3,
        height: 0
      },
      
      shadowOpacity: 0.5,
      shadowRadius: 6,
      elevation: 5,
      
        }
    })