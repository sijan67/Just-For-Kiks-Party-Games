import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NavTab from './navigation/tabs'

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Just For Kiks Party Games</Text>
    //   <Text> This is funnnn ^^</Text>
    //   <StatusBar style="auto" />
    // </View>
    
      
    <NavigationContainer><NavTab/></NavigationContainer>

   

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
