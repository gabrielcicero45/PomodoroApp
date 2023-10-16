import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PomodoroTimer = ({ workTime, breakTime }) => {
  const [isActive, setIsActive] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [time, setTime] = useState(workTime * 60);

  useEffect(() => {
    let interval;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      clearInterval(interval);

      if (isWorkTime) {
        setIsWorkTime(false);
        setTime(breakTime * 60);
      } else {
        setIsWorkTime(true);
        setTime(workTime * 60);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time, isWorkTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(workTime * 60);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerType}>
        {isWorkTime ? "Stay on focus" : "Break Time"}
      </Text>
      <Text style={styles.timer}>
        {Math.floor(time / 60)
          .toString()
          .padStart(2, "0")}
        :{(time % 60).toString().padStart(2, "0")}
      </Text>
      <TouchableOpacity onPress={toggleTimer}>
        <Text style={styles.button}>{isActive ? "Pause" : "Start"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resetTimer}>
        <Text style={styles.button}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerType: {
    fontSize: 20,
    marginBottom: 20,
  },
  timer: {
    fontSize: 40,
    marginBottom: 20,
  },
  button: {
    fontSize: 18,
    color: "#FFFFFF",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default PomodoroTimer;
