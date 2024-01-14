import { View, StyleSheet, Dimensions, Modal, Platform, Image, Text, Pressable } from 'react-native'

import React from 'react'
import { ImagesUrl } from './includes';
import colors from '../assets/colors';


const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );


const ErrorModal = ({isModalVisible, action, message}:{isModalVisible:boolean, action?:()=>void, message:string}) => {

  return (
    <Modal 
    
    visible={isModalVisible} 
    animationType="fade"
            transparent={true}>
    <View style={styles.centeredView}>

              <View  style={styles.modalView}>

                
                <Text style={{color:colors.red, fontSize:16, marginTop:15}}>Failed</Text>

                <Text style={{color:colors.black, fontSize:16, marginTop:15}}>{message}</Text>

                <Pressable onPress={action} style={{marginTop:35, marginBottom:10}}>
                  <Text style={{color:colors.primary, fontSize:15, fontWeight:'700'}}>CLOSE </Text>
                </Pressable>
                </View>
        
 
    </View>
    
    </Modal>
    
    
  )
}

export default ErrorModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        backgroundColor:'#00000080',
        justifyContent:'center'
        
      },
      logo:{
        height:100,
        width:200,
        resizeMode:'center'
      },
      modalView:{
        width:width-60,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        padding:10,
        borderRadius:10,
        shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
      },
      btn:{
        height:50,
        width:60,
        backgroundColor:colors.primary,
        alignItems:'center',
        justifyContent:'center',
        marginTop:15,
        borderRadius:5
      }
})