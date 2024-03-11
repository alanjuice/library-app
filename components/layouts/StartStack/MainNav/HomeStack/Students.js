import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Appbar, Avatar, Button, ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";

const BoxComponent = ({ text, imageSource }) => (
  <View style={styles.box}>
    <View style={styles.boxContent}>
      {/* <Avatar.Image size={40} source={imageSource} style={styles.avatar} /> */}
      <Text style={styles.boxText}>{text}</Text>
    </View>
  </View>
);

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await fetch(
        "http://192.168.0.177:3000" + "/teacher/students",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-authtoken": token,
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      setStudents(responseData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fetchStudents();
    }, 200);
  }, []);

  console.log(students);
  return (
    <>
      <View style={styles.main}></View>

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <Button
              icon=""
              mode="contained"
              onPress={() => console.log("Pressed archive")}
              style={[
                {
                  margin: 10,
                  width: "50%",
                  alignSelf: "center",
                  backgroundColor: "#F20C0C",
                },
              ]}
            >
              ADD STUDENT
            </Button>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {students.map((student, index) => (
                <View key={index} style={styles.boxRow}>
                  <BoxComponent
                    text={
                      <Text>
                        <Text style={styles.boldText}>{student.id}</Text>
                        {"     "}
                        {student.name}
                      </Text>
                    }
                    // imageSource={require("../../../../../assets/favicon.png")}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}
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
    justifyContent: "center",
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
    flex: 1,
    flexWrap: "wrap",
  },
  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6e6e6",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    marginBottom: 0,
    height: 60,
    width: "90%",
  },

  boxRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    alignItems: "center",
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
