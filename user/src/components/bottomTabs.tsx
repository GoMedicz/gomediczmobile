import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import  Icon  from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../assets/colors';
import StackNavigator from '../navigator/stack';
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons' 
import LabTest from '../screens/home/labtest';
import MoreTab from '../screens/home/more';
import DoctorHome from '../screens/doctors/doctorHome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Hospital from '../screens/hospital/hospital';
import LabHome from '../screens/lab/LabHome';


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
    return (
      <View style={styles.btnWrapper} >
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
            
              <View style={[styles.tabButton, label==='add'?styles.centerButton:[]]}>
      
               <FontAwesome5Icon name={
                label==="Medicine"?"pills":
              label==="Lab Test"? "stethoscope":
              label==="Hospitals"? "map-marker-alt":
              label==="Doctors"? "user-md":
              "user"} 

              

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

<Tab.Screen  name='Medicine'>{(props:any) =><StackNavigator {...props}  />}</Tab.Screen>
<Tab.Screen  name='Doctors'>{(props:any) =><DoctorHome {...props}  />}</Tab.Screen>
<Tab.Screen  name='Hospitals'>{(props:any) =><Hospital {...props}  />}</Tab.Screen>
<Tab.Screen  name='Lab Test'>{(props:any) =><LabHome {...props}  />}</Tab.Screen>
<Tab.Screen  name='More'>{(props:any) =><MoreTab {...props}  />}</Tab.Screen>


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
    btnWrapper:{
      height:40,
      paddingBottom:10,
      paddingTop:8,
     paddingHorizontal:20,
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:colors.white,
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
      alignItems:'center'
    },
    selected:{


    }
  })