import React, { useEffect, useState } from "react";
import { Appbar, Text, ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, ScrollView, Animated, Easing } from "react-native";
import * as SecureStore from "expo-secure-store";

const StudentBox = ({ student }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity animation

  useEffect(() => {
    // Start opacity animation when component mounts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Duration of animation in milliseconds
      easing: Easing.linear, // Easing function
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.studentBox, { opacity: fadeAnim }]}>
      <Text style={styles.studentId}>{student.id}</Text>
      <Text style={styles.studentName}>{student.name}</Text>
    </Animated.View>
  );
};

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
      setLoading(false); // Set loading to false after fetching data
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
          <Text style={styles.appbarText}>Students</Text>
        </Appbar>
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color="#0000ff"
            />
          ) : students.length === 0 ? (
            <Text style={styles.noStudentsText}>No Students Available</Text>
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
    height: "85%", // Adjust height as needed
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: "#e6e6e6",
    bottom: -1,
    shadowOffset: { width: -2, height: 2 },
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#4083B7",
    justifyContent: "flex-end",
  },
  appbar: {
    backgroundColor: "#4083B7",
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
  noStudentsText: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    color: "red",
    marginTop: 18,
    textAlign: "center",
    fontWeight:"700",
  },
  studentBox: {
    backgroundColor: "#3278D680",
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
});
