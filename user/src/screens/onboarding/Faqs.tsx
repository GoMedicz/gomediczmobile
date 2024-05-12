
import React, { useCallback, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Platform, Dimensions, Pressable, Animated } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../assets/colors';
import { useZustandStore } from '../../api/store';
import { dynamicStyles } from '../../components/dynamicStyles';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Faqs: undefined;
    Welcome:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Faqs'>;
 const Faqs =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  
  const [refreshing, setRefreshing] = useState(false)

  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE)

interface item {
  title:string,
  isDefault:string,
  id:number
}


const animatedValue = useRef(new Animated.Value(100)).current 



const [question, setQuestion] = useState([

  {title:'How to Login to App?', content:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos a animi non labore reiciendis commodi consequuntur nulla quo mollitia', owner:'all', status:true, id:1},

  {title:'How to book an appointment?', content:'Lorem ipsum dolor sit amet consectetur.', owner:'store',  status:true, id:2},


  {title:'How to cancel an appointment?', content:'Lorem ipsum dolor sit amet consectetur.', owner:'store',  status:true, id:3},


  {title:'What if i fail to book?', content:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos a animi non labore reiciendis commodi consequuntur nulla quo mollitia', owner:'all', status:true, id:4},

  {title:'How to Login to App?', content:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos a animi non labore reiciendis commodi consequuntur nulla quo mollitia', owner:'all', status:true, id:5},

  {title:'How to book an appointment?', content:'Lorem ipsum dolor sit amet consectetur.', owner:'store',  status:true, id:6},


  {title:'Payment mode available?', content:'Lorem ipsum dolor sit amet consectetur.', owner:'store',  status:true, id:7},


  {title:'How to pay?', content:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos a animi non labore reiciendis commodi consequuntur nulla quo mollitia', owner:'all', status:true, id:8},
])


const handleChange =(id:number)=>{
  
  const newQuestion = question.map((data:any)=>{
    if(data.id === id){
        return {...data, 
            status:!data.status
        }
        };
        return data;
})
setQuestion(newQuestion)

AnimationStart()
}

const handleBack =()=>{
  navigation.goBack();
}

const AnimationStart =()=>{
  const config:any ={
    toValue:1,
    duration:1000,
    useNativeDriver: true
  }
  Animated.timing(animatedValue, config).start()

}



  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={{flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.dark}}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="menu" onPress={handleBack} size={18} color={MODE==='Light'?colors.dark:colors.white} /> 
    <Text style={dynamicStyle.label}>FAQs</Text>
    
    <View/>
    </View>
<ScrollView>
    <View style={[ {flex:1,  marginTop:0}]}>



{question&&question.map((item:any, index:number)=>
<View key={index} style={[styles.itemWrapper, {
    backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>
   
   <Pressable onPress={()=>handleChange(item.id)}>
<Text style={dynamicStyle.h2} > {index+1}. {item.title}</Text></Pressable>

<Animated.View style={{
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-600, 0]
                })
              }
            ]}}
            >
<Text style={[dynamicStyle.h5, item.status?styles.dNone:[]]}>{item.content}</Text>
</Animated.View>
</View>)}



</View> 

</ScrollView>

    </View>
  )
}

export default Faqs

const styles = StyleSheet.create({
  checkboxWrapper:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginBottom:30
  },

  checkbox:{
    height:20,
    width:20,
    borderRadius:10,
    borderWidth:2,
    borderColor:colors.skye,
    marginRight:30,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  checked:{
    height:10,
    width:10,
    borderRadius:10,
    backgroundColor:colors.skye
  },
  textWrapper:{
    width:width,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:15
  },
  title:{
  fontSize:16,
  fontWeight:'600',
  color:colors.dark,

  },
  label:{
    fontSize:12,
    fontWeight:'600',
    color:colors.dark,

  },

  
  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:colors.white,
    height:60,
  },

  h2:{
    fontSize:14,
    fontWeight:'600',

  },
  h5:{
    fontSize:10,
    fontWeight:'500',
    marginLeft:20,
    marginTop:10,
    color:colors.dark,
    opacity:0.6

  },
  itemWrapper:{
    marginBottom:4,
    padding:10,
    width:width
  },
  dNone:{
    display:'none',

  }

})