import { View, Text,Image } from 'react-native'
import React,{useEffect} from 'react'
import {Auth} from 'aws-amplify';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from '../screens/ProfileScreen/Profile'
import HomeScreen from '../screens/HomeScreen'
const Tab=createBottomTabNavigator();
const TabNavigation = ({navigation}) => {
  const signOut = () => {
    Auth.signOut();
  };
  return (
    
    <Tab.Navigator
    screenOptions={{
        tabBarHideOnKeyboard:true,
        headerTitleAlign:'center'
    }}
    >
        <Tab.Screen name='Homepage' component={HomeScreen}
        options={{
          tabBarIcon:({})=>{
            return (
            <View
            style={{
              display:'flex',
              alignItems:'center'
            }}
            >
            <Image
            source={require('../../assets/images/home.png')}
            style={{
              tintColor:'#000',
              height:30,
              width:30,
              justifyContent:'center'
            }}
            />
            </View>
            );
          }
        }}
        /> 
        <Tab.Screen name='Profile' component={Profile}
        options={{
          tabBarIcon:({})=>{
            return (
            <View
            style={{
              display:'flex',
              alignItems:'center'
            }}
            >
            <Image
            source={require('../../assets/images/profile.png')}
            style={{
              tintColor:'#000',
              height:30,
              width:30,
              justifyContent:'center'
            }}
            />
            </View>
            );
          }
        }}
        />
        <Tab.Screen name="Signout" component={Profile}
        options={{
          tabBarIcon:({})=>{
            return (
            <View
            style={{
              display:'flex',
              alignItems:'center'
            }}
            >
            <Image
            source={require('../../assets/images/logout.png')}
            style={{
              tintColor:'#000',
              height:30,
              width:30,
              justifyContent:'center'
            }}
            />
            </View>
            );
          }
        }}
        listeners={{
          tabPress:(e)=>{
            e.preventDefault()
            signOut();
          }
        }}
        />

    </Tab.Navigator>
    
  )
}

export default TabNavigation