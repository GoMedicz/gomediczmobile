
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Platform, Dimensions, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../../assets/colors';
import { LANGUAGELIST } from '../../../components/data';
import { PrimaryButton } from '../../../components/include/button';
import { useZustandStore } from '../../../api/store';
import { dynamicStyles } from '../../../components/dynamicStyles';
import { CURRENCY, PHARMACY_CODE, STAFF_CODE } from '../../../components/includes';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Insight: undefined;
  SendMoney:undefined; 
  Offers:{
     code:string;
   }
   };
   
type Props = NativeStackScreenProps<RootStackParamList, 'SendMoney'>;
 const SendMoney =({ route, navigation }:Props)=> {


  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE);
  const [refreshing, setRefreshing] = useState(false)
  const [items, setItems] = useState([] as any);

  const Initials ={
    code: 'p'+Math.random().toString(36).substring(2, 9),
    pharmacy_code:PHARMACY_CODE,
    staff_code: STAFF_CODE,
    wallet:'',
    bank_code:'',
    account_number:'',
    account_name:'',
    branch_code:'',
    amount:''
  }

  
  const [transfer, setTransfer] = useState(Initials);
  const [errors, setErrors] = useState(Initials);
  const [modalType, setModalType] = useState('load')
  const [isBank, setIsBank] = useState(false);
  const [banks, setBanks] = useState([]);

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.goBack();
}

const handleNext =()=>{
  navigation.navigate('Insight');
}


const handleChange =(name:string, text:string)=>{
  
  setTransfer({...transfer, [name]:text})
  setErrors({...errors, [name]:''})
}


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={ {flex:1,backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="arrow-back-ios" size={18} color={MODE==='Light'?colors.dark:colors.white} onPress={handleBack} /> 
    <Text style={dynamicStyle.label}>Send to Bank</Text>
<View/>
    </View>

<ScrollView>

    <View style={{backgroundColor:MODE==='Light'?colors.white:colors.dark,  paddingHorizontal:10, paddingVertical:15}}>
    
  
<Text style={styles.infoText}>AVAILABLE BALANCE</Text>
      <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:25, fontWeight:'700'}}>{CURRENCY} 520.50</Text>
</View>



<View style={dynamicStyle.card}>
  <Text style={[styles.infoText, {fontSize:12, marginBottom:10}]}>BANK INFO</Text>

  <View style={styles.inputWrapper}>
  <Text style={[dynamicStyle.label, {color:colors.grey}]}>Select Bank</Text>

  <DropDownPicker
      open={isBank}
      value={transfer.bank_code}
      items={
        banks&&banks.map((list:any, id:number)=>{
            return {key:id, value:list.code, label:list.category_name, parent_code:list.parent_code}
                })} 
      setItems={setItems}
      setOpen={setIsBank}
      setValue={setItems}

      onSelectItem={(item:any) => handleChange('category_code', item.value)}
      onChangeValue={(value:any) =>{
        //console.log('My value change o')
      }}
      style={[dynamicStyle.textbox, {borderWidth:0}]}
      textStyle={{
        fontSize:12
      }}
      labelStyle={[dynamicStyle.selectText]}
      placeholder="Select an item"
      placeholderStyle={{
        color: MODE==='Light'?colors.grey:colors.grey2,
        fontSize:14,
        fontWeight:'600'
      }}

      modalTitle="Select an item"
      modalAnimationType="slide"
      listMode='MODAL'
      ArrowUpIconComponent={({style}) => <MaterialIcon name='arrow-drop-up' size={18} color={MODE==='Light'?colors.grey2:colors.dark} />}

      ArrowDownIconComponent={({style}) => <MaterialIcon name='arrow-drop-down' size={18} color={MODE==='Light'?colors.grey2:colors.dark} />}
      
      theme={MODE==='Light'?"LIGHT":"DARK"}
      dropDownDirection="AUTO"
    />


  </View>


  <View style={styles.inputWrapper}>
  <Text style={[dynamicStyle.label, {color:colors.grey}]}>Account Number</Text>
  <TextInput placeholder='Samantha Smith' style={dynamicStyle.textbox}
  
  placeholderTextColor={MODE==='Light'?colors.grey:colors.grey2}
  />
  </View>


<View style={[styles.inputWrapper]}>
  <Text style={[dynamicStyle.label, {color:colors.grey}]}>Account Holder Name</Text>
  <TextInput placeholder='Samantha Smith' style={dynamicStyle.textbox}
  
  placeholderTextColor={MODE==='Light'?colors.grey:colors.grey2}
  
  />
  </View>


 


  <View style={styles.inputWrapper}>
  <Text style={[dynamicStyle.label, {color:colors.grey}]}>Branch Code</Text>
  <TextInput placeholder='Samantha Smith' style={dynamicStyle.textbox} 
  
  
  placeholderTextColor={MODE==='Light'?colors.grey:colors.grey2}
  
  />
  </View>


 



  <View style={styles.inputWrapper}>
  <Text style={[dynamicStyle.label, {color:colors.grey}]}>Amount To Transfer</Text>
  <TextInput placeholder='Samantha Smith' style={dynamicStyle.textbox} 
  
  placeholderTextColor={MODE==='Light'?colors.grey:colors.grey2}
  />
  </View>



</View>




</ScrollView>

    

<PrimaryButton 
handleAction={handleNext}
title='Send to Bank'
/>

    </View>
  )
}


export default SendMoney

const styles = StyleSheet.create({

  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'
  },

inputWrapper:{
  marginVertical:5

}
})