// import { StyleSheet, Text, View , TouchableOpacity , SafeAreaView, ScrollView, StatusBar,Pressable } from 'react-native';
// import { Avatar, Button, Card } from 'react-native-paper';
// import React, { useEffect, useState } from "react";
// import CircularProgress from 'react-native-circular-progress-indicator'
// import { Audio } from 'expo-av';
// import * as FileSystem from "expo-file-system";

// // https://www.npmjs.com/package/react-native-circular-progress-indicator
// //https://github.com/software-mansion/react-native-reanimated/issues/3796

// export default function ScoreScreen({navigation, route}) {

//     // API Call Code 
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [recording, setRecording] = React.useState();
//     // const AUDIO_BACKEND = "http://your-flask-ip:5000/audio";
//     const AUDIO_BACKEND = "http://127.0.0.1:5000/audio"

//     // https://codesandbox.io/examples/package/react-score-indicator
//     const url = `http://50.112.215.42/trivia/${route.params.username}/score`; //check if this is getting user's score

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             fetch(url)
//                 .then((resp) => resp.json())
//                 .then((json) => setData(json))
//                 .catch((error) => console.error(error))
//                 .finally(() => setLoading(false));
//         }, 2000); // make the request every 2 seconds

//         // cleanup function to clear the interval when the component unmounts
//         return () => clearInterval(intervalId);
//     }, []);

//     const handlePress = (teamName) => {
//         console.log(`Taking in Audio Input`);
        
//         // navigation.navigate('NavTab', { username: username });
//     };
    
//     // https://javascript.plainenglish.io/how-to-record-audio-using-react-native-expo-74723d2358e3

//     async function startRecording() {
//         try {
//           console.log('Requesting permissions..');
//           await Audio.requestPermissionsAsync();
//           await Audio.setAudioModeAsync({
//             allowsRecordingIOS: true,
//             playsInSilentModeIOS: true,
//           }); 
//           console.log('Starting recording..');
//           const recording = new Audio.Recording();
//           await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
//           await recording.startAsync(); 
//           setRecording(recording);
//           console.log('Recording started');
//         } catch (err) {
//           console.error('Failed to start recording', err);
//         }
//       }



//       // send recording to the backend 
//       // https://www.tderflinger.com/en/react-native-audio-recording-flask 
      
//       async function stopRecording() {
//         setRecording(undefined);
//         await recording.stopAndUnloadAsync();
//         const uri = recording.getURI();
        
//         // https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemuploadasyncurl-fileuri-options

//         try {
//           const response = await FileSystem.uploadAsync(
//             AUDIO_BACKEND,
//             uri
//           );
//           const body = JSON.parse(response.body);
//           setText(body.text);
//         } catch (err) {
//           console.log(err);
//         }

//         console.log('Recording stopped and stored at', uri , ' and sent to backend.');
//       }


//     // https://stackoverflow.com/questions/75367279/where-does-expo-av-recorded-file-store-in-mobile-phones
//     // https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemuploadasyncurl-fileuri-options

//     // TO DO: need to set team's score from API call 
//     return (
//         <View style={{flex:1 , alignItems: 'center', backgroundColor: 'black'}}>
//             <Text style = {styles.text}> Your Team's Score , {route.params.username} </Text> 
//             <CircularProgress
//                 value={data.teamscore}
//                 radius={120}
//                 progressValueColor={'#ecf0f1'}
//                 activeStrokeColor={'#f39c12'}
//                 activeStrokeSecondaryColor={'#bf1518'}
//                 inActiveStrokeColor={'#9b59b6'}
//                 inActiveStrokeOpacity={0.5}
//                 inActiveStrokeWidth={20}
//                 activeStrokeWidth={40}
//                 duration={3000}
//             />
//             <StatusBar style = "auto"/>


//             <TouchableOpacity
//                 onPress={recording ? stopRecording : startRecording}
//                 style={ {
//                 alignItems: 'center',
//                 backgroundColor: 'orange',
//                 opacity: 0.9, 
//                 padding: 20,
//                 width: 200,
//                 marginTop: 90,
//                 marginLeft: 30,
//                 marginBottom: 10,
//                 borderRadius: 50, 
//                 }}
//             >
//             <Text style ={{color: 'black', fontStyle: 'bold', fontSize: 16}}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>

//             </TouchableOpacity>

//         </View>
//     )
// };


// const styles = StyleSheet.create({
//     text: {
//         marginTop : 100,
//         color: 'white',
//         fontSize: 30,
//         marginBottom: 30
//     }
// });

////////////////////

import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

const FLASK_BACKEND = "http://127.0.0.1:5000/audio";

export default function App() {
  const [recording, setRecording] = React.useState();
  const [text, setText] = React.useState("");

  async function startRecording() {
    console.log("start recording")
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync({
        android: {
          extension: ".mp4",
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        },
        ios: {
          extension: ".wav",
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
        },
      });
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

//   async function stopRecording() {
//     setRecording(undefined);
//     await recording.stopAndUnloadAsync();
//     const uri = recording.getURI();
//     console.log("stop recording")
//     try {
//       const response = await FileSystem.uploadAsync(
//         FLASK_BACKEND,
//         uri
//       );
//       console.log("--sent")
//       const body = JSON.parse(response.body);
//       setText(body.text);
//       console.log("sent")
//     } catch (err) {
//       console.error(err);
//     }
//   }

