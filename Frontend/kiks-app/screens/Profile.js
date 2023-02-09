
import { Text, View , Button} from 'react-native';
//Navigation import
import { NavigationContainer  } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import HomeScreen from './HomeScreen'

const Stack = createNativeStackNavigator();

const TestScreen = ({navigation}) => {
  return (
    <Button
      title="Enter Room"
      // onPress={() =>
      //   navigation.navigate('TestScreen2', {name: 'Jane'})
      // }
      onPress={() =>
        navigation.navigate('HomeScreen')
      }
    />
  );
};
const TestScreen2 = ({navigation, route}) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

export default function Profile() {
    
    return (
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //   <Text>Profile</Text>
      // </View>
    
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TestScreen}
          
        />
        <Stack.Screen name="TestScreen2" component={TestScreen2} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>

    );
  }
  