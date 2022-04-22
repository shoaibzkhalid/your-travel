import { View, Text, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/ProfileScreen/Profile';
import HomeScreen from '../screens/HomeScreen';
import auth from '@react-native-firebase/auth';
import { COLORS } from '../theme/colors';
import { ICONS } from '../theme/icons';

const Tab = createBottomTabNavigator();

const TabNavigation = ({ navigation }) => {
  const tabs = [
    {
      name: 'Explore',
      component: HomeScreen,
      icon: ICONS.explore,
    },
    {
      name: 'Profile',
      component: Profile,
      icon: ICONS.profile,
    },

    {
      name: 'Logout',
      component: Profile,
      icon: ICONS.logout,
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerTitleAlign: 'center',
        headerShown: false,
      }}>
      {tabs.map(tab => (
        <Tab.Screen
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={tab.icon}
                    style={{
                      tintColor: focused ? COLORS.primary : '#000',
                      height: 30,
                      width: 30,
                      justifyContent: 'center',
                    }}
                  />
                </View>
              );
            },
            tabBarLabel: ({ focused }) => {
              return (
                <Text style={{ color: focused ? COLORS.primary : 'black' }}>
                  {tab.name}
                </Text>
              );
            },
          }}
          listeners={{
            tabPress: e => {
              if (tab.name !== 'Logout') return;
              e.preventDefault();
              auth().signOut();
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
