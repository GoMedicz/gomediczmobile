/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {  Dimensions } from 'react-native';
import {  createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Language from './src/screens/onboarding/language';
import Splash from './src/screens/onboarding/splash';
import DrawerContent from './src/components/sidebar';
import Welcome from './src/screens/onboarding/welcome';
import SignIn from './src/screens/onboarding/signin';
import Register from './src/screens/onboarding/register';
import Verification from './src/screens/onboarding/verification';
import BottomTabs from './src/components/bottomTabs';
import Wallet from './src/screens/more/wallet/wallet';
import SendMoney from './src/screens/more/wallet/sendMoney';
import ChosePayment from './src/screens/more/wallet/payment';
import Theme from './src/screens/onboarding/Theme';
import Contact from './src/screens/onboarding/Contact';
import Terms from './src/screens/onboarding/Terms';
import Faqs from './src/screens/onboarding/Faqs';
import Password from './src/screens/onboarding/Password';
import Orders from './src/screens/cart/Orders';
import OrderDetails from './src/screens/cart/OrderDetails';
import RiderMapView from './src/screens/cart/RiderMapView';
import ChatDelivery from './src/screens/cart/ChatDelivery';
import AccountProfile from './src/screens/vendor/AcountProfile';
import StoreProfile from './src/screens/vendor/StoreProfile';
import Insight from './src/screens/more/Insight';
import Earnings from './src/screens/more/Earnings';
import StoreItems from './src/screens/store/StoreItems';
import EditItem from './src/screens/store/EditItem';
import AddItem from './src/screens/store/AddItem';

const {width, height} = Dimensions.get('screen');

const isLargeScreen = width >= 768;
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();




const StackNavigator=()=>{

  return <Stack.Navigator screenOptions = {{headerShown:false}}>
 
 
 {/* //place all screen that doesnt require bottom tab here  */}
 
 <Stack.Screen  name='Splash'>{(props:any) =><Splash  {...props}  />}</Stack.Screen>
 


<Stack.Screen  name='SignIn'>{(props:any) =><SignIn  {...props}  />}</Stack.Screen>

<Stack.Screen  name='StoreItems'>{(props:any) =><StoreItems {...props}  />}</Stack.Screen>

<Stack.Screen  name='Insight'>{(props:any) =><Insight {...props}  />}</Stack.Screen>
<Stack.Screen  name='OrderDetails'>{(props:any) =><OrderDetails  {...props}  />}</Stack.Screen>
<Stack.Screen  name='StoreProfile'>{(props:any) =><StoreProfile {...props}  />}</Stack.Screen>

<Stack.Screen  name='AddItem'>{(props:any) =><AddItem {...props}  />}</Stack.Screen>

<Stack.Screen  name='EditItem'>{(props:any) =><EditItem {...props}  />}</Stack.Screen>




<Stack.Screen  name='Theme'>{(props:any) =><Theme {...props}  />}</Stack.Screen>
<Stack.Screen  name='AccountProfile'>{(props:any) =><AccountProfile {...props}  />}</Stack.Screen>

{/* 
<Stack.Screen  name='SendMoney'>{(props:any) =><SendMoney {...props}  />}</Stack.Screen> */}
<Stack.Screen  name='Orders'>{(props:any) =><Orders  {...props}  />}</Stack.Screen>


<Stack.Screen  name='Wallet'>{(props:any) =><Wallet {...props}  />}</Stack.Screen>

<Stack.Screen  name='SendMoney'>{(props:any) =><SendMoney {...props}  />}</Stack.Screen>


<Stack.Screen  name='Earnings'>{(props:any) =><Earnings {...props}  />}</Stack.Screen>




 <Stack.Screen  name='Language'>{(props:any) =><Language  {...props}  />}</Stack.Screen>
 
 <Stack.Screen  name='Password'>{(props:any) =><Password {...props}  />}</Stack.Screen>
<Stack.Screen  name='Faqs'>{(props:any) =><Faqs {...props}  />}</Stack.Screen>

 <Stack.Screen  name='Terms'>{(props:any) =><Terms {...props}  />}</Stack.Screen>
<Stack.Screen  name='Contact'>{(props:any) =><Contact {...props}  />}</Stack.Screen>
<Stack.Screen  name='Verification'>{(props:any) =><Verification {...props}  />}</Stack.Screen>
<Stack.Screen  name='Register'>{(props:any) =><Register {...props}  />}</Stack.Screen>
<Stack.Screen  name='Welcome'>{(props:any) =><Welcome  {...props}  />}</Stack.Screen>


<Stack.Screen  name='RiderMapView'>{(props:any) =><RiderMapView {...props}  />}</Stack.Screen>

<Stack.Screen  name='ChatDelivery'>{(props:any) =><ChatDelivery {...props}  />}</Stack.Screen>













</Stack.Navigator>

}

const DrawerNavigator =()=>{
  return  <Drawer.Navigator  screenOptions={{ headerShown: false }}
  drawerContent={(props:any) => DrawerContent(props)}
  >

<Drawer.Screen name='Homes' component={StackNavigator} /> 
<Drawer.Screen name='BottomTabs' component={BottomTabs} />




 </Drawer.Navigator>
 }





 const App= () => {
 

  return (<>
    <NavigationContainer >

      <DrawerNavigator />  
      </NavigationContainer>  
    </>
  );
};

export default App;
