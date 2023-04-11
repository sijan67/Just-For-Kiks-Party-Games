import { StyleSheet, Text, View , TouchableOpacity , SafeAreaView, ScrollView, StatusBar,Pressable } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import React, { useEffect, useState } from "react";
import CircularProgress from 'react-native-circular-progress-indicator'
import { Audio } from 'expo-av';
import * as FileSystem from "expo-file-system";

// https://www.npmjs.com/package/react-native-circular-progress-indicator
//https://github.com/software-mansion/react-native-reanimated/issues/3796

export default function ScoreScreen({navigation, route}) {

    // API Call Code 
    const [data, setData] = useState([]);
    const [winningData, setWinningData] = useState([]);
    const [teamData, setTeamData] = useState({});
    const [teamBuzzerData, setTeamBuzzerData] = useState({});
    const [recordingUploaded, setRecordingUploaded] = useState(false);



    const [loading, setLoading] = useState(true);
    const [winningLoading, setWinningLoading] = useState(true);
    const [recording, setRecording] = React.useState();

    const url = `http://50.112.215.42/teams/username/${route.params.username}`; 

    const winningUrl = 'http://50.112.215.42/teams/game/accumulate/score'

    const getTeamData = async () => {
      try {
        const response = await fetch(`http://50.112.215.42/teams/username/${route.params.username}`);
        const json = await response.json();
        setTeamData(json);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const getTeamBuzzerData = async () => {
      try {
        const response = await fetch('http://50.112.215.42/teams/buzzer/team/');
        const json = await response.json();
        setTeamBuzzerData(json);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      getTeamData();
      getTeamBuzzerData();
    }, []);


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



  useEffect(() => {
    const intervalId = setInterval(() => {
        fetch(winningUrl)
            .then((resp) => resp.json())
            .then((json) => setWinningData(json))
            .catch((error) => console.error(error))
            .finally(() => setWinningLoading(false));
    }, 2000); // make the request every 2 seconds

    // cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
}, [navigation]);

  useEffect(() => {
      if (winningData.status === "Game over") {
        // should pass the username,  winning team , winning team score 
          navigation.navigate("GameOverScreen", { username: route.params.username,  winner: winningData.winner, winnerScore: winningData.totalScore });
      }
  }, [winningData]);
      
    
    // https://javascript.plainenglish.io/how-to-record-audio-using-react-native-expo-74723d2358e3

    async function validateAudioFile(uri) {
      const fileStats = await FileSystem.getInfoAsync(uri);
      if (!fileStats.exists) {
        throw new Error(`File does not exist at URI ${uri}`);
      }
      if (fileStats.size === 0) {
        throw new Error(`File is empty at URI ${uri}`);
      }
      if (fileStats.size > 1024 * 1024 * 10) {
        throw new Error('File too large!');
      }
      return fileStats;
    }

    const recordingOptions = {
      android: {
        extension: '.wav',
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 16,
      },
      ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 16,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      }
    };
    
    async function startRecording() {
      try {
        console.log('Requesting permissions..');
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        console.log('Starting recording..');
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(recordingOptions);
        await recording.startAsync();
        setRecording(recording);
        console.log('Recording started');
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }
    
    async function stopRecording() {
      try {
        if (!recording) {
          return;
        }
        console.log('Stopping recording..');
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        const fileStats = await validateAudioFile(uri);
        console.log(`Recorded audio file size: ${fileStats.size} bytes`);
        const audioData = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const headers = {
          'Content-Type': 'application/json',
        };
        const body = JSON.stringify({
          questionID: teamBuzzerData.questionID,
          teamID: teamBuzzerData.teamID,
          audioFile: audioData,
          audioFileExtension: 'wav',
          audioFileType: 'audio/wav',
        });
        console.log("awaiting response...");
        const response = await fetch('http://50.112.215.42/audio/', {
          method: 'POST',
          headers,
          body,
        });
        console.log("Response received.");
        console.log("Response is: ", response.ok)
        if (response.ok) {
          setRecordingUploaded(true);
          return (
            <Text style={{ color: 'white' }}> Audio sent successfully ! </Text>
          );
        }
        
        if (!response.ok) {

          return (
            <Text style={{ color: 'white' }}>Could not upload audio. Please try again.</Text>
          );
        }
      } catch (error) {
        console.error('Error uploading audio:', error);
      } finally {
        setRecording(undefined);
      }
    }
    

    // https://stackoverflow.com/questions/75367279/where-does-expo-av-recorded-file-store-in-mobile-phones
    // https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemuploadasyncurl-fileuri-options

    // TO DO: need to set team's score from API call 
    return (
        <View style={{flex:1 , alignItems: 'center', backgroundColor: 'black'}}>
            <Text style = {styles.text}> Your Team's Score , {route.params.username} </Text> 
            <CircularProgress
                value={data.teamScore}
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

            {teamData.teamName === teamBuzzerData.teamName && !recordingUploaded && (
               <>
            <TouchableOpacity
                onPress={recording ? stopRecording : startRecording}
                style={ {
                alignItems: 'center',
                backgroundColor: 'orange',
                opacity: 0.9, 
                padding: 20,
                width: 200,
                marginTop: 90,
                marginLeft: 30,
                marginBottom: 10,
                borderRadius: 50, 
                }}
            >
            <Text style ={{color: 'black', fontStyle: 'bold', fontSize: 16}}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>

            </TouchableOpacity>
            </>
          )}

            <Text style = {{color:'white', marginTop: 30, fontSize: 20}}> Game Status :  {winningData.status} </Text> 


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
