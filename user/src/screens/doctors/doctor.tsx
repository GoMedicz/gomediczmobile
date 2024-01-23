
import React from 'react'

import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, TextInput } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import colors from '../../assets/colors'
import { globalStyles } from '../../components/globalStyle';
import { CURRENCY, ImagesUrl } from '../../components/includes';
import { FormatNumber, getAge } from '../../components/globalFunction';
const {width} = Dimensions.get('screen');
const height =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );


 const Doctor =(props:any)=> {

    const item = props.item

    const handleDetails =(item:any)=>{
        props.navigation.navigate('DoctorsDetails', {
         code:item.doctor_code,
         title:item.category
       });  
     }

  return ( <Pressable onPress={()=>handleDetails(item)} style={[styles.box]}>


<View style={styles.content}>

<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:item.image_url!=='' && item.image_url!==null ?ImagesUrl+"/doctors/"+item.image_url:ImagesUrl+"/no.png"}} style={styles.profile} />
    
    <View style={[{display:'flex'}, {marginLeft:2}]}>
      <Text style={{color:colors.dark, fontSize:12, fontWeight:'600', marginBottom:2}}>{item.fullname}</Text>


      <Text style={styles.infoText}>{item.job_title} <Text style={{color:colors.grey, opacity:0.5}}>at</Text> {item.office}</Text>


<View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:10}}>

      <Text style={[styles.infoText]}>Exp. <Text style={{color:colors.dark}}>{getAge(item.date_started)} years</Text> </Text>


      <Text style={[styles.infoText, {marginLeft:10}]}>Fees <Text style={{color:colors.dark}}>{CURRENCY+ FormatNumber(item.fees)}</Text></Text>
      </View>
    </View> 
</View>

 
  <View style={[globalStyles.rowCenterCenter, { position:'absolute', bottom:5, right:5}]}>
      <View style={[globalStyles.rowCenterCenter]}>
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={'#EEA31E'}  />
      <MaterialIcon name="star" size={12} color={colors.grey}  />
      </View>
      <Text style={styles.infoText}>(20)</Text>
  </View> 

</View>

      </Pressable>
  )
}
export default Doctor
const styles = StyleSheet.create({

    box:{
        width:width,
        backgroundColor:colors.white,
        marginBottom:5,
        display:'flex',
        paddingVertical:10,
        paddingHorizontal:5
        
          },
          profile:{
            width:60,
            height:60,
            resizeMode:'contain'
          },
         content:{
            display:'flex', 
            flexDirection:'row', 
            justifyContent:'space-between', 
            alignItems:'center', 
          },
          infoText:{
            fontSize:10,
            color:'#9E9E9E',
            fontWeight:'500'
        
          },
})