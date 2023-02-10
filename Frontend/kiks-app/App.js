import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NavTab from './navigation/tabs'
import { createStackNavigator } from '@react-navigation/stack';
import EnterGameScreen from './screens/EnterGameScreen';
import HomeScreen from './screens/HomeScreen';
import TriviaScreen from './screens/TriviaScreen';

const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator 
         screenOptions={{
          headerShown: false
        }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={EnterGameScreen} />
        <Stack.Screen name="NavTab" component={NavTab} />
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
