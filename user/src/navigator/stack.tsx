
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const StackNavigator=()=>{

    return <Stack.Navigator screenOptions = {{headerShown:false}}>


{/* //place only screen that require bottom tab here */}
   {/* <Stack.Screen  name='Dashboard'>{(props:any) =><Dashboard  {...props}  />}</Stack.Screen>  */}
 

  </Stack.Navigator>
  
  }

export default StackNavigator