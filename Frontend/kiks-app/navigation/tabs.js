import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import LeaderBoard from '../screens/LeaderBoard';
import Profile from '../screens/Profile';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
// import Icon from 'react-native-ionicons'
// import {IonIcons} from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/Ionicons';

const CustomTabBarButton = ({ children, onPress}) =>(
  <TouchableOpacity
  style={{
    top: -10, 
    justifyContent: 'center',
    alignItems: 'center', 
    ... styles.shadow
  }
  }
  onPress = {onPress}
  >
    <View style={{
      width: 100, 
      height: 100, 
      borderRadius: 50, 
      backgroundColor: 'black'
    }}>
      {children}
    </View> 
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#92cff0', 
    shadowOffset: {
      width: 0, 
      height: 10,
    }, 
    shadowOpacity: 0.25 ,
    shadowRadius: 3.5 , 
    elevation: 5
  }
})

const screenOptions = {
  tabBarShowLabel: false,
  tabBarStyle:{
    position: 'absolute',
    backgroundColor:'#d15732',
    height:100,
    left: 10, 
    right: 10, 
    bottom: 20,
    elevation: 0,
    borderRadius: 15,
    height: 90, 
    ...styles.shadow
  },
};

export default function NavTab() {
  
  return (
      <Tab.Navigator {...{ screenOptions }}>
        <Tab.Screen name="Profile" component={Profile} 
          options={{
          tabBarIcon: ({focused})=>(
            <View style={{alignItems: 'center', justifyContent:'center', top:10}}>
              <Icon name="person" size={30} 
             style={{color: focused?"white":"#0a1d36"}}
             />
             <Text style={{color: focused?"white":"#0a1d36"}}>Profile</Text>
            </View>    
  ),
        }}/>
       
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{tabBarIcon: ({focused})=>(
            <View style={{alignItems: 'center', justifyContent:'center', top:10}}>
              <Icon name="home" size={45} 
            style={{
              color: focused?"white":"#e3967f", bottom: 10}}/>
            </View>
          ),
          tabBarButton: (props)=> (
            <CustomTabBarButton {...props}/>
          ) 
          } 
        }
        >
        </Tab.Screen>
        <Tab.Screen name="LeaderBoard" component={LeaderBoard}
        options={{
          tabBarIcon: ({focused})=>(
            <View style={{alignItems: 'center', justifyContent:'center', top:10}}>
              <Icon name="trophy" size={30} 
            style={{color: focused?"white":"#0a1d36"}}/>
            <Text style={{ color: focused?"white":"#0a1d36"}}>Leader Board</Text>
            </View>
          ),
        }} 
        />
      </Tab.Navigator>
  );
}
