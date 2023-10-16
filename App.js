import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import PomodoroTimer from './components/PomodoroTimer'


export default function App() {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <PomodoroTimer workTime={workTime} breakTime={breakTime} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'top',
  },
});
