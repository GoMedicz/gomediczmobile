
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl, MODE } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Insight: undefined;
  Earnings:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Insight'>;
 const Insight =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.navigate('Earnings');
}

const handleConfirm =()=>{
  navigation.navigate('Earnings');
}


const handleNext =()=>{
  navigation.navigate('BottomTabs', {
    code:'cds',
  }); 
}


const CardCategory =({item}:{item:any})=>{
  return <Pressable onPress={handleConfirm} style={[styles.card]}>



<View style={globalStyles.rowCenterBetween}>
<View style={styles.imageWrapper}>
<Image source={{ uri:ImagesUrl+"/products/"+item.image }} style={styles.cardImage} />

</View>


<View>

<Text style={styles.label}>{item.title}</Text>
<Text style={styles.infoText}>Operum England</Text>

<View style={styles.addPlus}>
  <Text style={styles.label}>124 Sold</Text>
</View>
</View>
</View>

    <View style={{display:'flex', flexDirection:'column',  height:60, justifyContent:'flex-end', alignItems:'flex-end'}}>
      <Text style={[styles.infoText, {color:MODE==='Light'?colors.dark:colors.white}]}>Revenue 
    <Text style={[styles.label, {color:MODE==='Light'?colors.dark:colors.grey}]}> N44.00</Text></Text>
    </View>

    </Pressable>
  }

const Header =()=>{

  return (

<>


<View style={[globalStyles.rowCenterBetween,{height:60, padding:10, backgroundColor:MODE==='Light'?colors.white:colors.dark, marginVertical:5, justifyContent:'space-around'}]}>

<View style={globalStyles.columnCenterCenter}>
  <Text style={[styles.label, {color:colors.grey, marginBottom:5}]}>Orders</Text>
  <Text style={styles.label}>698</Text>
</View>


<View style={[globalStyles.columnCenterCenter, styles.bordered]}>
  <Text style={[styles.label, {color:colors.grey, marginBottom:5}]}>Revenue</Text>
  <Text style={styles.label}>$7.8k</Text>
</View>


<View style={globalStyles.columnCenterCenter}>
  <Text style={[styles.label, {color:colors.grey, marginBottom:5}]}>Pending</Text>
  <Text style={styles.label}>14</Text>
</View>

</View>


<View style={{backgroundColor:MODE==='Light'?colors.white:colors.dark, height:(height/3)+30, padding:10}}>
  <Text style={styles.label}>Orders</Text>

  <View>
    <Text>Chart here</Text>
  </View>
</View>


<View style={{height:50, justifyContent:'center', marginHorizontal:10}}>
  <Text style={styles.label}>Top Selling Items</Text>
</View>

</>
  )
}
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="menu" size={14} color={MODE==='Light'?colors.dark:colors.white}  /> 
    <Text style={styles.label}>Insight</Text>
    
    <View style={globalStyles.rowCenterCenter}>
      <Text style={[styles.label, {color:colors.primary, marginRight:10, fontWeight:'700'}]}>TODAY</Text>
      <MaterialIcon name="arrow-drop-down" size={18} color={colors.primary}  />
    </View>
    </View>


    <View style={{ marginVertical:5, flex:1}}>
<FlatList 
ListHeaderComponent={<Header />}
data={CATITEMS}
numColumns={1}
showsVerticalScrollIndicator={false}
showsHorizontalScrollIndicator={false}
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


export default Insight

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:MODE==='Light'?colors.white:colors.dark,
    height:60
  },
  label:{
    fontWeight:'600',
    fontSize:12,
    color:MODE==='Light'?colors.dark:colors.white
  },
  infoWrapper:{
    width:width,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:50
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
  backgroundColor:MODE==='Light'?colors.white:colors.dark,
  marginBottom:5,
  padding:10
},
cardImage:{
height:60,
width:80,
resizeMode:'contain',
},
addPlus:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  marginTop:10
},
container:{
position:'absolute',
bottom:0,
backgroundColor:colors.white,
},
btnOk:{
  height:45,
  width:45,
  display:'flex',
  justifyContent:'center',
  backgroundColor:colors.primary,
  alignItems:'center',
  borderTopEndRadius:5,
  borderBottomEndRadius:5

},
textWrapper:{

  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  marginHorizontal:10,
  borderRadius:5,
  height:45,
  marginVertical:10,
  backgroundColor:colors.grey5,

},
textInput:{
  fontSize:12,
  color:colors.dark,
  marginLeft:10,
  width:width-150

},
row:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  marginHorizontal:10,
  marginVertical:5
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
  bordered:{
    height:40,
    width:width/3,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderColor:colors.grey1Opacity
    
  },
  imageWrapper:{
    display:'flex', 
    flexDirection:'row',
     alignItems:'center',
     justifyContent:'center',
     backgroundColor:colors.white,
     borderRadius:10,
    marginRight:10
  }
  
})