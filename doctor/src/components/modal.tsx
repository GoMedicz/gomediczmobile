import { View, StyleSheet, Dimensions, Modal, Platform, Pressable, StyleProp, ViewStyle } from 'react-native'

import React from 'react'
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
              <View style={[styles.modalView, style ]}>
    
{children}
    
    
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
        justifyContent:'center'
        
      },
      modalView:{
        height:200,
        width:width-60,
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
})