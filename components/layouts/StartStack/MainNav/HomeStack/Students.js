import React from "react";
import { StatusBar } from "expo-status-bar";
import { Appbar, Avatar, Button } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView } from "react-native";

const BoxComponent = ({ text, imageSource }) => (
  <View style={styles.box}>
    <View style={styles.boxContent}>
      {/* <Avatar.Image size={40} source={imageSource} style={styles.avatar} /> */}
      <Text style={styles.boxText}>{text}</Text>
    </View>
  </View>
);

export default function Students() {
  const studentData = [
    {
      id: "S01",
      name: "BNb",
      class: "ts",
    },
    {
      id: "S02",
      name: "Another Name",
      class: "ts",
    },
    {
      id: "S03",
      name: "jos",
      class: "ts",
    },
    // Add more students as needed
  ];

  return (
    <>
      <View style={styles.main}>
        <Text>hello world</Text>
        <StatusBar style="auto" />
      </View>

      <View style={styles.container}>
        <Button
          icon=""
          mode="contained"
          onPress={() => console.log("Pressed archive")}
          style={[styles.addButton, { margin: 10, backgroundColor: "#F20C0C" }]}
        >
          ADD STUDENT
        </Button>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {studentData.map((student, index) => (
            <View key={index} style={styles.boxRow}>
              <BoxComponent
                text={
                  <Text>
                    <Text style={styles.boldText}>{student.id}</Text>{"     "}
                    {student.name}
                  </Text>
                }
                // imageSource={require("../../../../../assets/favicon.png")}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <Appbar style={styles.appbar}>
        <Text style={styles.appbarText}>Students List</Text>
        <Avatar.Image
          size={40}
          source={require("../../../../../assets/favicon.png")}
          style={styles.avatar}
        />
      </Appbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "",
    justifyContent: "center", // Changed to flex-start to position at top
    position: "absolute",
    bottom: 0,
    height: "75%",
    width: "100%",
    borderRadius: 20,
    borderColor: "#e6e6e6",
    overflow: "hidden",
  },
  main: {
    flex: 1,
    backgroundColor: "#0D08F3",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.66,
  },
  bottom: {
    position: "absolute",
    backgroundColor: "#0D08F3",
    justifyContent: "space-around",
    height: "10%",
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.66,
    borderRadius: 20,
  },
  boxContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxText: {
    marginLeft: 10,
    flex: 1, // Adjusted to take remaining space
    flexWrap: "wrap", // Allow text to wrap if exceeding width
  },
  box: {
    flex: 1, // This line makes the width 100%
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6e6e6",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    marginBottom: 0,
    height: 60,
    width: "90%", // Set width to 90%
  },

  boxRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    alignItems: "center", // Added to center boxes horizontally
  },
  avatar: {
    marginRight: 10,
  },
  appbarText: {
    color: "white",
    fontSize: 25,
    fontWeight: "700",
  },
  appbar: {
    backgroundColor: "#0D08F3",
    height: 64,
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-between",
    top: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
