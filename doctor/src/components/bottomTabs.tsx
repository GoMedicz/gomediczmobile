import { View, StyleSheet, Dimensions, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../assets/colors';

import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import AccountProfile from '../screens/doctors/AcountProfile';
import Appointments from '../screens/more/appointment//MyAppointment';
import Reviews from '../screens/doctors/Reviews';
import { dynamicStyles } from './dynamicStyles';
import { useZustandStore } from '../api/store';

const {width} = Dimensions.get('screen');


const Tab = createBottomTabNavigator();

type RootStackParamList = {
  Login: undefined;
  Dashboard:{
    code:string
  }; 
  BottomTab:{
    code:string
  }
 };
 
 type Props = NativeStackScreenProps<RootStackParamList, 'BottomTab'>;



function CustomButton({ state, descriptors, navigation }:any) {

 const MODE = useZustandStore(s => s.theme);
 const dynamicStyle = dynamicStyles(MODE);
 
    return (
      <View style={dynamicStyle.btnWrapper} >
     {state.routes.map((route:any, index:number) => {
          const { options } = descriptors[route.key];

          const label =
          options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name; 
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
           
            >
            
              <View style={[styles.tabButton, isFocused?styles.selected:[], label==='add'?styles.centerButton:[]]}>
      
               <MaterialIcon name={
                label==="Appointments"?"event-available":
              label==="Reviews"? "thumbs-up-down":
              "person"} 

           

              size={20}   
              
              color={isFocused&&label!=='add' ? colors.primary : '#C5C4C9'} />  

 <Text style={{ color: isFocused ? colors.primary : '#C5C4C9', fontSize:10 }}> 
               {label}
              </Text>  
              </View>

            </TouchableOpacity>
          );
        })} 
      </View>
    );
  }

const BottomTabs =()=> {

    const CustomButtons = (props:any)=>{

        var isSelected = props.accessibilityState.selected
    
        if(isSelected){
    
          return  <TouchableOpacity 
          onPress={props.onPress} 
    
          style={styles.centerButton}>
            {props.children}
          
          </TouchableOpacity>
        }else{
          return props.children
        }
        
      }

    return (
      <Tab.Navigator
      
      screenOptions={{
        headerShown:false,
        tabBarShowLabel:true,
        tabBarActiveTintColor:colors.emerald
      
      }}

      tabBar={props => <CustomButton {...props} />} 

      >

<Tab.Screen  name='Appointments'>{(props:any) =><Appointments {...props}  />}</Tab.Screen>
<Tab.Screen  name='Reviews'>{(props:any) =><Reviews {...props}  />}</Tab.Screen>
<Tab.Screen  name='Accounts'>{(props:any) =><AccountProfile {...props}  />}</Tab.Screen>


      </Tab.Navigator>
    );
  }

export default BottomTabs

const styles = StyleSheet.create({
    centerButton:{
      height:50,
      top:-20,
      width:50,
      borderRadius:25,
      backgroundColor:colors.emerald,
      alignItems:'center',
      justifyContent:'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
      
    },
    tabButton:{
      justifyContent:'center',
      alignItems:'center',
      height:50,
      width:width/3
    },
    selected:{
      borderTopWidth:2,
      borderTopColor:colors.primary,
      
    }
  })