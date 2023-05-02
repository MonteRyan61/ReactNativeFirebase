import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthenticationScreen from './components/AuthenticationScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={AuthenticationScreen}
          options={{ title: 'Authentication Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
