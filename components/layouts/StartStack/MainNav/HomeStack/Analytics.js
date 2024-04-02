import React, { useEffect, useState } from "react";
import { Appbar, Avatar, ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";

const BoxComponent = ({ allocation }) => {
  if (!allocation || !allocation.student_name || !allocation.books) {
    console.log("Allocation data is null or incomplete");
    return null;
  }

  return (
    <View style={styles.bookBox}>
      <Text style={styles.studentName}>{allocation.student_name}</Text>
      {allocation.books.map((book, index) => {
        console.log("Book object:", book); // Log the book object
        return (
          <View key={index} style={styles.bookContainer}>
            <Text style={styles.bookId}>{book.book_id}</Text>
            <Text style={styles.bookText}>{book.book_name}</Text>
          </View>
        );
      })}
    </View>
  );
};






export default function Analytics() {
  const [allocation, setAllocation] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllocation = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await fetch(
        "https://sunday-library.onrender.com" + "/teacher/viewallocation",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-authtoken": token,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch details");
      }
  
      const responseData = await response.json();
      console.log("chris joyhn",responseData.data[0]); // Log responseData.data to see its structure
      setAllocation(responseData.data);
      setLoading(false);
      console.log("chris joyhn",responseData.data[0]); // Log responseData.data to see its structure
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchAllocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
      <Appbar style={styles.appbar}>
          <Text style={styles.appbarText}>Analytics</Text>
        </Appbar>
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color="#0000ff"
            />
          ) : allocation.length === 0 ? (
            <Text style={styles.noDataText}>No Allocation Data Available</Text>
          ) : (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {/* Render BoxComponent only if allocation is not empty */}
              {allocation.map((allocati, index) => (
                <BoxComponent key={index} allocation={allocati} />
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#4083B7",
    justifyContent: "flex-end", // Align content to the bottom
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    height: "85%", // Adjust height as needed
    width: "100%",
    borderTopLeftRadius: 20, // Border radius at the top left
    borderTopRightRadius: 20, // Border radius at the top right
    borderBottomLeftRadius: 0, // No border radius at the bottom left
    borderBottomRightRadius: 0, // No border radius at the bottom right
    borderColor: "#e6e6e6",
    bottom: -1,
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
  bookBox: {
    backgroundColor: "#3278D680",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
  },
  bookId: {
    fontSize: 18,
    fontWeight: "bold",
   marginBottom: 0,
   color: 'rgba(8, 88, 225, 1)'
  },
  bookText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
  },
  noDataText: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    color: "red",
    marginTop: 18,
    textAlign: "center",
    fontWeight:"700",
  },
  bookContainer: {
    marginBottom: 0,
  },
  bookName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
