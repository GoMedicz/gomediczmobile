
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, NativeModules, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors';
import { CATCOLOR, CATEGORY, CATITEMS, LANGUAGELIST } from '../../components/data';
import { ImagesUrl, MODE } from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import ModalDialog from '../../components/modal';
import ShoppingCart from '../../components/include/ShoppingCart';

const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );



type RootStackParamList = {
  Reviews: undefined;
  Cart:undefined; 
  Offers:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Reviews'>;
 const Reviews =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [Languages, setLanguages] = useState(LANGUAGELIST)
  const [refreshing, setRefreshing] = useState(false)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleCart =()=>{
  navigation.navigate('Cart');
}

const handleNext =()=>{
  navigation.navigate('Offers', {
    code:'cds',
  }); 
}




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box]}>


<View style={styles.content}>

<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:ImagesUrl+"/seller/profile_4.png" }} style={styles.profile} />

    
    <View style={[{display:'flex'}, {marginLeft:15}]}>
      <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:14, fontWeight:'600', marginBottom:5}}>Henry Johnson</Text>
      <Text style={styles.infoText}>For <Text style={{color:MODE==='Light'?colors.dark:colors.white}}>Cold Fever</Text></Text>
    </View> 
</View>

 
  <View style={[globalStyles.columnCenterBetween]}>
      <View style={[globalStyles.rowCenterCenter, {marginBottom:5}]}>
    <Text style={{color:MODE==='Light'?colors.dark:colors.white, fontSize:10,  fontWeight:'700'}}>4.5</Text>
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={colors.grey}  />
      </View>
      <Text style={styles.infoText}>10.DEC.2019</Text>
  </View> 

</View>

<Text style={{fontSize:10, marginBottom:5, marginHorizontal:10, textAlign:'justify',  color:MODE==='Light'?colors.dark:colors.white}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, commodi ipsum! Dolor cum impedit at unde dignissimos</Text>


      </Pressable>
    }


  
const HeaderComponents =()=>{


  return (<View>


<View style={{
    backgroundColor:MODE==='Light'?colors.white:colors.dark, marginBottom:5, paddingBottom:5}}>


<View style={{display:'flex', flexDirection:'row'}}>
  
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png"}} style={styles.profileDoc} />

<View style={{marginLeft:0}}>

<View style={{width:(width/2)-40, height:120,  display:'flex', justifyContent:'center', marginTop:40}}>
  
  <Text style={styles.title}>Dr. Joseph Williamson</Text>
 

<View style={{marginTop:20}} >
  <Text style={styles.infoText}>Avg Reveiw</Text>


<View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:10}}>
  <Text style={ {color:'#EEA31E', fontWeight:'600', fontSize:20, marginRight:10}}>4.5</Text>
  <MaterialIcon name="star" size={25} color={'#EEA31E'}  />
</View>

  </View>

  </View>


</View>
</View>



<View style={{marginTop:30, marginHorizontal:20}}>

<Text style={styles.infoText}>Average Reviews</Text>



<View style={{display:'flex', flexDirection:'row', marginTop:20, alignItems:'center', width:width-20}}>

<Text style={styles.label}>5</Text>
<MaterialIcon name="star" size={18} color={'#EEA31E'}  />
<View style={styles.progress}>
<View style={styles.progressItem} />
</View>

<Text style={styles.label}>75</Text>
</View>




<View style={{display:'flex',  flexDirection:'row', marginVertical:2, alignItems:'center', width:width-20}}>

<Text style={styles.label}>4</Text>
<MaterialIcon name="star" size={18} color={'#EEA31E'}  />
<View style={styles.progress}>
<View style={styles.progressItem} />
</View>

<Text style={styles.label}>3</Text>
</View>



<View style={{display:'flex', flexDirection:'row', marginVertical:2, alignItems:'center', width:width-20}}>

<Text style={styles.label}>3</Text>
<MaterialIcon name="star" size={18} color={'#EEA31E'}  />
<View style={styles.progress}>
<View style={styles.progressItem} />
</View>

<Text style={styles.label}>24</Text>
</View>


<View style={{display:'flex', flexDirection:'row', marginVertical:2, alignItems:'center', width:width-20}}>

<Text style={styles.label}>2</Text>
<MaterialIcon name="star" size={18} color={'#EEA31E'}  />
<View style={styles.progress}>
<View style={styles.progressItem} />
</View>

<Text style={styles.label}>8</Text>
</View>

<View style={{display:'flex', flexDirection:'row', marginVertical:2, alignItems:'center', width:width-20}}>

<Text style={styles.label}>1</Text>
<MaterialIcon name="star" size={18} color={'#EEA31E'}  />
<View style={styles.progress}>
<View style={styles.progressItem} />
</View>

<Text style={styles.label}>11</Text>
</View>


</View>





<View style={[globalStyles.rowCenterBetween,{marginVertical:20, paddingHorizontal:20 }]}>

<View>
  <Text style={styles.infoText}>Total People Rated</Text>

  <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:5}}>
<MaterialIcon name="account-box" size={18} color={colors.icon}  />
<Text style={[styles.label, {marginLeft:5}]}>78</Text>
</View>

</View>



<View>
  <Text style={styles.infoText}>Appointment Booked</Text>

  <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:5}}>
<MaterialIcon name="check-box" size={18} color={colors.icon}  />
<Text style={[styles.label, {marginLeft:5}]}>78</Text>
</View>

</View>

</View>
</View>




    <View style={{ paddingHorizontal:10, marginBottom:5, height:35, justifyContent:'center'}}>

    <Text style={styles.infoText}>Recent</Text>
</View>
  </View>

  )
}
    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}]}>
    
    <View style={styles.header}>
      <View/> 
        <Text style={styles.label}>Reviews</Text>
    <View/>
    </View>


    <View style={styles.catItems}>

<FlatList 

ListHeaderComponent={HeaderComponents}
data={CATEGORY}
numColumns={1}
nestedScrollEnabled={true}
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


export default Reviews

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
    fontWeight:'700',
    fontSize:12,
    color:MODE==='Light'?colors.dark:colors.white,
  },
 
  infoText:{
    fontSize:10,
    color:MODE==='Light'?'#9E9E9E':colors.white,
    fontWeight:'500'

  },



box:{
  width:width,

  backgroundColor:MODE==='Light'?colors.white:colors.dark,
  marginBottom:5,
  display:'flex',
  padding:10,
  
    },

catItems:{
flex:1,
marginHorizontal:5,
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
  profileDoc:{
    width:170,
    height:170,
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
  },
  title:{
    fontSize:20,
    fontWeight:'600',
    color:MODE==='Light'?colors.dark:colors.white,
    width:(width/2)-50

  },
  progress:{
    width:width-100,
    backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark,
    height:10,
    marginHorizontal:10
  },
  progressItem:{
    width:width-200,
    backgroundColor:colors.navyBlue,
    height:10
  }
})