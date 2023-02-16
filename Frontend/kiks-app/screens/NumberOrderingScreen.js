import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const App = ({navigation}) => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text style={{fontSize: 30}}>Clicks: {count}</Text>
      </View>
      <View>
      </View>
      <View style ={{ marginLeft: 35, flexDirection:"row"  }}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>8</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>9</Text>
      </TouchableOpacity>
      </View>
      <View style ={{  marginLeft: 35, flexDirection:"row"  }}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>7</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>6</Text>
      </TouchableOpacity>
      </View>
      <View style ={{ marginLeft: 35,  flexDirection:"row"  }}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>3</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>5</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>4</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('NumberOrderingScreen2')} style={styles.submitButton}>
        <Text style={{marginLeft: 30, fontSize: 25, color: 'white'}}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 100,
    height: 100,
    margin: 3
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  submitButton: {
    backgroundColor: 'black',
    width: 200,
    marginLeft: 100,
    padding: 30,
    marginTop: 20
  }
});

export default App;