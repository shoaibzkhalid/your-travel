import { View, Text, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import { COLORS } from '../theme/colors';
import { UserContextProvider } from '../state/userContext';
import { bottomTabs } from '../config/constants';

const Tab = createBottomTabNavigator();

const TabNavigation = ({ navigation }) => {
  return (
    <UserContextProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerTitleAlign: 'center',
          headerShown: false,
        }}
        // initialRouteName="Profile"
      >
        {bottomTabs.map(tab => (
          <Tab.Screen
            key={tab.name}
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
    </UserContextProvider>
  );
};

export default TabNavigation;
