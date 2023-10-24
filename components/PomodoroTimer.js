import React, { useState, useEffect } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import tomatoFocus from "../assets/tomato-focus.png";
import tomatoHappy from "../assets/tomato-happy.png";

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
    <View style={[styles.container, isWorkTime ? styles.tomato : styles.blue]}>
      {isWorkTime ? (
        <Image style={styles.tomatoImage} source={tomatoFocus} />
      ) : (
        <Image style={styles.tomatoImage} source={tomatoHappy} />
      )}
      <Text style={styles.timerType}>
        {isWorkTime ? "Stay on focus" : "Break Time"}
      </Text>
      <Text style={styles.timer}>
        {Math.floor(time / 60)
          .toString()
          .padStart(2, "0")}
        :{(time % 60).toString().padStart(2, "0")}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleTimer}>
          <Text style={styles.button}>{isActive ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer}>
          <Text style={styles.button}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tomato: {
    backgroundColor: "tomato",
  },
  blue: {
    backgroundColor: "#85C1E9",
  },
  timerType: {
    fontSize: 32,
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  timer: {
    fontSize: 48,
    marginBottom: 20,
    color: "yellow",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  button: {
    fontSize: 18,
    color: "#FFFFFF",
    backgroundColor: "#B22222",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  tomatoImage: {
    width: 300,
    height: 300,
  },
});

export default PomodoroTimer;
