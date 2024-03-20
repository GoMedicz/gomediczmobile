
import React, { useCallback, useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { CATCOLOR } from '../../components/data';
import { ImagesUrl, ServerUrl, configToken } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import axios from 'axios';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Category: undefined;
  Payment:undefined; 
  BottomTabs:undefined;
  CategoryDetails:{
     title:string,
     search:string,
     code:string
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Category'>;
 const Category =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [category, setCategory]= useState([] as any)
  const [content, setContent]= useState([] as any)
  const [refreshing, setRefreshing] = useState(false)
  const [items, setItems]= useState([] as any)



const handleBack =()=>{
  navigation.navigate('BottomTabs');
}

const handleNext =(item:any)=>{
  navigation.navigate('CategoryDetails', {
    title:item.title,
    code:item.sub_code,
    search:'',
  }); 
}

const handleCheck =(item:any)=>{

let rs = content.filter((list:any)=>list.main_code===item.main_code && list.sub_title!==null)

setItems(rs)
const currentContent = category.map((list:any)=>{
                 
  if(list.main_code ===item.main_code){
      return {...list, status:'true'}
  }else{
    return {...list, status:'false'}
  }

    })

setCategory(currentContent)

}
const CardItem =({item}:{item:any})=>{
  return <Pressable onPress={()=>handleNext(item)} style={[styles.card]}>

    <Text style={[styles.label, {fontWeight:'700'}]}>{item.sub_title}</Text>

    <MaterialIcon name="arrow-forward-ios" size={16} color={colors.grey}  />

    </Pressable>
  }


  const CardCategory =({item}:{item:any})=>{
   
    return <Pressable onPress={()=>handleCheck(item)} style={[styles.box, {backgroundColor:CATCOLOR[item.id]} ]}>

      <Text style={{color:colors.white, fontSize:10, marginLeft:15, marginTop:15, fontWeight:'600'}}>{ item.title.toUpperCase()}</Text>

      <Image source={{ uri:item.image_url!=='' && item.image_url!==null ?ImagesUrl+"/pharmacy/category/"+item.image_url:ImagesUrl+"/no.png"}}  style={styles.catImage} />


     {item.status==='true'? <View  style={styles.overlay}>
      <MaterialIcon name="arrow-forward-ios" size={20} color={colors.dark}  />
      </View>:[]}

      </Pressable>
    }


    const onRefresh = useCallback(()=>{
      setRefreshing(false)
      FetchContent()
      }, [])
  
  
  const  FetchContent = async()=>{
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
    

  return (<View style={[ {flex:1, backgroundColor:colors.white}]}>
    
    <View style={globalStyles.header}>
    <MaterialIcon onPress={handleBack} name="arrow-back-ios" size={18} color={colors.dark}  /> 
    <Text style={styles.label}>Shop by Category</Text>
    <View />
    </View>


<View style={styles.row}>

<View style={styles.catItems}>


<FlatList 
data={category}
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


<View style={{ marginHorizontal:10 }}>
<FlatList 
data={items}
numColumns={1}
showsHorizontalScrollIndicator={false}
snapToInterval={width-20}
snapToAlignment='center'
decelerationRate="fast"
renderItem={({item})=> <CardItem key={item.id} item={item} />}
refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
}
/>


</View>

</View>




    </View>
  )
}


export default Category

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
card:{
  display:'flex',
  justifyContent:'space-between',
  flexDirection:'row',
  alignItems:'center',
  paddingHorizontal:20,
  backgroundColor:colors.lightSkye,
  width:width-120,
  height:45,
  marginBottom:5,
  borderRadius:5
},
cardImage:{
height:40,
width:40,
resizeMode:'cover',
},


row:{
  display:'flex',
  flexDirection:'row',
  width:width-20,
  marginHorizontal:10,
  flex:1,
},

box:{
  height:100,
  width:80,
  borderRadius:10,
  marginBottom:6,
  display:'flex',
  flexDirection:'column',
  
    },

catItems:{

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
catImage:{
height:50,
width:50,
resizeMode:'cover',
position:'absolute',
right:0,
bottom:0
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
  }
  
})