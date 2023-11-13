
import { StyleSheet, Text, View , TouchableOpacity, SafeAreaView, ScrollView, StatusBar,Pressable } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import React, { useRef, useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';

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
    },
    textStyle:{
        fontSize: 30, 
        marginTop: 2,
        color: 'white',
        fontWeight: '500'
    }, 
    buttonStyle:{
      marginTop: 25,
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 12,
      width: 230
      
    },
    main:{ 
        flex:1,
        backgroundColor: 'black', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 0
    }
})

export default function EnterGameScreen({navigation, route}){

    const [teamsData, setTeamsData] = useState([]);

useEffect(() => {
    const fetchTeamsData = () => {
    Promise.all([
        fetch('http://50.112.215.42/teams/team/1'),
        fetch('http://50.112.215.42/teams/team/2')
    ]).then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((data) => {
        setTeamsData(data);
        })
        .catch((error) => {
        console.log('Error fetching teams data:', error);
        });
    };
    fetchTeamsData(); // Fetch data immediately when the component mounts

    const intervalId = setInterval(fetchTeamsData, 2000); // Fetch data every 2 seconds

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  const animation = useRef(null);
  useEffect(() => {
  }, []);
  const [mostVotedGame, setMostVotedGame] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchMostVotedGame = () => {
      fetch('http://50.112.215.42/teams/game/votes')
        .then((response) => response.json())
        .then((data) => {
          setMostVotedGame(data.winningGame);
          setTotalCount(data.totalCount)
        })
        .catch((error) => {
          console.error('Error fetching most voted game:', error);
        });
    };

    fetchMostVotedGame(); // Fetch data immediately when the component mounts

    const intervalId = setInterval(fetchMostVotedGame, 2000); // Fetch data every 2 seconds

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);


  const handleJoin = (username) => {

    console.log("Join pressed")
    const teamSizes = teamsData.map((team) => team.teamSize);
    const sumTeamSizes = teamSizes.reduce((acc, curr) => acc + curr, 0);
    console.log("sum of team size: ", sumTeamSizes)
    console.log("ready is: ", sumTeamSizes === totalCount ? "true" : "false")

    // navigation.navigate('ScoreScreen', { username: username })
    
      console.log(`http://50.112.215.42/room/${route.params.roomcode}`)
      
      fetch(`http://50.112.215.42/room/${route.params.roomcode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "code": route.params.roomcode,
            "ready": sumTeamSizes == totalCount ? "true" : "false"
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        //   navigation.navigate('ScoreScreen');
            navigation.navigate('ScoreScreen', { username: route.params.username, roomcode: route.params.roomcode  })
        })
        .catch((error) => {
          console.log(error);
        });
    
  };
  
    return (
      <View style={styles.main}>
        <View style={{marginTop: -150}}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'black',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('.././assets/start.json')}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Restart Animation"
          onPress={() => {
            animation.current?.reset();
            animation.current?.play();
          }}
        />
      </View>
    </View>
        <Text style={styles.textStyle}>
                Most Voted Game : {' '}
                <Text style={{color: 'red', marginLeft: 10}}>
                {mostVotedGame}
                </Text>
        </Text>
        <Text style={{color: 'white', marginTop: 40}}>
           Every one voted for the game ? Start playing ! 
        </Text>
        {/* <Button style={styles.buttonStyle} onPress={() =>
       navigation.navigate('ScoreScreen', { username: route.params.username })}>
          <Text style={{color: 'black', fontSize: 16}}>
          Start Game
          </Text> */}

        <Button style={styles.buttonStyle} onPress={() => handleJoin(route.params.username)}>
          <Text style={{color: 'black', fontSize: 16}}>
          Start Game
          </Text>
            
        </Button>
      
      </View>
      
    );
};
