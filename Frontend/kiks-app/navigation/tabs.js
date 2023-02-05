import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import LeaderBoard from '../screens/LeaderBoard';
import Profile from '../screens/Profile';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function NavTab() {
  return (
      <Tab.Navigator>
         <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="LeaderBoard" component={LeaderBoard} />
      </Tab.Navigator>
  );
}