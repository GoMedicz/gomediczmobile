import { View, StyleSheet, Dimensions, Modal, Platform, Pressable, StyleProp, ViewStyle, Text, Image, TouchableOpacity } from 'react-native'

import React from 'react'
import colors from '../assets/colors';
import { ImagesUrl } from './includes';
import { TextInput } from 'react-native-gesture-handler';
import { globalStyles } from './globalStyle';

import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
/* import Modal from "react-native-modal"; */



const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );


const ModalDialog = ({isModalVisible, action, children, style }:{isModalVisible:boolean, action?:()=>void, children:React.ReactElement, style?: StyleProp<ViewStyle>}) => {
  return (
    <Modal visible={isModalVisible} 
    animationType="fade"
            transparent={true}>



    <Pressable style={styles.centeredView} onPress={action}>

    

    

    <View style={styles.cancelWrapper}>
              
<MaterialIcon name="close" size={20} color={colors.white}  /> 
 </View>

<View style={styles.imageWrapper}>

<Image source={{ uri:ImagesUrl+"/anouncement.avif" }} style={styles.announcement} />
</View>

             

              <View style={[styles.modalView, style ]}>

             <Text style={styles.h1}>Stay in touch.</Text> 
             <Text style={styles.h4}>Stay connected for future</Text> 
             <Text style={styles.h4}>updates and new products.</Text>



             <View style={styles.textWrapper}>
              <TextInput  placeholder='Enter your email address' 
              style ={styles.textInput}
              placeholderTextColor={colors.dark} />
             </View>


             <TouchableOpacity onPress={()=>{}} activeOpacity={0.9} style={styles.button}>
  <Text style={[globalStyles.buttonText, {fontWeight:'700'}]}>Subscribe Now</Text>
</TouchableOpacity>



    
    </View>
    </Pressable>
    
    </Modal>
    
    
  )
}

export default ModalDialog

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        backgroundColor:'#00000080',
       
        
      },
      modalView:{
        width:width-60,
        backgroundColor:'#fff',
        padding:20,
        borderRadius:10,
        marginTop:50,

        shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
      },


      imageWrapper:{
        position:'absolute',
        zIndex:1,
        top:50,
      shadowColor: "green",
    shadowOffset: {
      width: 3,
      height: 6
    },
    
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5

      },
      announcement:{
        height:120,
        width:120,
        borderRadius:60,
        resizeMode:'cover',
      },


      cancelWrapper:{
        width:width-100,
        display:'flex',
        alignItems:'flex-end',
        marginTop:40,
        
      },
      h1:{
        fontSize:24,
        fontWeight:'700',
        color:colors.dark,
        marginTop:50,
        marginBottom:10,
      },
      h4:{
        fontSize:16,
        fontWeight:'700',
        color:colors.dark,
      },

      textWrapper:{
        height:50,
        width:width-100,
        backgroundColor:'#F5F5F5',
        marginVertical:20,
        borderRadius:5,
        display:'flex',
        justifyContent:'center',
        paddingHorizontal:10,
      },
      textInput:{
      fontWeight:'600',
      color:colors.dark,
      fontSize:13
      },

      button:{
        width:width-100,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:50,
        backgroundColor:'#EE5B7C',
        borderRadius:5,

        shadowColor: "red",
        shadowOffset: {
          width: 2,
          height: 5
        },
        
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      
      },
})