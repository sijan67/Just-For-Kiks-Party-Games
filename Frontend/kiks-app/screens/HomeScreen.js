import { StyleSheet, Text, View , SafeAreaView, ScrollView, StatusBar,Pressable } from 'react-native';
import CardView from 'react-native-cardview'
import { Avatar, Button, Card } from 'react-native-paper';


//Navigation import
// import {createStackNavigator} from '@react-navigation/stack';
// import {createAppContainer} from 'react-navigation'; 
// import {createStackNavigator} from 'react-navigation-stack';

// Icons obtained from: https://pictogrammers.com/library/mdi/

const LeftContentTrivia = props => <Avatar.Icon style={styles.icon_style} {...props} icon="comment-question-outline" />
const LeftContentMath = props => <Avatar.Icon style={styles.icon_style} {...props} icon="android-studio" />
const LeftContentBox = props => <Avatar.Icon style={styles.icon_style} {...props} icon="cube-outline" />
const LeftContentOrdering = props => <Avatar.Icon style={styles.icon_style} {...props} icon="numeric" />
// https://callstack.github.io/react-native-paper/card.html

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TriviaScreen from './TriviaScreen'
import MathScreen from './MathScreen'
import ScoreScreen from './ScoreScreen'
import StartGame from './StartGame'
import NumberOrderingScreen from './NumberOrderingScreen'
import NumberOrderingScreen2 from './NumberOrderingScreen2'
import NumberOrderingScreen3 from './NumberOrderingScreen3'
import GameOverScreen from './GameOverScreen'

const Stack = createNativeStackNavigator();


function GameScreen({navigation, route}) {

  const handlePress = (teamName) => {
    console.log(`Joined ${teamName}`);
    if (teamName) {
      fetch(`http://50.112.215.42/teams/game/vote/Trivia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: route.params.name,
        }),
      })
        .then((response) => console.log(response.json()))
        .then((data) => {
          console.log(data);
          navigation.navigate('StartGame', { username: route.params.name });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('Please enter a team name');
    }
  };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Text style={{marginTop: 20, fontSize: 22, color: '#d15732', fontWeight: '600'}}>
          Pick a game of your choice , {route.params.name}
        </Text>
        <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}>

        <Card style={styles.card_container}>
          <Card.Title style= {styles.title_style} title="Trivia Game" left={LeftContentTrivia} />
          <Card.Content>
            <Text style= {styles.text_style} variant="titleLarge">Guess the answer to these tricky questions!</Text>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://princewilliamlivingweb.s3-accelerate.amazonaws.com/2022/01/BBaFnKbM-Trivia-Day--702x336.gif' }} />
          <Card.Actions>
          {/* <Button onPress={() => navigation.navigate('ScoreScreen', { username: route.params.name })}>
             Choose This
          </Button> */}

          <Button onPress={()=>handlePress(route.params.name, "Trivia")}>
             Choose This
          </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card_container}>
          <Card.Title style= {styles.title_style} title="Math Game" left={LeftContentMath} />
          <Card.Content>
            <Text style= {styles.text_style} variant="titleLarge">Solve Math Questions quickly!</Text>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://cdn2.vectorstock.com/i/1000x1000/60/81/math-font-with-symbol-and-formula-icon-vector-39626081.jpg' }} />
          <Card.Actions>
          {/* <Button onPress={() => navigation.navigate('ScoreScreen' , { username: route.params.name })}>
          Choose This
          </Button> */}

          <Button onPress={() => handlePress(route.params.name, "Math")}>
            Choose This
          </Button>
          </Card.Actions>
        </Card>


        <Card style={styles.end_card_container}>
        </Card>


        </ScrollView>
      </SafeAreaView>
      </View>
    );
  }

  export default function HomeScreen({navigation, route}){
    if (route.state && route.state.index >0){
      navigation.setOptions({tabBarVisible: false})
    }

    return (
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
          <Stack.Screen
            name="GameScreen"
            component={GameScreen}
            initialParams={{ name: route.params.name }}
            
          />
          <Stack.Screen options={{headerShown: false}} name="StartGame" component={StartGame} />
          <Stack.Screen options={{headerShown: false}} name="NumberOrderingScreen" component={NumberOrderingScreen} />
          <Stack.Screen options={{headerShown: false}} name="NumberOrderingScreen2" component={NumberOrderingScreen2} />
          <Stack.Screen options={{headerShown: false}} name="NumberOrderingScreen3" component={NumberOrderingScreen3} />
          <Stack.Screen options={{headerShown: false}} name="ScoreScreen" component={ScoreScreen} />
          <Stack.Screen options={{headerShown: false}} name="GameOverScreen" component={GameOverScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
  
  }
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // paddingTop: StatusBar.currentHeight,
      paddingTop: 20,
      marginLeft: 20,
      marginTop: 5, 
      marginLeft: 20, 
      marginRight: 20
    },
    scrollView: {
      // backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
    card_container: {
      width: 300, 
      marginLeft: 10, 
      marginRight: 10,
      marginTop: 20,
      backgroundColor: '#faa7ac'
    },
    end_card_container: {
      width: 300, 
      marginLeft: 10, 
      marginRight: 10,
      marginTop: 20,
      marginBottom: 120,
      backgroundColor: '#faa7ac'
    },
    text_style: {
      marginBottom: 10
    }, 
    title_style: {
      marginBottom: -10, 
    },
    icon_style: {
      width: 35, 
      height: 35,
      backgroundColor: '#0f0f0f'
    },
    enter_button_style: {
      alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    }, 
    text:{
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    }
  });
  