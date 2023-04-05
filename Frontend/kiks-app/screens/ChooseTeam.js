// import React from 'react';
// import { StyleSheet, Text, View ,TextInput, SafeAreaView, ScrollView, StatusBar,Pressable, ImageBackground } from 'react-native';
// import { Avatar, Button, Card } from 'react-native-paper';
// import {useEffect} from "react";
// import LinearGradient from 'expo-linear-gradient';

// const styles = StyleSheet.create({
//     shadow: {
//       shadowColor: '#92cff0', 
//       shadowOffset: {
//         width: 0, 
//         height: 10,
//       }, 
//       shadowOpacity: 0.25 ,
//       shadowRadius: 3.5 , 
//       elevation: 5
//     },
//     textStyle:{
//         fontSize: 30, 
//         marginTop: 30,
//         color: 'white',
//         fontWeight: '500'
//     }, 
//     main:{ 
//         flex:1,
//         backgroundColor: '#ff6666',
//         justifyContent: 'center', 
//         alignItems: 'center'
//     },
//     input: {
//         height: 40,
//         margin: 12,
//         borderWidth: 1,
//         borderColor: 'red',
//         padding: 10,
//         width: 250,
//         height: 50,
//         borderRadius: 10,
//         color: 'white',
//         marginTop: 30,
//         marginBottom: 100
//       },
//     buttonStyle:{
//         alignItems: 'center',
//         backgroundColor: '#DDDDDD',
//         padding: 12,
//         width: 250,
//         marginTop: 70,
//         marginBottom: 10    
//       },
//     buttonStyle2:{
//         alignItems: 'center',
//         backgroundColor: '#DDDDDD',
//         padding: 12,
//         width: 250,
//         marginTop: 30,
//         marginBottom: 10  
//       },
// })


// export default function EnterGameCode({navigation, route}){
//   const [text, onChangeText] = React.useState('Useless Text');
//   const [number, onChangeNumber] = React.useState('');
//   const { username } = route.params;

//   const handlePress = () => {
//     const teamName = Math.random() < 0.5 ? 'cool' : 'cool2';
//     fetch('http://50.112.215.42/users/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         username: username,
//         teamname: teamName,
//         teamscore: 0,
//         roomcode: 10000000
//       }),
//     })
//     .then(response => response.json())
//     .then(data => {

//       // navigate to NavTab screen with username as a parameter
//       navigation.navigate('NavTab', { username: username });
//     })
//     .catch(error => console.error(error));
//   };

//   return (
//     <View style={styles.main}>
//       <Text style={styles.textStyle}>
//         Choose your team
//       </Text>
//       <Text style={{marginTop: 15, fontSize: 28, 
//         color: 'white',
//         fontWeight: '500'}}>
//       {username} 
//       </Text>

//       <Button style={styles.buttonStyle} onPress={handlePress}>
//         <Text style={{color: 'black', fontSize: 20}}>
//           Team A
//         </Text>
//       </Button>

//       <Button style={styles.buttonStyle2} >
//         <Text style={{color: 'black', fontSize: 20}}>
//           Team B
//         </Text>
//       </Button>
//     </View>

//   );
// };

import React, { useState, useEffect } from 'react';
import {SafeAreaView,TextInput, StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ff6666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    width: 250,
    height: 50,
    borderRadius: 10,
    color: 'white',
    marginTop: 20
  },
  textStyle: {
    fontSize: 30,
    marginTop: 30,
    color: 'white',
    fontWeight: '500',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 12,
    width: 250,
    marginTop: 70,
    marginBottom: 10,
  },
  buttonStyle2: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 12,
    width: 250,
    marginTop: 30,
    marginBottom: 10,
  },
});

// Predefined dictionary
const predefinedTeams = {
  // 'Team A': 3,
  // 'Team B': 2,
};

export default function EnterGameCode({ navigation, route }) {
  const [teams, setTeams] = useState(null);
  const { username } = route.params;

  useEffect(() => {
    //Assign the predefined dictionary to the teams state
    setTeams(predefinedTeams);
  }, []);

  const handlePress = (teamName) => {
    console.log(`Joined ${teamName}`);
    navigation.navigate('NavTab', { username: username });
  };

  if (!teams) {
    return <Text>Loading...</Text>;
  }

  const availableTeams = Object.keys(teams);

  return (
    <View style={styles.main}>
      <Text
        style={{
          marginTop: 15,
          fontSize: 28,
          color: 'white',
          fontWeight: '500',
        }}
      >
       Hi {username} , 
      </Text>

      {availableTeams.length === 0 && (
        <View>
        <Text
        style={{
          marginTop: 30,
          fontSize: 19,
          color: 'white',
          fontWeight: '500',
          
        }}
      >
         Please enter your team name  {'\n'}            to create a team.  
         </Text>
         <SafeAreaView>
         <TextInput
           style={styles.input}
         //   onChangeText={onChangeText}
         />
         </SafeAreaView>

        <TouchableOpacity
          title="Create a Team"
          onPress={() => handlePress('Team A')}
          style={ {
            alignItems: 'center',
            backgroundColor: '#DDDDDD',
            padding: 20,
            width: 200,
            marginTop: 50,
            marginLeft: 35,
            marginBottom: 10,
            borderRadius: 50, 
          }}
        >
        <Text>Create a Team</Text>
        
        </TouchableOpacity>
        </View>
      )}

      {availableTeams.map((team) => (
        <TouchableOpacity
        title="Join a Team"
        onPress={() => handlePress('Team A')}
        style={ {
          alignItems: 'center',
          backgroundColor: '#DDDDDD',
          padding: 20,
          width: 200,
          marginTop: 90,
          marginLeft: 30,
          marginBottom: 10,
          borderRadius: 50, 
        }}
      >
      <Text>Join a Team</Text>
      
      </TouchableOpacity>
      ))}

      {availableTeams.length === 1 && (
        <View>
        <Text
        style={{
          marginTop: 30,
          marginLeft: 130,
          fontSize: 19,
          color: 'white',
          fontWeight: '500',
          
        }}
      >
         OR 
         </Text>
         <Text
        style={{
          marginTop: 40,
          marginLeft: 40,
          fontSize: 19,
          color: 'white',
          fontWeight: '500',
          
        }}
      >
         Create your own team 
         </Text>
         <SafeAreaView>
         <TextInput
           style={styles.input}
         //   onChangeText={onChangeText}
         />
         </SafeAreaView>

        <TouchableOpacity
          title="Create a Team"
          onPress={() => handlePress('Team A')}
          style={ {
            alignItems: 'center',
            backgroundColor: '#DDDDDD',
            padding: 20,
            width: 200,
            marginTop: 50,
            marginLeft: 35,
            marginBottom: 10,
            borderRadius: 50, 
          }}
        >
        <Text>Create a Team</Text>
        
        </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

