
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
  // const { username } = route.params.username;


  // const url ="http://50.112.215.42/users/Kevin"
  // const url = `http://50.112.215.42/users/${username}`;
  const url = `http://50.112.215.42/users/${route.params.username}`;

  useEffect(() => {
  fetch(url)
    .then((resp) => resp.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);
  

  return (
    <View style={styles.mainContainer}>
    {/* <Text style={styles.name}> Hi Sijan,  </Text> */}
   
    {loading ? (
        <ActivityIndicator />
      ) : (
        <View >
      <Text style={styles.name}>Hi {route.params.username} </Text>
    </View>
      )}

      <Text style={styles.displayText} > Your current room code is </Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.roomCodeContainer} >
      <Text style={styles.roomCode}>{data.roomcode}</Text>
    </View>
)}

      <Text style={styles.displayText} > Your team name is </Text>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.teamNameContainer} key={data._id}>
      <Text  style={styles.teamName}>{data.teamname}</Text>
    </View>
      )}
      

      <Button style={styles.buttonStyle} onPress={() =>
        navigation.navigate('EnterGameCode')}>
          <Text style={{color: 'white', fontSize: 20}}>
                Exit Room
          </Text>
            
        </Button>

        <View style={{flex: 1, padding: 24}}>
      {/* <Text style ={{padding: 20, marginBottom: 20, backgroundColor: 'pink',borderWidth: 5,
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>{'Safewalk Get Request Test'}</Text> */}
      {/* {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
      <Text >{data.username}</Text>
      <Text>{data.teamname}</Text>
      <Text>{data.roomcode}</Text>
    </View>
      )} */}

{/* {loading ? (
        <ActivityIndicator />
      ) : (
        <View key={data._id}>
      <Text >{data.roomcode}</Text>
    </View>
)} */}


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