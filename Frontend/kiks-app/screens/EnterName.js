import React from 'react';
import { StyleSheet, Text, View ,TextInput, SafeAreaView, ScrollView, StatusBar,Pressable } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import {useEffect} from "react";

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
        marginTop: 30,
        color: 'white',
        fontWeight: '500'
    }, 
    main:{ 
        flex:1,
        backgroundColor: 'black', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'red',
        padding: 10,
        width: 250,
        height: 50,
        borderRadius: 10,
        color: 'white',
        marginTop: 30,
        marginBottom: 100
      },
    buttonStyle:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 12,
        width: 250,
        marginTop: 35,
        marginBottom: -300
        
      },
})

export default function EnterName({navigation, route}){
    const [username, setUsername] = React.useState('Anon');
    const [number, onChangeNumber] = React.useState('');

    const handleUsernameChange = (text) => {
      setUsername(text);
    };

    const handlePress = () => {
      // const teamName = Math.random() < 0.5 ? 'cool' : 'cool2';
      fetch('http://50.112.215.42/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log("Created User")
      //   // navigate to NavTab screen with username as a parameter
        navigation.navigate('EnterGameCode', { username: username });
      })
      .catch(error => console.error(error));
    };
  


    return (
      <View style={styles.main}>
        <Text style={styles.textStyle}>
                Enter your name
        </Text>
        <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={handleUsernameChange}
      />
    </SafeAreaView>

        {/* <Button style={styles.buttonStyle} onPress={() =>
        navigation.navigate('EnterGameCode', { username: username })}>
          <Text style={{color: 'black', fontSize: 20}}>
                Confirm
          </Text>
            
        </Button> */}

        <Button style={styles.buttonStyle} onPress={handlePress}>
            <Text style={{color: 'black', fontSize: 20}}>
                  Confirm
            </Text>
              
        </Button>

      </View>
      
    );
};
