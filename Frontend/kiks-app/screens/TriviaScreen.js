import { StyleSheet, Text, View , SafeAreaView, ScrollView, StatusBar,Pressable } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import React, { useEffect, useState } from "react";
import CircularProgress from 'react-native-circular-progress-indicator'


// https://www.npmjs.com/package/react-native-circular-progress-indicator
//https://github.com/software-mansion/react-native-reanimated/issues/3796

export default function TriviaScreen({navigation, route}) {

    // API Call Code 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // https://codesandbox.io/examples/package/react-score-indicator
    const url = `http://50.112.215.42/trivia/${route.params.username}/score`; //check if this is getting user's score

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch(url)
                .then((resp) => resp.json())
                .then((json) => setData(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }, 2000); // make the request every 2 seconds

        // cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);


    // TO DO: need to set team's score from API call 
    return (
        <View style={{flex:1 , alignItems: 'center', backgroundColor: 'black'}}>
            <Text style = {styles.text}> Your Team's Score , {route.params.username} </Text> 
            <CircularProgress
                value={data.teamscore}
                radius={120}
                progressValueColor={'#ecf0f1'}
                activeStrokeColor={'#f39c12'}
                activeStrokeSecondaryColor={'#bf1518'}
                inActiveStrokeColor={'#9b59b6'}
                inActiveStrokeOpacity={0.5}
                inActiveStrokeWidth={20}
                activeStrokeWidth={40}
                duration={3000}
            />
            <StatusBar style = "auto"/>
        </View>
    )
};


const styles = StyleSheet.create({
    text: {
        marginTop : 100,
        color: 'white',
        fontSize: 30,
        marginBottom: 30
    }
});