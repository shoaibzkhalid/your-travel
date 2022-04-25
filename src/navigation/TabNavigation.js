import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import auth from '@react-native-firebase/auth'
import { COLORS } from '../theme/colors'
import { bottomTabs } from '../config/constants'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  const user = auth().currentUser

  /// Bottom tabs -- Home, Profile, logout
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerTitleAlign: 'center',
        headerShown: false,
        tabBarStyle: { height: hp(11) },
        tabBarItemStyle: {
          marginTop: 10,
        },
      }}>
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
                  {user.photoURL && tab.name === 'Profile' ? (
                    <Image
                      source={{ uri: user.photoURL }}
                      style={{
                        height: 35,
                        width: 35,
                        borderRadius: 20,
                        marginBottom: 5,
                      }}
                    />
                  ) : (
                    <Image
                      source={tab.icon}
                      style={{
                        tintColor: focused ? COLORS.primary : '#000',
                        height: 30,
                        width: 30,
                        justifyContent: 'center',
                      }}
                    />
                  )}
                </View>
              )
            },
            tabBarLabel: ({ focused }) => {
              return (
                <Text style={{ color: focused ? COLORS.primary : 'black', marginTop: 4 }}>
                  {tab.name}
                </Text>
              )
            },
          }}
          listeners={{
            tabPress: e => {
              // Signing out user
              if (tab.name !== 'Logout') return
              e.preventDefault()
              auth().signOut()
            },
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default TabNavigation
