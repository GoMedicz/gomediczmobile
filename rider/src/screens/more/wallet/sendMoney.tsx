
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Platform, Dimensions, TextInput, ActionSheetIOS } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../../assets/colors';
import { PrimaryButton } from '../../../components/include/button';
import { useZustandStore } from '../../../api/store';
import { dynamicStyles } from '../../../components/dynamicStyles';
import { CURRENCY,  ServerUrl,configJSON, configToken } from '../../../components/includes';
import { FormatNumber, getData } from '../../../components/globalFunction';
import { globalStyles } from '../../../components/globalStyle';
import Loader from '../../../components/loader';

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

  const [balance, setBalance] = useState(0)
  const Initials ={
    code: 'p'+Math.random().toString(36).substring(2, 9),
    
    wallet:'',
    bank_code:'',
    bank_name:'',
    account_number:'',
    account_name:'',
    branch_code:'',
    amount:'',
    errorMessage:'',
    isLoading:false
  }

  
  const [transfer, setTransfer] = useState(Initials);
  const [errors, setErrors] = useState({
    bank_code:'',
    bank_name:'',
    account_number:'',
    account_name:'',
    amount:'',
    errorMessage:'',
  });
 
  const [loading, setLoading] = useState(false)
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



const handleChange =(name:string, text:string)=>{

  if(name==='account_number'){
    text = text.substring(0, 10)
  }

  if(name==='amount'){
    text = text.replace(/[^0-9]/g, "")
  }
  setTransfer({...transfer, [name]:text})
  setErrors({...errors, [name]:''})
}


  

const fetchBalance = async()=>{
  let config = await configToken()
  const wallet = await getData('wallet');
  let url = ServerUrl+'/api/vendor/account/'+wallet
  try{

 await axios.get(url, config).then(response=>{

    if(response.data.type==='success'){
      setBalance(response.data.data[0].balance)
    }else{
      setBalance(0)
    }
  }) 
}catch(e){
  console.log('error:',e)
}
}
    


const ValidateAccount=async()=>{
  if(transfer.account_number&& transfer.account_number){ 
var fd = {      
  bank:transfer.bank_code,
  account_number:transfer.account_number
}
let url = ServerUrl+'/api/vendor/bank/verification';
try{
  setTransfer({...transfer, isLoading:true})

let config = await configToken()

axios.post(url, fd, config).then(response=>{

if(response.data.status===200){
  
setTransfer({...transfer, account_name:response.data.data[0].fullname, isLoading:false})
}else{
  setLoading(true)
  setModalType('Failed')
  setTransfer({...transfer, isLoading:false, account_name:''})
  setErrors({...errors,  errorMessage:response.data.message})
}
})
.catch((error)=>{
  setModalType('Failed')
  setTransfer({...transfer, isLoading:false})
  setErrors({...errors, errorMessage:error.message})
 }) 



}catch(error){

}
}
} 



const handleSubmit =async()=>{
  let error = {
    ...errors,  
  }

  var errormessage = [];
let msg = 'This field is required';


 if(!transfer.bank_code){
  error.bank_code = msg;
   errormessage.push(msg);
} 

if(!transfer.account_number){
  error.account_number = msg;
   errormessage.push(msg);
}



 if(!transfer.account_name){
  error.account_name = msg;
   errormessage.push(msg);
}

if(!transfer.amount){
  error.amount = msg;
   errormessage.push(msg);
}


if(Number(transfer.amount) > balance){
  error.amount = msg;
  setModalType('Failed')
  setTransfer({...transfer, errorMessage: 'Insufficient funds'})
   errormessage.push(msg);
}

const wallet = await getData('wallet');

let config = await configJSON()
        setErrors(error)
        if (errormessage.length===0) {

//Alert confirm here

// open sheet
ActionSheetIOS.showActionSheetWithOptions(
  {
    options: ["Cancel", "Yes, Confirm"],
    destructiveButtonIndex: 0,
    cancelButtonIndex: 0,
    userInterfaceStyle: 'light'
  },
  buttonIndex => {
// handle button press on the sheet
   if (buttonIndex === 1) {
      //Process the information here
  
          setLoading(true)


          let fd = {
            code:'t'+Math.random().toString(36).substring(2, 9),
            wallet:wallet,
            bank_code:transfer.bank_code,
            bank_name:transfer.bank_name,
            amount:transfer.amount,
            account_number:transfer.account_number,
            account_name:transfer.account_name,
            branch_code:transfer.branch_code
          }

let url = ServerUrl+'/api/account/withdrawal';
axios.post(url, fd, config)
   .then(response =>{
    
     if(response.data.type === 'success'){
      
//navigate to success page
      setModalType('Success')
      setErrors({...errors, errorMessage: 'Transaction successfully placed'})
      fetchBalance()
               } else{

                 setModalType('Failed')
                 setErrors({...errors, errorMessage: response.data.message})
               }   
           })
           .catch((error)=>{
            setModalType('Failed')
            setErrors({...errors, errorMessage:error.message})
           }).finally(()=>{
            setTransfer(Initials)
            fetchBalance()
           }) 

         }
        }
      ) 
      
          }  
}



useEffect(()=>{
  fetchBalance()
},[])


  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    fetchBalance()
    }, [])

  return (<View style={ {flex:1,backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="arrow-back-ios" size={18} color={MODE==='Light'?colors.dark:colors.white} onPress={handleBack} /> 
    <Text style={dynamicStyle.label}>Send to Bank</Text>
<View/>
    </View>



    <Loader 
    isModalVisible={loading} 
    type={modalType}
    message={errors.errorMessage} 
    action={()=>setLoading(false)}
     />



<ScrollView>

    <View style={{backgroundColor:MODE==='Light'?colors.white:colors.dark,  paddingHorizontal:10, paddingVertical:15}}>
    
  
<Text style={globalStyles.infoText}>AVAILABLE BALANCE</Text>
      <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:25, fontWeight:'700'}}>{CURRENCY+' '+FormatNumber(balance)}</Text>
</View>



<View style={dynamicStyle.card}>
  <Text style={[globalStyles.infoText, {fontSize:12, marginBottom:10}]}>BANK INFO</Text>

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

      onSelectItem={(item:any) => handleChange('bank_code', item.value)}
      onChangeValue={(value:any) =>{
        //console.log('My value change o')
      }}

      style={[dynamicStyle.textbox, {borderWidth:0}, errors.bank_code? globalStyles.error:[]]}
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


  <View style={[styles.inputWrapper]}>
  <Text style={[dynamicStyle.label, {color:colors.grey}]}>Account Number</Text>
  <TextInput 
  placeholder='e.g 123456' 
  style={[dynamicStyle.textbox, errors.account_number?globalStyles.error:[]]}
  placeholderTextColor={MODE==='Light'?colors.grey:colors.grey2}

  keyboardType='number-pad' 
  autoFocus={true}
  autoCorrect={false}
value={transfer.account_number}
onBlur={ValidateAccount}
onChangeText={text=>handleChange('account_number', text)}

  />
  </View>


  <View style={[styles.inputWrapper]}>
  <Text style={[dynamicStyle.label, {color:colors.grey}]}>Account Holder Name</Text>
  <TextInput 
  placeholder='Account Name' 
  
  style={[dynamicStyle.textbox, errors.account_name?globalStyles.error:[]]}
  value={transfer.account_name}
  editable={false}
  placeholderTextColor={MODE==='Light'?colors.grey:colors.grey2}
  
  />
  </View>



  <View style={styles.inputWrapper}>
  <Text style={[dynamicStyle.label, {color:colors.grey}]}>Branch Code</Text>
  <TextInput 
  placeholder='Optional' 
  style={dynamicStyle.textbox} 
  
  placeholderTextColor={MODE==='Light'?colors.grey:colors.grey2}

  autoCapitalize='none'
  keyboardType='email-address' 
   autoCorrect={false}
   value={transfer.branch_code}
   onChangeText={text =>handleChange('branch_code', text)}
  
  />
  </View>




  <View style={[styles.inputWrapper]}>
  <Text style={[dynamicStyle.label, {color:colors.grey}]}>Amount to Transfer</Text>
  <TextInput 
  placeholder='e.g 5000' 
  style={[dynamicStyle.textbox, errors.amount?globalStyles.error:[]]}
  placeholderTextColor={MODE==='Light'?colors.grey:colors.grey2}
  keyboardType='number-pad' 
  autoFocus={true}
  autoCorrect={false}
value={transfer.amount}
onChangeText={text=>handleChange('amount', text)}
  />
  </View>



</View>




</ScrollView>

    

<PrimaryButton 
style={{opacity:transfer.isLoading?0.4:1}}
handleAction={transfer.isLoading?()=>{}:handleSubmit}
title={transfer.isLoading?'Please wait ..':'Send to Bank'}
/>

    </View>
  )
}


export default SendMoney

const styles = StyleSheet.create({

inputWrapper:{
  marginVertical:5

}
})