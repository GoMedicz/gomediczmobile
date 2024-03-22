
import React, { useCallback, useState, useRef, useEffect } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { LANGUAGELIST } from '../../components/data';
import { CURRENCY, ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import axios from 'axios';
import { FormatNumber, getBritishDate, getData, getTime } from '../../components/globalFunction';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  MyLabTest: undefined;
  LabDetails:{
    code:undefined;
    order_code:undefined;
   } 
  BottomTabs:undefined;
  AppointmentDetails:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'MyLabTest'>;
 const MyLabTest =({ route, navigation }:Props)=> {
  const fadeValue = useRef(new Animated.Value(0)).current 
  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)
  const [content, setContent]= useState({
    upcoming:[] as any,
    past:[] as any,
  })

interface item {
  title:string,
  isDefault:string,
  id:number
}



useEffect(()=>{
  FetchContent()
}, [route])



const  FetchContent = async()=>{
  //setLoading(true)
  let config = await configToken()
  const user_code = await getData('code');
  let url = ServerUrl+'/api/user/lab_test/'+user_code
  try{
 await axios.get(url, config).then(response=>{
 console.log(response.data)
    if(response.data.type==='success'){
      setContent({
        upcoming:response.data.upcoming,
        past:response.data.past
      })
      AnimationStart()
    }else{
      setContent({
        upcoming:[],
        past:[]
      })
    }

  }).finally(()=>{
    setRefreshing(false)
   // setLoading(false)
  }) 
}catch(e){
  console.log('error:',e)
}
}


const Header =()=>{

  return <>
  
  
{content.past.length!==0?<View style={{height:45, paddingHorizontal:10, justifyContent:'center'}}>
<Text style={styles.infoText}>Past</Text>
</View>:[]}

    <View style={styles.catItems}>

<FlatList 
data={content.past}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"

keyExtractor={item => item.item_key}
renderItem={({item})=> <CardCategory key={item.id+item.code} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>
  </>
}


const AnimationStart =()=>{
  const config:any ={
    toValue:1,
    duration:1000,
    useNativeDriver: true
  }
  Animated.timing(fadeValue, config).start()

}



const handleBack =()=>{
  navigation.navigate('BottomTabs');
}

const handleNext =(item:any)=>{
 /*  navigation.navigate('LabDetails', {
    code:item.code,
    order_code:item.order_code
  });  */ 
}




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={()=>handleNext(item)} style={[styles.box]} >


<Animated.View style={{opacity:fadeValue}}>
<View style={styles.content}>

<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:item.image_url!=='' && item.image_url!==null ?ImagesUrl+"/lab/"+item.image_url:ImagesUrl+"/no.png"}} style={styles.profile} />

    
    <View style={[{display:'flex'}, {marginHorizontal:5, flex:1, justifyContent:'center'}]}>

      <Text style={{color:colors.dark, fontSize:12, fontWeight:'600',
       marginBottom:0}}>{item.lab_name}</Text>


      <View style={{justifyContent:'space-between', display:'flex', flexDirection:'row', alignItems:'center'}}>
      <Text style={styles.infoText}>{item.title}<Text style={{fontWeight:'400'}}>at</Text>{item.address}</Text>

    <Text style={styles.infoText}>{CURRENCY+FormatNumber(item.fees)}</Text>
      </View>
      <Text style={[styles.label, {marginTop:10}]}>{item.date_book? getBritishDate(item.date_book):''} | {item.time_book?getTime(item.time_book):''} </Text>


    </View> 
</View>

 
 
</View>

</Animated.View>

      </Pressable>
    }


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
  FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={globalStyles.header}>
    <MaterialIcon name="arrow-back" onPress={handleBack} size={18} color={colors.dark}  /> 
    <Text style={[styles.label, {fontSize:14}]}>My Lab Tests</Text>

    <View/>
    </View>


    {content.upcoming.length!==0?
<View style={{height:45, paddingHorizontal:10, justifyContent:'center'}}>
<Text style={styles.infoText}>Upcoming</Text>
</View>:[]}

<View style={styles.catItems}>

<FlatList 
data={content.upcoming}
numColumns={1}
showsVerticalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
ListFooterComponent={<Header />}
keyExtractor={item => item.item_key}
renderItem={({item})=> <CardCategory key={item.code} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>

</View>




    </View>
  )
}


export default MyLabTest

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
  paddingHorizontal:10,
  
  
    },

catItems:{


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
    width:75,
    height:75,
    borderRadius:5,
    resizeMode:'contain'
  },
 content:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    marginVertical:5
  },
  locationWrapper:{
    position:'absolute', 
    top:100,
    right:10,
    width:(width/4)+10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor:colors.white,
    padding:10,
  },

  labelLocation:{
    fontWeight:'600',
    fontSize:12,
    marginVertical:10
    
  },
})