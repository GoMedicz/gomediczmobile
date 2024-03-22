
import React, { useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, Platform, Dimensions } from 'react-native'
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 

import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
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
  Terms: undefined;
    Welcome:undefined; 
   
    BottomTabs:undefined;
   };

type Props = NativeStackScreenProps<RootStackParamList, 'Terms'>;
 const Terms =({ route, navigation }:Props)=> {

  const MODE = useZustandStore(s => s.theme);
  const dynamicStyle = dynamicStyles(MODE)




  const handleBack =()=>{
    navigation.navigate('BottomTabs');
  }
  
  

return (<SafeAreaView style={{flex:1, backgroundColor:MODE==='Light'?colors.white:colors.dark}}>
    
    <View style={dynamicStyle.header}>
    <MaterialIcon name="arrow-back-ios" onPress={handleBack} size={18} color={MODE==='Light'?colors.dark:colors.white}  /> 
    <Text style={dynamicStyle.label}>Terms & Conditions</Text>
    
    <View/>
    </View>


<ScrollView>
    <View style={[ {flex:1, marginHorizontal:10, marginTop:0}]}>

<Text style={[dynamicStyle.label, {fontWeight:'500', marginVertical:10, textAlign:'justify'}]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem animi laboriosam similique hic quaerat, fugit quo quae, molestias modi quod temporibus saepe reiciendis exercitationem, ea quia reprehenderit totam soluta pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum natus repudiandae vel dignissimos facere itaque. Ea atque corporis quia, nemo nulla, laborum unde officiis, ducimus assumenda placeat reprehenderit enim vitae!</Text>


<Text style={[dynamicStyle.label, {fontWeight:'500', marginVertical:10}]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem animi laboriosam similique hic quaerat, fugit quo quae, molestias modi quod temporibus saepe reiciendis exercitationem, ea quia reprehenderit totam soluta pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum natus repudiandae vel dignissimos facere itaque. Ea atque corporis quia, nemo nulla, laborum unde officiis, ducimus assumenda placeat reprehenderit enim vitae!</Text>


<Text style={[dynamicStyle.label, {fontWeight:'500', marginVertical:10}]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem animi laboriosam similique hic quaerat, fugit quo quae, molestias modi quod temporibus saepe reiciendis exercitationem, ea quia reprehenderit totam soluta pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum natus repudiandae vel dignissimos facere itaque. Ea atque corporis quia, nemo nulla, laborum unde officiis, ducimus assumenda placeat reprehenderit enim vitae!</Text>
</View> 

</ScrollView>

    </SafeAreaView>
  )
}

export default Terms

