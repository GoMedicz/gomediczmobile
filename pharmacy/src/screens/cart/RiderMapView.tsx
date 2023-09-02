
import React, { useCallback, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, Platform, Dimensions, Pressable, ImageBackground } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import colors from '../../assets/colors';
import { ImagesUrl} from '../../components/includes';
import { globalStyles } from '../../components/globalStyle';
import { PrimaryButtonChildren } from '../../components/include/button';
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
  RiderMapView: undefined;
  ChatDelivery:undefined; 
  SearchLab:{
     code:string;
   }
   };

type Props = NativeStackScreenProps<RootStackParamList, 'RiderMapView'>;
 const RiderMapView =({ route, navigation }:Props)=> {

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE)

interface item {
  title:string,
  isDefault:string,
  id:number
}



const handleNext =()=>{
  navigation.navigate('ChatDelivery');
}




  const CardCategory =({item}:{item:any})=>{
    return <Pressable onPress={handleNext} style={[styles.box]}>

    
<Text style={{color:colors.dark, fontSize:14, fontWeight:'600'}}>City Cure Labs</Text>

<View style={{display:'flex', flexDirection:'row', marginTop:5}}>
<MaterialIcon name="add-location" size={14} color={colors.grey}  />
<Text style={[styles.infoText]}>Wallington Bridge</Text>
</View>


<Text style={[styles.infoText, {marginTop:10, color:colors.navyBlue}]}>120+ Tests available</Text>


      </Pressable>
    }


  

    
  const onRefresh = useCallback(()=>{
    setRefreshing(false)
   // FetchContent()
    }, [])

  return (<View style={[ {flex:1, backgroundColor:colors.lightSkye}]}>
    

    <ImageBackground 
    source={{uri:ImagesUrl+'/hospital/hos.jpeg'}}
    
    style={styles.mapView}
    
    >
      

    
<View style={{position:'absolute', bottom:0, backgroundColor:MODE==='Light'?colors.white:colors.dark}}>


<View style={[globalStyles.rowCenterBetween, {padding:15}]}>


<View style={globalStyles.rowCenterCenter}>
<Image source={{ uri:ImagesUrl+"/doctors/doc1.png" }} style={styles.profile} />

<View style={{marginLeft:10}}>
  <Text style={dynamicStyle.label}>George Anderson</Text>
  <Text style={styles.infoText}>Delivery Partner Assign</Text>
  </View>
  </View>



</View>


<View style={globalStyles.rowCenterBetween}>

<PrimaryButtonChildren

handleAction={handleNext}
style={{width:width/2, backgroundColor:MODE==='Light'?colors.lightSkye:colors.lightDark}}
>

<View style={[globalStyles.rowCenterBetween, { padding:10, width:width/2, justifyContent:'flex-start' }]}>
  <MaterialIcon name="call" size={18} color={colors.primary}  />
  <Text style={[globalStyles.buttonText, {marginLeft:80, color:colors.primary}]}>Call</Text> 
  </View>
</PrimaryButtonChildren>


<PrimaryButtonChildren
handleAction={handleNext}
style={{width:width/2}}
>

<View style={[globalStyles.rowCenterBetween, { padding:10, width:width/2, justifyContent:'flex-start' }]}>
  <MaterialIcon name="chat" size={18} color={colors.white}  />
  <Text style={[globalStyles.buttonText, {marginLeft:80}]}>Chat</Text> 
  </View>
</PrimaryButtonChildren>
</View>

</View>

    </ImageBackground>


    </View>
  )
}


export default RiderMapView

const styles = StyleSheet.create({
 
  infoText:{
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'500'

  },

box:{
  width:width-100,
  backgroundColor:colors.white,
  display:'flex',
  padding:20,
  marginHorizontal:10,
  
    },

mapView:{

  height:height,
  width:width

},
 
  profile:{
    width:40,
    height:40,
    borderRadius:5,
    resizeMode:'contain'
  },
})