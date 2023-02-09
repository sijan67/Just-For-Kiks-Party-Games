import { Text, View } from 'react-native';
import Leaderboard from 'react-native-leaderboard';

this.state = {
  data: [
      {userName: 'Trivia-Soc', highScore: 50},
      {userName: 'Team Triceps', highScore: 120}
      //...
  ] //can also be an object of objects!: data: {a:{}, b:{}}
}

// https://stackoverflow.com/questions/72755476/invariant-violation-viewproptypes-has-been-removed-from-react-native-migrate-t
// Note: On reloading gives undefined is not an object 
// but works when restarting the app

export default function LeaderBoard() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Leaderboard 
        data={this.state.data} 
        sortBy='highScore' 
        labelBy='userName'/>
      </View>
    );
  }
  