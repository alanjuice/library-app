import React, { useEffect, useState } from "react";
import { Appbar, Avatar, Button, ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";

// Component for individual book box
const BookBox = ({ book }) => (
  <View style={styles.bookBox}>
    <Text style={styles.bookId}>BOOK ID :  {book.id}</Text>
    <Text style={styles.bookText}>BOOK NAME :{book.name}</Text>
  </View>
);

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await fetch(
        "https://sunday-library.onrender.com" + "/teacher/books",
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
    <View style={{ flex: 1 }}>
    <View style={styles.mainContainer}>
    <Appbar style={styles.appbar}>
        <Text style={styles.appbarText}>Books List</Text>
        <Avatar.Image
          size={40}
          source={require("../../../../../assets/favicon.png")}
          style={styles.avatar}
        />
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
          {books.map((book, index) => (
            <BookBox key={index} book={book} />
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
    backgroundColor: "#075e9c",
    justifyContent: "flex-end", // Align content to the bottom
  },
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
    bottom:-1
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
    marginBottom: 5, // Added margin bottom for spacing
  },
  bookText: {
    fontSize: 16,
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
