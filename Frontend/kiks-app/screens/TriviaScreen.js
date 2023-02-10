
import { StyleSheet, Text, View , SafeAreaView, ScrollView, StatusBar,Pressable } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import {useEffect} from "react";

import React, { Component } from 'react'
import ReactStoreIndicator from 'react-score-indicator'


export default function TriviaScreen({navigation, route}) {
    // https://codesandbox.io/examples/package/react-score-indicator
    return (
        <View>
            <Text>You did</Text> 
        </View>
      )
};


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
    titleText: {
        fontSize: 42,
        color: "#d15732",
        fontWeight: '500'
    },
    App: {

    }
      
})
