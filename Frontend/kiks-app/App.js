import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import NavTab from './navigation/tabs'
import { createStackNavigator } from '@react-navigation/stack';
import EnterGameScreen from './screens/StartScreen';
import HomeScreen from './screens/HomeScreen';
import EnterGameCode from './screens/EnterGameCode';
import ChooseTeam from './screens/ChooseTeam'
import EnterName from './screens/EnterName';
import LeaderBoard from './screens/LeaderBoard';

const Stack = createStackNavigator();

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
        <Stack.Screen name="ChooseTeam" component={ChooseTeam} />

        <Stack.Screen name="NavTab" component={NavTab} />
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="LeaderBoard" component={LeaderBoard}/>

      </Stack.Navigator>
    </NavigationContainer>

  );
}

