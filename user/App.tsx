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
import Cart from './src/screens/cart/cart';
import ConfirmOrder from './src/screens/cart/confirmOrder';
import Payment from './src/screens/cart/payment';
import OrderPlaced from './src/screens/cart/OrderPlaced';
import Category from './src/screens/category/category';
import CategoryDetails from './src/screens/category/CategoryDetails';
import DrugDetails from './src/screens/category/DrugDetails';
import StoreItems from './src/screens/category/StoreItems';
import Reviews from './src/screens/category/Reviews';
import Offers from './src/screens/offer/Offer';
import DoctorsList from './src/screens/doctors/doctorsList';
import DoctorsDetails from './src/screens/doctors/doctorsDetails';
import DoctorReviews from './src/screens/doctors/DoctorReviews';
import Appointment from './src/screens/doctors/appointment';
import Feedback from './src/screens/doctors/feedback';
import HospitalDetails from './src/screens/hospital/hospitalDetails';

const {width, height} = Dimensions.get('screen');

const isLargeScreen = width >= 768;
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();




const StackNavigator=()=>{

  return <Stack.Navigator screenOptions = {{headerShown:false}}>
 
 {/* //place all screen that doesnt require bottom tab here  */}
 
 {/* <Stack.Screen  name='Splash'>{(props:any) =><Splash  {...props}  />}</Stack.Screen>
 */} 



{/* Place All these screen that doesnt require login here  */}
<Stack.Screen  name='Verification'>{(props:any) =><Verification {...props}  />}</Stack.Screen>
<Stack.Screen  name='Register'>{(props:any) =><Register {...props}  />}</Stack.Screen>
<Stack.Screen  name='SignIn'>{(props:any) =><SignIn  {...props}  />}</Stack.Screen>
  <Stack.Screen  name='Language'>{(props:any) =><Language  {...props}  />}</Stack.Screen>
 <Stack.Screen  name='Welcome'>{(props:any) =><Welcome  {...props}  />}</Stack.Screen>


{/* Place All these screen that  require login here  */}
<Stack.Screen  name='Cart'>{(props:any) =><Cart  {...props}  />}</Stack.Screen>
<Stack.Screen  name='ConfirmOrder'>{(props:any) =><ConfirmOrder  {...props}  />}</Stack.Screen>
<Stack.Screen  name='Payment'>{(props:any) =><Payment  {...props}  />}</Stack.Screen>
<Stack.Screen  name='OrderPlaced'>{(props:any) =><OrderPlaced  {...props}  />}</Stack.Screen>
<Stack.Screen  name='Category'>{(props:any) =><Category  {...props}  />}</Stack.Screen>
<Stack.Screen  name='CategoryDetails'>{(props:any) =><CategoryDetails  {...props}  />}</Stack.Screen>


<Stack.Screen  name='DrugDetails'>{(props:any) =><DrugDetails  {...props}  />}</Stack.Screen>
<Stack.Screen  name='StoreItems'>{(props:any) =><StoreItems  {...props}  />}</Stack.Screen>
<Stack.Screen  name='Reviews'>{(props:any) =><Reviews  {...props}  />}</Stack.Screen>
<Stack.Screen  name='Offers'>{(props:any) =><Offers  {...props}  />}</Stack.Screen>
<Stack.Screen  name='DoctorsList'>{(props:any) =><DoctorsList  {...props}  />}</Stack.Screen>
<Stack.Screen  name='DoctorsDetails'>{(props:any) =><DoctorsDetails  {...props}  />}</Stack.Screen>
<Stack.Screen  name='DoctorReviews'>{(props:any) =><DoctorReviews  {...props}  />}</Stack.Screen>
<Stack.Screen  name='Appointment'>{(props:any) =><Appointment  {...props}  />}</Stack.Screen>
<Stack.Screen  name='Feedback'>{(props:any) =><Feedback  {...props}  />}</Stack.Screen>


<Stack.Screen  name='HospitalDetails'>{(props:any) =><HospitalDetails  {...props}  />}</Stack.Screen>

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
