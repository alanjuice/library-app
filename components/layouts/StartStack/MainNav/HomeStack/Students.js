import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Appbar, Avatar, Button, ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";

// Component for individual student box
const StudentBox = ({ student }) => (
  <View style={styles.studentBox}>
    <Text style={styles.studentId}>{student.id}</Text>
    <Text style={styles.studentName}>{student.name}</Text>
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
    <View style={styles.container}>
      <Appbar style={styles.appbar}>
        <Text style={styles.appbarText}>Students List</Text>
        <Avatar.Image
          size={40}
          source={require("../../../../../assets/favicon.png")}
          style={styles.avatar}
        />
      </Appbar>
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
    shadowOffset: {width: -2, height: 2},
  },
  main: {
    flex: 1,
    backgroundColor: "#0D08F3",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.66,
    backgroundColor: "#ffffff",
  },
  appbar: {
    backgroundColor: "#0D08F3",
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    backgroundColor: "#e6e6e6",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
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
