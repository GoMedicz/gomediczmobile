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


const Loader = ({isModalVisible, action, type}:{isModalVisible:boolean, action?:()=>void, type?:String}) => {

  return (
    <Modal 
    
    visible={isModalVisible} 
    animationType="fade"
            transparent={true}>
    <View style={styles.centeredView}>

             {type!=='load'?

              <View  style={styles.modalView}>
                <Text style={{color:colors.black, fontSize:25, fontWeight:'600'}}>Successfully</Text>
                <Text style={{color:colors.black, fontSize:25, fontWeight:'600'}}> {type}</Text>

                <Pressable onPress={action} style={styles.btn}>
                  <Text style={{color:colors.white, fontSize:15, fontWeight:'700'}}>OK </Text>
                </Pressable>
                </View>:

                <View style={styles.modalView}>
             <Image source={{ uri:ImagesUrl+"/loader.gif" }} style={styles.logo} /> 
             </View>}
        
 
    </View>
    
    </Modal>
    
    
  )
}

export default Loader

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
        height:150,
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