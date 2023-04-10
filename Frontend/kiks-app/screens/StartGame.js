
import { StyleSheet, Text, View , TouchableOpacity, SafeAreaView, ScrollView, StatusBar,Pressable } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import React, { useRef, useEffect } from 'react';
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
  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  const handleJoin = (username) => {
    console.log("Join pressed")
    // navigation.navigate('ScoreScreen', { username: username })
    
   
      fetch(`http://50.112.215.42/room/0000`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "code": "0000",
            "ready": "true"
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        //   navigation.navigate('ScoreScreen');
            navigation.navigate('ScoreScreen', { username: username })
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
                Just For {''}
                <Text style={{color: 'red', marginLeft: 10}}>
                     Kiks
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
