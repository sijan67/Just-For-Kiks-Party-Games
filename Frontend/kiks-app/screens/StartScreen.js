
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
    return (
      <View style={styles.main}>
        <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'black',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('.././assets/78811-gaming.json')}
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
        <Text style={{color: 'white', marginTop: 60}}>
           An interactive game to play with your close ones
        </Text>
        <Button style={styles.buttonStyle} onPress={() =>
        navigation.navigate('EnterGameCode') }>
          <Text style={{color: 'black', fontSize: 16}}>
          Enter the world of fun
          </Text>
            
        </Button>
      
      </View>
      
    );
};
