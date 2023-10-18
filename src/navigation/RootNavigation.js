import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home';
import List from '../screen/List';
import Detail from '../screen/Detail';
import Reading from '../screen/Reading';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Reading" component={Reading} />
    </Stack.Navigator>
  );
}

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          borderRadius: 15,
          height: 60,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}>
      <Tab.Screen
        name="KdgTruyen"
        component={StackNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={require('../asset/icon/home.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    marginBottom: 15,
                    tintColor: focused ? 'green' : '#747c94',
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="List"
        component={List}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={require('../asset/icon/list.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    marginBottom: 15,
                    tintColor: focused ? 'green' : '#747c94',
                  }}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

function RootNavigation() {
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
}

export default RootNavigation;
