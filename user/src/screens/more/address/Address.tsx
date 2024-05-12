
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Platform, Dimensions, Pressable } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import axios from 'axios';
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../../assets/colors';
import { ServerUrl, configToken } from '../../../components/includes';
import { PrimaryButtonChildren } from '../../../components/include/button';
import { getData } from '../../../components/globalFunction';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Address: undefined;
  AddAddress:undefined; 
  BottomTabs:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Address'>;
 const Address =({ route, navigation }:Props)=> {

  const [content, setContent] = useState([] as any)

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.navigate('BottomTabs');
}

const handleNext =()=>{
  navigation.navigate('AddAddress');
}

const ICON = ['', 'home', 'pages', 'domain',  'pages', 'verified']


  const CardCategory =({item}:{item:any})=>{
    return <Pressable  style={styles.box}>
<MaterialIcon name={ICON[item.id]} size={20} color={colors.primary}  />
    <View style={[{display:'flex'}, {marginLeft:15}]}>
      <Text style={styles.label}>{item.type}</Text>
      <Text style={[styles.infoText, {width:width-60}]}>{item.address}</Text>
        </View> 

      </Pressable>
    }


 

  const  FetchAddress = async()=>{

    let code = await getData('code')
    let config = await configToken()
    let url = ServerUrl+'/api/address/display/'+code
    try{
   await axios.get(url, config).then(response=>{
 
      if(response.data.type==='success'){  
        setContent(response.data.data)
      }
  
    })
  }catch(e){
    console.log('error:',e)
  }
  }
  
  
  
  useEffect(()=>{
    FetchAddress()
  }, [route])

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
    FetchAddress()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back" onPress={handleBack} size={18} color={colors.dark}  /> 
    <Text style={styles.label}>Saved Addresses</Text>

    <View/>
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


<View>
  <PrimaryButtonChildren
  handleAction={handleNext}
  style={{backgroundColor:colors.white}}
  >

    <View style={{display:'flex', justifyContent:'center', flexDirection:'row', alignItems:'center'}}>

    <MaterialIcon name="add" size={18} color={colors.primary}  /> 
      <Text style={[styles.label, {marginLeft:15, color:colors.primary}]}>Add New Address</Text>
    </View>
  </PrimaryButtonChildren>
</View>
    </View>
  )
}


export default Address

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
  justifyContent:'flex-start',
  alignItems:'flex-start',
  paddingHorizontal:10,
  paddingVertical:15
  
    },

catItems:{
flex:1,
margin:5,

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
    width:30,
    height:30,
    borderRadius:15,
    resizeMode:'contain'
  },

  circle:{
    height:50,
    width:50,
    borderRadius:25,
    backgroundColor:colors.lightSkye,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
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
  addMore:{
    height:50,
    width:50,
    borderRadius:25,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.primary,
    position:'absolute',
    bottom:10,
    right:10,


    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4
    },
    
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  }
})