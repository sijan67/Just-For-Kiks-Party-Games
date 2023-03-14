import { Text, View } from 'react-native';
import Leaderboard from 'react-native-leaderboard';
import {useEffect, useState} from 'react';

this.state = {
  data: [
      {teamname: 'Trivia-Soc', teamscore: "80"},
      {teamname: 'Team Triceps', teamscore: "120"}
      //...
  ] //can also be an object of objects!: data: {a:{}, b:{}}
}

// https://stackoverflow.com/questions/72755476/invariant-violation-viewproptypes-has-been-removed-from-react-native-migrate-t
// Note: On reloading gives undefined is not an object 
// but works when restarting the app

export default function LeaderBoard() {

    const [score, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const url = `http://50.112.215.42/leaderboard`;

    useEffect(() => {
      fetch(url, {mode: 'cors'})
        .then((resp) => resp.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);


    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor: '#ffe6e6'}}>
        <Leaderboard 
        // data={this.state.data} 
        data = {score}
        sortBy='teamscore' 
        labelBy='teamname'
        style={{padding: 60}}
        />
        <Text>hi</Text>
      </View>
    );
  }
  