
import React, { useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { ImagesUrl, MODE, PHARMACY_CODE, STAFF_CODE, ServerUrl, config } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { PrimaryButton } from '../../components/include/button';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from '../../components/loader';


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

  const [loading, setLoading] = useState(false)
const Initials ={
  code: 'p'+Math.random().toString(36).substring(2, 9),
  pharmacy_code:PHARMACY_CODE,
  staff_code: STAFF_CODE,
  image_url: '',
  product_id: '',
  product_name:'',
  category_code: '',
  subcategory_code: '',
  description: '',
  require_prescription: false,
}

const [modalType, setModalType] = useState('load')
const [isCategoryOpen, setIsCategoryOpen] = useState(false);
const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [drugs, setDrugs] = useState(Initials)
  const [errors, setErrors] = useState(Initials);
  const [quantity, setQuantity]= useState([] as any)
  const [category, setCategory]= useState([] as any)
  const [subCategory, setSubCategory]= useState([] as any)


  const handleChange =(name:string, text:string)=>{
    if(name==='category_code'){
      fetchSubCategory(text)
    }
    setDrugs({...drugs, [name]:text})
    setErrors({...errors, [name]:''})
  }

  const handleChangeBoolean =(name:string, text:boolean)=>{
    setDrugs({...drugs, [name]:!text})
  }

  const fetchSubCategory =(code:string)=>{

    const res = category&&category.filter((item:any)=>item.parent_code===code)
    if(res.length!==0){
      setSubCategory(res)
    }else{
      setSubCategory([])
    }
    

  }
  const fetchCategory = async()=>{
    let url = ServerUrl+'/api/pharmacy/display_category/'+PHARMACY_CODE
   await axios.get(url, config).then(response=>{
      if(response.data.type==='success'){
        setCategory(response.data.data)
      }else{
        setCategory([])
      }
    }) 
  }



 const handleCameraLaunch = () => {
    const options:any = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        /* let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri); */
        console.log(response);
      }
    });
  }


  const openImagePicker = () => {
    const options:any = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
       // let imageUri = response.assets || response.assets?.[0]?.uri;
        //setSelectedImage(imageUri);
        console.log(response)
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

const createNewRow =()=>{
  setQuantity(quantity.concat({...list, code:Math.random().toString(36).substring(2, 9)}))

}

const removeRow=()=>{

if(quantity.length!==1){
  let item = quantity.splice(quantity, quantity.length-1)
  setQuantity(item)
  }
 }


  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label:'All', value:'All'},
    {label:'Completed', value:'Completed'},
    {label:'Canceled', value:'Canceled'},
    {label:'Pending', value:'Pending'},
    {label:'Dispatch', value:'Dispatch'},
  ]); 



 const handleChangeQty =(name:string, code:string, text:string)=>{
  
  const newQuantity = quantity.map((data:any)=>{
      if(data.code === code){
          return {...data, 
              [name]:text
          }
          };
          return data;
  })
  setQuantity(newQuantity)
}


const handleNext =()=>{
  navigation.navigate('StoreItems');
}


    const handleSubmit =()=>{
       
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

      
    if(!formIsValid){
      setErrors(error) 
      }
  
  
  if(formIsValid) {
      
      setLoading(true)
      
      const fd = new FormData();
      Object.entries(drugs).forEach(([key, value]) => {
              fd.append(key, String(value));
          });
      fd.append('price_list',  JSON.stringify(quantity, null, 2))

      let url = ServerUrl+'/api/pharmacy/product/add_new';
         axios.post(url, fd, config)
         .then(response =>{
           if(response.data.type === 'success'){
            //setLoading(false)
           
            setModalType('Created')
            //storeData('code', response.data.code)
            
          } else{
                       //unable to create account please retry
                       setLoading(false)
                //setErrors({...errors, password: response.data.message})
                     }   
                 })
                 .catch((error)=>{
                // setErrors({...errors, errorMessage:error.message})
                 setLoading(false)
                 }).finally(()=>{
                 setDrugs(Initials)
                 })
                }
    }



    useEffect(()=>{
      GenerateRow()
      fetchCategory()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={globalStyles.header}>
    <MaterialIcon name="arrow-back-ios" size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
   <Text style={styles.label}>Add Item</Text>

    <View />
    </View>


    <Loader isModalVisible={loading} 
    type={modalType}
    action={()=>setLoading(false)}
     />

<ScrollView
showsVerticalScrollIndicator={false}
>



<View style={styles.imageWrapper}>
  
<Image source={{ uri:ImagesUrl+"/no.png"}} style={styles.profile} />


<View style={{ display:'flex', justifyContent:'flex-start', alignItems:'flex-start'}}>

<View style={styles.circle}>
<MaterialIcon name="photo-camera" size={14} color={MODE==='Light'?colors.white:colors.dark}  /> 
</View>

<Pressable onPress={openImagePicker}>
<Text style={[styles.label, { color:colors.primary, fontWeight:'600'}]}>Change Image</Text>
</Pressable>

</View>

</View>


<View style={[styles.card, {paddingTop:20}]}>
<Text style={[styles.infoText, {paddingVertical:5}]}>Product ID</Text>
<View style={[styles.textWrapper, errors.product_id?styles.error:[]]}> 
  <TextInput style={styles.textInput} 
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



<Text style={[styles.infoText, {paddingVertical:5}]}>Product Name</Text>

<View style={[styles.textWrapper, errors.product_name?styles.error:[]]}>
  <TextInput style={styles.textInput} 
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



<View style={[styles.card, {marginVertical:5}]}>
<Text style={[styles.infoText, {paddingVertical:5}]}>Item Category</Text>

  <DropDownPicker
      open={isCategoryOpen}
      value={drugs.category_code}
      items={
        category&&category.map((list:any, id:number)=>{
            return {key:id, value:list.code, label:list.category_name, parent_code:list.parent_code}
                })} 
      setItems={setItems}
      setOpen={setIsCategoryOpen}
      setValue={setValue}

      onSelectItem={(item:any) => handleChange('category_code', item.value)}
      onChangeValue={(value:any) =>{
        //console.log('My value change o')
      }}
      style={styles.selectWrapper}
      textStyle={{
        fontSize:12
      }}
      labelStyle={[styles.selectText, errors.category_code?styles.error:[]]}
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






<Text style={[styles.infoText, {paddingVertical:5}]}>Sub Category</Text>


<DropDownPicker
      open={isSubCategoryOpen}
      value={drugs.subcategory_code}
      items={
        subCategory&&subCategory.map((list:any, id:number)=>{
            return {key:id, value:list.code, label:list.category_name, parent_code:list.parent_code}
                })}
      setItems={setItems}
      setOpen={setIsSubCategoryOpen}
      setValue={setValue}
      onSelectItem={(item:any) => handleChange('subcategory_code', item.value)}
      onChangeValue={(value:any) =>{}}
      style={styles.selectWrapper}
      textStyle={{
        fontSize:12
      }}
      modalTitle="Select an item"
      modalAnimationType="slide"
      listMode='MODAL'
      labelStyle={styles.selectText}
      placeholder="Select an item"
      placeholderStyle={{
        color: colors.grey
      }}

      ArrowUpIconComponent={({style}) => <MaterialIcon name='arrow-drop-up' size={18} color={MODE==='Light'?colors.grey2:colors.dark} />}

      ArrowDownIconComponent={({style}) => <MaterialIcon name='arrow-drop-down' size={18} color={MODE==='Light'?colors.grey2:colors.dark} />}
      
      theme={MODE==='Light'?"LIGHT":"DARK"}
      dropDownDirection="AUTO"
    />

</View>




<View style={[styles.card, {marginVertical:5}]}>
  
<Text style={[styles.infoText]}>Description</Text>

<View style={[]}>

  <TextInput
  multiline={true}
  style={[styles.about, styles.label, {fontWeight:'500'}]}
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


<View style={[styles.card, {marginVertical:5}]}>
  
<Text style={[styles.infoText, {fontWeight:'600'}]}>Set Pricing</Text>

<View style={[globalStyles.rowCenterBetween, {marginTop:10}]}>
  <Text style={[styles.infoText, {width:width/2}]}>Pricing</Text>
  <Text style={[styles.infoText, {width:width/2}]}>Quantity</Text>
</View>


{quantity&&quantity.map((item:any, index:number)=>
<View key={index} style={[globalStyles.rowCenterBetween, {marginTop:5}]}>

  <TextInput 
  placeholder='e.g 3.50' 
  style={styles.qty} 
  placeholderTextColor={colors.grey}
  value={item.price}
  keyboardType='numeric' 
  autoCapitalize='none' 
   autoFocus={true}
   autoCorrect={false}

  onChangeText={text=>handleChangeQty('price', item.code, text)}

  />


  <TextInput 
    placeholder='e.g Pack of 4'
   style={styles.qty} 
   placeholderTextColor={colors.grey}
  value={item.qty}
  
  keyboardType='email-address'
  autoCapitalize='none' 
   autoFocus={true}
   autoCorrect={false}
  onChangeText={text=>handleChangeQty('qty', item.code, text)}
  />
</View>)}

<View style={{width:width-40, marginVertical:5, justifyContent:'flex-end', display:'flex', alignItems:'flex-end', flexDirection:'row', marginHorizontal:20 }}>


<TouchableOpacity style={[styles.addItem, {backgroundColor:colors.red}]} onPress={removeRow}>
<MaterialIcon name="remove" size={18} color={MODE==='Light'?colors.white:colors.dark}  /> 
</TouchableOpacity>


<TouchableOpacity style={styles.addItem} onPress={createNewRow}>
<MaterialIcon name="add" size={18} color={MODE==='Light'?colors.white:colors.dark}  /> 
</TouchableOpacity>
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

  label:{
    fontWeight:'700',
    fontSize:12,
    color:MODE==='Light'?colors.dark:colors.white,
  },
  h3:{
    fontWeight:'600',
    fontSize:10,
    marginVertical:3,
    color:MODE==='Light'?colors.dark:colors.white,
  },
  infoText:{
    fontSize:12,
    color: MODE==='Light'?colors.grey3:colors.white,
    fontWeight:'500'

  },

  profile:{
    width:120,
    height:120,
    resizeMode:'cover',
    
    marginRight:20,
    backgroundColor:colors.white
  },

  row:{
    display:'flex',
    flexDirection:'row',
    padding:10,
    justifyContent:'space-between'
  },
  title:{
    fontSize:20,
    fontWeight:'600',
    color:colors.dark,

  },
  card:{
    display:'flex',
     backgroundColor:MODE==='Light'?colors.white:colors.dark, 
     padding:10, 
     width:width
    },
  hospital:{
paddingVertical:10,
display:'flex',
justifyContent:'space-between',
alignItems:'center',
flexDirection:'row'
  },

  box:{
    backgroundColor:colors.white,
    width:(width/2)-15,
    padding:10,
    marginVertical:5,
    borderRadius:5

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
    height:45,
    width:width-20,
    marginVertical:8,
    backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    borderRadius:5,
  },

  textInput:{
    color:MODE==='Light'?colors.dark:colors.white,
    fontSize:14,
    fontWeight:'600',
    width:width-60,
    

  },
  about:{
    display:'flex', 
    width:width-20,
     backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark, 
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



  qty:{
    width:(width/2)-20,
    height:45,
    backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark,
    borderRadius:10,
    padding:10,
    color:MODE==='Light'?colors.dark:colors.white,
    marginVertical:5,

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
     paddingHorizontal:30, 
     backgroundColor:MODE==='Light'?colors.white:colors.dark, paddingVertical:5
    },
 
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
      fontWeight:'600',
   
    },
})