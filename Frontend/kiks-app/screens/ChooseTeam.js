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

export default function EnterGameCode({ navigation, route }) {
  const [teams, setTeams] = useState(null);
  const { username } = route.params;
  const [newTeamName, setNewTeamName] = useState('');


  useEffect(() => {
    fetch('http://50.112.215.42/teams')
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const newTeams = {};
          data.forEach((team) => {
            newTeams[team.teamName] = team.teamSize;
          });
          setTeams(newTeams);
        } else {
          setTeams({});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const handlePress = (teamName) => {
    console.log(`Joined ${teamName}`);
    if (teamName) {
      fetch(`http://50.112.215.42/teams/username/${route.params.username}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName: teamName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigation.navigate('NavTab', { username: username, roomcode: route.params.roomcode });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log('Please enter a team name');
    }
  };

  const handleJoin = (teamName) => {
    console.log(`Joined ${teamName}`);
    if (teamName) {
      fetch(`http://50.112.215.42/teams/username/${route.params.username}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName: teamName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigation.navigate('NavTab', { username: username });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log('Please enter a team name');
    }
  };
  

  if (teams === null) {
    return <Text>Loading...</Text>;
  }

  const availableTeams = Object.keys(teams);
  console.log(availableTeams)

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
        Hi {username}, 
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
            Please enter your team name{'\n'}to create a team.
          </Text>
          <SafeAreaView>
            <TextInput style={styles.input}  value={newTeamName} 
                onChangeText={(text) => setNewTeamName(text)} />
          </SafeAreaView>

          <TouchableOpacity
            title="Create a Team"
            onPress={() => handlePress(newTeamName)}
            style={{
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
      key={team}
      title="Join a Team"
      onPress={() => handleJoin(team)}
      style={{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 20,
        width: 200,
        marginTop: 30,
        marginLeft: 30,
        marginBottom: 10,
        borderRadius: 50,
      }}
    >
      <Text>Join {team}</Text>
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
      <TextInput style={styles.input}  value={newTeamName} 
                onChangeText={(text) => setNewTeamName(text)} />
      </SafeAreaView>

      <TouchableOpacity
        title="Create a Team"
        onPress={() => handlePress(newTeamName)}
        style={{
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
