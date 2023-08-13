
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
  Earnings: undefined;
  StoreItems:undefined; 
    BottomTabs:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Earnings'>;
 const Earnings =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.navigate('StoreItems');
}

const handleConfirm =()=>{
  navigation.navigate('StoreItems');
}


const handleNext =()=>{
  navigation.navigate('BottomTabs', {
    code:'cds',
  }); 
}


const CardCategory =({item}:{item:any})=>{
  return <Pressable onPress={handleConfirm} style={[styles.card]}>



<View style={[globalStyles.rowCenterBetween, {width:width-30}]}>
<Text style={styles.label}>Bank of New York</Text>
<Text style={styles.label}>$378.00</Text>
</View>

<View style={[globalStyles.rowCenterBetween, {width:width-100}]}>
<Text style={styles.infoText}>6546 5456 1354 5435</Text>
<Text style={styles.infoText}>30 Jun 2020, 11:59 am</Text>
</View>




    </Pressable>
  }

const Header =()=>{

  return (

<>


<View style={[globalStyles.rowCenterBetween,{height:50, paddingVertical:10,paddingHorizontal:20, backgroundColor:MODE==='Light'?colors.white:colors.dark, marginBottom:5}]}>
<Text style={[styles.label, {color:colors.grey}]}>Total Earnings</Text>

  <Text style={styles.label}>$7.8k</Text>

</View>


<View style={{backgroundColor:MODE==='Light'?colors.white:colors.dark, height:(height/3), padding:10}}>
  <Text style={styles.label}>Earnings</Text>

  <View style={{backgroundColor:MODE==='Light'?colors.white:colors.dark}}>
    <Text >Chart here</Text>
  </View>
</View>


<View style={{height:40, justifyContent:'center', marginHorizontal:10}}>
  <Text style={styles.label}>Payouts</Text>
</View>

</>
  )
}
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}}>
    
    <View style={styles.header}>
    <MaterialIcon name="menu" size={14} color={MODE==='Light'?colors.dark:colors.white}  /> 
    <Text style={styles.label}>Earnings</Text>
    
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


export default Earnings

const styles = StyleSheet.create({

  header:{

    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:MODE==='Light'?colors.white:colors.dark,
    height:50
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
  alignItems:'flex-start',
  justifyContent:'center',
  flexDirection:'column',
  padding:15,
  backgroundColor:MODE==='Light'?colors.white:colors.dark,
  marginBottom:5,
},
cardImage:{
height:70,
width:70,
resizeMode:'contain',
marginRight:20
},
addPlus:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  marginTop:20
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
    
  }
  
})