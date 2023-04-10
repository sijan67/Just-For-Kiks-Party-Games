
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

