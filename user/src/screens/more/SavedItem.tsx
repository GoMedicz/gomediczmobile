
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, DOCTORS, LANGUAGELIST, SELLER } from '../../components/data';
import { CURRENCY, ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';
import { FormatNumber, getData, removeData } from '../../components/globalFunction';
import Doctor from '../doctors/doctor';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  SavedItems: undefined;
  BottomTabs:undefined; 
  DrugDetails:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'SavedItems'>;
 const SavedItems =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [doctor, setDoctor] = useState([] as any)
  const [hospital, setHospital] = useState([] as any)
  const [medicine, setMedicine] = useState([] as any)
  const [products, setProducts] = useState([] as any)
  const [content, setContent] = useState('Medicine')
  const MODE = useZustandStore((store:any) => store.theme);
  const dynamicStyle = dynamicStyles(MODE);


interface item {
  title:string,
  isDefault:string,
  id:number
}




const FetchContent =async()=>{
  try{

    let medicine:any  = await getData('medicine');
    let doctor:any  = await getData('doctor');
    let hospital:any  = await getData('hospital');
let med =[]
let doc = []
let hos = []

    if(medicine){
       med =  JSON.parse(medicine)



    }
    if(doctor){
      doc =  JSON.parse(doctor)
   }
    
   if(hospital){
    hos =  JSON.parse(hospital)
 }
  
  }catch(e){

  }
}


const handleBack =()=>{
  navigation.navigate('BottomTabs');
}

const handleNext =()=>{
  navigation.navigate('DrugDetails', {
    code:'cds',
  }); 
}



const DoctorsCategory =({item}:{item:any})=>{
  return <Pressable onPress={handleNext} style={[styles.docBox]}>


<View style={styles.content}>

<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:ImagesUrl+"/doctors/"+item.image }} style={styles.profile} />

  
  <View style={[{display:'flex'}, {marginLeft:2}]}>
    <Text style={{color:colors.dark, fontSize:12, fontWeight:'600', marginBottom:2}}>{item.fullname}</Text>


    <Text style={styles.infoText}>Cardiac Surgeon <Text style={{color:colors.grey, opacity:0.5}}>at</Text> Apple Hospital</Text>


<View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:10}}>
    <Text style={[styles.infoText]}>Exp. <Text style={{color:colors.dark}}>22 years</Text> </Text>
    <Text style={[styles.infoText, {marginLeft:10}]}>Fees <Text style={{color:colors.dark}}>$30</Text></Text>
    </View>
  </View> 
</View>


<View style={[globalStyles.rowCenterCenter, { position:'absolute', bottom:5, right:5}]}>
    <View style={[globalStyles.rowCenterCenter]}>
    <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
    <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
    <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
    <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
    <MaterialIcon name="star" size={12} color={colors.grey}  />
    </View>
    <Text style={styles.infoText}>(20)</Text>
</View> 

</View>



    </Pressable>
  }


  const Clinic =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.clinic]}>



<View style={globalStyles.rowCenterBetween}>
<View >
<Text style={{fontSize:12, fontWeight:'600'}}>{item.title}</Text>
<Text style={[styles.infoText, {fontSize:10}]}>{item.address}</Text>
</View>




<View style={globalStyles.rowCenterCenter} >

<Image source={{ uri:ImagesUrl+"/seller/"+item.image }} style={styles.clinicImage} />
<Image source={{ uri:ImagesUrl+"/seller/"+item.image }} style={styles.clinicImage} />

</View>
</View>





<View style={[globalStyles.rowCenterBetween, {marginTop:10}]}>

<View style={globalStyles.rowCenterCenter}>
<MaterialIcon name="location-on" size={10} color={colors.grey}  />
<Text style={[styles.infoText, {fontSize:8}]}>Walter street, Wallington, New York</Text>
</View>


<View style={globalStyles.rowCenterCenter}>
<MaterialIcon name="call" size={8} color={colors.primary}  />
<Text style={{fontSize:8, marginLeft:10, color:colors.primary, fontWeight:'600'}}>Call Now</Text>
</View>

</View>


</Pressable>
    }


  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box]}>

<View style={{display:'flex', alignItems:'flex-end'}}>
<Image source={{ uri:ImagesUrl+"/pharmacy/px.png" }} style={styles.px} />
</View>

<Image source={{ uri:item.image_url!=='' && item.image_url!==null ?ImagesUrl+"/vendors/products/"+item.image_url:ImagesUrl+"/no.png"}} style={styles.catImage} />

<View style={{marginTop:15}}>
      <Text style={{color:colors.dark, fontSize:12, fontWeight:'600'}}>{item.product_name}</Text>

      <Text style={{color:colors.dark, fontSize:10,  fontWeight:'600'}}>{item.category}</Text>
      <Text style={{color:colors.dark, fontSize:12,  fontWeight:'700', marginTop:10}}>{CURRENCY+ FormatNumber(item.price)}</Text>
      </View>

  <View style={styles.addItem}>
<MaterialIcon name="add" size={18} color={colors.white}  />
      </View>

      </Pressable>
    }



    const GetDoctor =async(contents:any)=>{
      try{
        

        const getDoctor =(code:string, field:string)=>{
    
          let rs =  contents&&contents.filter((item:any)=>item.code===code)
     
          return rs.length!==0?rs[0][field]:''
        }
    
    
    
        let doctor:any  = await getData('doctor');
       
        if(doctor){
          let records = []
          let product =  JSON.parse(doctor)       
         
          

          for (var i in product){
            records.push({
              id:'i'+Math.random().toString(36).substring(2, 9),

              fullname:getDoctor(product[i], 'fullname'),
              gender:getDoctor(product[i], 'gender'),
              image_url:getDoctor(product[i], 'image_url'),
              telephone:getDoctor(product[i], 'telephone'),
              date_started:getDoctor(product[i], 'date_started'),
              fees:getDoctor(product[i], 'fees'),
              service:getDoctor(product[i], 'service'),
              office:getDoctor(product[i], 'office'),
             
            })
    
          }
    setDoctor(records)
    
        }
      
      }catch(e){
    
      }
    }


    const GetCart =async(contents:any)=>{
      try{
        

        const getProduct =(code:string, field:string)=>{
    
          let rs =  contents&&contents.filter((item:any)=>item.code===code)
     
          return rs.length!==0?rs[0][field]:''
        }
    
    
    
        let medicine:any  = await getData('medicine');
       
        if(medicine){
          let records = []
          let product =  JSON.parse(medicine)       
         
          

          for (var i in product){
            records.push({
              id:'i'+Math.random().toString(36).substring(2, 9),
              product_name:getProduct(product[i], 'product_name'),
              image_url:getProduct(product[i], 'image_url'),
              require_prescription:getProduct(product[i], 'require_prescription'),
              price:getProduct(product[i], 'price'),
              category:getProduct(product[i], 'category'),
             
            })
    
          }
    setMedicine(records)
    
        }
      
      }catch(e){
    
      }
    }

    
    const  FetchDoctors = async()=>{
  
      let config = await configToken()
      let url = ServerUrl+'/api/doctors/all'
      try{
     await axios.get(url, config).then(response=>{
    
        if(response.data.type==='success'){  
          GetDoctor(response.data.data)
        }
    
      })
    }catch(e){
      console.log('error:',e)
    }
    }


    const  FetchProducts = async()=>{
  
      let config = await configToken()
      let url = ServerUrl+'/api/users/drugs/all'
      try{
     await axios.get(url, config).then(response=>{
    
        if(response.data.type==='success'){  
          GetCart(response.data.data)
        }
    
      })
    }catch(e){
      console.log('error:',e)
    }
    }
  
    useEffect(()=>{
      FetchProducts()
      FetchDoctors()
    }, [route])
    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   FetchContent()
   FetchDoctors()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="arrow-back" size={18} onPress={handleBack} color={colors.dark}  /> 
    <Text style={dynamicStyle.label}>Saved</Text>
    
    <View/>
    </View>

    <View style={[globalStyles.rowCenterBetween, {paddingHorizontal:30, paddingVertical:15, backgroundColor:colors.white}]}>
    
    <Pressable onPress={()=>setContent('Medicine')}>
      <Text style={[styles.label, {color: content==='Medicine'?colors.primary:colors.navyBlue, fontWeight:'700'}]}>Medicine</Text>
  </Pressable>

      <Pressable onPress={()=>setContent('Doctor')}>
      <Text style={[styles.label, {color:content==='Doctor'?colors.primary:colors.navyBlue,}]}>Doctors</Text>
      </Pressable>

      <Pressable onPress={()=>setContent('Hospital')}> 
      <Text style={[styles.label, {color:content==='Hospital'?colors.primary:colors.navyBlue,}]}>Hospitals</Text>
      </Pressable>
    </View>


    <View style={styles.catItems}>

<FlatList 
data={content==='Medicine'?
medicine:
content==='Doctor'?
doctor:hospital}
numColumns={2}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> content==='Medicine'?
<CardCategory key={item.id} item={item} />:content==='Doctor'?
<Doctor key={item.id} item={item} />:
<Clinic key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>


    </View>
  )
}


export default SavedItems

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:colors.white,
    height:60,
    paddingTop:20
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



box:{
  height:(height/3)-40,
  width:(width/2)-15,
  backgroundColor:colors.white,
  borderRadius:10,
  marginBottom:10,
  display:'flex',
  paddingVertical:5,
  paddingHorizontal:10,
  marginHorizontal:5
  
    },

catItems:{
flex:1,
marginTop:10,
marginHorizontal:5,


},
overlay:{
display:'flex',
justifyContent:'flex-end',
alignItems:'center',
backgroundColor:colors.white,
position:'absolute',
bottom:5,
width:70,
height:40,
right:3,
opacity: 0.5,

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

modal:{
 width:width-120,
 height:undefined
},

modalContent:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
},
modalImage:{
  height:120,
  width:150,
  resizeMode:'contain',
  },
  address:{
    backgroundColor:colors.white,
    paddingHorizontal:20,
    display:'flex',
    flexDirection:'row',
    paddingVertical:10
  },

  circle:{
    height:10,
    width:10,
    borderRadius:5,
    backgroundColor:'#F14338',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    left:8,
    top:-5


},
cart:{
    display:'flex',
    flexDirection:'row'
},
addItem:{
  height:25,
  width:25,
  backgroundColor:colors.primary,
  borderBottomRightRadius:5,
  borderTopLeftRadius:5,
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  position:'absolute',
  bottom:0,
  right:0
},
bottomItem:{
  display:'flex', 
  justifyContent:'space-between', 
  alignItems:'center', 
  flexDirection:'row',
  backgroundColor:'red',

},
profile:{
  width:60,
  height:60,
  resizeMode:'contain'
},
content:{
  display:'flex', 
  flexDirection:'row', 
  justifyContent:'space-between', 
  alignItems:'center', 
},
docBox:{
  width:width,
  backgroundColor:colors.white,
  marginBottom:5,
  display:'flex',
  paddingVertical:10,
  paddingHorizontal:5
  
    },
    clinicImage:{
      height:45,
      width:75,
      borderRadius:5,
      marginLeft:5,
      resizeMode:'cover'

    },
    clinic:{
      width:width,
      display:'flex',
      marginBottom:5,
      padding:10,
      backgroundColor:colors.white,
      
        },
})