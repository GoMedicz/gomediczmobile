
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput, ImageBackground } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import axios from 'axios';
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../../components/data';
import { ImagesUrl, ServerUrl, configJSON } from '../../../components/includes';
import { globalStyles } from '../../../components/globalStyle';
import ModalDialog from '../../../components/modal';
import ShoppingCart from '../../../components/include/ShoppingCart';
import { PrimaryButton } from '../../../components/include/button';
import Loader from '../../../components/loader';
import { getData } from '../../../components/globalFunction';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );

      

type RootStackParamList = {
  AddAddress: undefined;
  Address:undefined; 
  SearchLab:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'AddAddress'>;
 const AddAddress =({ route, navigation }:Props)=> {


const [modalType, setModalType] = useState('load')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState({
    type:'Home',
    address:''
  })
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}

const [errors, setErrors] = useState({
  address:'',
  errorMessage:''
})

const handleBack =()=>{
  navigation.goBack();
}



const handleSubmit =async()=>{
  let error = {
    ...errors,  
  }

  var errormessage = [];
let msg = 'This field is required';

if(!content.address){
  error.address = msg;
   errormessage.push(msg);
}
        setErrors(error)
        if (errormessage.length===0){

setLoading(true)

let config = await configJSON()
const code = await getData('code');

    const fd = {
      code:Math.random().toString(36).substring(2, 9),
      address:content.address,
      user_code:code,
      type:content.type
    }
    

    let url = ServerUrl+'/api/user/address/add'
   axios.post(url, fd, config)
   .then(response =>{
     if(response.data.type === 'success'){

      setModalType('Success')
      setErrors({...errors,  errorMessage: response.data.message})
     navigation.navigate('Address');  
               } else{
                
                 setModalType('Failed')
                 setErrors({...errors,  errorMessage: response.data.message})
               }   
           })
           .catch((error)=>{
            setModalType('Failed')
            setErrors({...errors,  errorMessage:error.message})
           
           })
          }
}


const handleClose =()=>{
  setLoading(false)
}


  return (<SafeAreaView style={[ {flex:1, backgroundColor:colors.white}]}>
    
    <View style={styles.header}>
      <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
    <MaterialIcon name="arrow-back-ios" size={18} onPress={handleBack} color={colors.dark}  /> 
    <Text style={[styles.label, {marginLeft:10}]}>Cancel</Text>
    </View>

    <Text style={[styles.label, {color:colors.primary}]}>Continue</Text>
    </View>

    <ImageBackground 
    source={{uri:ImagesUrl+'/hospital/hos.jpeg'}}
    
    style={styles.mapView}
    
    >

    
      <View style={styles.addItem}>

      <View style={{padding:10}}>

    <View style={[globalStyles.rowCenterBetween, {marginBottom:10}]}>

      <View style={globalStyles.rowCenterCenter}>
      <MaterialIcon name="add-location" size={25} color={colors.icon}  /> 
        <Text style={[styles.infoText, {marginLeft:10}]}>Paris, France</Text>
      </View>
    <MaterialIcon name="close" size={18} color={colors.dark}  /> 
    </View>


    <Text style={styles.infoText}>Select Address Type</Text>


    <View style={styles.addWrapper}>
    <Pressable onPress={()=>setContent({...content, type:'Home'})} style={[styles.addType, content.type==='Home'? styles.active:[]]}>
      <MaterialIcon name="home" size={20} color={colors.icon}  /> 
        <Text style={[styles.label, {marginLeft:5, fontSize:10}]}>Home</Text>
      </Pressable>


      <Pressable onPress={()=>setContent({...content, type:'Office'})} style={[styles.addType, content.type==='Office'? styles.active:[]]}>
      <MaterialIcon name="home" size={20} color={colors.icon}  /> 
        <Text style={[styles.label, {marginLeft:5, fontSize:10}]}>Office</Text>
      </Pressable>


      <Pressable onPress={()=>setContent({...content, type:'Other'})} style={[styles.addType, content.type==='Other'? styles.active:[]]}>
      <MaterialIcon name="home" size={20} color={colors.icon}  /> 
        <Text style={[styles.label, {marginLeft:5, fontSize:10}]}>Other</Text>
      </Pressable>

    </View>

    

    <View style={styles.inputWrapper}>
  <Text style={[styles.label, {color:colors.grey, fontSize:10, marginBottom:10}]}>Enter Address Details</Text>
  <TextInput 
  placeholder='Address'
   style={styles.textInput}
   autoCapitalize='none'
  keyboardType='email-address' 
   autoCorrect={false}
   value={content.address}
   onChangeText={text =>setContent({...content, address:text})}
   />
  </View>



      </View>

      <Loader isModalVisible={loading} 
    type={modalType}

    message={errors.errorMessage} 
    action={handleClose}
     />
     
      <PrimaryButton
      handleAction={handleSubmit}
      title='Save'
      />
      </View>



    </ImageBackground>

    





    </SafeAreaView>
  )
}


export default AddAddress

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    paddingBottom:5,
    backgroundColor:colors.white,
    height:50
  },
  label:{
    fontWeight:'600',
    fontSize:12,
  },
 
  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },

  active:{
    backgroundColor:colors.primary,
    color:colors.white
  },

box:{
  width:width,
  backgroundColor:colors.white,
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  padding:10,
  height:45,
  alignItems:'center'
  
    },

    textInput:{
      height:45,
  backgroundColor:colors.lightSkye,
  padding:10,
  borderRadius:5,
  color:colors.grey,
  fontWeight:'600'


    },

catItems:{

position:'absolute',
bottom:30,

},

px:{
  height:25,
  width:25,
  resizeMode:'cover',
    },
catImage:{
height:(height/2)*0.2,
width:(width/2)-40,
resizeMode:'contain',
marginTop:15
  },

  address:{
    backgroundColor:colors.white,
    display:'flex',
    flexDirection:'row',
    paddingVertical:10
  },
mapView:{

  flex:1

},
 

sellerImage:{
  height:80,
  width:80,
  resizeMode:'cover'
},
companyLogo:{
  height:100,
  width:100,
  backgroundColor:'#9Be471',
  borderRadius:10,
  display:'flex',
  justifyContent:'center',
  alignItems:'center'

},
container:{
  display:'flex',
   flexDirection:'row', 
   backgroundColor:colors.white,
   paddingVertical:15,
   paddingHorizontal:10
  
  
  },
  profile:{
    width:50,
    height:50,
    borderRadius:5,
    resizeMode:'contain',
    position:'absolute',
    left:40,
    top:-30

  },
 content:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    paddingHorizontal:10, 
    paddingBottom:10,
    marginVertical:5
  },
  chatHeader:{
    display:'flex',
     justifyContent:'center', 
     alignItems:'center', 
     backgroundColor:'#eef3F9', 
     width:width,
     height:30

  },
  addItem:{

    position:'absolute',
    bottom:0,
    backgroundColor:colors.white,

  },
  addType:{
    height:35,
    backgroundColor:colors.lightSkye,
    borderRadius:5,
    paddingHorizontal:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
    
  },
  addWrapper:{
display:'flex',
flexDirection:'row',
justifyContent:'space-evenly',
marginVertical:10

  },
  inputWrapper:{
    marginVertical:5
  
  },
})