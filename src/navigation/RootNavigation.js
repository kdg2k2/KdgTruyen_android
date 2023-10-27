import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home';
import List from '../screen/List';
import Detail from '../screen/Detail';
import Reading from '../screen/Reading';
import CategoryFilter from '../screen/CategoryFilter';
import ListFilter from '../screen/ListFilter';
import History from '../screen/History';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        name="History"
        component={History}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <View
                  style={{
                    backgroundColor: focused ? '#6633FF' : '#fff',
                    borderRadius: 30,
                    marginBottom: 15,
                    padding: 10,
                  }}>
                  <Image
                    source={require('../asset/icon/history.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? '#fff' : '#747c94',
                    }}
                  />
                </View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <View
                  style={{
                    backgroundColor: focused ? '#4F4F4F' : '#fff',
                    borderRadius: 30,
                    marginBottom: 15,
                    padding: 10,
                  }}>
                  <Image
                    source={require('../asset/icon/home.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? '#fff' : '#747c94',
                    }}
                  />
                </View>
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
                <View
                  style={{
                    backgroundColor: focused ? '#FF6600' : '#fff',
                    borderRadius: 30,
                    marginBottom: 15,
                    padding: 10,
                  }}>
                  <Image
                    source={require('../asset/icon/list.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? '#fff' : '#747c94',
                    }}
                  />
                </View>
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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Reading" component={Reading} />
        <Stack.Screen name="CategoryFilter" component={CategoryFilter} />
        <Stack.Screen name="ListFilter" component={ListFilter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
