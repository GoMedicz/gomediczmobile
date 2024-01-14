import { View, StyleSheet, Dimensions,  Platform, Pressable, StyleProp, ViewStyle } from 'react-native'

import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { MODE } from './includes';
import colors from '../assets/colors';



const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );


const SelectDropdown = (
  {isOpen, setIsOpen, value, items, setItems, setValue, handleAction,  style }:{isOpen:boolean, setIsOpen:()=>void, value:any, items?:any, setItems?:()=>void, setValue:()=>void, handleAction?:()=>void, style?: StyleProp<ViewStyle>}) => {
  return (
    <DropDownPicker

    open={isOpen}
    setOpen={setIsOpen}
    value={value}
    items={items}
    setItems={setItems}
    setValue={setValue}

    onSelectItem={handleAction}
    onChangeValue={(value:any) =>{}}
    style={[styles.selectWrapper, style]}
    textStyle={{
      fontSize:12
    }}
    labelStyle={{
      fontSize:14
    }}
    placeholder="Select an item"
    placeholderStyle={{
      color: colors.grey
    }}

    modalTitle="Select an item"
    modalAnimationType="slide"
    listMode='MODAL'
    ArrowUpIconComponent={({style}) => <MaterialIcon name='arrow-drop-up' size={18} color={MODE==='Light'?colors.grey2:colors.dark} />}

    ArrowDownIconComponent={({style}) => <MaterialIcon name='arrow-drop-down' size={18} color={MODE==='Light'?colors.grey2:colors.dark} />}
    
    theme={MODE==='Light'?"LIGHT":"DARK"}
    dropDownDirection="AUTO"
  />
    
    
  )
}

export default SelectDropdown

const styles = StyleSheet.create({
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
  selectText:{
    color:MODE==='Light'?colors.grey1:colors.white,
    fontSize:14,
  },
})