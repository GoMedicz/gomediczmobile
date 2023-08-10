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


const ChooseDays = ({isModalVisible, action, children, style }:{isModalVisible:boolean, action?:()=>void, children:React.ReactElement, style?: StyleProp<ViewStyle>}) => {
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

export default ChooseDays

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        display:'flex',
        alignItems: "flex-end",
        backgroundColor:'#00000080',
        justifyContent:'flex-end'
        
      },
      modalView:{
        width:width,
        backgroundColor:'#fff',
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