
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../../components/data';
import { ImagesUrl } from '../../../components/includes';
import { globalStyles } from '../../../components/globalStyle';
import ModalDialog from '../../../components/modal';
import ShoppingCart from '../../../components/include/ShoppingCart';
import { opacity } from 'react-native-reanimated';
import { PrimaryButton } from '../../../components/include/button';
import ChooseDays from './ChooseDays';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );


      
type RootStackParamList = {
  CreateReminder: undefined;
  Cart:undefined; 
  Address:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'CreateReminder'>;
 const CreateReminder =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleBack =()=>{
  navigation.goBack();
}

const handleNext =()=>{
  navigation.navigate('Address', {
    code:'cds',
  }); 
}




  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<SafeAreaView style={[ {flex:1, backgroundColor:colors.white}]}>
    
    <View style={styles.header}>
    <MaterialIcon name="arrow-back-ios"  onPress={handleBack} size={18} color={colors.dark}  /> 
    <Text style={styles.label}>Create Pill Reminders</Text>

    <View/>
    </View>


<ScrollView>
  

<View style={styles.row}>
<Text style={[styles.infoText,{color:colors.grey, fontSize:12, marginBottom:10}]}>Pill Name</Text>

<View style={styles.textWrapper}>
  <TextInput 
  style={styles.textInput}
  placeholder='Enter Pill Name'
  placeholderTextColor={colors.grey3}
  />
</View>

</View>

<View style={styles.row}>
<Text style={[styles.infoText,{color:colors.grey, fontSize:12, marginBottom:5}]}>Select Days</Text>

<View style={styles.dateWrapper}>
<MaterialIcon name="event" size={14} color={colors.icon}  /> 
 <Text style={[styles.label, {color:colors.grey, fontSize:12}]}>Days</Text>
</View>

</View>



<View style={styles.row}>
<Text style={[styles.infoText,{color:colors.grey, fontSize:12, marginBottom:5}]}>Select Time</Text>

<View style={globalStyles.rowCenterBetween}>
<View style={[styles.dateWrapper, {width:width-70}]}>
<MaterialIcon name="notifications" size={14} color={colors.icon}  /> 
 <Text style={[styles.label, {color:colors.grey, fontSize:12, marginLeft:10}]}>Time</Text>
</View>


<TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.addMore}>
  
<MaterialIcon name="add" size={20} color={colors.white}  /> 
</TouchableOpacity>
</View>


</View>


</ScrollView>

<View>
  <PrimaryButton 
  title='Set Reminder'
  />
</View>


<ChooseDays
isModalVisible={false}

>
  <View style={{marginTop:10}}>

<View style={[globalStyles.rowCenterBetween, {marginHorizontal:10}]}>
<View/>
  <Text style={styles.label}>Select Days</Text>
<MaterialIcon name="close" size={14} color={colors.dark}  /> 
</View>


<View style={styles.daysWrapper}>

  <Text style={styles.day}>Mon</Text>
  <Text style={styles.day}>Tues</Text>
  <Text style={styles.day}>Wed</Text>
  <Text style={styles.day}>Thurs</Text>
  <Text style={styles.day}>Fri</Text>
  <Text style={styles.day}>Sat</Text>
  <Text style={styles.day}>Sun</Text>
</View>


  <PrimaryButton 
  title='Done'
  handleAction={handleNext}
  />

  </View>
</ChooseDays>
    </SafeAreaView>
  )
}


export default CreateReminder

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
  alignItems:'center',
  padding:10,
  
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
  row:{
    width:width,
    paddingHorizontal:10,
    paddingVertical:5
  },
  textWrapper:{

  },
  textInput:{
    height:45,
    backgroundColor:colors.lightSkye,
    padding:10,
    color:colors.dark,
    borderRadius:5,
    marginVertical:5
  },
  dateWrapper:{
    height:45,
    backgroundColor:colors.lightSkye,
    padding:10,
    color:colors.dark,
    borderRadius:5,
    marginVertical:5,
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  addMore:{
    height:45,
    width:45,
    borderRadius:5,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.primary,

    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4
    },
    
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },

daysWrapper:{
padding:30,
display:'flex',
flexDirection:'row',
flexWrap:'wrap',
alignItems:'flex-start',
justifyContent:'space-between'

},

  day:{
    fontSize:20,
    fontWeight:'700',
    color:colors.dark,
    marginHorizontal:25,
    marginVertical:10,
    textAlign:'center'
  }
})