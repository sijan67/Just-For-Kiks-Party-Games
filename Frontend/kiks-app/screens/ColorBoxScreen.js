
import { StyleSheet, Text, View , SafeAreaView, ScrollView, StatusBar,Pressable } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import {useEffect} from "react";

export default function ColorBoxScreen({navigation, route}){
    useEffect(()=>{
        navigation.setOptions({tabBarVisible: false})
    }, [] 
    );
    return (
      <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
        <Text style ={{fontSize: 42}}> Color Box Matching </Text>
        <Button style ={{height: 100, width: 100, size: 100}} onPress={() => navigation.popToTop()}>
            <Text style={{fontSize: 20}}>
                Go back
            </Text>
        </Button>
      </View>
      
    );
};