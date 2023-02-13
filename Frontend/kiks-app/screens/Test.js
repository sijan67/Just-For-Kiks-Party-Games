
import { Text, View , Button} from 'react-native';
//Navigation import
import { NavigationContainer  } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import HomeScreen from './HomeScreen'

const Stack = createNativeStackNavigator();

export default function TestScreen(){
  return (
    <View>
      <Text> Insert profile pic of user here in round form </Text>
      <Text> Show team members name selected for the user here </Text>
      
    </View>
  );
};
// const TestScreen2 = ({navigation, route}) => {
//   return (
//     <View>
//       <Text>This is {route.params.name}'s profile</Text>
//       <Button
//       title="Go back to Profile"
//       // onPress={() =>
//       //   navigation.navigate('TestScreen2', {name: 'Jane'})
//       // }
//       onPress={() =>
//         navigation.navigate('Profile')
//       }
//     />
//     </View>
 
//   );
// };

// export default function Profile() {
    
//     return (
//       // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       //   <Text>Profile</Text>
//       // </View>
    
//       <Stack.Navigator
//       screenOptions={{
//         headerShown: false
//       }}
//       >
//         <Stack.Screen
//           name="Home"
//           component={TestScreen}
          
//         />
//         <Stack.Screen name="TestScreen2" component={TestScreen2} />
//         <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       </Stack.Navigator>

//     );
//   }
  