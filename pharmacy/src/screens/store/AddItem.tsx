
import React, { useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { ImagesUrl,   ServerUrl, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { PrimaryButton } from '../../components/include/button';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from '../../components/loader';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';
import { getData } from '../../components/globalFunction';


const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  AddItem: undefined;
  StoreItems:undefined; 
   };

type Props = NativeStackScreenProps<RootStackParamList, 'AddItem'>;

 const AddItem =({ route, navigation }:Props)=> {

  const MODE = useZustandStore(store => store.theme);
  const dynamicStyle = dynamicStyles(MODE);
  const [loading, setLoading] = useState(false)

  const [content, setContent]= useState([] as any)
const Initials ={
  code: 'p'+Math.random().toString(36).substring(2, 9),
  staff_code: 'staff',
  product_id: '',
  product_name:'',
  image_url:'',
  category_code: '',
  subcategory_code: '',
  description: '',
  require_prescription: false,
  price:'',
  qty:'',
  errorMessage:''
}

const [items, setItems] = useState([] as any);

const [modalType, setModalType] = useState('load')
const [isCategoryOpen, setIsCategoryOpen] = useState(false);
const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [drugs, setDrugs] = useState(Initials)
  const [errors, setErrors] = useState(Initials);
  const [quantity, setQuantity]= useState([] as any)
  const [category, setCategory]= useState([] as any)
  const [subCategory, setSubCategory]= useState([] as any)

  const [image, setImage] = useState({
    uri:'',
    type:'',
     name:''
  })


  const handleChange =(name:string, text:string)=>{
    if(name==='category_code'){
      fetchSubCategory(text)
    }

    if(name==='price'){
      text = text.replace(/[^0-9]/g, "").substring(0, 10)
    }

    setDrugs({...drugs, [name]:text})
    setErrors({...errors, [name]:''})
  }

  const handleChangeBoolean =(name:string, text:boolean)=>{
    setDrugs({...drugs, [name]:!text})
  }



  const fetchSubCategory =(code:string)=>{

    const res = content&&content.filter((item:any)=>item.main_code===code)
   
    if(res.length!==0){
      setSubCategory(res)
    }else{
      setSubCategory([])
    }
  }


  const  fetchCategory = async()=>{
    //setLoading(true)
    let config = await configToken()
    let url = ServerUrl+'/api/store/sub_category/all'
    try{
   await axios.get(url, config).then(response=>{
      if(response.data.type==='success'){
       
let data = response.data.data

const allCategory =	data.map((e:any)=>e['main_code'])
.map((e:any,i:any,final:any)=>final.indexOf(e)===i&&i)
.filter((e:any)=>data[e])
.map((e:any)=>data[e])

setCategory(allCategory)
        setContent(data)
      }else{
        setContent([])
      }
  
    }) 
  }catch(e){
    console.log('error:',e)
  }
  }




 const handleCameraLaunch = async() => {
    const options:any = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    
    await launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response);
      } else {
        let imageUri =  response.assets?.[0]?.uri;
        
      }
    });

  }


  const openImagePicker = async() => {
    const options:any = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

   await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
       // console.log('User cancelled image picker');
      } else if (response.errorCode) {
       // console.log('Image picker error: ', response.errorMessage);
      } else {
        let imageUri:any =  response.assets?.[0]?.uri;
        let type:any = response.assets?.[0]?.type

        let filename:any = response.assets?.[0]?.fileName

        setImage({
          uri:imageUri,
          name:filename,
          type:type

        })

        setDrugs({...drugs, image_url:drugs.code+'_'+filename})
      }
    });

  };

const list = {
  code:'',
  qty:'',
  price:''
}

  const  GenerateRow =()=>{  
    let value:any = [];
    for (var i = 1; i <= 2; i++) {
      value.push({...list,  code:Math.random().toString(36).substring(2, 9)});
    }      
    setQuantity(value)

} 

/* const createNewRow =()=>{
  setQuantity(quantity.concat({...list, code:Math.random().toString(36).substring(2, 9)}))

} */

/* const removeRow=()=>{

if(quantity.length!==1){
  let item = quantity.splice(quantity, quantity.length-1)
  setQuantity(item)
  }
 } */

/* 
 const handleChangeQty =(name:string, code:string, text:string)=>{

  if(name==='price'){
    text = text.replace(/[^0-9]/g, "").substring(0, 10)
  }
  
  const newQuantity = quantity.map((data:any)=>{
      if(data.code === code){
          return {...data, 
              [name]:text
          }
          };
          return data;
  })
  setQuantity(newQuantity)
  setErrors({...errors, [name]:''})
} */


const handleBack =()=>{
  navigation.goBack();
}


    const handleSubmit =async()=>{
       
      let error = {...errors}; 
    let formIsValid = true;

    let msg ='This field is required';

    if(!drugs.product_id){
      error.product_id = msg;
        formIsValid = false;
    } 

    if(!drugs.product_name){
      error.product_name = msg;
        formIsValid = false;
    } 
          
    if(!drugs.category_code){
      error.category_code = msg;
        formIsValid = false;
    }

  /*     
    const newQuantity = quantity.map((data:any)=>{
      if(data.price===''){
        error.price= 'Please enter price';
        formIsValid = false;
          };
          if(data.qty===''){
            error.qty= 'Please enter quantity';
            formIsValid = false;
              };
  }) */


    if(!formIsValid){
      setErrors(error) 
      }

  
  if(formIsValid) {
      
      setLoading(true)
      
    

      const fd = new FormData();
      Object.entries(drugs).forEach(([key, value]) => {
              fd.append(key, value);
          });


          let config = await configToken()
          const pharmacy_code = await getData('code');
        /* 
      fd.append('price_list',  JSON.stringify(quantity, null, 2)) */
      fd.append('image',  image)
      fd.append('pharmacy_code',  pharmacy_code)

      let url = ServerUrl+'/api/vendor/product/add';
         axios.post(url, fd, config)
         .then(response =>{
           if(response.data.type === 'success'){
            
            setModalType('Success')

            setErrors({...errors, errorMessage: 'Successfully Added'})
            
          } else{
            setModalType('Failed')
                setErrors({...errors, errorMessage: response.data.message})
                     }   
                 })
                 .catch((error)=>{
                  setModalType('Failed')
                setErrors({...errors, errorMessage: error.message})

                 }).finally(()=>{
                setDrugs({...Initials, code:'p'+Math.random().toString(36).substring(2, 9)})
                 GenerateRow()  

                 setImage({
                  uri:'',
                  type:'',
                   name:''
                 })
                 })
                }
    }



    useEffect(()=>{
      fetchCategory()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
   <Text style={dynamicStyle.label}>Add Item</Text>

    <View />
    </View>


    <Loader isModalVisible={loading} 
    type={modalType}

    message={errors.errorMessage} 
    action={()=>setLoading(false)}
     />

<ScrollView
showsVerticalScrollIndicator={false}
>

<View style={[styles.imageWrapper, {
     backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>
  
<Image source={{ uri:image.uri?image.uri:ImagesUrl+"/no.png"}} style={styles.profile} />


<TouchableOpacity onPress={openImagePicker} style={{ display:'flex', justifyContent:'flex-start', alignItems:'flex-start'}}>

<View style={styles.circle}>
<MaterialIcon name="photo-camera" size={14} color={MODE==='Light'?colors.white:colors.dark}  /> 
</View>
<View >
<Text style={[dynamicStyle.label, { color:colors.primary, fontWeight:'600'}]}>Change Image</Text>
</View>

</TouchableOpacity>

</View>


<View style={[styles.card, {paddingTop:20, 
     backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>
<Text style={[dynamicStyle.label, {paddingVertical:5, fontWeight:'500'}]}>Product ID</Text>
<View style={[styles.textWrapper, {
    backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}, errors.product_id?styles.error:[]]}> 

  <TextInput style={[styles.textInput, {
    color:MODE==='Light'?colors.dark:colors.white}]}  
  placeholderTextColor={colors.grey}
  placeholder='e.g 1234'
  value={drugs.product_id}
  autoCapitalize='none'
  keyboardType='email-address' 
   autoFocus={true}
   autoCorrect={false}
 onChangeText={text=>handleChange('product_id', text)}
  />
</View>


<Text style={[dynamicStyle.label, {paddingVertical:5, fontWeight:'500'}]}>Product Name</Text>

<View style={[styles.textWrapper, {
    backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}, errors.product_name?styles.error:[]]}>
  <TextInput style={[styles.textInput, {
    color:MODE==='Light'?colors.dark:colors.white}]} 
  placeholderTextColor={colors.grey}
  placeholder='e.g paracetamol'

  value={drugs.product_name}
  autoCapitalize='none'
  keyboardType='email-address' 
   autoFocus={true}
   autoCorrect={false}
 onChangeText={text=>handleChange('product_name', text)}
  />

</View>

</View>



<View style={[styles.card, {marginVertical:5, 
     backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>
<Text style={[dynamicStyle.label, {paddingVertical:5, fontWeight:'500'}]}>Item Category</Text>

  <DropDownPicker
      open={isCategoryOpen}
      value={drugs.category_code}
      items={
        category&&category.map((list:any, id:number)=>{
            return {key:id, value:list.main_code, label:list.title}
                })} 
      setItems={setItems}
      setOpen={setIsCategoryOpen}
      setValue={setItems}

      onSelectItem={(item:any) => handleChange('category_code', item.value)}
      onChangeValue={(value:any) =>{
        //console.log('My value change o')
      }}
      style={[dynamicStyle.selectWrapper, errors.category_code? styles.error:[]]}
      textStyle={{
        fontSize:12
      }}
      labelStyle={[dynamicStyle.selectText]}
      placeholder="Select an item"
      placeholderStyle={{
        color: colors.grey
      }}

      modalTitle="Select an item"
      modalAnimationType="slide"
      listMode='MODAL'
      ArrowUpIconComponent={({style}) => <MaterialIcon name='arrow-drop-up' size={18} color={MODE==='Light'?colors.grey2:colors.white} />}

      ArrowDownIconComponent={({style}) => <MaterialIcon name='arrow-drop-down' size={18} color={MODE==='Light'?colors.grey2:colors.white} />}
      
      theme={MODE==='Light'?"LIGHT":"DARK"}
      dropDownDirection="AUTO"
    />





<Text style={[dynamicStyle.label, {paddingVertical:5, fontWeight:'500'}]}>Sub Category</Text>


<DropDownPicker
      open={isSubCategoryOpen}
      value={drugs.subcategory_code}
      items={
        subCategory&&subCategory.map((list:any, id:number)=>{
            return {key:id, value:list.sub_code, label:list.sub_title, main_code:list.main_code}
                })}
      setItems={setItems}
      setOpen={setIsSubCategoryOpen}
      setValue={setItems}
      onSelectItem={(item:any) => handleChange('subcategory_code', item.value)}
      onChangeValue={(value:any) =>{}}
      style={[dynamicStyle.selectWrapper]}
      textStyle={{
        fontSize:12
      }}
      modalTitle="Select an item"
      modalAnimationType="slide"
      listMode='MODAL'
      labelStyle={dynamicStyle.selectText}
      placeholder="Select an item"
      placeholderStyle={{
        color: colors.grey
      }}

      ArrowUpIconComponent={({style}) => <MaterialIcon name='arrow-drop-up' size={18} color={MODE==='Light'?colors.grey2:colors.white} />}

      ArrowDownIconComponent={({style}) => <MaterialIcon name='arrow-drop-down' size={18} color={MODE==='Light'?colors.grey2:colors.white} />}
      
      theme={MODE==='Light'?"LIGHT":"DARK"}
      dropDownDirection="AUTO"
    />

</View>




<View style={[styles.card, {marginVertical:5, 
     backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>
  
<Text style={[dynamicStyle.label, { fontWeight:'500'}]}>Description</Text>

<View style={[]}>

  <TextInput
  multiline={true}
  style={[styles.about, dynamicStyle.label, {fontWeight:'500', 
  backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}
  value={drugs.description}
  
  autoCapitalize='none'
  keyboardType='email-address' 
   autoFocus={true}
   autoCorrect={false}
  onChangeText={text=>handleChange('description', text)}
  />

</View>

</View>

<View style={[globalStyles.rowCenterBetween,{paddingHorizontal:10, backgroundColor:MODE==='Light'?colors.white:colors.dark, height:50,  width:width}]}>

<View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png"}} style={styles.cartImage} />

<Text style={{fontSize:12, fontWeight:'700', marginLeft:30, color:MODE==='Light'?colors.dark:colors.white}}>Prescription Required</Text>
</View>



<View style={globalStyles.rowCenterCenter}>

<Pressable onPress={()=>handleChangeBoolean('require_prescription', drugs.require_prescription)}  style={[styles.slider, drugs.require_prescription?{ backgroundColor:colors.navyBlue}:{}]} />
  <Pressable style={[styles.slides, drugs.require_prescription?{right:0, backgroundColor:colors.navyBlue}:{left:0}]} onPress={()=>handleChangeBoolean('require_prescription', drugs.require_prescription)} />
</View>

</View>


<View style={[styles.card, {marginVertical:5, 
     backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>
  
<Text style={dynamicStyle.label}>Set Pricing</Text>

<View style={[globalStyles.rowCenterBetween, {marginTop:10}]}>
  <Text style={[dynamicStyle.label, {width:width/2, fontWeight:'500'}]}>Pricing</Text> 
  <Text style={[dynamicStyle.label, {width:width/2, fontWeight:'500'}]}>Quantity</Text>
</View>


<View  style={[globalStyles.rowCenterBetween, {marginTop:5}]}>

  <TextInput 
  placeholder='e.g 3.50' 
  
  style={[dynamicStyle.qty, errors.price?styles.error:[]]}
  placeholderTextColor={colors.grey}
  value={drugs.price}
  keyboardType='numeric' 
  autoCapitalize='none' 
   autoFocus={true}
   autoCorrect={false}

  onChangeText={text=>handleChange('price', text)}

  />


  <TextInput 
    placeholder='e.g Pack of 4'
   style={[dynamicStyle.qty, errors.qty?styles.error:[]]} 
   placeholderTextColor={colors.grey}
  value={drugs.qty}
  
  keyboardType='email-address'
  autoCapitalize='none' 
   autoFocus={true}
   autoCorrect={false}
  onChangeText={text=>handleChange('qty', text)}
  />
</View>

<View style={{width:width-40, marginVertical:5, justifyContent:'flex-end', display:'flex', alignItems:'flex-end', flexDirection:'row', marginHorizontal:20 }}>

{/* {quantity.length>1?
<TouchableOpacity style={[styles.addItem, {backgroundColor:colors.red}]} onPress={removeRow}>
<MaterialIcon name="remove" size={18} color={MODE==='Light'?colors.white:colors.dark}  /> 
</TouchableOpacity>:[]} */}

{/* 
<TouchableOpacity style={styles.addItem} onPress={createNewRow}>
<MaterialIcon name="add" size={18} color={MODE==='Light'?colors.white:colors.dark}  /> 
</TouchableOpacity> */}
</View>

</View>



</ScrollView>

  <PrimaryButton
  handleAction={handleSubmit}
  title='Add Item'
  />
    </View>
  )
}


export default AddItem

const styles = StyleSheet.create({


  profile:{
    width:120,
    height:120,
    resizeMode:'cover',
    
    marginRight:20,
    backgroundColor:colors.white
  },

  card:{
    display:'flex',
     padding:10, 
     width:width
    },

  circle:{
    height:25,
    width:25,
    borderRadius:15,
    backgroundColor:colors.primary,
    marginBottom:10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },

 
error:{
  borderWidth:1,
  borderColor:colors.red,
},

  textWrapper:{
    height:50,
    width:width-20,
    marginVertical:8,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    borderRadius:5,
  },

  textInput:{
    fontSize:14,
    fontWeight:'600',
    width:width-60,
    

  },
  about:{
    display:'flex', 
    width:width-20, 
     padding:10,
     borderRadius:10,
     marginVertical:10,
     height:100
    
    },

cartImage:{
  height:30,
  width:30,
  resizeMode:'cover',
  },


  slider:{
    height:15,
    width:40,
    borderRadius:10,
    backgroundColor:colors.grey,
    opacity:0.6
  },


  slides:{
    height:20,
    width:20,
    borderRadius:10,
    backgroundColor:colors.grey,
    position:'absolute',
    right:0,

shadowColor: "#000",
shadowOffset: {
  width: 0,
  height: 2
},

shadowOpacity: 0.25,
shadowRadius: 2,
elevation: 5,
  },

  addItem:{
    height:35,
    width:35,
    borderRadius:5,
    backgroundColor:colors.navyBlue,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5
    
  },
  imageWrapper:{
    display:'flex', 
    flexDirection:'row', 
    alignItems:'flex-end',
     justifyContent:'flex-start', 
     paddingHorizontal:20, paddingVertical:5
    },
   
})