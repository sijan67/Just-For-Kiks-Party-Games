import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NavTab from './navigation/tabs'
import { createStackNavigator } from '@react-navigation/stack';
import EnterGameScreen from './screens/StartScreen';
import HomeScreen from './screens/HomeScreen';
import TriviaScreen from './screens/TriviaScreen';
import EnterGameCode from './screens/EnterGameCode';
import EnterName from './screens/EnterName';
// import { Cache } from "react-native-cache";
// import {AsyncStorage} from 'react-native';

const Stack = createStackNavigator();

// const cache = new Cache({
//   namespace: "myapp",
//   policy: {
//       maxEntries: 50000, // if unspecified, it can have unlimited entries
//       stdTTL: 0 // the standard ttl as number in seconds, default: 0 (unlimited)
//   },
//   backend: AsyncStorage
// });


export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator 
         screenOptions={{
          headerShown: false
        }}
        initialRouteName="Login">
        <Stack.Screen name="EnterGameScreen" component={EnterGameScreen} />
        <Stack.Screen name="EnterName" component={EnterName} />
        <Stack.Screen name="EnterGameCode" component={EnterGameCode} />
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
