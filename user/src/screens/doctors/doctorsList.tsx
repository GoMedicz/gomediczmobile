
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Platform, Dimensions, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { ServerUrl, configToken } from '../../components/includes';
import axios from 'axios';
import Loader from '../../components/loader';
import Doctor from './doctor';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  DoctorsList:{
    title:string;
  }; 
  BottomTabs:undefined; 
  DoctorsDetails:{
     code:string;
     title:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'DoctorsList'>;
 const DoctorsList =({ route, navigation }:Props)=> {

  const [modalType, setModalType] = useState('load')
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [content, setContent]= useState([] as any)

  const [search, setSearch] = useState({
    title:''
  })


const handleChange =(name:string, text:string)=>{
  setSearch({...search, [name]:text})
}


const handleBack =()=>{
  navigation.navigate('BottomTabs');
}

const handleNext =(item:any)=>{
   navigation.navigate('DoctorsDetails', {
    code:item.code,
    title:item.category
  });  
}


 /*  const Doctor =({item}:{item:any})=>{
    return <Pressable onPress={()=>handleNext(item)} style={[styles.box]}>


<View style={styles.content}>

<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:item.image_url!==''?ImagesUrl+"/doctors/"+item.image_url:ImagesUrl+"/no.png"}} style={styles.profile} />

    
    <View style={[{display:'flex'}, {marginLeft:2}]}>
      <Text style={{color:colors.dark, fontSize:12, fontWeight:'600', marginBottom:2}}>{item.fullname}</Text>


      <Text style={styles.infoText}>{item.job_title} <Text style={{color:colors.grey, opacity:0.5}}>at</Text> {item.office}</Text>


<View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:10}}>

      <Text style={[styles.infoText]}>Exp. <Text style={{color:colors.dark}}>{getAge(item.date_started)} years</Text> </Text>


      <Text style={[styles.infoText, {marginLeft:10}]}>Fees <Text style={{color:colors.dark}}>{CURRENCY+ FormatNumber(item.fees)}</Text></Text>
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
    } */



const fetchDoctor = async(title:string)=>{
  let config = await configToken()
  let tit = title===''?'All':title
  let url = ServerUrl+'/api/doctor/search/'+tit
  try{

 await axios.get(url, config).then(response=>{
    if(response.data.type==='success'){
      setContent(response.data.data)
    }else{
      setContent([])
    }

  }).finally(()=>{
    setRefreshing(false)
  }) 
}catch(e){
  console.log('error:',e)
}
}

const handleSearch =()=>{
  fetchDoctor(search.title)
}




useEffect(()=>{
  fetchDoctor(route.params.title)
  setSearch({...search, title:route.params.title})
 
}, [route])



  const onRefresh = useCallback(()=>{
   setRefreshing(true)
    fetchDoctor(search.title)
    
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={{backgroundColor:colors.white}}>
   
    <View style={styles.header}>
      
      <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
    <MaterialIcon name="arrow-back-ios" size={18} onPress={handleBack} color={colors.dark}  /> 
    <TextInput 
    
  autoCapitalize='none'
  keyboardType='email-address' 
   autoCorrect={false}
   value={search.title}
   onChangeText={text =>handleChange('title', text)}
    placeholder='Search' 
    style={styles.textInput}  />
    </View>

    <MaterialIcon onPress={handleSearch} name="search" size={18} color={colors.dark}  />

    </View>
    <View style={[styles.header,{width:width, marginTop:10, borderRadius:0, marginHorizontal:0}]}>
   <Text style={styles.label}>{content&&content.length} Results found</Text>

   </View> 
    </View>
    <Loader 
    isModalVisible={loading} 
    type={modalType}
    message={''} 
    action={()=>setLoading(false)}
     />

    <View style={styles.catItems}>

<FlatList 
data={content}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <Doctor key={item.id} item={item} navigation={navigation} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>

    </View>
  )
}


export default DoctorsList

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:colors.lightSkye,
    height:45,
    marginTop:40,
    marginHorizontal:10,
    borderRadius:5
  },

 
  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },



box:{
  width:width,
  backgroundColor:colors.white,
  marginBottom:5,
  display:'flex',
  paddingVertical:10,
  paddingHorizontal:5
  
    },

catItems:{
flex:1,
marginHorizontal:5,

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
  textInput:{
    width:width-100,
    marginLeft:10,
    fontSize:12,
    fontWeight:'600',
    color:colors.dark
  },
  label:{
    fontWeight:'600',
    fontSize:12,
    color:colors.grey
  },
})