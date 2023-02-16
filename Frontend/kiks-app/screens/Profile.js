
import { Text, View , StyleSheet} from 'react-native';
//Navigation import
import { NavigationContainer  } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Avatar, Button, Card } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function TestScreen({navigation}){
  return (
    <View style={styles.mainContainer}>
    <Text style={styles.name}> Hi Sijan,  </Text>
      <Text style={styles.displayText} > Your current room code is </Text>
      <View style={styles.roomCodeContainer}>
        <Text style={styles.roomCode}>  1234 </Text>
      </View>

      <Text style={styles.displayText} > Your team name is </Text>
      <View style={styles.teamNameContainer}>
        <Text  style={styles.teamName}> Team Triceps </Text>
      </View>
      <Button style={styles.buttonStyle} onPress={() =>
        navigation.navigate('EnterGameCode')}>
          <Text style={{color: 'white', fontSize: 20}}>
                Exit Room
          </Text>
            
        </Button>
      
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    alignItems: 'center',
    backgroundColor: '#ffeee6'
  },
  name:{
    marginTop: 100, 
    fontWeight: '700',
    fontSize: 40
  },
  displayText:{
    fontWeight: '300', 
    fontSize: 30,
    marginTop: 40
  },
  roomCodeContainer: {
    backgroundColor: '#edbec9',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  roomCode: {
    fontWeight: '600', 
    fontSize: 20
  },
  teamNameContainer: {
    backgroundColor: '#edd834',
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  teamName: {
    fontWeight: '600', 
    fontSize: 20,
    color: 'black'
  },
  buttonStyle:{
    marginTop: 100,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12,
    width: 230
  }
})