
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';
import { ImagesUrl, ServerUrl, configToken } from '../../components/includes';

import axios from 'axios';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  TestList: undefined;
  Cart:undefined; 
  LabDetails:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'TestList'>;
 const TestList =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)
  const [content, setContent]= useState([] as any)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.goBack();
}

const handleNext =(code:string)=>{
  navigation.navigate('LabDetails', {
    code:code,
  }); 
}




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={()=>handleNext(item.code)} style={[styles.box]}>

<Image source={{ uri:item.image_url!=='' && item.image_url!==null ?ImagesUrl+"/lab/"+item.image_url:ImagesUrl+"/no.png"}} style={styles.profile} />


<View style={[{display:'flex'}, {marginLeft:15}]}>
      <Text style={{color:colors.dark, fontSize:14, fontWeight:'600', marginBottom:5}}>{item.lab_name}</Text>

      <View style={{display:'flex', flexDirection:'row'}}>

    <MaterialIcon name="add-location" size={14} color={colors.grey}  />
    <Text style={[styles.infoText, {marginLeft:5}]}>{item.address}</Text> 
      </View>

      <Text style={[styles.infoText, {marginTop:20, fontWeight:'600', color:'#35c2F5'}]}>{Number(item.total_test)>100?' 100 +':item.total_test} Tests Available </Text>

</View>
      </Pressable>
    }


  

    const  FetchContent = async()=>{
      //setLoading(true)
      let config = await configToken()
      let url = ServerUrl+'/api/lab/all'
      try{
     await axios.get(url, config).then(response=>{
        if(response.data.type==='success'){
          setContent(response.data.data)
        }else{
          setContent([])
        }
    
      }).finally(()=>{
        setRefreshing(false)
       // setLoading(false)
      }) 
    }catch(e){
      console.log('error:',e)
    }
    }
    

    useEffect(()=>{
      FetchContent()
    }, [])

  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    FetchContent
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={18} onPress={handleBack} color={colors.dark}  /> 
    <Text style={styles.label}>Cardiologist</Text>

    <MaterialIcon name="map" size={18} color={colors.grey}  /> 
    </View>



    <View style={styles.catItems}>

<FlatList 
data={content}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardCategory key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>



    </View>
  )
}


export default TestList

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:colors.white,
    height:60
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
  width:width,
  backgroundColor:colors.white,
  marginBottom:5,
  display:'flex',
  flexDirection:'row',
  padding:10,
  
    },

catItems:{
flex:1,
marginHorizontal:5,
marginTop:5

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
    width:80,
    height:80,
    borderRadius:10,
    resizeMode:'contain'
  },
 content:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    paddingHorizontal:10, 
    paddingBottom:10,
    marginVertical:5
  }
})