import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Appbar, Avatar, Button, ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";

// Component for individual book box
const BookBox = ({ book }) => (
  <View style={styles.bookBox}>
    <Text style={styles.bookText}>{book.name}</Text>
  </View>
);

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await fetch(
        "https://sunday-library.onrender.com/teacher/books",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-authtoken": token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const responseData = await response.json();
      setBooks(responseData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Ensure loading state is set to false even on error
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      <Appbar style={styles.appbar}>
        <Text style={styles.appbarText}>Books List</Text>
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
          {books.map((book, index) => (
            <BookBox key={index} book={book} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  bookBox: {
    backgroundColor: "#e6e6e6",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
  },
  bookText: {
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
