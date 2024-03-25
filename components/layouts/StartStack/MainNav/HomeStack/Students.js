import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Appbar, Avatar, Button, ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, } from "react-native";
import * as SecureStore from "expo-secure-store";

// Component for individual student box
const StudentBox = ({ student }) => (
  <View style={styles.studentBox}>
    <Text style={styles.studentId}> ID  : {student.id}</Text>
    <Text style={styles.studentName}> NAME : {student.name}</Text>
  </View>
);

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await fetch(
        "https://sunday-library.onrender.com/teacher/students",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-authtoken": token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const responseData = await response.json();
      setStudents(responseData);
      setLoading(false);
      console.log(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Appbar style={styles.appbar}>
          <Text style={styles.appbarText}>Students List</Text>
          {/* <Avatar.Image
          size={40}
          source={require("../../../../../assets/favicon.png")}
          style={styles.avatar}
        /> */}
        </Appbar>
        <View style={styles.container}>

          {loading ? (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color="#0000ff"
            />
          ) : (

            <ScrollView contentContainerStyle={styles.scrollContainer}>
              
              {students.map((student, index) => (
                <StudentBox key={index} student={student} />
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    height: "80%", // Adjust height as needed
    width: "100%",
    borderTopLeftRadius: 20, // Border radius at the top left
    borderTopRightRadius: 20, // Border radius at the top right
    borderBottomLeftRadius: 0, // No border radius at the bottom left
    borderBottomRightRadius: 0, // No border radius at the bottom right

    borderColor: "#e6e6e6",
    bottom: -1,
    shadowOffset: { width: -2, height: 2 },
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#075e9c",
    justifyContent: "flex-end", // Align content to the bottom
  },
  main: {
    flex: 1,
    backgroundColor: "#0C6EEECC",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.66,
    backgroundColor: "#ffffff",
  },
  appbar: {
    backgroundColor: "#075e9c",
    height: 64,
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-between",
    top: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  appbarText: {
    color: "white",
    fontSize: 25,
    fontWeight: "700",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20,
  },
  studentBox: {
    backgroundColor: "#3278D680",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Adding elevation for shadow effect
    shadowColor: "#000", // Color of the shadow
    shadowOffset: {
      width: 0, // No horizontal offset
      height: 2, // Vertical offset
    },
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Radius of the shadow
  },
  studentId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
  },
});
