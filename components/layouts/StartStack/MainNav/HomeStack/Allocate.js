import React, { useEffect, useState } from "react";
import { StatusBar, Switch } from "react-native";
import { Appbar, Avatar, ActivityIndicator, Button } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import * as SecureStore from "expo-secure-store";

const returnBook = async (bookId) => {
  const token = await SecureStore.getItemAsync("token");
  fetch("https://sunday-library.onrender.com/teacher/deallocate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-authtoken": token,
    },
    body: JSON.stringify({ bookId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status) {
        alert("Book deallocated Successfully");
      } else {
        alert("Error man");
      }
      console.log("Return Book Response:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
const BoxComponent = ({ text, data, student, onSelectBook }) => {
  const id = student.id;
  const [value, setValue] = useState(null);

  const handleValueChange = (item) => {
    setValue(item.value);
    onSelectBook(id, item.value); // Update parent state when value changes
  };

  return (
    <View style={styles.box}>
      <View style={styles.boxContent}>
        <Text style={styles.boxText}>{text}</Text>
      </View>
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={value}
          onChange={handleValueChange} // Call handleValueChange directly
        />
      </View>
    </View>
  );
};

export default function App() {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReturnBookPage, setIsReturnBookPage] = useState(true);
  const [bookId, setBookId] = useState("");
  const [selectedBooks, setSelectedBooks] = useState({}); // State to store selected book ID for each student

  const togglePage = () => {
    setIsReturnBookPage((prevValue) => !prevValue);
    setSelectedBooks({});
  };

  const fetchData = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");

      // Fetching Students
      let response = await fetch(
        "https://sunday-library.onrender.com/teacher/students",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-authtoken": token,
          },
        }
      );
      let responseData = await response.json();
      setStudents(responseData);

      // Fetching Books
      response = await fetch(
        "https://sunday-library.onrender.com/teacher/books",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-authtoken": token,
          },
        }
      );
      responseData = await response.json();
      const data = responseData.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Ensure that useEffect runs only once on component mount

  const handleSelectBook = (studentId, bookId) => {
    console.log(selectedBooks);
    setSelectedBooks((prevSelectedBooks) => ({
      ...prevSelectedBooks,
      [studentId]: bookId,
    }));
  };

  const allocateBooks = async () => {
    console.log("Selected Books:", selectedBooks);
    const convertedArray = Object.entries(selectedBooks).map(([sid, bid]) => ({
      sid: sid,
      bid: bid, // Assuming you want bid as a number
    }));

    const token = await SecureStore.getItemAsync("token");
    fetch("https://sunday-library.onrender.com/teacher/allocate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-authtoken": token,
      },
      body: JSON.stringify(convertedArray),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          alert("Book allocated Successfully");
        } else {
          alert("Error man");
        }
        console.log("Return Book Response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <View style={styles.main}></View>

      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Text>Allocate</Text>
          <Switch
            trackColor={{ false: "#09F12E", true: "#09F12E" }}
            thumbColor={isReturnBookPage ? "#ffff" : "#ffff"}
            value={isReturnBookPage}
            onValueChange={togglePage}
          />
          <Text>Deallocate</Text>
        </View>

        {isReturnBookPage ? (
          <>
            <Text style={styles.heading}>Deallocate Book</Text>
            <View style={styles.bookIdSection}>
              <TextInput
                placeholder="Enter Book ID"
                style={styles.bookIdInput}
                value={bookId}
                onChangeText={setBookId}
              />
            </View>

            <Button
              icon=""
              mode="contained"
              onPress={() => {
                returnBook(bookId);
              }}
              style={[
                styles.submitButton,
                {
                  margin: 10,
                  backgroundColor: "#EE0823",
                  width: "33%", // Set width to half of its container
                  alignSelf: "center", // Center horizontally
                },
              ]}
            >
              Submit
            </Button>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
            ></ScrollView>
          </>
        ) : (
          <>
            <Text style={styles.heading}>Allocate Books</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <View>
                  <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {students.map((student, index) => (
                      <View key={index} style={styles.boxRow}>
                        <BoxComponent
                          student={student}
                          data={books}
                          text={<Text>{student.name}</Text>}
                          onSelectBook={handleSelectBook}
                        />
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}
              <Button
                icon=""
                mode="contained"
                onPress={allocateBooks}
                style={[
                  styles.addButton,
                  {
                    margin: 10,
                    backgroundColor: "#F20C0C",
                    width: "50%",
                    alignSelf: "center",
                  },
                ]}
              >
                Submit
              </Button>
            </ScrollView>
          </>
        )}
      </View>

      <Appbar style={styles.appbar}>
        <Text style={styles.appbarText}>Allocation</Text>
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
    borderTopLeftRadius: 20, // Border radius at the top left
    borderTopRightRadius: 20, // Border radius at the top right
    borderBottomLeftRadius: 0, // No border radius at the bottom left
    borderBottomRightRadius: 0, // No border radius at the bottom right

    borderColor: "#e6e6e6",
    bottom: -1,
  },
  main: {
    flex: 1,
    backgroundColor: "#075e9c",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#3278D680",
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
  dropdownContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  dropdown: {
    justifyContent: "flex-end",
    height: 40,
    width: 100,
    marginRight: 0,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  bookIdSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 20, // Changed margin to marginHorizontal
  },

  bookIdLabel: {
    marginRight: 0,
  },

  bookIdInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    margin: 20,
    flex: 1, // Allow most of the space in the row
  },

  heading: {
    fontSize: 20,
    margin: 20,
    fontWeight: "bold",
    marginBottom: 10,

    textAlign: "center",
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    fontSize: 96,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
});
