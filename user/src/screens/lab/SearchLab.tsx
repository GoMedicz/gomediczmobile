
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Platform, Dimensions, Pressable, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { CURRENCY, ServerUrl, configToken } from '../../components/includes';

import axios from 'axios';
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { globalStyles } from '../../components/globalStyle';
import { PrimaryButtonChildren } from '../../components/include/button';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { FormatNumber, getData, storeData } from '../../components/globalFunction';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Reviews: undefined;
  ConfirmBooking:undefined; 
 SearchLab:{
  code:undefined,
  name:undefined
 };
   };

type Props = NativeStackScreenProps<RootStackParamList, 'SearchLab'>;
 const SearchLab =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [content, setContent]= useState([] as any)
  const [filterContent, setFilterContent]= useState([] as any)
  const [cart, setCart]= useState({
    search:'',
    total:0
  })



const handleClear =()=>{
  setCart({...cart, search:''});
  setFilterContent(content)
}

const handleChange =(name:string, text:string)=>{
  
  setCart({...cart, [name]:text});

  if(text!==''){
      const filteredItems = content.filter(
          (item:any) =>  item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.fees.includes(text.toLowerCase()),
      );

      setFilterContent(filteredItems)
  }else{
      setFilterContent(content)
  } 

}


const handleBack =()=>{
  navigation.goBack();
}

const handleBook =async()=>{

  if(Number(cart.total)>0){
    const Test = filterContent.filter((item:any)=>item.status==='true')
    try{

      let data:any  = await getData('cart');
     

      if(data){
        let item =  JSON.parse(data)
        let allItems =  item.concat(Test)
        storeData('cart', JSON.stringify(allItems))
      }else{
        storeData('cart', JSON.stringify(Test))
      }
      navigation.navigate('ConfirmBooking');

    }catch(e){

    }

  } 

}

const handleCheckOne =(item:any)=>{
    const currentContent = content.map((list:any)=>{
                   
        if(list.code ===item.code){
            return {...list, status:list.status==='false'?'true':'false'}
        }

         return list
          })



          const amount = currentContent.filter((item:any)=>item.status==='true').reduce((acc:number, item:any)=>acc+parseFloat(item.fees), 0)

          setCart({...cart, total:amount})

   setFilterContent(currentContent) 
   setContent(currentContent)
}


const getTotal =()=>{

  const amount = filterContent.filter((item:any)=>item.status==='true').reduce((acc:number, item:any)=>acc+parseFloat(item.fees), 0)

  setCart({...cart, total:amount})

}

  const CardCategory =({item}:{item:any})=>{
    return <View style={[styles.box]}>


<Text style={{color:colors.dark, fontSize:14, fontWeight:'600'}}>{item.title}</Text>

<View style={[globalStyles.rowCenterBetween, {marginTop:10, paddingVertical:5}]}>

      <Text style={styles.infoText}> {CURRENCY+FormatNumber(item.fees)}</Text>
      {item.status==='false'? <Pressable onPress={()=>handleCheckOne(item)}><Text style={[styles.infoText, {color:colors.primary, marginRight:15, fontWeight:'700'}]}>ADD</Text></Pressable> :

<Pressable onPress={()=>handleCheckOne(item)} style={globalStyles.rowCenterBetween}>
<MaterialIcon name="check" size={10} color={colors.navyBlue}   /> 
<Text style={[styles.infoText, {color:colors.navyBlue, marginRight:15,  fontWeight:'700'}]}>ADDED</Text>
</Pressable>}
      

 
</View>
      </View>
    }


  

    const  FetchContent = async()=>{
      //setLoading(true)
      let config = await configToken()
      let url = ServerUrl+'/api/lab/test/view/'+route.params.code
      try{
     await axios.get(url, config).then(response=>{
        if(response.data.type==='success'){
          setFilterContent(response.data.data)
          setContent(response.data.data)
        }else{
          setFilterContent([])
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
}, [route])
    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   FetchContent()
   getTotal()
    }, [])

  return (<SafeAreaView style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    
    <View style={{width:width, backgroundColor:colors.white}}>
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios" size={18} color={colors.dark} onPress={handleBack}  /> 
    <Text style={[styles.label, {marginLeft:30} ]}>{route.params.name}</Text>
    
    
</View>

    
    <View style={styles.textWrapper}>
    <MaterialIcon name="search" size={16} color={colors.grey}  /> 

  <TextInput 
  placeholder='Search Tests' 
  placeholderTextColor={'#959595'}
  style={styles.textInput}
  autoCapitalize='none'
  keyboardType='email-address' 
  autoFocus={true}
  autoCorrect={false}
value={cart.search}
onChangeText={text=>handleChange('search', text)}
  
  />
  <MaterialIcon name="close" size={16} onPress={handleClear} color={colors.grey}  /> 
</View>



<View style={[styles.textWrapper, {marginTop:0, borderRadius:0, marginHorizontal:0, width:width}]}>
    <Text style={styles.infoText}>Total {filterContent.length} tests</Text> 
</View>

</View>

    <View style={styles.catItems}>

<FlatList 
data={filterContent}
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


<PrimaryButtonChildren
style={{position:'absolute', bottom:0}}
handleAction={handleBook}
>

  <View style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'row', width:width, paddingHorizontal:20}}>

    <Text style={globalStyles.buttonText}>{CURRENCY+FormatNumber(cart.total)}</Text>


    <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>

    <FontAwesome5Icon name="calendar-check" size={16} color={colors.white}  /> 
    <Text style={[globalStyles.buttonText, {marginLeft:10}]}>Book Now</Text>
  </View>


  </View>


  
</PrimaryButtonChildren>
    </SafeAreaView>
  )
}


export default SearchLab

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'flex-start',
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

  textWrapper:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:width-20,
    height:45,
    marginHorizontal:10,
    paddingHorizontal:10,
    backgroundColor:'#F4F8FB',
    borderRadius:5,
    marginVertical:10
  },
  
  textInput:{
  width:width-100,
  fontWeight:'500',
  color:colors.dark,
  fontSize:12,
  marginLeft:15
  },


box:{
  width:width,
  backgroundColor:colors.white,
  display:'flex',
  padding:10,
  marginBottom:5
  
    },

catItems:{
flex:1,

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