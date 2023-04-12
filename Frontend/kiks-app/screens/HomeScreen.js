import { StyleSheet, Text, View , SafeAreaView, ScrollView, StatusBar,Pressable } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';


// Icons obtained from: https://pictogrammers.com/library/mdi/

const LeftContentTrivia = props => <Avatar.Icon style={styles.icon_style} {...props} icon="comment-question-outline" />
const LeftContentMath = props => <Avatar.Icon style={styles.icon_style} {...props} icon="android-studio" />
// https://callstack.github.io/react-native-paper/card.html

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ScoreScreen from './ScoreScreen'
import StartGame from './StartGame'
import GameOverScreen from './GameOverScreen'

const Stack = createNativeStackNavigator();


function GameScreen({navigation, route}) {

  console.log("In home Screen", route.params)

  const handlePress = (username, gamename) => {
    console.log(`Joined ${username}, ${gamename}`);
    if (gamename=="Trivia") {
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
          navigation.navigate('StartGame', { username: route.params.name, roomcode: route.params.roomcode });
        })
        .catch((error) => {
          console.log(error);
        });
    } 
    else if (gamename=="Math"){
      fetch(`http://50.112.215.42/teams/game/vote/Math`, {
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
          navigation.navigate('StartGame', { username: route.params.name, roomcode: route.params.roomcode });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      console.log('Please Vote');
    }
  };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Text style={{marginTop: 20, fontSize: 22, color: '#d15732', fontWeight: '600'}}>
        Pick a Game , {route.params.name}  
        </Text>
        <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}>

        <Card style={styles.card_container}>
          <Card.Title style= {styles.title_style} title="Trivia Game" left={LeftContentTrivia} />
          <Card.Content>
            <Text style= {styles.text_style} variant="titleLarge">Guess the answer to these tricky questions!</Text>
          </Card.Content>
          {/* <Card.Cover source={{ uri: 'https://static.vecteezy.com/system/resources/previews/000/130/103/non_2x/vector-trivia-quiz-logo-illustration.jpg' }} />
           */}
          {/* <Card.Cover source={{ uri: 'https://media.baamboozle.com/uploads/images/250242/1641268651_268516_gif-url.gif' }} /> */}
           

          <Card.Cover source={{ uri: 'https://images.squarespace-cdn.com/content/v1/5a328d66a8b2b051a8d2f017/1567530555218-OF3Y7UYVG767NHSMP46D/trivianight.gif' }} />
          

          <Card.Actions>

          <Button onPress={()=>handlePress(route.params.name, "Trivia")}>
             Vote This
          </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card_container}>
          <Card.Title style= {styles.title_style} title="Math Game" left={LeftContentMath} />
          <Card.Content>
            <Text style= {styles.text_style} variant="titleLarge">Solve Math Questions quickly!</Text>
          </Card.Content>
          {/* <Card.Cover source={{ uri: 'https://cdn2.vectorstock.com/i/1000x1000/60/81/math-font-with-symbol-and-formula-icon-vector-39626081.jpg' }} />
           */}
          
          <Card.Cover source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Math_-_Idil_Keysan_-_Wikimedia_Giphy_stickers_2019.gif' }} />

          <Card.Actions>


          <Button onPress={() => handlePress(route.params.name, "Math")}>
            Vote This
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
            initialParams={{ name: route.params.name, roomcode: route.params.roomcode }}
          />
          <Stack.Screen options={{headerShown: false}} name="StartGame" component={StartGame} />
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
  