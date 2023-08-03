
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/home/dashboard';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const StackNavigator=()=>{

    return <Stack.Navigator screenOptions = {{headerShown:false}}>


{/* //place only screen that require bottom tab here, such as profile, dashboard */}
    <Stack.Screen  name='Dashboard'>{(props:any) =><Dashboard  {...props}  />}</Stack.Screen>  
 

  </Stack.Navigator>
  
  }

export default StackNavigator