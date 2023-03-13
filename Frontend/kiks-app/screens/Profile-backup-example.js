import React,{useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';

// This is for test purposes 

// This code shows from users list 
// one users id , username , teamname , teamsscore and roomcode 
// using data.map 

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url ="http://50.112.215.42/users/"

  useEffect(() => {
  fetch(url, {mode: 'cors'})
    .then((resp) => resp.json())
    .then((json) => setData(JSON.parse(json)))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);

  return (
    <View>
      <Text>Hello World</Text>
   
    <View >
  {loading ? (
    <Text>Loading...</Text>
  ) : (
    data.map((user) => {
      return (
        <View key={user._id}>
          <Text >{user._id}</Text>
          <Text >{user.username}</Text>
          <Text >{user.teamname}</Text>
          <Text > {user.teamscore}</Text>
          <Text > {user.roomcode} </Text>
        </View>
      );
    })

  )}
</View>
 </View>
  );
}