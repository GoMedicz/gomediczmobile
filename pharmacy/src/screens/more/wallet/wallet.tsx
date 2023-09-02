
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Platform, Dimensions, Pressable, TouchableOpacity } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from '../../../assets/colors';
import { CATEGORY } from '../../../components/data';
import { CURRENCY} from '../../../components/includes';
import { useZustandStore } from '../../../api/store';
import { dynamicStyles } from '../../../components/dynamicStyles';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Wallet: undefined;
  SendMoney:undefined;
  AccountProfile:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Wallet'>;
 const Wallet =({ route, navigation }:Props)=> {


  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE);

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)



  const handleBack =()=>{
    navigation.navigate('AccountProfile');
  }

const handleSend =()=>{
  navigation.navigate('SendMoney');
}


  const CardCategory =({item}:{item:any})=>{
    return <Pressable  style={[styles.box, {
      backgroundColor:MODE==='Light'?colors.white:colors.dark}]}>


  <View>
      <Text style={dynamicStyle.label}>Well Life Store</Text>
      <Text style={styles.infoText}>4 Items | 30 Jun 2018, 11:59 am</Text>
      </View>


      <View>
      <Text style={[styles.infoText, {color:colors.dark}]}>$80.00</Text>
      <Text style={[styles.infoText]}>Online</Text>
      </View>
   
   
      <View>
      <Text style={[styles.infoText, {color:colors.dark}]}>$6.50</Text>
      <Text style={[styles.infoText]}>Earnings</Text>
      </View>
   

      </Pressable>
    }


  const Header =()=>{


    return (<>
      <View style={{backgroundColor:MODE==='Light'?colors.white:colors.dark,  paddingHorizontal:10, paddingTop:10, paddingBottom:35}}>
    
  
      <Text style={styles.infoText}>AVAILABLE BALANCE</Text>
            <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:25, fontWeight:'700'}}>{CURRENCY} 520.50</Text>
      </View>

<View style={{display:'flex', flexDirection:'row', height:40, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark, alignItems:'center', paddingHorizontal:10}}>
  <Text style={[styles.infoText, {fontSize:12, fontWeight:'500', color:MODE==='Light'?colors.dark:colors.grey}]}>Recent</Text>

 
</View>
<TouchableOpacity style={styles.addMoney} onPress={handleSend} activeOpacity={0.8}>
    <Text style={{color:colors.white, fontSize:12, fontWeight:'500'}}>Send to Bank</Text>
  </TouchableOpacity>
  </>
    )
  }

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="menu" size={18} onPress={handleBack} color={MODE==='Light'?colors.dark:colors.white}  />  
    <Text style={dynamicStyle.label}>Wallet</Text>
<View />
    </View>


   

    <View style={styles.catItems}>

<FlatList 
data={CATEGORY}
numColumns={1}
ListHeaderComponent={<Header/>}
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


export default Wallet

const styles = StyleSheet.create({


  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },

box:{
  width:width,
  marginBottom:5,
  display:'flex',
  justifyContent:'space-between',
  flexDirection:'row',
  alignItems:'center',
  paddingHorizontal:15,
  paddingVertical:20,
  
    },

catItems:{
flex:1,
marginHorizontal:5,

},

  addMoney:{
    height:45,
    backgroundColor:colors.primary,
    position:'absolute',
    right:10,
    padding:10,
    width:120,
    top:70,
    zIndex:1,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'

    
  }
})