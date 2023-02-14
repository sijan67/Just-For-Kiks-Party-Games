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
      <View style ={{ marginLeft: 50, flexDirection:"row"  }}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>8</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>9</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>11</Text>
      </TouchableOpacity>
      </View>
      <View style ={{  marginLeft: 50, flexDirection:"row"  }}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>7</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>6</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>16</Text>
      </TouchableOpacity>
      </View>
      <View style ={{ marginLeft: 50,  flexDirection:"row"  }}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>3</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>5</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>4</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>10</Text>
      </TouchableOpacity>
      </View>
      <View style ={{ marginLeft: 50,  flexDirection:"row"  }}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>13</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>12</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>15</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>14</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('NumberOrderingScreen3')} style={styles.submitButton}>
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
    width: 70,
    height: 70,
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