
import { ActivityIndicator, FlatList, Text, View , StyleSheet} from 'react-native';
//Navigation import
import {useEffect, useState} from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Avatar, Button, Card } from 'react-native-paper';


const Stack = createNativeStackNavigator();

export default function TestScreen({navigation,route}){

  // API Call Code 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `http://50.112.215.42/teams/username/${route.params.username}`;

  useEffect(() => {
  fetch(url)
    .then((resp) => resp.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);
  

  return (
    <View style={styles.mainContainer}>
   
    {loading ? (
        <ActivityIndicator />
      ) : (
        <View >
      <Text style={styles.name}>Hi {route.params.username}   </Text>
    </View>
      )}

      <Text style={styles.displayText} > Your current room code is </Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.roomCodeContainer} >
      <Text style={styles.roomCode}>{route.params.roomcode}</Text>
    </View>
)}

      <Text style={styles.displayText} > Your team name is </Text>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.teamNameContainer} key={data._id}>
      <Text  style={styles.teamName}>{data.teamName}</Text>
    </View>
      )}
      

        <Button style={styles.buttonStyle} onPress={() =>
        navigation.goBack()}>
          <Text style={{color: 'white', fontSize: 20}}>
                Exit Team
          </Text>
            
        </Button>

        <View style={{flex: 1, padding: 24}}>


    </View>
      
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